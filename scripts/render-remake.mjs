import { bundle } from "@remotion/bundler";
import { openBrowser, selectComposition, renderMedia } from "@remotion/renderer";
import { mkdir, rename, access, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const mode = process.argv[2] ?? "preview";
const outputRoot = process.env.MV_OUTPUT_ROOT ?? "out/remake";
const reviewRoot = `${outputRoot}/review`;
const verifyOnly=process.argv.includes("--verify-only");
const fromFull=process.argv.includes("--from-full");
if(fromFull&&mode!=="full-preview")throw new Error("--from-full requires full-preview mode");
if (!["preview", "full-preview", "full"].includes(mode)) throw new Error("Unknown render mode");
const full = mode !== "preview";
const scale = mode === "full-preview" ? .5 : 1;
const output = `${outputRoot}/gou-zhi-qi-shi-warm-${mode}.mp4`;
const partial = output.replace(/\.mp4$/, ".partial.mp4");
await mkdir(outputRoot, {recursive:true});
try { await access(output); throw new Error(`Existing verified output preserved: ${output}`); }
catch (error) { if (error.code !== "ENOENT") throw error; }
const run = (exe,args) => {
  const result=spawnSync(exe,args,{encoding:"utf8",windowsHide:true,maxBuffer:16*1024*1024});
  if(result.status!==0)throw new Error(result.stderr||result.stdout||String(result.error));
  return result.stdout;
};
if(mode==="full"){
  try { await access(`${reviewRoot}/frame-manifest.json`); }
  catch { console.log(run(process.execPath,["scripts/review-remake.mjs"])); }
}
if(fromFull){
  const source=`${outputRoot}/gou-zhi-qi-shi-warm-full.mp4`;
  await access(source); await access(source.replace(/\.mp4$/,".validation.json"));
  run(path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"),["-v","error","-y","-i",source,"-vf","scale=960:540","-c:v","libx264","-crf","23","-preset","fast","-c:a","copy","-pix_fmt","yuv420p","-colorspace","bt709","-color_primaries","bt709","-color_trc","bt709","-movflags","+faststart",partial]);
}
if(!verifyOnly&&!fromFull){
const serveUrl = await bundle({entryPoint:path.resolve("src/index.ts"),enableCaching:true});
const browser = await openBrowser("chrome",{browserExecutable:"C:/Program Files/Google/Chrome/Application/chrome.exe",logLevel:"error"});
try {
  const composition=await selectComposition({serveUrl,id:full?"GouZhiQiShiFull":"GouZhiQiShi",puppeteerInstance:browser});
  let last=-1;
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation:partial,codec:"h264",audioCodec:"aac",audioBitrate:"320k",pixelFormat:"yuv420p",colorSpace:"bt709",imageFormat:"png",scale,crf:mode==="full-preview"?23:17,concurrency:2,overwrite:true,logLevel:"error",onProgress:p=>{
    const pct=Math.floor(p.progress*100);
    if(pct>=last+5){last=pct;console.log(`${mode}: ${pct}% (${p.renderedFrames}/${composition.durationInFrames} frames)`);}
  }});
} finally {await browser.close({silent:true});}
}
const bin=path.resolve("node_modules/@remotion/compositor-win32-x64-msvc");
const probe=JSON.parse(run(path.join(bin,"ffprobe.exe"),["-v","error","-show_streams","-show_format","-of","json",partial]));
const video=probe.streams.find(s=>s.codec_type==="video");
const audio=probe.streams.find(s=>s.codec_type==="audio");
if(video.width!==1920*scale||video.height!==1080*scale||video.r_frame_rate!=="30/1"||Number(video.nb_frames)!==(full?5508:900)||video.codec_name!=="h264"||audio?.codec_name!=="aac")throw new Error("Export metadata validation failed");
if(mode==="full"){
  console.log(run(process.execPath,["scripts/verify-full-export.mjs",partial,reviewRoot]));
  console.log(run("python",["scripts/verify-full-metrics.py",reviewRoot]));
} else {
  run(path.join(bin,"ffmpeg.exe"),["-v","error","-i",partial,"-c:v","rawvideo","-c:a","pcm_s16le","-f","null","-"]);
}
await writeFile(output.replace(/\.mp4$/,".validation.json"),JSON.stringify({mode,probe,verifiedAt:new Date().toISOString()},null,2));
await rename(partial,output);
console.log(`Verified export: ${path.resolve(output)}`);
