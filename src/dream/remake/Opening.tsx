import { useCurrentFrame } from "remotion";
import { WarmStage, WarmMoon, WarmLetter, WarmStar, WarmGlow } from "../WarmArt";
import { Room } from "./ActCArt";
import type { SceneProps } from "./types";
import glyphData from "../glyphs.json";

const glyphs:Record<string,{d:string;advance:number}>=glyphData;

export const OpeningRoom = ({durationInFrames}:SceneProps) => {
  const f=useCurrentFrame();
  const p=Math.min(1,f/durationInFrames);
  return <WarmStage theme="paper">
    <g transform={`translate(${-p*12} ${-p*8}) scale(${1+p*.015})`}><Room/></g>
    <g transform="translate(960 110)">
      {Array.from("勾指起誓").map((char,i)=><g key={char} transform={`translate(${i*112-224} 0) scale(.105)`}><path d={glyphs[char].d} fill="#8c4f5a"/></g>)}
      <path d="M-195 130Q0 115 195 130" fill="none" stroke="#ddaa58" strokeWidth="3"/>
    </g>
    <WarmStar x={1070} y={480} r={10} rotate={f/4}/>
  </WarmStage>;
};

export const OpeningLetter = ({durationInFrames}:SceneProps) => {
  const f=useCurrentFrame();
  const p=Math.min(1,f/durationInFrames);
  return <WarmStage theme="sunset">
    <WarmMoon x={1530} y={230} r={130}/>
    <path d="M-20 880Q300 620 660 820T1340 800T1950 740V1080H-20Z" fill="#f2d8cd"/>
    <path d="M-20 1010Q350 770 670 980T1400 920T1950 950V1080H-20Z" fill="#edc9d5" opacity=".7"/>
    <g transform={`translate(${950+p*100} ${560-p*70}) rotate(${-8+p*12}) scale(${1+p*.2})`}>
      <WarmGlow x={0} y={0} r={420}/><WarmLetter s={1.25} open={p}/>
    </g>
    {[0,1,2,3,4,5,6].map(i=><g key={i} transform={`translate(${320+i*210} ${540+Math.sin(i+p*4)*150-p*230}) rotate(${i*20+p*40})`}><WarmStar r={9+i%3*5} color="#fff0c0"/></g>)}
    <path d={`M-50 920Q500 ${500-p*100} 1000 650T2000 300`} fill="none" stroke="#ffe4a2" strokeWidth="14" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  </WarmStage>;
};

export const openingScenes={"bridge-opening-room":OpeningRoom,"bridge-opening-letter":OpeningLetter};
