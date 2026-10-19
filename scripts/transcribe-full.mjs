import { readFile, writeFile } from "node:fs/promises";
import {
  canUseWhisperWebGpu,
  downloadWhisperModel,
  toCaptions,
  transcribe,
} from "@remotion/whisper-webgpu";

const buf = await readFile("out/review/full-analysis.wav");
let pos = 12;
let pcm;
while (pos + 8 <= buf.length) {
  const id = buf.toString("ascii", pos, pos + 4);
  const size = buf.readUInt32LE(pos + 4);
  if (id === "data") {
    pcm = buf.subarray(pos + 8, pos + 8 + size);
    break;
  }
  pos += 8 + size + (size % 2);
}
if (!pcm) throw new Error("No PCM data found in full-analysis.wav");
const waveform = new Float32Array(pcm.length / 2);
for (let i = 0; i < waveform.length; i++)
  waveform[i] = pcm.readInt16LE(i * 2) / 32768;

const support = await canUseWhisperWebGpu();
let transcription;
if (support.supported) {
  await downloadWhisperModel({ model: "small", onProgress: () => {} });
  transcription = await transcribe({
    channelWaveform: waveform,
    model: "small",
    language: "chinese",
    task: "transcribe",
    doSample: false,
  });
  const result = toCaptions({ whisperWebGpuOutput: transcription });
  await writeFile(
    "out/review/asr-full.json",
    JSON.stringify(
      {
        engine: "remotion-whisper-webgpu",
        durationSeconds: waveform.length / 16000,
        captions: result.captions,
        raw: transcription,
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
      progress_callback: () => {},
    },
  );
  transcription = await pipe(waveform, {
    language: "chinese",
    task: "transcribe",
    return_timestamps: "word",
    chunk_length_s: 20,
    stride_length_s: 3,
  });
  const captions = transcription.chunks.map((chunk) => ({
    text: chunk.text,
    startMs: Math.round(chunk.timestamp[0] * 1000),
    endMs: Math.round((chunk.timestamp[1] ?? waveform.length / 16000) * 1000),
    timestampMs: null,
    confidence: null,
  }));
  await writeFile(
    "out/review/asr-full.json",
    JSON.stringify(
      {
        engine: "transformers-cpu",
        durationSeconds: waveform.length / 16000,
        captions,
        raw: transcription,
      },
      null,
      2,
    ),
  );
}
console.log(
  JSON.stringify(
    {
      engine: support.supported ? "webgpu" : "cpu",
      durationSeconds: waveform.length / 16000,
    },
    null,
    2,
  ),
);
