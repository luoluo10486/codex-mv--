import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = `${process.env.MV_OUTPUT_ROOT ?? "out/remake-v5"}/interactions`;
const storyboard = JSON.parse(await readFile("src/data/remake-storyboard.json", "utf8"));
const ids = ["lyric-02","lyric-04","lyric-05","lyric-09","lyric-11","lyric-12","lyric-14","lyric-15","bridge-santa-route","lyric-22","lyric-27","lyric-28","lyric-30","lyric-31","lyric-33","lyric-35","lyric-36","lyric-38","lyric-39"];
const items = ids.flatMap(id => {
  const shot = storyboard.find(item=>item.sceneId===id);
  return [.08,.32,.55,.8,.96].map(p=>({sceneId:id,p,frame:shot.startFrame+Math.floor((shot.endFrame-shot.startFrame-1)*p)}));
});
await mkdir(`${root}/frames`,{recursive:true});
const serveUrl = await bundle({entryPoint:path.resolve("src/index.ts"),enableCaching:true});
const browser = await openBrowser("chrome",{browserExecutable:"C:/Program Files/Google/Chrome/Application/chrome.exe",logLevel:"error"});
try {
  const composition = await selectComposition({serveUrl,id:"GouZhiQiShiFull",puppeteerInstance:browser});
  for (const item of items) {
    await renderStill({serveUrl,composition,frame:item.frame,output:`${root}/frames/${item.sceneId}-${item.p}.png`,puppeteerInstance:browser,imageFormat:"png",logLevel:"error"});
  }
} finally { await browser.close({silent:true}); }
for (let start=0;start<items.length;start+=25) {
  const group=items.slice(start,start+25);
  const tiles=await Promise.all(group.map(async(item,i)=>({input:await sharp(`${root}/frames/${item.sceneId}-${item.p}.png`).resize(384,216).extend({top:24,bottom:0,left:0,right:0,background:"#fff5e7"}).composite([{input:Buffer.from(`<svg width="384" height="24"><text x="8" y="17" font-size="14" font-family="Arial" fill="#684f54">${item.sceneId} f${item.frame} ${item.p}</text></svg>`),left:0,top:0}]).png().toBuffer(),left:(i%5)*384,top:Math.floor(i/5)*240})));
  await sharp({create:{width:1920,height:Math.ceil(group.length/5)*240,channels:3,background:"#fff5e7"}}).composite(tiles).png().toFile(`${root}/contact-${start/25+1}.png`);
}
await writeFile(`${root}/manifest.partial.json`,JSON.stringify(items,null,2));
await rename(`${root}/manifest.partial.json`,`${root}/manifest.json`);
console.log(`Reviewed ${items.length} interaction frames across ${ids.length} scenes.`);
