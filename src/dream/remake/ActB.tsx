import type { ComponentType } from "react";
import { useCurrentFrame } from "remotion";
import { WarmCloud, WarmCouple, WarmGlow, WarmStar, WarmWorld, WarmClock } from "../WarmArt";
import { mix } from "../palette";
import { BStage, BStars, BMountains, BPerson, BHome, BFlower, BHands } from "./ActBArt";
import type { SceneProps } from "./types";

const useBeat = (duration: number) => {
  const f = useCurrentFrame();
  return { f, p: mix(f, 0, duration * .72), t: f / 30 };
};

const Journey = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={1370} y={500} r={620}/><circle cx="1370" cy="490" r="139" fill="url(#b-sun)"/>
    <BMountains y={650} shift={-p * 20}/><path d="M0 766Q450 688 960 774T1920 750V1080H0Z" fill="url(#b-water)"/>
    {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${(i * 293) % 1920 - 150} ${789 + i * 16}h${70 + i % 5 * 38}`} stroke="#ffe4b1" opacity=".48" strokeWidth={i % 3 + 2} transform={`translate(${-p * 70} 0)`}/>)}
    <g transform={`translate(${700 + p * 390} ${820 + Math.sin(t * 2) * 8})`}><ellipse cy="65" rx="228" ry="18" fill="#734c54" opacity=".2"/><BPerson x={-65} y={-53} s={.6} red/><BPerson x={15} y={-52} s={.62}/><path d="M-211-18Q0 9 220-18L156 51Q0 91-153 48Z" fill="#914d51"/><path d="M-211-18Q0 9 220-18" stroke="#ffe0a0" strokeWidth="10" fill="none"/><path d="M95-61L180 99" stroke="#d3a05f" strokeWidth="9"/><ellipse cx="183" cy="104" rx="13" ry="38" fill="#d3a05f" transform="rotate(-25 183 104)"/></g>
    <WarmCloud x={270-p*40} y={480} s={.7}/><WarmCloud x={1750-p*55} y={400} s={.5}/>
    <path d="M0 970Q119 836 324 958L430 1080H0ZM1920 934Q1722 873 1541 1080H1920Z" fill="#92555b"/>
    <BFlower x={108} y={951} s={.48} rotation={-20}/><BFlower x={1806} y={968} s={.55} rotation={12}/>
  </BStage>;
};

export const actBScenes: Record<string, ComponentType<SceneProps>> = {
  "lyric-17": Journey,
};
