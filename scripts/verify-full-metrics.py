from pathlib import Path
import json
import wave
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "out/dream-full-review"
data = json.loads((REVIEW / "technical-validation.json").read_text(encoding="utf-8"))
pixels = np.fromfile(REVIEW / "frame-luma.rgb", dtype=np.uint8).reshape(-1, 9, 16, 3)
means = pixels.astype(float).mean(axis=(1, 2, 3))
full_decode = {
    "decodedFrameCount": int(len(means)),
    "expectedFrameCount": 5508,
    "minMeanRGB": float(means.min()),
    "maxMeanRGB": float(means.max()),
    "blackFrames": np.where(means < 5)[0].tolist(),
    "passed": bool(len(means) == 5508 and np.all(means >= 5)),
}

def read_audio(name):
    with wave.open(str(REVIEW / name), "rb") as f:
        assert f.getframerate() == 16000 and f.getnchannels() == 1 and f.getsampwidth() == 2
        return np.frombuffer(f.readframes(f.getnframes()), dtype="<i2").astype(float) / 32768

original = read_audio("source-audio.wav")
encoded = read_audio("encoded-audio.wav")
n = min(len(original), len(encoded))
original, encoded = original[:n], encoded[:n]
size = 1 << (2 * n - 1).bit_length()
corr = np.fft.irfft(np.fft.rfft(encoded, size) * np.conj(np.fft.rfft(original, size)), size)
lags = np.arange(-1600, 1601)
values = corr[lags % size]
lag = int(lags[np.argmax(values)])
if lag >= 0:
    left, right = original[: n - lag], encoded[lag:]
else:
    left, right = original[-lag:], encoded[: n + lag]
audio = {
    "measuredOffsetSamples": lag,
    "sampleRate": 16000,
    "measuredOffsetMs": lag / 16,
    "correlationAfterAlignment": float(np.corrcoef(left, right)[0, 1]),
}
audio["passed"] = abs(lag / 16000) <= 1 / 30 and audio["correlationAfterAlignment"] > 0.98

parity = []
for frame in data["exportFrames"]:
    source = REVIEW / "frames" / f"frame-{frame:04d}.png"
    encoded_frame = REVIEW / "export-frames" / f"frame-{frame:04d}.png"
    if not source.exists() or not encoded_frame.exists():
        continue
    x = np.asarray(Image.open(source).convert("RGB")).astype(np.int16)
    y = np.asarray(Image.open(encoded_frame).convert("RGB")).astype(np.int16)
    parity.append({"frame": frame, "meanAbsoluteChannelDifference": float(np.abs(x - y).mean())})
parity_passed = len(parity) == len(data["exportFrames"]) and all(item["meanAbsoluteChannelDifference"] < 3 for item in parity)
data.update({"fullVideoDecode": full_decode, "encodedAudioAgainstOriginal": audio, "exportParity": parity, "exportParityPassed": parity_passed, "allMeasuredTechnicalChecksPassed": bool(data["allProbeChecksPassed"] and full_decode["passed"] and audio["passed"] and parity_passed)})
(REVIEW / "technical-validation.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"fullVideoDecode": full_decode, "audio": audio, "exportParity": parity}, indent=2))
if data["allMeasuredTechnicalChecksPassed"]:
    for name in ["frame-luma.rgb", "source-audio.wav", "encoded-audio.wav"]:
        (REVIEW / name).unlink(missing_ok=True)
else:
    raise SystemExit("Full technical validation failed; evidence retained.")
