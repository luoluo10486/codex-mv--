import { HeldHands } from "../HeldHands";
import { SharedSeasons } from "../SharedSeasons";
import { SharedTenderness } from "../SharedTenderness";
import type { ComponentType } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { WarmGift, WarmGlow, WarmLetter, WarmMoon, WarmSantaRig, WarmStage, WarmStar, WarmWorld } from "../WarmArt";
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
    <path d="M0 1080V1015Q280 965 420 1080ZM1920 1080V1015Q1670 965 1540 1080Z" fill="#d8bfc8" opacity="0.22" />
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

const LastSnow = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const shelter = ease(p);
  return <WarmStage theme="night"><Hillscape shift={Math.sin(f / 30) * 22} snow /><WarmMoon x={1570} y={190} r={102} />
    {Array.from({ length: 34 }, (_, i) => <circle key={i} cx={(i * 271 + f * (2 + i % 3)) % 2040 - 50} cy={(i * 83 + f * 5) % 760 + 90} r={3 + i % 4} fill="#fffaf4" opacity={0.44} />)}
    <path d="M420 740Q820 636 1190 747" fill="none" stroke="#f3dce2" strokeWidth="30" opacity="0.55" />
    <g transform={`translate(${shelter * 25} 0)`}>
      <path d="M1054 456V747Q1054 773 1038 773Q1023 773 1023 757" stroke="#bd9c91" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M790 481Q866 350 1054 350Q1240 350 1318 481Q1252 452 1186 481Q1120 452 1054 481Q988 452 922 481Q856 452 790 481Z" fill="#f4d8df" stroke="#d5b0be" strokeWidth="4" />
      <path d="M1054 350Q970 387 922 481M1054 350V481M1054 350Q1138 387 1186 481" stroke="#dfbdc8" strokeWidth="3" fill="none" />
      <path d="M1054 341V351" stroke="#bd9c91" strokeWidth="7" strokeLinecap="round" />
    </g>
    <Couple x={900 + shelter * 25} y={720} s={0.96} gap={90} walk={Math.sin(f / 6) * 0.35} />
  </WarmStage>;
};

const SoftEmbrace = ({ durationInFrames }: SceneProps) => <SharedTenderness durationInFrames={durationInFrames} reprise={2} />;

const HaloContract = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const halo = ease((p - 0.15) / 0.85);
  return <WarmStage theme="sunset"><WarmGlow x={960} y={530} r={500} opacity={0.5 + halo * 0.25} />
    <path d="M530 730H1390L1290 850H630Z" fill="#fffaf4" opacity={0.65} />
    <g transform={`translate(960 ${500 + halo * 115}) rotate(${halo * 14}) scale(${0.9 + halo * 0.25} ${1 - halo * 0.98})`}>
      <path d="M-250-145H250V175H-250Z" fill="#fffaf4" stroke="#ead7a0" strokeWidth="12" />
      <path d="M-210-92H210M-210-40H150M-210 10H185" stroke="#d6b1b8" strokeWidth="14" opacity="0.7" />
      <WarmStar x={0} y={76} r={22} color="#ead7a0" />
    </g>
    <ellipse cx="960" cy="650" rx={260 + halo * 250} ry={95 + halo * 65} fill="none" stroke="#fff4ce" strokeWidth={18 + halo * 18} opacity={halo} transform={`rotate(${Math.sin(f / 18) * 8} 960 650)`} />
    <Couple x={960} y={775} s={0.98} gap={interpolate(halo, [0, 1], [150, 80])} embrace={0.25 + halo * 0.5} />
  </WarmStage>;
};

const FourSeasons = ({ durationInFrames }: SceneProps) => <SharedSeasons durationInFrames={durationInFrames} reprise={2} />;

const HandsPullback = ({ durationInFrames }: SceneProps) => {
  const { p } = useTime(durationInFrames);
  const wide = ease(p);
  const scale = interpolate(wide, [0, 1], [1.8, 0.72]);
  const revealPeople = interpolate(wide, [.67, .87], [0, 1], {extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <WarmStage theme="dawn"><WarmGlow x={960} y={580} r={440} opacity={0.55} />
    <defs><clipPath id="c-hands-safe"><rect x="0" y="270" width="1920" height="810" /></clipPath></defs>
    <path d="M0 900Q430 720 960 910T1920 840V1080H0Z" fill="#fce2d8" />
    <g clipPath="url(#c-hands-safe)">
      <g opacity={revealPeople}><Couple x={960} y={735} s={1.16} gap={95} embrace={0.1} /></g>
      <g opacity={1-revealPeople}><HeldHands x={960} y={650 + wide * 75} s={scale} ring /></g>
    </g>
    <SprigC x={160} y={1080} />
  </WarmStage>;
};

const SprigC = ({x,y}:{x:number;y:number}) => <g transform={`translate(${x} ${y})`}><path d="M0 0Q-40-120 15-220Q25-110 50-80Q45-190 105-210Q85-70 120 0Z" fill="#c9d8bd" /><path d="M0 0Q-100-60-160-180Q-65-164-40-70Z" fill="#dde5d4" /></g>;

const SunriseWalk = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const walk = ease(p);
  return <WarmStage theme="dawn"><path d="M0 0H1920V540Q1450 455 980 560T0 520Z" fill="#f8dfe8" />
    <WarmGlow x={1450} y={400} r={400} opacity={0.78} /><circle cx="1450" cy="400" r="132" fill="#fff4ce" />
    <Hillscape shift={walk * 140} /><path d="M450 1080Q800 880 1260 610H1290Q1140 800 1470 1080Z" fill="#fffaf4" opacity="0.74" />
    <path d="M0 920Q520 805 990 895T1920 850" fill="none" stroke="#d4b5c0" strokeWidth="16" opacity="0.6" />
    <Couple x={interpolate(walk, [0, 1], [680, 1010])} y={790 - walk * 44} s={0.9 - walk * 0.12} gap={76} walk={Math.sin(f / 5) * 0.9} />
    <WarmStar x={1130 + walk * 190} y={260 - walk * 40} r={10} color="#fffaf4" />
    <House x={330 + walk * 50} y={755} s={0.8} />
  </WarmStage>;
};

const SantaRoute = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const route = ease(p);
  return <WarmStage theme="night">
    <defs><linearGradient id="santa-route-night" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#50455f" /><stop offset="0.58" stopColor="#8a7085" /><stop offset="1" stopColor="#d7a6a0" /></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#santa-route-night)" />
    {Array.from({length: 30}, (_,i) => <WarmStar key={i} x={60 + i * 61} y={75 + (i * 71) % 310} r={2 + i % 3} color="#fff3d0" />)}
    <WarmMoon x={1550} y={210} r={110} /><WarmGlow x={1500} y={600} r={500} opacity={0.28} />
    <path d="M-60 790C300 280 620 890 920 470S1460 240 2030 650" fill="none" stroke="#fff4ce" strokeWidth="18" strokeDasharray="24 20" strokeDashoffset={-route * 620} />
    {[[-360,760],[210,470],[760,690],[1240,360],[1830,600]].map(([x,y],i) => <g key={i} transform={`translate(${x} ${y})`}><WarmWorld s={0.35 + (i % 2) * 0.06} t={f / 30 + i} /><WarmStar x={0} y={-225} r={8} color="#fff4ce" /></g>)}
    <WarmSantaRig x={interpolate(route, [0,1], [240, 1400])} y={interpolate(route, [0,.5,1], [435, 400, 490])} s={0.72} t={f / 6} />
  </WarmStage>;
};

const GiftWorlds = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const route = ease(p);
  const mountain = ease((p - 0.38) / 0.62);
  return <WarmStage theme="sunset"><WarmGlow x={960} y={490} r={500} opacity={0.55} />
    <g transform={`translate(0 ${390 - mountain * 390})`}><Hillscape shift={-80} /><path d="M1920 1020Q1520 880 1460 730T1240 500" fill="none" stroke="#fffaf4" strokeWidth="38" /></g>
    {Array.from({length: 5}, (_, i) => <g key={i} transform={`translate(${230 + i * 370} ${390 + (i % 2) * 160 - mountain * 160}) scale(${(0.54 + i * 0.035) * (1 - mountain * 0.8)})`}><WarmWorld t={f / 30 + i} /><House x={0} y={270} s={0.8} /></g>)}
    <path d="M110 745C390 470 660 840 950 535S1420 360 1840 590" fill="none" stroke="#fff4ce" strokeWidth="12" strokeDasharray="20 26" strokeDashoffset={-route * 700} />
    <g transform={`translate(${interpolate(route, [0,1], [230, 1260])} ${interpolate(route, [0,1], [390, 540])})`}><WarmGift s={0.58 * (1 - mountain * 0.45)} open={route} /><WarmGlow x={0} y={0} r={170} opacity={0.5} /></g>
    <path d={`M1260 570Q1480 620 1460 730T1920 1020`} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - mountain} fill="none" stroke="#fffaf4" strokeWidth="19" />
    <WarmStar x={960} y={250 + Math.sin(f / 12) * 24} r={16} color="#fff4ce" />
  </WarmStage>;
};

const MapFold = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const fold = ease(p / 0.72);
  const close = ease((p - 0.5) / 0.5);
  const spread = 1 - fold * 0.92;
  return <WarmStage><WarmGlow x={960} y={530} r={470} opacity={0.4} />
    <path d="M0 1050Q300 780 600 1020T1230 980T1920 1000V1080H0Z" fill="#e1e7d8" />
    <g transform={`translate(960 ${555 - close * 60}) rotate(${Math.sin(f / 22) * 2 + close * 4}) scale(${1 - close * 0.35} ${1 - close * 0.65})`}>
      <g transform={`scale(${spread} 1)`}>
      {[0,1,2].map(i => <path key={i} d={`M${-650 + i * 430} -270Q${-470 + i * 420} ${-400 + fold * 240} ${-220 + i * 430} -270V270Q${-450 + i * 410} ${390 - fold * 260} ${-650 + i * 430} 270Z`} fill={["#fce2d8","#fff4ce","#f8dfe8"][i]} stroke="#d6b1b8" strokeWidth="8" />)}
      <path d="M-575 50Q-250-220 40 45T590-45" fill="none" stroke="#dca7b8" strokeWidth="14" strokeDasharray="22 18" />
      <path d="M-460 180L-250-80L-20 180L200-140L480 180" fill="none" stroke="#e6b8c6" strokeWidth="38" />
      <WarmStar x={320} y={-70} r={18} color="#fff4ce" />
      </g>
      <path d={`M-${215 + (1 - fold) * 430} -270L-215 -270V270L-${215 + (1 - fold) * 430} 270Z`} fill="#fce2d8" opacity={fold * 0.65} />
      <path d={`M${215 + (1 - fold) * 430} -270L215 -270V270L${215 + (1 - fold) * 430} 270Z`} fill="#f8dfe8" opacity={fold * 0.65} />
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
    <path d="M120 760C380 230 680 900 940 530S1450 320 1850 690" fill="none" stroke="#fff4ce" strokeWidth="20" strokeDasharray="30 24" strokeDashoffset={-route * 900} />
    <path d="M0 810Q410 610 830 800T1920 740V1080H0Z" fill="#e6b8c6" />
    {[{x:210,y:710,s:0.52},{x:760,y:675,s:0.38},{x:1400,y:590,s:0.45}].map((h,i)=><House key={i} x={h.x} y={h.y} s={h.s}/>) }
    <g transform={`translate(${x} ${y}) rotate(${Math.sin(f / 16) * 8})`}><WarmLetter s={0.56} open={0.25} /><WarmGlow x={0} y={0} r={190} opacity={0.52} /></g>
    <WarmStar x={1820} y={300} r={12} color="#fffaf4" />
  </WarmStage>;
};

const FinalRise = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const rise = ease(p);
  return <WarmStage theme="dawn"><Hillscape shift={140} /><path d="M450 1080Q800 880 1260 610H1290Q1140 800 1470 1080Z" fill="#fffaf4" opacity="0.74" /><WarmGlow x={1450} y={330} r={500} opacity={0.5} /><circle cx="1450" cy="330" r="130" fill="#fff4ce" /><Couple x={1010} y={746} s={0.78} gap={76} walk={Math.sin(f / 5) * 0.5} />
    <g transform={`translate(${960 + Math.sin(f / 12) * 12} ${830 - rise * 500}) rotate(${rise * 12}) scale(${0.5 + rise * 0.28})`}><WarmLetter open={0.4} /><WarmGlow x={0} y={0} r={240} opacity={0.65} /></g>
  </WarmStage>;
};

const FinalStar = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const star = ease(p);
  return <WarmStage theme="night"><WarmGlow x={960} y={470} r={600} opacity={0.38 + star * 0.38} />
    <path d="M0 830Q480 680 950 810T1920 730V1080H0Z" fill="#e9c5d2" />
    <WarmMoon x={1500} y={220} r={90} /><WarmStar x={960} y={450} r={interpolate(star, [0,1], [18, 86])} color="#fff4ce" rotate={f * 0.4} />
    <g transform={`translate(960 ${480 - star * 30}) rotate(${star * 20}) scale(${1 - star * 0.45} ${1 - star * 0.98})`}><WarmLetter s={0.56} open={0.5 * (1 - star)} /></g>
    {Array.from({length: 18}, (_, i) => <WarmStar key={i} x={220 + ((i * 257) % 1500)} y={170 + ((i * 131) % 570)} r={3 + i % 3} color="#fff4ce" rotate={i * 17} />)}
  </WarmStage>;
};

export const actCScenes: Record<string, ComponentType<SceneProps>> = {
  "lyric-33": ReturnRoom,
  "lyric-34": FireplaceWarmth,
  "lyric-35": LastSnow,
  "lyric-36": SoftEmbrace,
  "lyric-37": HaloContract,
  "lyric-38": FourSeasons,
  "lyric-39": HandsPullback,
  "lyric-40": SunriseWalk,
  "bridge-santa-route": SantaRoute,
  "bridge-santa-worlds": GiftWorlds,
  "bridge-map-fold": MapFold,
  "bridge-map-return": MapReturn,
  "bridge-final-rise": FinalRise,
  "bridge-final-star": FinalStar,
};
