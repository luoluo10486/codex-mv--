import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { WarmStage, WarmStar } from "../WarmArt";

export const BStage = ({ children, night = false }: { children: ReactNode; night?: boolean }) => (
  <WarmStage theme={night ? "night" : "paper"}>
    <defs>
      <linearGradient id="b-water" x2="0" y2="1"><stop stopColor="#f8d8a5"/><stop offset=".55" stopColor="#dc8b78"/><stop offset="1" stopColor="#9b5960"/></linearGradient>
      <linearGradient id="b-skin" x2=".8" y2="1"><stop stopColor="#ffe3bc"/><stop offset=".65" stopColor="#efb18d"/><stop offset="1" stopColor="#ce806b"/></linearGradient>
      <linearGradient id="b-cloth" x2=".9" y2="1"><stop stopColor="#ffbb9b"/><stop offset=".55" stopColor="#df776f"/><stop offset="1" stopColor="#a34757"/></linearGradient>
      <linearGradient id="b-glass" x2=".7" y2="1"><stop stopColor="#fff9df" stopOpacity=".8"/><stop offset=".45" stopColor="#f6ccaa" stopOpacity=".18"/><stop offset="1" stopColor="#b77076" stopOpacity=".6"/></linearGradient>
      <radialGradient id="b-sun"><stop stopColor="#fff8d9"/><stop offset=".52" stopColor="#ffe4a3"/><stop offset="1" stopColor="#e7a168"/></radialGradient>
      <filter id="b-light"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    {children}
  </WarmStage>
);

export const BStars = ({ count = 55, y = 290, height = 650 }: { count?: number; y?: number; height?: number }) => {
  const f = useCurrentFrame();
  return <g>{Array.from({ length: count }, (_, i) => <g key={i} opacity={.3 + .55 * (1 + Math.sin(f / 18 + i * 3)) / 2}><WarmStar x={(i * 379 + 73) % 1920} y={y + (i * 113) % height} r={i % 8 === 0 ? 8 : 2 + i % 3} color="#fff0ba" rotate={i * 11}/></g>)}</g>;
};

export const BMountains = ({ y = 690, shift = 0 }: { y?: number; shift?: number }) => <g>
  {[0, 1, 2].map(layer => <g key={layer} transform={`translate(${shift * (layer + 1)} ${y + layer * 70})`}>
    <path d="M-400 180L-90-150L105 55L365-260L660 40L900-200L1190 25L1430-280L1800 40L2100-170L2360 300H-400Z" fill={["#e8b093", "#cf8a7d", "#a56164"][layer]}/>
    <path d="M365-260L410-157L465-167L530-50L660 40L477-18ZM1430-280L1490-147L1540-172L1610-60L1800 40L1585-15Z" fill="#ffe5b9" opacity={.7 - layer * .1}/>
  </g>)}
</g>;

export const BPerson = ({ x, y, s = 1, red = false, turn = 0, back = false }: { x: number; y: number; s?: number; red?: boolean; turn?: number; back?: boolean }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="110" rx="48" ry="9" fill="#6f3f48" opacity=".17"/>
  <path d="M-20 48L-27 105H-7L2 48M11 48L17 105H36L29 45" fill="#71464a"/>
  <path d="M-27 103H-3V113H-35Q-39 107-27 103ZM17 103H37L47 113H15Z" fill="#4d3030"/>
  <path d="M-36-29Q0-49 35-29L42 51Q0 69-41 51Z" fill={red ? "url(#b-cloth)" : "#dba57d"}/>
  <path d="M-27-28L-49 30M30-28L47 29" stroke="url(#b-skin)" strokeWidth="15" strokeLinecap="round"/>
  <path d="M-31-31Q-2-14 31-32L30-17Q0 0-31-17Z" fill={red ? "#ffe3b7" : "#a65f61"}/>
  <g transform={`translate(${turn * 9} -65)`}>
    <path d="M-33 5Q-42-42-7-46Q32-51 36-4L32 29H-29Z" fill="#613f43"/>
    <ellipse cy="-1" rx="27" ry="33" fill="url(#b-skin)"/>
    <path d="M-31-7Q-36-42-4-44Q29-45 34-8L15-22L-6-14L-17-25Z" fill="#613f43"/>
    {back ? <path d="M-33-7Q-28 35 0 32Q29 32 34-8L28-25H-27Z" fill="#613f43"/> : <><circle cx={7 + turn * 7} cy="2" r="2.5" fill="#613f43"/><path d="M8 17Q14 20 19 15" stroke="#c67c6b" strokeWidth="2" fill="none"/></>}
  </g>
</g>;

export const BHome = ({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) => <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
  <path d="M-110-55H110V90H-110Z" fill="#ffe2ad"/>
  <path d="M-143-53L-4-158L143-53Z" fill="#bf6262"/>
  <path d="M-126-53L-4-139L123-53" fill="none" stroke="#f4b47d" strokeWidth="8"/>
  <path d="M66-106V-164H91V-87" fill="#bc6c61"/>
  <path d="M-24 90V5Q0-21 24 5V90" fill="#a15e58"/>
  <path d="M-84-21H-43V26H-84ZM45-21H86V26H45Z" fill="#f2b66e" stroke="#fff7d0" strokeWidth="8"/>
  <path d="M-64-21V26M65-21V26" stroke="#fff7d0" strokeWidth="4"/>
  <circle cx="11" cy="43" r="4" fill="#ffdc8c"/>
  <path d="M81-172Q48-210 89-230T95-284" fill="none" stroke="#fff2cc" strokeWidth="14" opacity=".4"/>
</g>;

export const BFlower = ({ x, y, s = 1, rotation = 0, pale = false }: { x: number; y: number; s?: number; rotation?: number; pale?: boolean }) => <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}>
  <path d="M0 15Q-9 70 7 143" stroke="#a76f68" strokeWidth="8" fill="none"/>
  <path d="M0 85Q-67 33-67 71Q-53 109 0 102ZM4 115Q67 63 60 107Q40 135 4 127Z" fill="#bc8973"/>
  {Array.from({ length: 7 }, (_, i) => <g key={i} transform={`rotate(${i * 360 / 7})`}><ellipse cy="-34" rx="24" ry="43" fill={pale ? "#ffe2b7" : "#ec9b89"}/><path d="M0-13Q-13-36 0-65" stroke={pale ? "#edc097" : "#d57c76"} strokeWidth="3" fill="none" opacity=".5"/></g>)}
  <circle r="22" fill="#e9b968"/><circle cx="-5" cy="-5" r="11" fill="#ffe4a1"/>
</g>;

export const BHands = ({ x = 960, y = 650, s = 1, gap = 0, ring = false }: { x?: number; y?: number; s?: number; gap?: number; ring?: boolean }) => <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
  <g transform={`translate(${-gap} 0) rotate(-8)`}>
    <path d="M-630 76L-344-84L-224 52L-498 241Z" fill="url(#b-cloth)"/>
    <path d="M-346-84L-286-120L-164 24L-224 65Z" fill="#ffe5c0"/>
    <path d="M-286-120L-196-165Q-162-181-139-154L-62-86L58-56Q84-49 73-27Q67-10 40-12L-47-28L44 10Q69 20 55 40Q44 56 22 46L-62 17L18 59Q40 70 25 88Q13 99-5 91L-86 53L-28 94Q-9 110-25 126Q-40 136-57 121L-164 70Q-195 61-223 23Z" fill="url(#b-skin)"/>
    <path d="M-191-136Q-169-103-128-83L-75-54" stroke="#fce0b5" strokeWidth="8" fill="none" strokeLinecap="round"/>
  </g>
  <g transform={`translate(${gap} 0) rotate(7)`}>
    <path d="M631-104L336-169L266 28L606 124Z" fill="#c69a7b"/>
    <path d="M337-169L274-186L210 13L276 34Z" fill="#fff0cd"/>
    <path d="M273-181L159-204Q127-209 107-181L42-118L-52-88Q-77-78-63-57Q-55-43-28-50L45-67L-47-16Q-67-3-51 15Q-38 28-17 17L73-27L-14 31Q-31 46-14 62Q0 72 19 59L102 7L39 58Q20 73 37 90Q50 103 69 88L168 30Q194 18 215-24Z" fill="url(#b-skin)"/>
    <path d="M155-177Q117-136 91-117" stroke="#ffe5c1" strokeWidth="8" fill="none" strokeLinecap="round"/>
    {ring ? <path d="M21-46Q38-26 33-9" fill="none" stroke="url(#warm-gold)" strokeWidth="14"/> : null}
  </g>
</g>;
