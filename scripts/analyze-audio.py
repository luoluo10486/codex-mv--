"""Measure rhythm from decoded source PCM. Requires numpy; does not transcribe."""
from pathlib import Path
import json, wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
with wave.open(str(ROOT / 'out/review/analysis.wav'), 'rb') as f:
    rate = f.getframerate()
    samples = np.frombuffer(f.readframes(f.getnframes()), dtype='<i2').astype(np.float64) / 32768

hop, window = 160, 1024
frames = np.lib.stride_tricks.sliding_window_view(samples, window)[::hop]
spectrum = np.abs(np.fft.rfft(frames * np.hanning(window), axis=1))
freq = np.fft.rfftfreq(window, 1 / rate)
weighted = np.log1p(spectrum[:, (freq >= 80) & (freq < 7000)])
flux = np.maximum(0, np.diff(weighted, axis=0)).mean(axis=1)
flux = np.r_[0, flux]
flux /= np.percentile(flux, 97) + 1e-9
times = (np.arange(len(flux))*hop + window/2) / rate
centered = flux - np.mean(flux)
correlation = np.correlate(centered, centered, mode='full')[len(centered)-1:]
candidates = []
for lag in range(35, 101):
    if correlation[lag] >= correlation[lag-1] and correlation[lag] > correlation[lag+1]:
        candidates.append({'bpm': round(60*rate/hop/lag, 3), 'strength': round(float(correlation[lag]/correlation[0]), 5)})
candidates.sort(key=lambda a: a['strength'], reverse=True)
# The strongest fast pulse is a subdivision. Compare the slower metrical candidate
# against its double-length recurrence before fitting the editorial beat grid.
slow_candidates=[c for c in candidates if 80 <= c['bpm'] <= 90]
coarse=slow_candidates[0]['bpm'] if slow_candidates else candidates[0]['bpm']
best_grid=(-1,coarse,0)
for test_bpm in np.arange(coarse-1.5,coarse+1.51,.025):
    test_period=60/test_bpm
    for offset in np.arange(0,test_period,.01):
        positions=offset+np.arange(int(30/test_period))*test_period
        score=np.mean(np.interp(positions,times,flux))
        if score>best_grid[0]:best_grid=(score,test_bpm,offset)
bpm=round(float(best_grid[1]),3)
period = 60/bpm
best = (-1, 0)
for offset in np.arange(0, period, .005):
    positions = offset + np.arange(int(30/period))*period
    score = np.mean(np.interp(positions, times, flux))
    if score > best[0]: best = (score, offset)
beats = []
for t in np.arange(best[1], 30, period):
    sel = np.where((times >= t-.065) & (times <= t+.065))[0]
    measured = float(times[sel[np.argmax(flux[sel])]]) if len(sel) else float(t)
    beats.append(round(measured, 3))
rms = np.sqrt(np.mean(frames**2, axis=1))
data = {'source': 'public/audio/song.mp3', 'sampleRate': rate,
        'analysisDurationSeconds': round(len(samples)/rate, 3), 'durationSeconds': 30,
        'method': '10ms spectral-flux autocorrelation and phase fitting; beat candidates require editorial review',
        'bpmCandidates': candidates[:8], 'estimatedBpm': bpm, 'beatTimesSeconds': beats,
        'envelope': [{'t':round(float(times[i]),3),'rms':round(float(rms[i]),5),'onset':round(float(flux[i]),5)} for i in range(0,len(times),5)]}
(ROOT/'src/data/music-analysis.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
W,H=1800,480
points=' '.join(f'{70+t/38*1660:.1f},{355-float(rms[i])/max(rms)*240:.1f}' for i,t in enumerate(times[::10]) for i in [i*10])
ticks=''.join(f'<path d="M{70+t/38*1660},60v320" stroke="#ddd"/><text x="{70+t/38*1660}" y="415" font-size="20">{t}s</text>' for t in range(0,39,2))
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="100%" height="100%" fill="#faf7ef"/>{ticks}<polyline points="{points}" fill="none" stroke="#ae657b" stroke-width="2"/><text x="70" y="40" font-size="25">Source PCM RMS / estimated BPM {bpm} / frame-accurate lyric timings stored separately</text></svg>'
(ROOT/'out/review/audio-envelope.svg').write_text(svg,encoding='utf-8')
print(json.dumps({'bpmCandidates':candidates[:8], 'beats':beats[:14], 'decodedSeconds':len(samples)/rate},indent=2))
