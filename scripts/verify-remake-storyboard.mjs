import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const shots = JSON.parse(await readFile("src/data/remake-storyboard.json", "utf8"));
const lyrics = JSON.parse(await readFile("src/data/full-lyrics.json", "utf8"));
assert.equal(shots.length, 48);
assert.equal(shots.filter(s => s.kind === "lyric").length, 40);
assert.equal(shots.filter(s => s.kind === "bridge").length, 8);
assert.equal(shots[0].startFrame, 0);
assert.equal(shots.at(-1).endFrame, 5508);
assert.equal(new Set(shots.map(s => s.sceneId)).size, 48);
for (let i = 0; i < shots.length; i++) {
  assert(shots[i].endFrame > shots[i].startFrame, shots[i].sceneId);
  if (i) assert.equal(shots[i].startFrame, shots[i - 1].endFrame, shots[i].sceneId);
}
for (const cue of lyrics) {
  const matches = shots.filter(s => s.lyricIds.includes(cue.id));
  assert.equal(matches.length, 1, cue.id);
  assert.equal(matches[0].startFrame, Math.round(cue.startMs * .03), cue.id);
}
assert.equal(shots.find(s => s.sceneId === "lyric-05").primaryObject, "santa-sleigh");
assert.equal(shots.find(s => s.sceneId === "lyric-06").primaryObject, "gift");
console.log("48 continuous scenes, 40 unique lyric cues, 5508 frames, Christmas objects locked.");
