import { spawnSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const bin = path.join(root, "node_modules/@remotion/compositor-win32-x64-msvc");
const video = process.argv[2] ?? "out/gou-zhi-qi-shi-dream-30s.mp4";
const reviewRoot = process.argv[3] ?? "out/dream-review";
const run = (exe, args) => {
  const r = spawnSync(path.join(bin, exe), args, {
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
    windowsHide: true,
  });
  if (r.status !== 0)
    throw new Error(r.stderr || r.error?.message || String(r.status));
  return r.stdout;
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
const v = probe.streams.find((s) => s.codec_type === "video"),
  a = probe.streams.find((s) => s.codec_type === "audio");
if (!v || !a) throw new Error("Video or audio track missing");
const checks = {
  width: v.width === 1920,
  height: v.height === 1080,
  frameRate: v.r_frame_rate === "30/1",
  frameCount: Number(v.nb_frames) === 900,
  videoDuration: Math.abs(Number(v.duration) - 30) < 1 / 30,
  containerDuration: Math.abs(Number(probe.format.duration) - 30) < 0.06,
  h264: v.codec_name === "h264",
  aac: a.codec_name === "aac",
  pixelFormat: v.pix_fmt === "yuv420p",
  colorSpace: v.color_space === "bt709",
  colorPrimaries: v.color_primaries === "bt709",
  colorTransfer: v.color_transfer === "bt709",
  colorRange: v.color_range === "tv",
};
await mkdir(`${reviewRoot}/export-frames`, { recursive: true });
const frames = [
  0, 45, 140, 260, 380, 500, 615, 667, 680, 720, 767, 780, 840, 899,
];
for (const f of frames) {
  run("ffmpeg.exe", [
    "-v",
    "error",
    "-y",
    "-ss",
    (f / 30).toFixed(6),
    "-i",
    video,
    "-frames:v",
    "1",
    "-update",
    "1",
    `${reviewRoot}/export-frames/frame-${String(f).padStart(3, "0")}.png`,
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
for (const [input, out] of [
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
    "30",
    "-vn",
    "-ar",
    "16000",
    "-ac",
    "1",
    "-c:a",
    "pcm_s16le",
    "-f",
    "wav",
    `${reviewRoot}/${out}`,
  ]);
}
await writeFile(
  `${reviewRoot}/technical-validation.json`,
  JSON.stringify(
    {
      checks,
      allProbeChecksPassed: Object.values(checks).every(Boolean),
      probe,
      exportFrames: frames,
      sourceCaptionFile: "src/data/lyrics.json",
      sourceTimeline: "src/data/dream-timeline.json",
    },
    null,
    2,
  ),
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
if (!Object.values(checks).every(Boolean)) process.exitCode = 1;
