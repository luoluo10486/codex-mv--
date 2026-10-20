import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const output = "D:/develop/github-repositity/codex-mv/film/out/remake/agent-b";
const shots = JSON.parse(await readFile("src/data/remake-storyboard.json", "utf8")).filter(shot => shot.owner === "agent-b");
const serveUrl = await bundle({ entryPoint: path.resolve("src/dream/remake/entry-b.tsx") });
const browser = await openBrowser("chrome", { browserExecutable: "C:/Program Files/Google/Chrome/Application/chrome.exe", logLevel: "error" });
const evidence = [];
try {
  for (const shot of shots) {
    const composition = await selectComposition({ serveUrl, id: shot.sceneId, puppeteerInstance: browser });
    for (const [label, frame] of [["start", 0], ["main", Math.floor(composition.durationInFrames * .62)], ["end", composition.durationInFrames - 1]]) {
      const folder = label === "main" ? output : path.join(output, label);
      await mkdir(folder, { recursive: true });
      const file = path.join(folder, `${shot.sceneId}.png`);
      await renderStill({ serveUrl, composition, frame, output: file, imageFormat: "png", scale: .5, puppeteerInstance: browser, logLevel: "error" });
      evidence.push({ sceneId: shot.sceneId, label, frame, output: file });
    }
    console.log("Verified render samples", shot.sceneId);
  }
} finally {
  await browser.close({ silent: true });
}
await writeFile(path.join(output, "motion-samples.json"), JSON.stringify(evidence, null, 2));
