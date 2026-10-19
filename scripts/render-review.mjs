import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
} from "@remotion/renderer";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const exe = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const timeline = JSON.parse(
  await (
    await import("node:fs/promises")
  ).readFile("src/data/dream-timeline.json", "utf8"),
);
const verifyRepeat = process.argv.includes("--verify-repeat");
const typing = process.argv.includes("--typing");
const reviewRoot = "out/dream-review";
const frames = verifyRepeat
  ? [45, 500, 720]
  : typing
    ? [668, 676, 688, 700, 714, 733, 841, 849, 858, 870]
    : process.argv.slice(2).length
      ? process.argv.slice(2).map(Number)
      : [
          0,
          45,
          140,
          260,
          380,
          500,
          615,
          680,
          720,
          780,
          840,
          899,
          ...timeline
            .slice(0, -1)
            .flatMap((shot) => [
              shot.endFrame - 1,
              shot.endFrame + Math.floor(shot.transitionOutFrames / 2),
              shot.endFrame + shot.transitionOutFrames,
            ]),
        ];
const folder = verifyRepeat
  ? `${reviewRoot}/repeat-frames`
  : typing
    ? `${reviewRoot}/typing-frames`
    : `${reviewRoot}/frames`;
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  enableCaching: true,
  onProgress: () => {},
});
const browser = await openBrowser("chrome", {
  browserExecutable: exe,
  logLevel: "error",
});
try {
  const composition = await selectComposition({
    serveUrl,
    id: "GouZhiQiShi",
    puppeteerInstance: browser,
    logLevel: "error",
  });
  await mkdir(folder, { recursive: true });
  const repeatChecks = [];
  for (const frame of frames) {
    const name = `frame-${String(frame).padStart(3, "0")}.png`;
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `${folder}/${name}`,
      imageFormat: "png",
      puppeteerInstance: browser,
      logLevel: "error",
    });
    if (verifyRepeat) {
      const original = await readFile(`${reviewRoot}/frames/${name}`),
        repeat = await readFile(`${folder}/${name}`);
      repeatChecks.push({
        frame,
        identical: original.equals(repeat),
        originalSHA256: createHash("sha256").update(original).digest("hex"),
        repeatSHA256: createHash("sha256").update(repeat).digest("hex"),
      });
    }
    console.log("Reviewed frame", frame);
  }
  if (verifyRepeat) {
    await writeFile(
      `${reviewRoot}/determinism.json`,
      JSON.stringify(
        {
          checks: repeatChecks,
          passed: repeatChecks.every((c) => c.identical),
        },
        null,
        2,
      ),
    );
    if (!repeatChecks.every((c) => c.identical))
      throw new Error("Repeat frame mismatch");
  } else
    await writeFile(
      `${reviewRoot}/${typing ? "typing-manifest" : "frame-manifest"}.json`,
      JSON.stringify(
        {
          fps: 30,
          composition: composition.id,
          frames: frames.map((frame) => ({
            frame,
            time: frame / 30,
            path: `${typing ? "typing-frames" : "frames"}/frame-${String(frame).padStart(3, "0")}.png`,
          })),
        },
        null,
        2,
      ),
    );
} finally {
  await browser.close({ silent: true });
}
