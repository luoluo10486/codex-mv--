import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, selectComposition} from '@remotion/renderer';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';

const shots = JSON.parse(await readFile('src/data/remake-storyboard.json', 'utf8')).filter(s => s.owner === 'agent-c');
const selected = process.argv[2] ? shots.filter(s => s.sceneId === process.argv[2]) : shots;
const out = 'D:/develop/github-repositity/codex-mv/film/out/remake/agent-c';
await mkdir(out, {recursive:true});
const serveUrl = await bundle({entryPoint:path.resolve('src/dream/remake/entry-c.tsx'), enableCaching:true});
const browser = await openBrowser('chrome', {browserExecutable:'C:/Program Files/Google/Chrome/Application/chrome.exe',logLevel:'error'});
const evidence=[];
try {
  for(const shot of selected){
    const composition=await selectComposition({serveUrl,id:shot.sceneId,puppeteerInstance:browser});
    for(const sample of [0,0.3,0.62,0.95]){
      const frame=Math.floor((composition.durationInFrames-1)*sample);
      const output=path.join(out, `${shot.sceneId}-${Math.round(sample*100)}.png`);
      await renderStill({serveUrl,composition,frame,output,scale:0.5,imageFormat:'png',puppeteerInstance:browser,logLevel:'error'});
      evidence.push({sceneId:shot.sceneId,frame,output,width:composition.width,height:composition.height,fps:composition.fps,durationInFrames:composition.durationInFrames});
    }
    console.log('Verified render samples',shot.sceneId);
  }
}finally{await browser.close({silent:true});}
await writeFile(path.join(out,process.argv[2] ? `${process.argv[2]}-samples.json` : 'motion-samples.json'),JSON.stringify(evidence,null,2));
