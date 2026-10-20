import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const [owner, entry, outputArg] = process.argv.slice(2);
if (!owner || !entry) throw new Error("Usage: node scripts/render-remake-scenes.mjs OWNER ENTRY [OUTPUT]");
const out = path.resolve(outputArg ?? `out/remake/${owner}`);
await mkdir(out, { recursive: true });
const shots = JSON.parse(await readFile("src/data/remake-storyboard.json", "utf8")).filter(s => s.owner === owner);
const serveUrl = await bundle({ entryPoint: path.resolve(entry), enableCaching: true });
const browser = await openBrowser("chrome", { browserExecutable: "C:/Program Files/Google/Chrome/Application/chrome.exe", logLevel: "error" });
const evidence = [];
try {
  for (const shot of shots) {
    const composition = await selectComposition({serveUrl, id: shot.sceneId, puppeteerInstance: browser});
    const frame = Math.floor((shot.endFrame - shot.startFrame) * 0.62);
    const output = path.join(out, `${shot.sceneId}.png`);
    await renderStill({serveUrl, composition, frame, output, imageFormat: "png", scale: 0.5, puppeteerInstance: browser, logLevel: "error"});
    evidence.push({sceneId: shot.sceneId, localFrame: frame, output});
    const partial = path.join(out, "frame-manifest.partial.json");
    await writeFile(partial, JSON.stringify(evidence, null, 2));
    await rename(partial, path.join(out, "frame-manifest.json"));
    console.log("Rendered", shot.sceneId);
  }
} finally { await browser.close({silent: true}); }
const bin = path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const args = evidence.flatMap(e => ["-i", e.output]);
const filters = evidence.map((_,i)=>`[${i}:v]scale=480:270,drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='${shots[i].sceneId}':fontsize=18:fontcolor=white:box=1:boxcolor=black@0.5:x=10:y=10[v${i}]`);
const layout = evidence.map((_,i)=>`${(i%4)*480}_${Math.floor(i/4)*270}`).join("|");
filters.push(`${evidence.map((_,i)=>`[v${i}]`).join("")}xstack=inputs=${evidence.length}:layout=${layout}:fill=0xfff1dc[out]`);
const result = spawnSync(bin, ["-v","error","-y",...args,"-filter_complex",filters.join(";"),"-map","[out]","-frames:v","1",path.join(out,"contact-sheet.jpg")], {encoding:"utf8", windowsHide:true});
if(result.status!==0) throw new Error(result.stderr);
console.log("Contact sheet", path.join(out,"contact-sheet.jpg"));
