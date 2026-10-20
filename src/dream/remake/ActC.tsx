import type { ComponentType } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { WarmGift, WarmGlow, WarmMoon, WarmSanta, WarmSleigh, WarmStage, WarmStar, WarmWorld } from "../WarmArt";
import type { SceneProps } from "./types";

const ease = (p: number) => { const c = Math.max(0, Math.min(1, p)); return c * c * (3 - 2 * c); };
const useTime = (duration: number) => { const f = useCurrentFrame(); return { f, p: f / Math.max(1, duration - 1) }; };

const SantaRoute = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useTime(durationInFrames);
  const route = ease(p);
  return <WarmStage theme="night"><WarmMoon x={1550} y={210} r={110} /><WarmGlow x={1500} y={600} r={500} opacity={0.28} />
    <path d="M-60 790C300 280 620 890 920 470S1460 240 2030 650" fill="none" stroke="#ffe6a0" strokeWidth="18" strokeDasharray="24 20" strokeDashoffset={-route * 620} />
    {[[-360,760],[210,470],[760,690],[1240,360],[1830,600]].map(([x,y],i) => <g key={i} transform={`translate(${x} ${y})`}><WarmWorld s={0.35 + (i % 2) * 0.06} t={f / 30 + i} /><WarmStar x={0} y={-225} r={8} color="#ffe8a8" /></g>)}
    <g transform={`translate(${interpolate(route, [0,1], [190, 1470])} ${interpolate(route, [0,1], [430, 490])})`}><WarmSleigh s={0.7} t={f / 12} /><WarmSanta x={-20} y={-80} s={0.65} /><WarmGift x={85} y={-50} s={0.34} /><WarmGlow x={0} y={0} r={220} opacity={0.4} /></g>
  </WarmStage>;
};

export const actCScenes: Record<string, ComponentType<SceneProps>> = {
  "bridge-santa-route": SantaRoute,
};
