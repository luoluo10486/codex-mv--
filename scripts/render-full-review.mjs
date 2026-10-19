import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  renderStill,
  selectComposition,
} from "@remotion/renderer";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = "out/dream-full-review";
const verifyRepeat = process.argv.includes("--verify-repeat");
const timeline = JSON.parse(
  await readFile("src/data/full-timeline.json", "utf8"),
);
const captions = JSON.parse(
  await readFile("src/data/full-lyrics.json", "utf8"),
);
const frameSet = new Set();
for (const shot of timeline) {
  frameSet.add(shot.startFrame);
  frameSet.add(Math.round((shot.startFrame + shot.endFrame) / 2));
  frameSet.add(Math.max(shot.startFrame, shot.endFrame - 1));
  if (shot.transitionFrames) {
    frameSet.add(shot.endFrame - 1);
    frameSet.add(shot.endFrame + Math.floor(shot.transitionFrames / 2));
    frameSet.add(shot.endFrame + shot.transitionFrames);
  }
}
for (const cue of captions) {
  const start = Math.ceil((cue.startMs / 1000) * 30);
  frameSet.add(start);
  frameSet.add(
    start + Math.min(12, Math.max(2, Array.from(cue.text).length * 2)),
  );
}
const frames = [...frameSet]
  .filter((frame) => frame >= 0 && frame < 5508)
  .sort((a, b) => a - b);
const outputFolder = verifyRepeat ? `${root}/repeat-frames` : `${root}/frames`;
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  enableCaching: true,
  onProgress: () => {},
});
const browser = await openBrowser("chrome", {
  browserExecutable: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  logLevel: "error",
});
try {
  const composition = await selectComposition({
    serveUrl,
    id: "GouZhiQiShiFull",
    puppeteerInstance: browser,
    logLevel: "error",
  });
  await mkdir(outputFolder, { recursive: true });
  for (const frame of verifyRepeat ? [900, 2702, 4727] : frames) {
    const name = `frame-${String(frame).padStart(4, "0")}.png`;
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `${outputFolder}/${name}`,
      imageFormat: "png",
      puppeteerInstance: browser,
      logLevel: "error",
    });
    console.log("Reviewed full frame", frame);
  }
  const manifest = {
    fps: 30,
    composition: composition.id,
    frameCount: 5508,
    frames: (verifyRepeat ? [900, 2702, 4727] : frames).map((frame) => ({
      frame,
      time: frame / 30,
      path: `${verifyRepeat ? "repeat-frames" : "frames"}/frame-${String(frame).padStart(4, "0")}.png`,
    })),
  };
  await writeFile(
    `${root}/${verifyRepeat ? "determinism-manifest" : "frame-manifest"}.json`,
    JSON.stringify(manifest, null, 2),
  );
} finally {
  await browser.close({ silent: true });
}
