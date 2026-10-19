"""Analyze the full source MP3 after it has been decoded to 16 kHz mono WAV."""
from pathlib import Path
import json
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
wav_path = ROOT / "out/review/full-analysis.wav"
with wave.open(str(wav_path), "rb") as f:
    rate = f.getframerate()
    samples = np.frombuffer(f.readframes(f.getnframes()), dtype="<i2").astype(np.float64) / 32768

hop, window = 160, 1024
frames = np.lib.stride_tricks.sliding_window_view(samples, window)[::hop]
spectrum = np.abs(np.fft.rfft(frames * np.hanning(window), axis=1))
freq = np.fft.rfftfreq(window, 1 / rate)
weighted = np.log1p(spectrum[:, (freq >= 80) & (freq < 7000)])
flux = np.maximum(0, np.diff(weighted, axis=0)).mean(axis=1)
flux = np.r_[0, flux]
flux /= np.percentile(flux, 97) + 1e-9
times = (np.arange(len(flux)) * hop + window / 2) / rate
centered = flux - np.mean(flux)
correlation = np.correlate(centered, centered, mode="full")[len(centered) - 1 :]
candidates = []
for lag in range(35, 101):
    if correlation[lag] >= correlation[lag - 1] and correlation[lag] > correlation[lag + 1]:
        candidates.append({"bpm": round(60 * rate / hop / lag, 3), "strength": round(float(correlation[lag] / correlation[0]), 5)})
candidates.sort(key=lambda item: item["strength"], reverse=True)
slow = [item for item in candidates if 80 <= item["bpm"] <= 90]
coarse = slow[0]["bpm"] if slow else candidates[0]["bpm"]
best_grid = (-1, coarse, 0)
for test_bpm in np.arange(coarse - 1.5, coarse + 1.51, 0.025):
    period = 60 / test_bpm
    for offset in np.arange(0, period, 0.01):
        positions = offset + np.arange(int(len(samples) / rate / period)) * period
        score = np.mean(np.interp(positions, times, flux))
        if score > best_grid[0]:
            best_grid = (score, test_bpm, offset)
bpm = round(float(best_grid[1]), 3)
period = 60 / bpm
beats = []
for t in np.arange(best_grid[2], len(samples) / rate, period):
    selected = np.where((times >= t - 0.065) & (times <= t + 0.065))[0]
    measured = float(times[selected[np.argmax(flux[selected])]]) if len(selected) else float(t)
    beats.append(round(measured, 3))
rms = np.sqrt(np.mean(frames**2, axis=1))
duration = len(samples) / rate
data = {
    "source": "public/audio/song.mp3",
    "sampleRate": rate,
    "durationSeconds": round(duration, 3),
    "analysisDurationSeconds": round(duration, 3),
    "method": "10ms spectral-flux autocorrelation and full-song phase fitting; beat candidates require editorial review",
    "bpmCandidates": candidates[:10],
    "estimatedBpm": bpm,
    "beatTimesSeconds": beats,
    "beatFrames": [round(t * 30) for t in beats],
    "envelope": [
        {"t": round(float(times[i]), 3), "rms": round(float(rms[i]), 5), "onset": round(float(flux[i]), 5)}
        for i in range(0, len(times), 5)
    ],
}
(ROOT / "src/data/full-music-analysis.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"durationSeconds": duration, "estimatedBpm": bpm, "beatCount": len(beats), "candidates": candidates[:5]}, indent=2))
