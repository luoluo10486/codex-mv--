import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lyrics = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/full-lyrics.json"), "utf8"),
);
const fps = 30;
const totalFrames = 5508;
const frame = (ms) => Math.round((ms / 1000) * fps);

const visual = [
  ["信件开启", "letter", "信封打开，诗页发光", "opening"],
  ["童话书页", "storybook", "童话书合上又打开", "opening"],
  ["奇迹升起", "miracle", "暖金光从书页升起", "opening"],
  ["月色小镇", "moon", "橙红月亮照亮雪夜小镇", "opening"],
  ["圣诞雪橇", "santa-sleigh", "圣诞老人驾驶红金雪橇送达礼物", "christmas"],
  ["礼物打开", "gift", "礼物盒打开，星光世界出现", "christmas"],
  ["三千世界", "water-drop-world", "金色水瓢托起多重世界", "worlds"],
  ["一瓢水", "ladle", "水滴在水瓢里形成小宇宙", "worlds"],
  ["靠近", "couple", "两人从远处向彼此靠近", "promise"],
  ["温暖", "fireplace", "壁炉、灯笼和暖光包住两人", "promise"],
  ["坚强", "mountain", "两人穿过风雪后站稳", "promise"],
  ["柔软", "cloud-garden", "云朵、布料和花园形成拥抱", "promise"],
  ["金色契约", "gold-contract", "戒指和契约纸交换金色光", "promise"],
  ["岁月", "clock", "钟表和四季围绕两人旋转", "promise"],
  ["牵手", "hands", "双手近景确认承诺", "promise"],
  ["远行", "golden-route", "两人走上暖金色道路", "promise"],
  ["万水千山", "mountain-route", "乘船穿过暖橙山海", "adventure"],
  ["标记点", "marker-tower", "山顶标记塔成为目标", "adventure"],
  ["人生之线", "red-thread", "红线切开人生画面", "adventure"],
  ["重新相连", "red-thread", "两人把断开的世界重新连接", "adventure"],
  ["前世回眸", "memory-mirror", "多个时间层的相遇剪影", "adventure"],
  ["虔诚牵手", "hands", "稳定的双手近景", "adventure"],
  ["世界之心", "world-heart", "所有世界汇聚成暖金心脏", "adventure"],
  ["我的世界", "world-home", "两人共同守护的小世界", "adventure"],
  ["闪亮", "star-field", "单点星光扩散成世界", "shine"],
  ["平凡", "small-character", "微小人物站在巨大星海中", "shine"],
  ["柔软一点点", "soft-garden", "花园和布料包住角色", "shine"],
  ["敏感", "glass-drop", "玻璃、水滴和花瓣轻轻颤动", "shine"],
  ["再次契约", "gold-contract", "第二次契约用更近的手部景别", "shine"],
  ["再次岁月", "season-clock", "四季快速叠化", "shine"],
  ["再次牵手", "hands", "牵手动作从特写推到全身", "shine"],
  ["再次远行", "long-road", "道路延伸到远方晨光", "shine"],
  ["回到身边", "warm-room", "回到开头的暖色房间", "return"],
  ["重新温暖", "fireplace", "壁炉和礼物重新点亮房间", "return"],
  ["重新坚强", "mountain", "两人并肩经过最后一段风雪", "return"],
  ["重新柔软", "embrace", "拥抱和布料形成柔和闭环", "return"],
  ["光环契约", "gold-ring", "契约变成环绕两人的金色光环", "return"],
  ["四季岁月", "seasons", "四季在两人身后完成一轮", "return"],
  ["最终牵手", "hands", "牵手后镜头拉远", "return"],
  ["最终远行", "dawn-road", "两人走向暖色晨光", "return"],
];

if (lyrics.length !== 40) throw new Error(`Expected 40 lyrics, got ${lyrics.length}`);

const ownerForLyric = (index) =>
  index < 16 ? "agent-a" : index < 32 ? "agent-b" : "agent-c";

const scenes = lyrics.map((cue, i) => {
  const [name, primaryObject, visualEvent, act] = visual[i];
  const next = lyrics[i + 1];
  const startFrame = frame(cue.startMs);
  let endFrame = next ? frame(next.startMs) : totalFrames;
  if (i === 15) endFrame = frame(cue.endMs);
  if (i === 31) endFrame = frame(cue.endMs);
  if (i === 39) endFrame = frame(cue.endMs);
  return {
    sceneId: `lyric-${String(i + 1).padStart(2, "0")}`,
    kind: "lyric",
    lyricIds: [cue.id],
    name,
    startFrame,
    endFrame,
    owner: ownerForLyric(i),
    act,
    primaryObject,
    visualEvent,
    motion: "subject-led camera movement with a still hold on the lyric reveal",
    palette: "warm-dream",
    status: "planned",
  };
});

const bridge = (sceneId, name, startFrame, endFrame, owner, act, primaryObject, visualEvent) => ({
  sceneId,
  kind: "bridge",
  lyricIds: [],
  name,
  startFrame,
  endFrame,
  owner,
  act,
  primaryObject,
  visualEvent,
  motion: "continuous handoff into the next lyric scene",
  palette: "warm-dream",
  status: "planned",
});

const bridges = [
  bridge("bridge-opening-room", "暖色房间开场", 0, 320, "root", "opening", "warm-room", "壁炉、信件和月亮建立首个空间"),
  bridge("bridge-opening-letter", "信件进入童话", 320, frame(lyrics[0].startMs), "root", "opening", "letter", "信件沿金色光线进入书页"),
  bridge("bridge-santa-route", "圣诞航线", frame(lyrics[15].endMs), 2350, "agent-c", "christmas", "sleigh-route", "雪橇航线穿过礼物和多个小世界"),
  bridge("bridge-santa-worlds", "礼物穿过世界", 2350, frame(lyrics[16].startMs), "agent-c", "christmas", "gift-route", "礼物星光连接到山海入口"),
  bridge("bridge-map-fold", "山海地图折叠", frame(lyrics[31].endMs), 4390, "agent-c", "interlude", "map-letter", "山海地图折成一封信"),
  bridge("bridge-map-return", "信件沿航线返回", 4390, frame(lyrics[32].startMs), "agent-c", "interlude", "golden-route", "信件沿金色路线回到月海"),
  bridge("bridge-final-rise", "信件升空", frame(lyrics[39].endMs), 5454, "agent-c", "return", "star-letter", "信件从道路上升起"),
  bridge("bridge-final-star", "信件化星", 5454, totalFrames, "agent-c", "return", "star-letter", "信件变成暖金色星星并停留在尾奏"),
];

const all = [...scenes, ...bridges].sort((a, b) => a.startFrame - b.startFrame);
const output = path.join(root, "src/data/remake-storyboard.json");
const atomicJson = (file, value) => {
  fs.writeFileSync(`${file}.partial`, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(`${file}.partial`, file);
};
atomicJson(output, all);
const progressPath = path.join(root, "docs/MV_PROGRESS.json");
const previous = fs.existsSync(progressPath)
  ? JSON.parse(fs.readFileSync(progressPath, "utf8"))
  : { scenes: [] };

const progress = {
  schemaVersion: 1,
  planRevision: 1,
  totalFrames,
  totalScenes: all.length,
  updatedAt: new Date().toISOString(),
  scenes: all.map((scene) => previous.scenes.find(saved => saved.sceneId === scene.sceneId) ?? ({
    sceneId: scene.sceneId,
    owner: scene.owner,
    status: "planned",
    branch: scene.owner === "root" ? "codex/mv-remake" : `codex/mv-${scene.owner}`,
    sourceFiles: [],
    previewFiles: [],
    commit: null,
    attempts: 0,
    blocker: null,
    updatedAt: null,
  })),
};
atomicJson(progressPath, progress);

console.log(`Prepared ${all.length} scenes (${scenes.length} lyric + ${bridges.length} bridge)`);
