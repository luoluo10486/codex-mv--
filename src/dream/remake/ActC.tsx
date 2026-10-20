import type { ComponentType } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { WarmGift, WarmGlow, WarmLetter, WarmMoon, WarmSanta, WarmSleigh, WarmStage, WarmStar, WarmWorld } from "../WarmArt";
import type { SceneProps } from "./types";
import { Couple, House, Hillscape, Room } from "./ActCArt";

const ease = (p: number) => { const c = Math.max(0, Math.min(1, p)); return c * c * (3 - 2 * c); };
const useTime = (duration: number) => { const f = useCurrentFrame(); return { f, p: f / Math.max(1, duration - 1) }; };
const cubic = (p: number, a: number, b: number, c: number, d: number) => (1-p)**3*a + 3*(1-p)**2*p*b + 3*(1-p)*p*p*c + p**3*d;

const ReturnRoom = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const close = ease(p / 0.78);
  return <WarmStage>
    <Room />
    <WarmGlow x={940} y={670} r={350} opacity={0.35} />
    <Couple x={980} y={727} s={1.06} gap={interpolate(close, [0, 1], [220, 75])} walk={Math.sin(f / 4) * (1 - close)} />
    <path d="M0 1080V1015Q280 965 420 1080ZM1920 1080V1015Q1670 965 1540 1080Z" fill="#98505a" opacity="0.22" />
  </WarmStage>;
};

const FireplaceWarmth = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const open = ease(p);
  return <WarmStage><Room fire={1 + Math.sin(f / 8) * 0.08} /><WarmGlow x={470} y={650} r={410} opacity={0.42} />
    <Couple x={930} y={740} s={1.02} gap={interpolate(open, [0, 1], [170, 82])} embrace={open * 0.35} />
    <WarmGift x={1160} y={830} s={0.65} open={open} />
  </WarmStage>;
};

const SantaRoute = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const route = ease(p);
  return <WarmStage theme="night"><WarmMoon x={1550} y={210} r={110} /><WarmGlow x={1500} y={600} r={500} opacity={0.28} />
    <path d="M-60 790C300 280 620 890 920 470S1460 240 2030 650" fill="none" stroke="#ffe6a0" strokeWidth="18" strokeDasharray="24 20" strokeDashoffset={-route * 620} />
    {[[-360,760],[210,470],[760,690],[1240,360],[1830,600]].map(([x,y],i) => <g key={i} transform={`translate(${x} ${y})`}><WarmWorld s={0.35 + (i % 2) * 0.06} t={f / 30 + i} /><WarmStar x={0} y={-225} r={8} color="#ffe8a8" /></g>)}
    <g transform={`translate(${interpolate(route, [0,1], [190, 1470])} ${interpolate(route, [0,1], [430, 490])})`}><WarmSleigh s={0.7} t={f / 12} /><WarmSanta x={-20} y={-80} s={0.65} /><WarmGift x={85} y={-50} s={0.34} /><WarmGlow x={0} y={0} r={220} opacity={0.4} /></g>
  </WarmStage>;
};

const GiftWorlds = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const route = ease(p);
  const mountain = ease((p - 0.38) / 0.62);
  return <WarmStage theme="sunset"><WarmGlow x={960} y={490} r={500} opacity={0.55} />
    <g transform={`translate(0 ${390 - mountain * 390})`}><Hillscape shift={-80} /><path d="M1920 1020Q1520 880 1460 730T1240 500" fill="none" stroke="#ffe4a2" strokeWidth="38" /></g>
    {Array.from({length: 5}, (_, i) => <g key={i} transform={`translate(${230 + i * 370} ${390 + (i % 2) * 160 - mountain * 160}) scale(${(0.54 + i * 0.035) * (1 - mountain * 0.8)})`}><WarmWorld t={f / 30 + i} /><House x={0} y={270} s={0.8} /></g>)}
    <path d="M110 745C390 470 660 840 950 535S1420 360 1840 590" fill="none" stroke="#fff0b5" strokeWidth="12" strokeDasharray="20 26" strokeDashoffset={-route * 700} />
    <g transform={`translate(${interpolate(route, [0,1], [230, 1260])} ${interpolate(route, [0,1], [390, 540])})`}><WarmGift s={0.58 * (1 - mountain * 0.45)} open={route} /><WarmGlow x={0} y={0} r={170} opacity={0.5} /></g>
    <path d={`M1260 570Q1480 620 1460 730T1920 1020`} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - mountain} fill="none" stroke="#fff1b3" strokeWidth="19" />
    <WarmStar x={960} y={250 + Math.sin(f / 12) * 24} r={16} color="#fff0b5" />
  </WarmStage>;
};

const MapFold = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const fold = ease(p / 0.72);
  const close = ease((p - 0.5) / 0.5);
  const spread = 1 - fold * 0.92;
  return <WarmStage><WarmGlow x={960} y={530} r={470} opacity={0.4} />
    <path d="M0 1050Q300 780 600 1020T1230 980T1920 1000V1080H0Z" fill="#e5b28a" />
    <g transform={`translate(960 ${555 - close * 60}) rotate(${Math.sin(f / 22) * 2 + close * 4}) scale(${1 - close * 0.35} ${1 - close * 0.65})`}>
      <g transform={`scale(${spread} 1)`}>
      {[0,1,2].map(i => <path key={i} d={`M${-650 + i * 430} -270Q${-470 + i * 420} ${-400 + fold * 240} ${-220 + i * 430} -270V270Q${-450 + i * 410} ${390 - fold * 260} ${-650 + i * 430} 270Z`} fill={["#efb47d","#f4c78e","#eab184"][i]} stroke="#c47764" strokeWidth="8" />)}
      <path d="M-575 50Q-250-220 40 45T590-45" fill="none" stroke="#c94e5b" strokeWidth="14" strokeDasharray="22 18" />
      <path d="M-460 180L-250-80L-20 180L200-140L480 180" fill="none" stroke="#bc7776" strokeWidth="38" />
      <WarmStar x={320} y={-70} r={18} color="#ffe4a1" />
      </g>
      <path d={`M-${215 + (1 - fold) * 430} -270L-215 -270V270L-${215 + (1 - fold) * 430} 270Z`} fill="#f5ca92" opacity={fold * 0.65} />
      <path d={`M${215 + (1 - fold) * 430} -270L215 -270V270L${215 + (1 - fold) * 430} 270Z`} fill="#efba82" opacity={fold * 0.65} />
    </g>
    <g transform={`translate(960 ${555 + (1 - close) * 180}) rotate(${close * 4}) scale(${0.15 + close * 0.95})`}><WarmLetter open={1 - close} /></g>
  </WarmStage>;
};

const MapReturn = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const route = ease(p);
  const part = route < 0.5 ? route * 2 : (route - 0.5) * 2;
  const x = route < 0.5 ? cubic(part, 120,380,680,940) : cubic(part,940,1200,1450,1850);
  const y = route < 0.5 ? cubic(part,760,230,900,530) : cubic(part,530,160,320,690);
  return <WarmStage theme="night"><WarmMoon x={1550} y={195} r={100} /><WarmGlow x={420} y={430} r={330} opacity={0.45} />
    <path d="M120 760C380 230 680 900 940 530S1450 320 1850 690" fill="none" stroke="#ffe5a2" strokeWidth="20" strokeDasharray="30 24" strokeDashoffset={-route * 900} />
    <path d="M0 810Q410 610 830 800T1920 740V1080H0Z" fill="#ab6063" />
    {[{x:210,y:710,s:0.52},{x:760,y:675,s:0.38},{x:1400,y:590,s:0.45}].map((h,i)=><House key={i} x={h.x} y={h.y} s={h.s}/>) }
    <g transform={`translate(${x} ${y}) rotate(${Math.sin(f / 16) * 8})`}><WarmLetter s={0.56} open={0.25} /><WarmGlow x={0} y={0} r={190} opacity={0.52} /></g>
    <WarmStar x={1820} y={300} r={12} color="#fff0b8" />
  </WarmStage>;
};

export const actCScenes: Record<string, ComponentType<SceneProps>> = {
  "bridge-santa-route": SantaRoute,
  "bridge-santa-worlds": GiftWorlds,
  "bridge-map-fold": MapFold,
  "bridge-map-return": MapReturn,
  "lyric-33": ReturnRoom,
  "lyric-34": FireplaceWarmth,
};
