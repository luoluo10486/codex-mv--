import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = "out/remake/review";
const timeline = JSON.parse(await readFile("src/data/remake-storyboard.json", "utf8"));
const lyrics = JSON.parse(await readFile("src/data/full-lyrics.json", "utf8"));
const captionFrame = cue => Math.min(Math.ceil(cue.endMs * .03) - 1, Math.ceil(cue.startMs * .03) + Math.max(24, Array.from(cue.text).length * 3));
const frames = new Set([0, 5507]);
for (const shot of timeline) {
  frames.add(Math.floor((shot.startFrame + shot.endFrame) / 2));
  if (shot.startFrame) {
    frames.add(shot.startFrame - 1);
    frames.add(shot.startFrame + 6);
    frames.add(shot.startFrame + 12);
  }
}
for (const cue of lyrics) frames.add(captionFrame(cue));
const ordered = [...frames].sort((a,b) => a-b);
await mkdir(`${root}/frames`, {recursive:true});
const serveUrl = await bundle({entryPoint:path.resolve("src/index.ts"),enableCaching:true});
const browser = await openBrowser("chrome",{browserExecutable:"C:/Program Files/Google/Chrome/Application/chrome.exe",logLevel:"error"});
try {
  const composition = await selectComposition({serveUrl,id:"GouZhiQiShiFull",puppeteerInstance:browser});
  for (const frame of ordered) {
    await renderStill({serveUrl,composition,frame,output:`${root}/frames/frame-${String(frame).padStart(4,"0")}.png`,imageFormat:"png",puppeteerInstance:browser,logLevel:"error"});
  }
} finally { await browser.close({silent:true}); }
const groups = {
  scenes:timeline.map(s=>({frame:Math.floor((s.startFrame+s.endFrame)/2),label:s.sceneId})),
  captions:lyrics.map(c=>({frame:captionFrame(c),label:c.id})),
  transitions:timeline.slice(1).map(s=>({frame:s.startFrame+6,label:s.sceneId})),
};
for (const [name, items] of Object.entries(groups)) {
  const tiles = await Promise.all(items.map(async(item,i)=>({
    input:await sharp(`${root}/frames/frame-${String(item.frame).padStart(4,"0")}.png`).resize(480,270).extend({top:28,bottom:0,left:0,right:0,background:"#fff1dc"}).composite([{input:Buffer.from(`<svg width="480" height="28"><text x="10" y="20" font-family="Arial" font-size="16" fill="#4d3030">${item.label} / f${item.frame}</text></svg>`),left:0,top:0}]).png().toBuffer(),
    left:i%4*480,top:Math.floor(i/4)*298,
  })));
  await sharp({create:{width:1920,height:Math.ceil(items.length/4)*298,channels:3,background:"#fff1dc"}}).composite(tiles).jpeg({quality:90}).toFile(`${root}/${name}-contact.jpg`);
}
const manifest = {composition:"GouZhiQiShiFull",fps:30,frameCount:5508,frames:ordered,groups};
await writeFile(`${root}/frame-manifest.partial.json`,JSON.stringify(manifest,null,2));
await rename(`${root}/frame-manifest.partial.json`,`${root}/frame-manifest.json`);
console.log(`Rendered ${ordered.length} integrated frames and 3 contact sheets.`);
