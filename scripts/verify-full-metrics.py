from pathlib import Path
import json
import wave
import sys
import os
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / (sys.argv[1] if len(sys.argv) > 1 else f"{os.environ.get('MV_OUTPUT_ROOT', 'out/remake')}/review")
data = json.loads((REVIEW / "technical-validation.json").read_text(encoding="utf-8"))
storyboard = json.loads((ROOT / "src/data/remake-storyboard.json").read_text(encoding="utf-8"))
night_scenes = set(filter(None, os.environ.get("MV_NIGHT_SCENES", "").split(",")))
def is_night(frame):
    return any(shot["sceneId"] in night_scenes and shot["startFrame"] <= frame < shot["endFrame"] for shot in storyboard)
pixels = np.fromfile(REVIEW / "frame-luma.rgb", dtype=np.uint8).reshape(-1, 9, 16, 3)
means = pixels.astype(float).mean(axis=(1, 2, 3))
spatial_contrast = pixels.astype(float).std(axis=(1, 2)).mean(axis=1)
full_decode = {
    "decodedFrameCount": int(len(means)),
    "expectedFrameCount": 5508,
    "minMeanRGB": float(means.min()),
    "maxMeanRGB": float(means.max()),
    "blackFrames": np.where(means < 5)[0].tolist(),
    "uniformBlankFrames": np.where(spatial_contrast < 1)[0].tolist(),
    "minSpatialContrast": float(spatial_contrast.min()),
    "passed": bool(len(means) == 5508 and np.all(means >= 5) and np.all(spatial_contrast >= 1)),
}

def read_audio(name):
    with wave.open(str(REVIEW / name), "rb") as f:
        assert f.getframerate() == 16000 and f.getnchannels() == 1 and f.getsampwidth() == 2
        return np.frombuffer(f.readframes(f.getnframes()), dtype="<i2").astype(float) / 32768

original = read_audio("source-audio.wav")
encoded = read_audio("encoded-audio.wav")
audio_lengths = {"sourceSamples": len(original), "encodedSamples": len(encoded)}
size = 1 << (len(original) + len(encoded) - 1).bit_length()
corr = np.fft.irfft(np.fft.rfft(encoded, size) * np.conj(np.fft.rfft(original, size)), size)
lags = np.arange(-1600, 1601)
values = corr[lags % size]
lag = int(lags[np.argmax(values)])
if lag >= 0:
    covered = min(len(original), len(encoded) - lag)
    left, right = original[:covered], encoded[lag:lag + covered]
else:
    covered = min(len(original) + lag, len(encoded))
    left, right = original[-lag:-lag + covered], encoded[:covered]
# Codec padding may extend the encoded tail; verify source coverage after alignment.
audio_lengths.update({"coveredSourceSamples": covered, "complete": len(original) - covered <= 16000 / 30, "extraEncodedTailMs": max(0, len(encoded) - max(0, lag) - len(original)) / 16})
audio = {
    **audio_lengths,
    "measuredOffsetSamples": lag,
    "sampleRate": 16000,
    "measuredOffsetMs": lag / 16,
    "correlationAfterAlignment": float(np.corrcoef(left, right)[0, 1]),
}
audio["passed"] = audio_lengths["complete"] and abs(lag / 16000) <= 1 / 30 and audio["correlationAfterAlignment"] > 0.98

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
warm_frames = []
for frame in data["exportFrames"][1:-1:4]:
    rgb = np.asarray(Image.open(REVIEW / "export-frames" / f"frame-{frame:04d}.png").convert("RGB")).astype(float)
    ratio = float((rgb[:, :, 0] >= rgb[:, :, 2]).mean())
    warm_frames.append({"frame": frame, "redAtLeastBlueFraction": ratio})
pastel_frames = []
night_frames = []
for frame in data["exportFrames"]:
    rgb = np.asarray(Image.open(REVIEW / "export-frames" / f"frame-{frame:04d}.png").convert("RGB")).astype(float)
    luma = rgb @ np.array([.2126, .7152, .0722])
    saturation = (rgb.max(axis=2) - rgb.min(axis=2)) / np.maximum(1, rgb.max(axis=2))
    if is_night(frame):
        sky_luma = luma[:270]
        night_frames.append({"frame": frame, "meanSkyLuma": float(sky_luma.mean()), "nightSkyFraction": float((sky_luma < 155).mean())})
    else:
        pastel_frames.append({"frame": frame, "lightPixelFraction": float((luma > 180).mean()), "darkPixelFraction": float((luma < 100).mean()), "softColorFraction": float((saturation < .35).mean())})
pastel_revision = os.environ.get("MV_REQUIRE_PASTEL") == "1" or "remake-v2" in str(REVIEW)
pastel_passed = all(item["lightPixelFraction"] > .55 and item["darkPixelFraction"] < .15 and item["softColorFraction"] > .65 for item in pastel_frames)
# Natural blue water and sage foliage are intentional local environment colors.
warm_passed = len(warm_frames) == 12 and (float(np.mean([item["redAtLeastBlueFraction"] for item in warm_frames])) > .65 if pastel_revision else all(item["redAtLeastBlueFraction"] > .75 for item in warm_frames))
night_passed = len(night_frames) == len(night_scenes) and all(30 < item["meanSkyLuma"] < 155 and item["nightSkyFraction"] > .6 for item in night_frames)
data.update({"fullVideoDecode": full_decode, "encodedAudioAgainstOriginal": audio, "exportParity": parity, "exportParityPassed": parity_passed, "warmRepresentativeFrames": warm_frames, "warmPalettePassed": warm_passed, "pastelFrameChecks": pastel_frames, "pastelPaletteRequired": pastel_revision, "pastelPalettePassed": pastel_passed, "allMeasuredTechnicalChecksPassed": bool(data["allProbeChecksPassed"] and full_decode["passed"] and audio["passed"] and parity_passed and warm_passed and (pastel_passed or not pastel_revision))})
data.update({"nightSceneIds": sorted(night_scenes), "nightFrameChecks": night_frames, "nightPalettePassed": night_passed})
data["allMeasuredTechnicalChecksPassed"] = data["allMeasuredTechnicalChecksPassed"] and night_passed
(REVIEW / "technical-validation.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"fullVideoDecode": full_decode, "audio": audio, "exportParity": parity}, indent=2))
if data["allMeasuredTechnicalChecksPassed"]:
    for name in ["frame-luma.rgb", "source-audio.wav", "encoded-audio.wav"]:
        (REVIEW / name).unlink(missing_ok=True)
else:
    raise SystemExit("Full technical validation failed; evidence retained.")
