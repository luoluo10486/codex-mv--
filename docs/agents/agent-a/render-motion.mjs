import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const output = path.resolve(process.argv[2] ?? "out/remake/agent-a/motion");
await mkdir(output, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/dream/remake/entry-a.tsx") });
const browser = await openBrowser("chrome", { browserExecutable: "C:/Program Files/Google/Chrome/Application/chrome.exe", logLevel: "error" });
try {
  for (const id of ["lyric-02", "lyric-05", "lyric-06", "lyric-13", "lyric-15"]) {
    const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser });
    for (const progress of [0, 0.28, 0.92]) {
      const frame = Math.floor((composition.durationInFrames - 1) * progress);
      await renderStill({ serveUrl, composition, frame, output: path.join(output, `${id}-${frame}.png`), imageFormat: "png", scale: 0.5, puppeteerInstance: browser, logLevel: "error" });
      console.log(id, frame);
    }
  }
} finally { await browser.close({ silent: true }); }
