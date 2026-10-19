import { readFile, writeFile } from "node:fs/promises";
import {
  canUseWhisperWebGpu,
  downloadWhisperModel,
  transcribe,
  toCaptions,
} from "@remotion/whisper-webgpu";
const support = await canUseWhisperWebGpu();
console.log("WebGPU support:", JSON.stringify(support));
const buf = await readFile("out/review/analysis.wav");
let pos = 12,
  pcm;
while (pos + 8 <= buf.length) {
  const id = buf.toString("ascii", pos, pos + 4),
    n = buf.readUInt32LE(pos + 4);
  if (id === "data") {
    pcm = buf.subarray(pos + 8, pos + 8 + n);
    break;
  }
  pos += 8 + n + (n % 2);
}
if (!pcm) throw new Error("No PCM data");
const offsetSeconds = Number(process.argv[2] ?? 22);
const start = offsetSeconds * 16000,
  end = 38 * 16000;
const waveform = new Float32Array(Math.min(end, pcm.length / 2) - start);
for (let i = 0; i < waveform.length; i++)
  waveform[i] = pcm.readInt16LE((i + start) * 2) / 32768;
let transcription;
if (support.supported) {
  let lastPercent = -1;
  await downloadWhisperModel({
    model: "small",
    onProgress: (p) => {
      const percent = Math.floor(p.progress * 10) * 10;
      if (percent !== lastPercent) {
        lastPercent = percent;
        console.log("Model download", percent + "%");
      }
    },
  });
  transcription = await transcribe({
    channelWaveform: waveform,
    model: "small",
    language: "chinese",
    task: "transcribe",
    doSample: false,
  });
  const result = toCaptions({ whisperWebGpuOutput: transcription });
  const captions = result.captions.map((c) => ({
    ...c,
    startMs: c.startMs + offsetSeconds * 1000,
    endMs: c.endMs + offsetSeconds * 1000,
    timestampMs:
      c.timestampMs === null ? null : c.timestampMs + offsetSeconds * 1000,
  }));
  await writeFile(
    `out/review/asr-${offsetSeconds}s.json`,
    JSON.stringify(
      {
        engine: "remotion-whisper-webgpu",
        sourceOffsetMs: offsetSeconds * 1000,
        transcription,
        captions,
      },
      null,
      2,
    ),
  );
} else {
  const { pipeline } = await import("@huggingface/transformers");
  const pipe = await pipeline(
    "automatic-speech-recognition",
    "onnx-community/whisper-small",
    {
      dtype: "q8",
      device: "cpu",
      progress_callback: (p) => {
        if (p.status === "done") console.log("Model file ready", p.file);
      },
    },
  );
  transcription = await pipe(waveform, {
    language: "chinese",
    task: "transcribe",
    return_timestamps: "word",
    chunk_length_s: 20,
    stride_length_s: 3,
  });
  const captions = transcription.chunks.map((c) => ({
    text: c.text,
    startMs: Math.round((c.timestamp[0] + offsetSeconds) * 1000),
    endMs: Math.round(
      ((c.timestamp[1] ?? waveform.length / 16000) + offsetSeconds) * 1000,
    ),
    timestampMs: null,
    confidence: null,
  }));
  await writeFile(
    `out/review/asr-${offsetSeconds}s.json`,
    JSON.stringify(
      {
        engine: "transformers-cpu",
        sourceOffsetMs: offsetSeconds * 1000,
        transcription,
        captions,
      },
      null,
      2,
    ),
  );
}
console.log(JSON.stringify(transcription, null, 2));
