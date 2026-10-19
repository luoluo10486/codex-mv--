import fs from "node:fs/promises";
import { createDecipheriv } from "node:crypto";
const b = await fs.readFile("public/audio/song.mp3");
const ss = (o) =>
  ((b[o] & 127) << 21) |
  ((b[o + 1] & 127) << 14) |
  ((b[o + 2] & 127) << 7) |
  (b[o + 3] & 127);
let metadata;
for (let o = 10; o + 10 < 10 + ss(6); ) {
  const id = b.toString("ascii", o, o + 4),
    n = ss(o + 4);
  if (!/^[A-Z0-9]{4}$/.test(id) || !n) break;
  if (id === "TXXX") {
    const text = b.subarray(o + 11, o + 10 + n).toString("utf8");
    const match = text.match(/163 key\(Don't modify\):([^\0]+)/);
    if (match) {
      const decipher = createDecipheriv(
        "aes-128-ecb",
        Buffer.from("2331346c6a6b5f215c5d2630553c2728", "hex"),
        null,
      );
      const plain = Buffer.concat([
        decipher.update(Buffer.from(match[1], "base64")),
        decipher.final(),
      ]).toString("utf8");
      metadata = JSON.parse(plain.replace(/^music:/, ""));
    }
  }
  o += 10 + n;
}
if (!metadata?.musicId) throw new Error("No source song ID in metadata");
console.log(
  "Source metadata",
  JSON.stringify({
    name: metadata.musicName,
    id: metadata.musicId,
    artists: metadata.artist,
  }),
);
await fs.writeFile(
  "out/review/source-metadata.json",
  JSON.stringify(
    {
      name: metadata.musicName,
      id: metadata.musicId,
      artists: metadata.artist,
    },
    null,
    2,
  ),
);
const url = `https://music.163.com/api/song/lyric?id=${metadata.musicId}&lv=-1&kv=-1&tv=-1`;
const res = await fetch(url, {
  headers: { Referer: "https://music.163.com/" },
  signal: AbortSignal.timeout(30000),
});
if (!res.ok) throw new Error("Lyric HTTP " + res.status);
const data = await res.json();
await fs.writeFile(
  "out/review/source-lyrics.json",
  JSON.stringify({ retrievedFrom: url, ...data }, null, 2),
);
console.log(data.lrc?.lyric ?? data);
