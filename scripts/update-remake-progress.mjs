import { readFile, writeFile, rename, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const file="docs/MV_PROGRESS.json";
const progress=JSON.parse(await readFile(file,"utf8"));
const [owner,target="committed"]=process.argv.slice(2);
const stages=["planned","in_progress","rendered","verified","committed","merged"];
const now=new Date().toISOString();
if(owner==="--resume"){
  for(const scene of progress.scenes){
    if(scene.status==="in_progress"){
      scene.status="planned";
      scene.blocker="Interrupted work requires verification before continuing";
      scene.updatedAt=now;
    }
  }
}else{
  if(!["root","agent-a","agent-b","agent-c"].includes(owner)||!stages.includes(target))throw new Error("Usage: OWNER committed|merged, or --resume");
  const data=owner==="root"?null:JSON.parse(await readFile(`docs/agents/${owner}/status.json`,"utf8"));
  for(const scene of progress.scenes.filter(s=>s.owner===owner)){
    const saved=owner==="root"?{commit:execFileSync("git",["log","-1","--format=%H","--","src/dream/remake/Opening.tsx"],{encoding:"utf8"}).trim()}:Array.isArray(data.scenes)?data.scenes.find(s=>s.sceneId===scene.sceneId):data.scenes?.[scene.sceneId]??data.sceneStatus?.find(s=>s.sceneId===scene.sceneId);
    if(!saved)throw new Error(`Missing owner evidence: ${scene.sceneId}`);
    const commit=saved.commit??data?.codeCommit??data?.sourceCommit;
    execFileSync("git",["cat-file","-e",`${commit}^{commit}`]);
    if(target==="merged")execFileSync("git",["merge-base","--is-ancestor",commit,"HEAD"]);
    const tag=owner==="root"?"Opening":`Act${owner.at(-1).toUpperCase()}`;
    const source=`src/dream/remake/${tag}.tsx`;
    const preview=`out/remake/${owner}/${scene.sceneId}.png`;
    await access(source); await access(preview);
    if(stages.indexOf(target)<stages.indexOf(scene.status))continue;
    scene.history??=[];
    for(let i=stages.indexOf(scene.status)+1;i<=stages.indexOf(target);i++)scene.history.push({status:stages[i],recordedAt:now,evidence:`${source}; ${preview}; ${commit}`});
    Object.assign(scene,{status:target,sourceFiles:[source],previewFiles:[preview],commit,attempts:Math.max(1,scene.attempts),blocker:null,updatedAt:now});
  }
}
progress.updatedAt=now;
progress.counts=Object.fromEntries(stages.map(s=>[s,progress.scenes.filter(x=>x.status===s).length]));
await writeFile(`${file}.partial`,`${JSON.stringify(progress,null,2)}\n`);
await rename(`${file}.partial`,file);
console.log(progress.counts);
