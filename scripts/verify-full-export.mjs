import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const bin = path.join(root, "node_modules/@remotion/compositor-win32-x64-msvc");
const video = process.argv[2] ?? "out/remake/gou-zhi-qi-shi-warm-full.mp4";
const reviewRoot = process.argv[3] ?? "out/remake/review";
const run = (exe, args) => {
  const result = spawnSync(path.join(bin, exe), args, {
    encoding: "utf8",
    maxBuffer: 12 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.status !== 0)
    throw new Error(
      result.stderr || result.error?.message || String(result.status),
    );
  return result.stdout;
};
const probe = JSON.parse(
  run("ffprobe.exe", [
    "-v",
    "error",
    "-show_streams",
    "-show_format",
    "-of",
    "json",
    video,
  ]),
);
const v = probe.streams.find((stream) => stream.codec_type === "video");
const a = probe.streams.find((stream) => stream.codec_type === "audio");
if (!v || !a) throw new Error("Video or audio track missing");
const checks = {
  width: v.width === 1920,
  height: v.height === 1080,
  frameRate: v.r_frame_rate === "30/1",
  frameCount: Number(v.nb_frames) === 5508,
  videoDuration: Math.abs(Number(v.duration) - 5508 / 30) < 1 / 30,
  containerDuration: Math.abs(Number(probe.format.duration) - 5508 / 30) < 0.08,
  h264: v.codec_name === "h264",
  aac: a.codec_name === "aac",
  audioDuration: Number(a.duration) >= 183.576 - 1 / 30 && Number(a.duration) <= 183.7,
  pixelFormat: v.pix_fmt === "yuv420p",
  colorSpace: v.color_space === "bt709",
  colorPrimaries: v.color_primaries === "bt709",
  colorTransfer: v.color_transfer === "bt709",
  colorRange: v.color_range === "tv",
};
await mkdir(`${reviewRoot}/export-frames`, { recursive: true });
const storyboard = JSON.parse(await readFile("src/data/remake-storyboard.json", "utf8"));
const exportFrames = [0, ...storyboard.map(s => Math.floor((s.startFrame + s.endFrame) / 2)), 5507];
for (const frame of exportFrames) {
  run("ffmpeg.exe", [
    "-v",
    "error",
    "-y",
    "-ss",
    (frame / 30).toFixed(6),
    "-i",
    video,
    "-frames:v",
    "1",
    "-update",
    "1",
    `${reviewRoot}/export-frames/frame-${String(frame).padStart(4, "0")}.png`,
  ]);
}
run("ffmpeg.exe", [
  "-v",
  "error",
  "-y",
  "-i",
  video,
  "-an",
  "-vf",
  "scale=16:9",
  "-pix_fmt",
  "rgb24",
  "-c:v",
  "rawvideo",
  "-f",
  "image2pipe",
  `${reviewRoot}/frame-luma.rgb`,
]);
for (const [input, output] of [
  [video, "encoded-audio.wav"],
  ["public/audio/song.mp3", "source-audio.wav"],
]) {
  run("ffmpeg.exe", [
    "-v",
    "error",
    "-y",
    "-i",
    input,
    "-t",
    "183.576",
    "-vn",
    "-ar",
    "16000",
    "-ac",
    "1",
    "-c:a",
    "pcm_s16le",
    "-f",
    "wav",
    `${reviewRoot}/${output}`,
  ]);
}
const validation = {
  checks,
  allProbeChecksPassed: Object.values(checks).every(Boolean),
  probe,
  exportFrames,
};
await writeFile(
  `${reviewRoot}/technical-validation.json`,
  JSON.stringify(validation, null, 2),
);
console.log(
  JSON.stringify(
    {
      checks,
      videoDuration: v.duration,
      containerDuration: probe.format.duration,
      frames: v.nb_frames,
      audio: a.codec_name,
    },
    null,
    2,
  ),
);
if (!validation.allProbeChecksPassed) process.exitCode = 1;
