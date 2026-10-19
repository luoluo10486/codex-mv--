import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const world = JSON.parse(await readFile("src/data/song-world.json", "utf8"));
const sampleCaptions = JSON.parse(
  await readFile("src/data/lyrics.json", "utf8"),
);
let asr = [];
try {
  const run = JSON.parse(await readFile("out/review/asr-full.json", "utf8"));
  asr = run.captions ?? [];
} catch {}

const starts = world.lyrics.map((row) => row.sourceStartMs);
const motifs = [
  "信与诗",
  "童话结尾",
  "奇迹",
  "月色",
  "星星礼物",
  "礼物花园",
  "三千世界",
  "一瓢水",
  "靠近",
  "温暖",
  "坚强",
  "柔软",
  "金色契约",
  "岁月星盘",
  "牵手",
  "远行",
  "万水千山",
  "标记塔",
  "人生之线",
  "相连",
  "前世回眸",
  "虔诚牵手",
  "世界之心",
  "我的世界",
  "闪亮",
  "平凡星尘",
  "柔软花园",
  "敏感星光",
  "金色契约",
  "岁月星盘",
  "牵手远行",
  "远方",
  "靠近",
  "温暖",
  "坚强",
  "柔软",
  "金色契约",
  "岁月星盘",
  "牵手",
  "远行",
];
const keywordParts = [
  "万水千山",
  "金色契约",
  "三千美丽世界",
  "圣诞老人",
  "靠近一点点",
  "闪亮一点点",
  "坚强一点点",
  "柔软一点点",
  "标记点",
  "其余所有",
  "分割",
  "相连",
  "童话",
  "奇迹",
  "月色",
  "礼物",
  "温暖",
  "敏感",
  "平凡",
  "岁月",
  "牵手",
  "远",
  "信",
  "诗",
];
const colors = ["pink", "mint", "gold", "coral", "violet"];
const normalize = (text) => text.replace(/[\s，。！？、]/g, "");
const overlap = (a, b) => {
  const aa = new Set(Array.from(normalize(a)));
  return Array.from(normalize(b)).filter((c) => aa.has(c)).length;
};
const nearestAsr = (text, sourceStartMs) => {
  let best = null;
  for (const cue of asr) {
    const distance = Math.abs((cue.startMs ?? sourceStartMs) - sourceStartMs);
    const score =
      overlap(text, cue.text ?? "") / Math.max(1, normalize(text).length);
    const value = score * 2200 - distance * 0.35;
    if (!best || value > best.value) best = { cue, value, score, distance };
  }
  return best && (best.score >= 0.25 || best.distance < 500) ? best : null;
};

const actFor = (ms) =>
  ms < 43731
    ? "recognition"
    : ms < 64164
      ? "promise"
      : ms < 90083
        ? "interlude-one"
        : ms < 111838
          ? "adventure"
          : ms < 132026
            ? "shine"
            : ms < 157560
              ? "interlude-two"
              : "return";
const styleFor = (i) =>
  i < 8
    ? "verse"
    : i < 16
      ? "chorus"
      : i < 24
        ? "verse"
        : i < 32
          ? "chorus"
          : "reprise";
const layoutFor = (i, text) =>
  text.length >= 12 ? "split" : ["left", "center", "right"][i % 3];

const captions = world.lyrics.map((row, i) => {
  const sample = sampleCaptions.find((cue) => cue.text === row.text);
  const match = sample ? null : nearestAsr(row.text, row.sourceStartMs);
  const rawAsrDelta = match
    ? Math.max(-500, Math.min(500, match.cue.startMs - row.sourceStartMs))
    : 0;
  const asrDelta = Math.round(rawAsrDelta * 0.35);
  const startMs = sample?.startMs ?? row.sourceStartMs + asrDelta;
  const nextStart = starts[i + 1] ?? 180400;
  const estimatedEnd = Math.min(
    match?.cue.endMs ?? nextStart - 50,
    startMs + 3600,
    nextStart - 20,
  );
  const endMs = Math.max(
    startMs + 650,
    sample?.endMs ?? Math.max(startMs + 650, estimatedEnd),
  );
  const keywords = keywordParts.filter((part) => row.text.includes(part));
  return {
    id: `lyric-${String(i + 1).padStart(2, "0")}`,
    text: row.text,
    startMs,
    endMs,
    timestampMs: Math.round((startMs + endMs) / 2),
    confidence: match ? Math.min(0.99, Math.max(0.4, match.score)) : null,
    sourceStartMs: row.sourceStartMs,
    timingStatus: sample
      ? "calibrated"
      : match
        ? "asr-aligned"
        : "source-reference",
    act: actFor(row.sourceStartMs),
    keywords,
    visualMotif: motifs[i],
    layout: layoutFor(i, row.text),
    style: styleFor(i),
    accent: colors[i % colors.length],
  };
});

const stamp = (ms) =>
  `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${((ms % 60000) / 1000)
    .toFixed(3)
    .padStart(6, "0")}`;
const lrc = [
  "[ti:勾指起誓]",
  "[ar:洛天依Official / ilem]",
  "[length:03:03]",
  ...captions.map((cue) => `[${stamp(cue.startMs)}]${cue.text}`),
  "",
].join("\n");

await mkdir("public/audio", { recursive: true });
await writeFile(
  "src/data/full-lyrics.json",
  JSON.stringify(captions, null, 2) + "\n",
);
await writeFile("public/audio/song-full.lrc", lrc);
const audioHash = createHash("sha256")
  .update(await readFile("public/audio/song.mp3"))
  .digest("hex");
await writeFile(
  "out/review/full-lyrics-calibration.json",
  JSON.stringify(
    {
      sourceAudioSha256: audioHash,
      sourceLyrics: "src/data/song-world.json",
      asrSource: asr.length ? "out/review/asr-full.json" : null,
      policy:
        "First three local calibrated captions are preserved. Latest-start-wins is used for overlapping source phrases.",
      captions,
      limitations: asr.length
        ? ["ASR agreement is not independent human phoneme ground truth."]
        : [
            "Full-song ASR has not been run; uncalibrated lines retain source LRC start references.",
          ],
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      captions: captions.length,
      asrCaptions: asr.length,
      calibrated: captions.filter((c) => c.timingStatus === "calibrated")
        .length,
      asrAligned: captions.filter((c) => c.timingStatus === "asr-aligned")
        .length,
      sourceReference: captions.filter(
        (c) => c.timingStatus === "source-reference",
      ).length,
    },
    null,
    2,
  ),
);
