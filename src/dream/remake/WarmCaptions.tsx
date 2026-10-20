import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import captions from "../../data/full-lyrics.json";
import glyphData from "../glyphs.json";

const glyphs: Record<string,{d:string;advance:number}> = glyphData;
export const WarmCaptions = () => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const active=captions.filter(c=>f/fps*1000>=c.startMs && f/fps*1000<c.endMs);
  const cue=active[active.length-1];
  if(!cue)return null;
  const letters=Array.from(cue.text);
  const size=Math.min(91,1480/letters.length);
  const step=size*1.04;
  const x=(1920-step*letters.length)/2;
  const start=Math.ceil(cue.startMs/1000*fps);
  const duration=Math.round((cue.endMs-cue.startMs)/1000*fps);
  const delay=Math.max(1,Math.min(3,Math.floor(duration*.32/letters.length)));
  return <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
    <g data-cue-id={cue.id} aria-label={cue.text}>
      {letters.map((char,i)=>{
        const age=f-start-i*delay;
        if(age<0)return null;
        const p=spring({frame:age,fps,config:{damping:15,stiffness:170,mass:.65}});
        const y=105+(1-p)*24;
        const g=glyphs[char];
        if(!g)throw new Error(`Missing caption glyph ${char}`);
        const accent=cue.keywords.some(word=>word.includes(char));
        return <g key={i} data-letter={char} transform={`translate(${x+i*step} ${y}) scale(${size/1000})`}>
          <path d={g.d} fill="#6f3f48" stroke="#6f3f48" strokeWidth="64" strokeLinejoin="round" transform="translate(8 22)" />
          <path d={g.d} fill={accent?"#f6c28b":"#fff4da"} stroke="#6f3f48" strokeWidth="25" paintOrder="stroke fill" strokeLinejoin="round"/>
        </g>;
      })}
    </g>
  </svg>;
};
