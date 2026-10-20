import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { WarmStage, WarmStar, useSharedDefinitions } from "../WarmArt";
import { StoryPerson, STORY_OUTFIT } from "../StoryCharacters";

export const ActBDefs = () => <defs>
      <linearGradient id="b-water" x2="0" y2="1"><stop stopColor="#e8f5f7"/><stop offset=".55" stopColor="#d6edf2"/><stop offset="1" stopColor="#bcdde8"/></linearGradient>
      <linearGradient id="b-starry" x2="0" y2="1"><stop stopColor="#fffaf4"/><stop offset=".48" stopColor="#f8e8ee"/><stop offset="1" stopColor="#fff4ce"/></linearGradient>
      <linearGradient id="b-skin" x2=".8" y2="1"><stop stopColor="#ffebde"/><stop offset=".65" stopColor="#f1cfbe"/><stop offset="1" stopColor="#e3b7a8"/></linearGradient>
      <linearGradient id="b-cloth" x2=".9" y2="1"><stop stopColor="#f7dfe5"/><stop offset=".55" stopColor="#e9c1cf"/><stop offset="1" stopColor="#d9a7ba"/></linearGradient>
      <linearGradient id="b-glass" x2=".7" y2="1"><stop stopColor="#fffaf4" stopOpacity=".8"/><stop offset=".45" stopColor="#f8dfe8" stopOpacity=".28"/><stop offset="1" stopColor="#d0acbf" stopOpacity=".72"/></linearGradient>
      <linearGradient id="b-gold" x2="1" y2="1"><stop stopColor="#fff4ce"/><stop offset=".55" stopColor="#eee0b4"/><stop offset="1" stopColor="#dfc99c"/></linearGradient>
      <radialGradient id="b-sun"><stop stopColor="#fffaf4"/><stop offset=".52" stopColor="#fff4ce"/><stop offset="1" stopColor="#f1d3b5"/></radialGradient>
      <filter id="b-light"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>;
export const BStage = ({ children, night = false }: { children: ReactNode; night?: boolean }) => {
  const sharedDefinitions=useSharedDefinitions();
  return <WarmStage theme="paper">
    {!sharedDefinitions && <ActBDefs/>}
    {night && <rect width="1920" height="1080" fill="url(#b-starry)"/>}
    {children}
  </WarmStage>
};

export const BStars = ({ count = 55, y = 290, height = 650 }: { count?: number; y?: number; height?: number }) => {
  const f = useCurrentFrame();
  return <g>{Array.from({ length: count }, (_, i) => <g key={i} opacity={.4 + .45 * (1 + Math.sin(f / 18 + i * 3)) / 2}><WarmStar x={(i * 379 + 73) % 1920} y={y + (i * 113) % height} r={i % 8 === 0 ? 8 : 2 + i % 3} color={i % 3 ? "#d8bdca" : "#dfcda7"} rotate={i * 11}/></g>)}</g>;
};

export const BMountains = ({ y = 690, shift = 0 }: { y?: number; shift?: number }) => <g>
  {[0, 1, 2].map(layer => <g key={layer} transform={`translate(${shift * (layer + 1)} ${y + layer * 70})`}>
    <path d="M-400 180L-90-150L105 55L365-260L660 40L900-200L1190 25L1430-280L1800 40L2100-170L2360 300H-400Z" fill={["#f1d3d8", "#e6c7d1", "#d9bac8"][layer]}/>
    <path d="M365-260L410-157L465-167L530-50L660 40L477-18ZM1430-280L1490-147L1540-172L1610-60L1800 40L1585-15Z" fill="#fff5ed" opacity={.7 - layer * .1}/>
  </g>)}
</g>;

export const BPerson = ({ x, y, s = 1, red = false, turn = 0, back = false }: { x: number; y: number; s?: number; red?: boolean; turn?: number; back?: boolean }) => <StoryPerson x={x} y={y} s={s * .61} girl={red} turn={turn} back={back}/>;

export const BHome = ({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) => <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
  <path d="M-110-55H110V90H-110Z" fill="#f5f1e9"/>
  <path d="M-143-53L-4-158L143-53Z" fill="#d7b0c0"/>
  <path d="M-126-53L-4-139L123-53" fill="none" stroke="#f1e9e1" strokeWidth="8"/>
  <path d="M66-106V-164H91V-87" fill="#e8dadd"/>
  <path d="M-24 90V5Q0-21 24 5V90" fill="#bd97a6"/>
  <path d="M-84-21H-43V26H-84ZM45-21H86V26H45Z" fill="#f0e8df" stroke="#f7f6ee" strokeWidth="8"/>
  <path d="M-64-21V26M65-21V26" stroke="#f7f6ee" strokeWidth="4"/>
  <circle cx="11" cy="43" r="4" fill="#f3efe5"/>
  <path d="M81-172Q48-210 89-230T95-284" fill="none" stroke="#f7f5ee" strokeWidth="14" opacity=".4"/>
</g>;

export const BFlower = ({ x, y, s = 1, rotation = 0, pale = false }: { x: number; y: number; s?: number; rotation?: number; pale?: boolean }) => <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}>
  <path d="M0 15Q-9 70 7 143" stroke="#b4c4a6" strokeWidth="8" fill="none"/>
  <path d="M0 85Q-67 33-67 71Q-53 109 0 102ZM4 115Q67 63 60 107Q40 135 4 127Z" fill="#c9d8bd"/>
  {Array.from({ length: 7 }, (_, i) => <g key={i} transform={`rotate(${i * 360 / 7})`}><ellipse cy="-34" rx="24" ry="43" fill={pale ? "#f9e6eb" : "#f1d6e1"}/><path d="M0-13Q-13-36 0-65" stroke="#e5c3d0" strokeWidth="3" fill="none" opacity=".5"/></g>)}
  <circle r="22" fill="#eee0ae"/><circle cx="-5" cy="-5" r="11" fill="#fff4ce"/>
</g>;

export const BHands = ({ x = 960, y = 650, s = 1, gap = 0, ring = false }: { x?: number; y?: number; s?: number; gap?: number; ring?: boolean }) => <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
  <g transform={`translate(${-gap} 0) rotate(-8)`}>
    <path d="M-630 76L-344-84L-224 52L-498 241Z" fill={STORY_OUTFIT.blouse}/>
    <path d="M-346-84L-286-120L-164 24L-224 65Z" fill="#f6f2ec"/>
    <path d="M-286-120L-196-165Q-162-181-139-154L-62-86L58-56Q84-49 73-27Q67-10 40-12L-47-28L44 10Q69 20 55 40Q44 56 22 46L-62 17L18 59Q40 70 25 88Q13 99-5 91L-86 53L-28 94Q-9 110-25 126Q-40 136-57 121L-164 70Q-195 61-223 23Z" fill="url(#b-skin)"/>
    <path d="M-191-136Q-169-103-128-83L-75-54" stroke="#f5f1ea" strokeWidth="8" fill="none" strokeLinecap="round"/>
  </g>
  <g transform={`translate(${gap} 0) rotate(7)`}>
    <path d="M631-104L336-169L266 28L606 124Z" fill={STORY_OUTFIT.cardigan}/>
    <path d="M337-169L274-186L210 13L276 34Z" fill="#f7f4ee"/>
    <path d="M273-181L159-204Q127-209 107-181L42-118L-52-88Q-77-78-63-57Q-55-43-28-50L45-67L-47-16Q-67-3-51 15Q-38 28-17 17L73-27L-14 31Q-31 46-14 62Q0 72 19 59L102 7L39 58Q20 73 37 90Q50 103 69 88L168 30Q194 18 215-24Z" fill="url(#b-skin)"/>
    <path d="M155-177Q117-136 91-117" stroke="#f6f2ec" strokeWidth="8" fill="none" strokeLinecap="round"/>
    {ring ? <path d="M21-46Q38-26 33-9" fill="none" stroke="url(#b-gold)" strokeWidth="14"/> : null}
  </g>
</g>;
