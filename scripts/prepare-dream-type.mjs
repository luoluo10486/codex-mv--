import fs from "node:fs/promises";
import opentype from "opentype.js";

// The complete local lyric and story data also drives glyph preparation.
const { lyrics } = JSON.parse(
  await fs.readFile("src/data/song-world.json", "utf8"),
);
const fontBytes = await fs.readFile("public/fonts/ZCOOLKuaiLe-Regular.ttf");
const font = opentype.parse(
  fontBytes.buffer.slice(
    fontBytes.byteOffset,
    fontBytes.byteOffset + fontBytes.byteLength,
  ),
);
const characters = new Set(
  Array.from(
    lyrics.map((c) => c.text).join("") +
      "勾指起誓月海来信在三千世界里与你相遇洛天依奇迹诗童话",
  ),
);
const glyphs = {};
for (const char of characters) {
  const glyph = font.charToGlyph(char);
  if (!glyph.index) throw new Error("Missing glyph: " + char);
  glyphs[char] = {
    d: font.getPath(char, 0, 880, 1000).toPathData(2),
    advance: (glyph.advanceWidth / font.unitsPerEm) * 1000,
  };
}
await fs.mkdir("src/dream", { recursive: true });
await fs.writeFile("src/dream/glyphs.json", JSON.stringify(glyphs));
console.log(
  "Prepared",
  characters.size,
  "vector glyphs from",
  lyrics.length,
  "local full-song lyric rows",
);
