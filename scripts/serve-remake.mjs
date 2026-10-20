import http from "node:http";
import { createReadStream, statSync, existsSync } from "node:fs";
import path from "node:path";

const root=path.resolve("out/remake");
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,"http://localhost");
  if(url.pathname==="/"){
    const versions=["full","preview","full-preview","first-review"].filter(mode=>existsSync(path.join(root,`gou-zhi-qi-shi-warm-${mode}.mp4`)));
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
    res.end(`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>勾指起誓 MV</title><style>html{background:#2a2224;color:#fff1dc;font:16px Arial}body{margin:0}header{height:52px;display:flex;align-items:center;gap:24px;padding:0 20px}h1{font-size:18px;margin:0}select,button{font:inherit;background:#fff1dc;color:#4d3030;border:0;padding:6px}video{display:block;width:100%;max-height:calc(100vh - 52px);aspect-ratio:16/9;background:#2a2224}</style><header><h1>勾指起誓</h1><select aria-label="版本" onchange="v.src=this.value">${versions.map(mode=>`<option value="/gou-zhi-qi-shi-warm-${mode}.mp4">${({full:"完整版",preview:"30 秒", "full-preview":"低清审片", "first-review":"首轮审片"})[mode]}</option>`).join("")}</select><button aria-label="播放" onclick="v.play()">&#9654;</button><button aria-label="暂停" onclick="v.pause()">&#10074;&#10074;</button><select aria-label="速度" onchange="v.playbackRate=Number(this.value)"><option value="1">1x</option><option value="2">2x</option><option value="4">4x</option></select></header><video id="v" controls preload="metadata" src="/gou-zhi-qi-shi-warm-${versions[0]}.mp4"></video></html>`);
    return;
  }
  const file=path.resolve(root,`.${decodeURIComponent(url.pathname)}`);
  if(!file.startsWith(root+path.sep)||!existsSync(file)||!statSync(file).isFile()){res.writeHead(404);res.end();return;}
  const size=statSync(file).size;
  const match=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  const start=match?Number(match[1]):0;
  const end=match&&match[2]?Math.min(size-1,Number(match[2])):size-1;
  if(start>end||start>=size){res.writeHead(416,{"Content-Range":`bytes */${size}`});res.end();return;}
  const type=file.endsWith(".mp4")?"video/mp4":file.endsWith(".jpg")?"image/jpeg":file.endsWith(".png")?"image/png":"application/octet-stream";
  res.writeHead(match?206:200,{"Content-Type":type,"Content-Length":end-start+1,"Accept-Ranges":"bytes",...(match?{"Content-Range":`bytes ${start}-${end}/${size}`}:{})});
  createReadStream(file,{start,end}).pipe(res);
});
let port=3001;
server.on("error",error=>{if(error.code==="EADDRINUSE")server.listen(++port,"127.0.0.1");else throw error;});
server.on("listening",()=>console.log(`MV review: http://127.0.0.1:${port}`));
server.listen(port,"127.0.0.1");
