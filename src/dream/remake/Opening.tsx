import { useCurrentFrame } from "remotion";
import { WarmStage, WarmMoon, WarmLetter, WarmGift, WarmStar, WarmGlow } from "../WarmArt";
import type { SceneProps } from "./types";
import glyphData from "../glyphs.json";

const glyphs: Record<string, { d: string; advance: number }> = glyphData;

export const OpeningRoom = ({durationInFrames}: SceneProps) => {
  const f = useCurrentFrame();
  const p = Math.min(1, f / durationInFrames);
  return <WarmStage theme="paper">
    <rect x="0" y="765" width="1920" height="315" fill="#cd8268" />
    <path d="M0 778H1920M240 780L80 1080M600 780L540 1080M1050 780L1100 1080M1510 780L1690 1080" fill="none" stroke="#e8a480" strokeWidth="7" />
    <path d="M80 0V770M570 0V770M980 0V770M1750 0V770" stroke="#eec495" strokeWidth="3" opacity="0.5" />
    <g transform={`translate(0 ${-p * 10})`}>
      <path d="M1135 690V255A220 220 0 0 1 1575 255V690Z" fill="#8c4f5a" stroke="#c58469" strokeWidth="26" />
      <WarmMoon x={1390} y={330} r={105} phase={0.42} />
      <path d="M1355 50V690M1135 400H1575" stroke="#f6c28b" strokeWidth="14" />
      <path d="M1075 0H1195L1130 600L1070 720Z" fill="#c94e5b" />
      <path d="M1510 0H1660L1670 720L1604 600Z" fill="#c94e5b" />
      <path d="M1097 30L1140 350M1630 30L1600 350" stroke="#ef8b78" strokeWidth="15" opacity="0.7" />
    </g>
    <g transform="translate(100 320)">
      <path d="M35 0H610V74H35ZM75 75H570V442H75Z" fill="#d89473" />
      <path d="M150 440V225Q150 105 320 105Q490 105 490 225V440Z" fill="#6f3f48" />
      <WarmGlow x={320} y={340} r={245} opacity={0.8} />
      <path d={`M210 420Q180 330 265 ${290 - Math.sin(f/6)*18}Q260 360 310 335Q310 250 360 210Q350 320 410 330Q460 380 425 420Z`} fill="#ef9b57" />
      <path d="M260 420Q255 360 300 335Q320 380 355 325Q390 380 370 420Z" fill="#ffe5a1" />
      <path d="M180 430L440 385M185 390L440 440" stroke="#8c4f5a" strokeWidth="24" strokeLinecap="round" />
      <path d="M0 450H650" stroke="#a9645c" strokeWidth="30" />
      <WarmGift x={540} y={445} s={0.52} />
      <path d="M340 100V145Q340 190 300 190H250V145H280V100" fill="#c94e5b" stroke="#fff1dc" strokeWidth="10" />
    </g>
    <g transform={`translate(${1310 - p * 35} 860) rotate(-3)`}>
      <ellipse rx="430" ry="118" fill="#8c4f5a" opacity="0.16" />
      <path d="M-340-30H340L390 60H-390Z" fill="#ddaA58" />
      <path d="M-290 60L-315 220M290 60L315 220" stroke="#8c4f5a" strokeWidth="28" />
      <WarmLetter x={20} y={-100} s={0.72} rotation={-8 + p * 4} open={p * 0.5} />
      <path d="M-250-120H-180V-30H-250Z" fill="#c94e5b" />
      <path d="M-180-105Q-125-105-155-45H-180" fill="none" stroke="#c94e5b" strokeWidth="14" />
    </g>
    <g transform="translate(760 190)">
      {Array.from("勾指起誓").map((char,i)=><g key={char} transform={`translate(${i*102-204} 0) scale(.1)`}><path d={glyphs[char].d} fill="#8c4f5a"/></g>)}
      <path d="M-180 120Q0 105 180 120" fill="none" stroke="#ddaA58" strokeWidth="3" />
    </g>
    <WarmStar x={960} y={460} r={12} rotate={f / 4} />
  </WarmStage>;
};

export const OpeningLetter = ({durationInFrames}: SceneProps) => {
  const f=useCurrentFrame();
  const p=Math.min(1,f/durationInFrames);
  return <WarmStage theme="sunset">
    <WarmMoon x={1530} y={230} r={130} />
    <path d="M-20 880Q300 620 660 820T1340 800T1950 740V1080H-20Z" fill="#d78a6b" />
    <path d="M-20 1010Q350 770 670 980T1400 920T1950 950V1080H-20Z" fill="#c94e5b" opacity=".7" />
    <g transform={`translate(${950+p*100} ${560-p*70}) rotate(${-8+p*12}) scale(${1+p*.2})`}>
      <WarmGlow x={0} y={0} r={420} />
      <WarmLetter s={1.25} open={p} />
    </g>
    {[0,1,2,3,4,5,6].map(i=><g key={i} transform={`translate(${320+i*210} ${540+Math.sin(i+p*4)*150-p*230}) rotate(${i*20+p*40})`}><WarmStar r={9+i%3*5} color="#fff0c0" /></g>)}
    <path d={`M-50 920Q500 ${500-p*100} 1000 650T2000 300`} fill="none" stroke="#ffe4a2" strokeWidth="14" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  </WarmStage>;
};

export const openingScenes = {
  "bridge-opening-room": OpeningRoom,
  "bridge-opening-letter": OpeningLetter,
};
