import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

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
const tiles = await Promise.all(evidence.map(async(e,i)=>({
  input: await sharp(e.output).resize(480,270).extend({top:30,bottom:0,left:0,right:0,background:"#fff1dc"}).composite([{input:Buffer.from(`<svg width="480" height="30"><text x="10" y="22" font-family="Arial" font-size="17" fill="#4d3030">${shots[i].sceneId}</text></svg>`),top:0,left:0}]).png().toBuffer(),
  left:(i%4)*480,top:Math.floor(i/4)*300,
})));
await sharp({create:{width:1920,height:Math.ceil(evidence.length/4)*300,channels:3,background:"#fff1dc"}}).composite(tiles).jpeg({quality:90}).toFile(path.join(out,"contact-sheet.jpg"));
console.log("Contact sheet", path.join(out,"contact-sheet.jpg"));
