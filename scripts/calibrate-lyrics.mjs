import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const source = JSON.parse(
  await readFile("out/review/source-lyrics.json", "utf8"),
);
const rows = [...source.lrc.lyric.matchAll(/\[(\d+):(\d+\.\d+)\](.+)/g)]
  .map((m) => ({
    startMs: Math.round((Number(m[1]) * 60 + Number(m[2])) * 1000),
    text: m[3].trim(),
  }))
  .filter((c) => c.startMs > 20000 && c.startMs < 30000);
const runs = await Promise.all(
  [20, 21, 22].map(async (offset) =>
    JSON.parse(await readFile(`out/review/asr-${offset}s.json`, "utf8")),
  ),
);
const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
const checks = rows.map((row, i) => {
  const starts = runs.map((run) => run.captions[i].startMs),
    ends = runs.map((run) => run.captions[i].endMs);
  return {
    ...row,
    asrStartsMs: starts,
    asrEndsMs: ends,
    startSpreadMs: Math.max(...starts) - Math.min(...starts),
    endSpreadMs: Math.max(...ends) - Math.min(...ends),
    chosenStartMs: median(starts),
    chosenEndMs: median(ends),
  };
});
const captions = checks.map((c) => ({
  text: c.text,
  startMs: c.chosenStartMs,
  endMs: c.chosenEndMs,
  timestampMs: Math.round((c.chosenStartMs + c.chosenEndMs) / 2),
  confidence: null,
}));
await writeFile(
  "src/data/lyrics.json",
  JSON.stringify(captions, null, 2) + "\n",
);
const stamp = (ms) =>
  `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${((ms % 60000) / 1000).toFixed(3).padStart(6, "0")}`;
await writeFile(
  "public/audio/song-30s.lrc",
  "[ti:勾指起誓]\n[ar:洛天依Official / ilem]\n[length:00:30]\n" +
    captions.map((c) => `[${stamp(c.startMs)}]${c.text}`).join("\n") +
    "\n",
);
const audioHash = createHash("sha256")
  .update(await readFile("public/audio/song.mp3"))
  .digest("hex");
await writeFile(
  "out/review/lyrics-calibration.json",
  JSON.stringify(
    {
      sourceAudioSha256: audioHash,
      textSource: source.retrievedFrom,
      method:
        "Median of local multilingual Whisper-small WebGPU runs with 20s, 21s and 22s context offsets; text corrected against the song-source lyric and the supplied reference.",
      sourceTimebase: "Decoded original MP3, seconds from start",
      checks,
      limitations: [
        "ASR agreement is not independent human phoneme ground truth.",
        "Phrase-end model variation remains 340–980ms. Manual listening is required to certify the requested 150ms end accuracy.",
        "The third phrase continues beyond the 30-second sample.",
      ],
    },
    null,
    2,
  ),
);
console.log(JSON.stringify(checks, null, 2));
