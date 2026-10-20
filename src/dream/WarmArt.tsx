import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { createContext, useContext, type ReactNode } from "react";
import { D } from "./palette";
import { StoryCouple } from "./StoryCharacters";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const SharedDefinitions = createContext(false);
export const useSharedDefinitions = () => useContext(SharedDefinitions);

// Studio keeps hidden sequences mounted; keep shared paint servers visible once.
export const WarmDefinitions = ({children,extra}:{children:ReactNode;extra:ReactNode}) => <SharedDefinitions.Provider value>
  <svg width="0" height="0" style={{position:"absolute"}}><WarmDefs/>{extra}</svg>
  {children}
</SharedDefinitions.Provider>;

export const WarmDefs = () => (
  <defs>
    <linearGradient id="warm-paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#fffdf7" />
      <stop offset="0.56" stopColor="#fff6db" />
      <stop offset="1" stopColor="#f8e1e7" />
    </linearGradient>
    <linearGradient id="warm-sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff4d9" />
      <stop offset="0.52" stopColor="#f7dce3" />
      <stop offset="1" stopColor="#e9c4d1" />
    </linearGradient>
    <linearGradient id="warm-night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#e8c3d0" />
      <stop offset="0.62" stopColor="#f3d8e1" />
      <stop offset="1" stopColor="#fff2dc" />
    </linearGradient>
    <linearGradient id="warm-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffe9a9" />
      <stop offset="0.52" stopColor="#ecd49f" />
      <stop offset="1" stopColor="#d5b58c" />
    </linearGradient>
    <linearGradient id="warm-red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f3c5cf" />
      <stop offset="1" stopColor="#dc98ac" />
    </linearGradient>
    <radialGradient id="warm-glow">
      <stop offset="0" stopColor="#fffbed" stopOpacity="0.8" />
      <stop offset="0.5" stopColor="#fff0df" stopOpacity="0.28" />
      <stop offset="1" stopColor="#fce5e9" stopOpacity="0" />
    </radialGradient>
    <filter id="warm-shadow" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#aa8292" floodOpacity="0.12" />
    </filter>
    <filter id="warm-soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>
);

export const WarmStage = ({
  children,
  theme = "paper",
}: {
  children: ReactNode;
  theme?: "paper" | "sunset" | "night" | "dawn";
}) => {
  const sharedDefinitions = useSharedDefinitions();
  const backgrounds = {
    paper: "url(#warm-paper)",
    sunset: "url(#warm-sunset)",
    night: "url(#warm-night)",
    dawn: "url(#warm-paper)",
  } as const;
  return (
    <AbsoluteFill style={{ backgroundColor: D.paper }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {!sharedDefinitions && <WarmDefs />}
        <rect width="1920" height="1080" fill={backgrounds[theme]} />
        <rect width="1920" height="1080" fill="#fffaf4" opacity="0.04" />
        {children}
      </svg>
    </AbsoluteFill>
  );
};

export const WarmGlow = ({
  x,
  y,
  r = 280,
  opacity = 0.8,
}: {
  x: number;
  y: number;
  r?: number;
  opacity?: number;
}) => <circle cx={x} cy={y} r={r} fill="url(#warm-glow)" opacity={opacity} />;

export const WarmMoon = ({
  x = 1510,
  y = 220,
  r = 150,
  phase = 0,
}: {
  x?: number;
  y?: number;
  r?: number;
  phase?: number;
}) => (
  <g transform={`translate(${x} ${y})`} filter="url(#warm-shadow)">
    <WarmGlow x={0} y={0} r={r * 2.1} opacity={0.7} />
    <circle r={r} fill="#ffe9aa" />
    <circle r={r * 0.88} fill="#f6c88f" opacity="0.36" />
    <circle cx={-r * 0.3 + phase * r * 0.22} cy={-r * 0.06} r={r * 0.72} fill="#c56b67" opacity={phase ? 0.48 : 0} />
    <circle cx={-r * 0.32} cy={-r * 0.18} r={r * 0.08} fill="#ddaA58" opacity="0.32" />
    <circle cx={r * 0.18} cy={r * 0.24} r={r * 0.12} fill="#ddaA58" opacity="0.26" />
  </g>
);

export const WarmStar = ({
  x = 0,
  y = 0,
  r = 10,
  color = D.gold,
  rotate = 0,
}: {
  x?: number;
  y?: number;
  r?: number;
  color?: string;
  rotate?: number;
}) => (
  <path
    d={`M0 ${-r * 2.1}L${r * 0.54} ${-r * 0.54}L${r * 2.1} 0L${r * 0.54} ${r * 0.54}L0 ${r * 2.1}L${-r * 0.54} ${r * 0.54}L${-r * 2.1} 0L${-r * 0.54} ${-r * 0.54}Z`}
    transform={`translate(${x} ${y}) rotate(${rotate})`}
    fill={color}
  />
);

export const WarmSnow = ({ count = 34, seed = 0 }: { count?: number; seed?: number }) => {
  const f = useCurrentFrame();
  return (
    <g opacity="0.8">
      {Array.from({ length: count }, (_, i) => {
        const x = ((i * 317 + seed * 89) % 2060) - 70;
        const base = (i * 181 + seed * 53) % 760;
        const y = ((base + f * (7 + (i % 4) * 2)) % 850) + 70;
        return <circle key={i} cx={x} cy={y} r={2 + (i % 4)} fill="#fff4d5" opacity={0.34 + (i % 5) * 0.1} />;
      })}
    </g>
  );
};

export const WarmCloud = ({ x = 0, y = 0, s = 1, color = "#ffe3bd" }: { x?: number; y?: number; s?: number; color?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-210 40Q-225-35-135-45Q-110-125-25-90Q52-142 103-72Q202-90 214 9Q200 79 103 64H-119Q-198 79-210 40Z" fill={color} opacity="0.88" />
    <path d="M-184 33Q-70 10 22 33T184 28" fill="none" stroke="#fff0d4" strokeWidth="7" opacity="0.4" />
  </g>
);

export const WarmLetter = ({ x = 0, y = 0, s = 1, rotation = 0, open = 0 }: { x?: number; y?: number; s?: number; rotation?: number; open?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`} filter="url(#warm-shadow)">
    <path d="M-190-112H190V126H-190Z" fill="#f6c28b" stroke="#c94e5b" strokeWidth="5" />
    <g transform={`translate(0 ${-open * 122})`}>
      <path d="M-166-105H166V95H-166Z" fill="#fff4d9" stroke="#ddaA58" strokeWidth="4" />
      <path d="M-135-62H105M-135-25H139M-135 12H90" stroke="#d88977" strokeWidth="5" opacity="0.52" />
      <path d="M-30 52Q-30 14 0 36Q29 5 47 40Q50 70 0 83Z" fill="#c94e5b" />
    </g>
    <path d="M-190-112L0 44L190-112V126H-190Z" fill="#f6d5a7" stroke="#c94e5b" strokeWidth="5" />
    <path d="M-190-112L0 44L190-112" fill="none" stroke="#fff2ce" strokeWidth="7" />
    <circle cx="0" cy="45" r="22" fill="#c94e5b" stroke="#ffe9aa" strokeWidth="6" />
  </g>
);

export const WarmGift = ({ x = 0, y = 0, s = 1, open = 0 }: { x?: number; y?: number; s?: number; open?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
    <path d="M-150-10H150V155Q0 188-150 155Z" fill="url(#warm-red)" />
    <path d="M-163-42H163V20H-163Z" fill="#d75e62" />
    <path d="M-22-42H24V164H-22Z" fill="#f8c47d" />
    <path d="M-161 3H161" stroke="#ffe3a0" strokeWidth="10" />
    <path d={`M-132-47Q-90-${110 + open * 80} 0-${62 + open * 120}Q90-${110 + open * 80} 132-47`} fill="#ef8b78" stroke="#c94e5b" strokeWidth="5" />
    <WarmStar x={0} y={-42 - open * 100} r={open ? 18 : 0} color="#fff0b6" />
  </g>
);

export const WarmSleigh = ({ x = 0, y = 0, s = 1, t = 0 }: { x?: number; y?: number; s?: number; t?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-230 60Q-160 132 60 123Q180 120 236 51" fill="none" stroke="#ddaA58" strokeWidth="16" strokeLinecap="round" />
    <path d="M-198-5Q-80-75 118-12L170 74H-205Z" fill="#c94e5b" stroke="#fff0c2" strokeWidth="7" />
    <path d="M-120-9L-70-115L-27-12M64-14L114-112L152-11" fill="#f28f7a" stroke="#ffe2a5" strokeWidth="9" />
    <path d="M-185 28H145" stroke="#f6c28b" strokeWidth="11" />
    <WarmStar x={-160} y={-115} r={10} color="#fff0b6" />
    <WarmStar x={175} y={-80} r={7} color="#fff0b6" />
    <path d={`M-270 ${-90 + Math.sin(t) * 10}Q-420-155-510-65`} fill="none" stroke="#fff0b6" strokeWidth="5" strokeDasharray="16 18" opacity="0.82" />
  </g>
);

export const WarmSanta = ({ x = 0, y = 0, s = 1, release = 0 }: { x?: number; y?: number; s?: number; release?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
    <path d="M-53 86L-47 148L8 150L24 102M17 91L51 140L99 139L66 79" fill="#bc8792" />
    <path d="M-48 138L8 139L24 159H-47ZM53 130L96 128L116 151H63Z" fill="#967881" />
    <path d="M-61-12Q-91 23-74 87Q0 124 76 89Q98 32 56-13Z" fill="#dd899e" />
    <path d="M-72 82Q0 107 76 82" stroke="#fff8ec" strokeWidth="16" fill="none" />
    <path d="M-75 61Q0 77 78 58" stroke="#a97d86" strokeWidth="13" fill="none" />
    <rect x="-10" y="57" width="27" height="21" rx="3" fill="#f2d6a2" />
    <rect x="-3" y="62" width="13" height="10" rx="1" fill="#a97d86" />
    <path d="M-51 3Q-70 24-45 40L63 34" fill="none" stroke="#dd899e" strokeWidth="28" strokeLinecap="round" />
    <path d="M51 1Q88 13 117-31" fill="none" stroke="#dd899e" strokeWidth="28" strokeLinecap="round" />
    <path d="M49 35L64 33M108-25L119-34" stroke="#fff8ec" strokeWidth="19" strokeLinecap="round" />
    <ellipse cx="73" cy="31" rx="17" ry="13" fill="#fff8ec" transform="rotate(-8 73 31)" />
    <g transform={`rotate(${release * 12} 117 -31)`}>
      <path d="M111-37Q116-51 129-46L139-40Q148-32 140-22L124-18Q111-19 111-37Z" fill="#fff8ec" />
      <path d="M118-28L127-32" stroke="#e4cfd1" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <circle cy="-49" r="48" fill="#f3c9ad" />
    <path d="M-43-49Q-67-10-41 20Q-26 34 0 46Q26 34 42 16Q64-14 44-49Q24-30 0-38Q-24-29-43-49Z" fill="#fff8ec" />
    <path d="M-45-83Q-30-151 23-139Q58-129 71-94L39-100Q20-113-3-104L-20-79Z" fill="#dd899e" />
    <path d="M-44-81Q0-97 45-80" stroke="#fff8ec" strokeWidth="18" fill="none" strokeLinecap="round" />
    <circle cx="71" cy="-93" r="15" fill="#fff8ec" />
    <circle cx="-16" cy="-53" r="4" fill="#65464b" />
    <circle cx="18" cy="-53" r="4" fill="#65464b" />
    <ellipse cx="1" cy="-37" rx="11" ry="8" fill="#e8b4ab" />
    <path d="M1-25Q-23-40-32-18Q-13-4 1-16Q15-4 35-18Q25-41 1-25Z" fill="#fffdf4" />
    <path d="M-8-7Q1-2 11-8" fill="none" stroke="#cf8d96" strokeWidth="3" strokeLinecap="round" />
  </g>
);

// The foreground sleigh rail deliberately masks Santa's seated legs.
export const WarmSantaRig = ({ x = 0, y = 0, s = 1, t = 0, release = 0 }: { x?: number; y?: number; s?: number; t?: number; release?: number }) => {
  const stride = Math.sin(t) * 13;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-420 93Q-325 111-235 93" fill="none" stroke="#ead9c7" strokeWidth="5" strokeDasharray="16 15" />
    <path d="M-246-12Q-260-90-223-119L-207-99Q-153-132-124-99L-110-13Z" fill="#d9bfaf" />
    <path d="M-225-109Q-196-96-161-112" fill="none" stroke="#bb9395" strokeWidth="7" />
    <WarmGift x={-191} y={-57} s={0.3} />
    <WarmGift x={-110} y={-45} s={0.26} />
    <WarmSanta x={-50} y={-100} s={0.85} release={release} />
    <path d="M12-73Q177-24 405-164M17-69Q193-13 418-153" fill="none" stroke="#bb8b89" strokeWidth="4" strokeLinecap="round" />
    <g transform="translate(365 -145)">
      <path d={`M-56 13L${-75 + stride} 69L-94 71M-21 20L-5 66L17 73M40 10L${68-stride} 61L89 65`} fill="none" stroke="#c4a591" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="-6" cy="-18" rx="83" ry="40" fill="#d8b9a2" />
      <path d="M33-30L62-98L89-94L80-5Z" fill="#d8b9a2" />
      <path d="M62-99L96-117L128-101L112-82L77-84Z" fill="#e4c8b2" />
      <path d="M67-101L55-138L35-149M57-128L76-145M96-115L101-153L120-171M101-138L87-156" fill="none" stroke="#bc9f91" strokeWidth="7" strokeLinecap="round" />
      <path d="M78-101L65-123L88-115" fill="#d8b9a2" />
      <circle cx="100" cy="-102" r="3.7" fill="#65464b" />
      <circle cx="127" cy="-100" r="8" fill="#d895a4" />
      <path d="M-77-32L-105-49" stroke="#d8b9a2" strokeWidth="14" strokeLinecap="round" />
      <path d="M21-50L47-2M59-77L81-67" stroke="#c9778f" strokeWidth="11" />
      <path d="M17-31Q43-17 60-17" fill="none" stroke="#c9778f" strokeWidth="6" />
      <circle cx="49" cy="-12" r="11" fill="#efd196" stroke="#d5b479" strokeWidth="3" />
      <path d="M42-7H56M49-12V-4" stroke="#b79261" strokeWidth="2" />
    </g>
    <path d="M-270 64Q-202 125 25 93Q103 83 132 24" fill="none" stroke="#d8b57f" strokeWidth="15" strokeLinecap="round" />
    <path d="M-229 20L-213 83M42 19L60 82" stroke="#d8b57f" strokeWidth="11" />
    <path d="M-265-49Q-231-16-179-24H56Q96-23 114-62L104 19Q70 67-82 64Q-206 63-254 16Z" fill="#dc98ac" stroke="#fff3df" strokeWidth="6" />
    <path d="M-254-43Q-223-13-176-18H58Q99-18 114-62" fill="none" stroke="#fff3df" strokeWidth="11" strokeLinecap="round" />
    <path d="M-222 21Q-85 66 65 22" fill="none" stroke="#f2d6a2" strokeWidth="6" />
    <WarmStar x={-126} y={20} r={14} color="#fff4d8" />
  </g>;
};

export const WarmCouple = ({ x = 0, y = 0, s = 1, t = 0, hold = 0 }: { x?: number; y?: number; s?: number; t?: number; hold?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <StoryCouple gap={77} walk={t}/>
    {hold ? <circle cx="0" cy="32" r="7" fill="#e6c68b" /> : null}
  </g>
);

export const WarmLadle = ({ x = 0, y = 0, s = 1, t = 0 }: { x?: number; y?: number; s?: number; t?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${Math.sin(t) * 3}) scale(${s})`}>
    <path d="M-15 20L260 260" stroke="#ddaA58" strokeWidth="28" strokeLinecap="round" />
    <ellipse cx="-45" cy="-20" rx="145" ry="96" fill="#f6c28b" stroke="#c4774f" strokeWidth="9" transform="rotate(-12 -45 -20)" />
    <ellipse cx="-48" cy="-31" rx="106" ry="64" fill="#fff0c4" opacity="0.82" transform="rotate(-12 -48 -31)" />
    <WarmStar x={-62} y={-34} r={16} color="#ddaA58" />
  </g>
);

export const WarmWorld = ({ x = 0, y = 0, s = 1, t = 0 }: { x?: number; y?: number; s?: number; t?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r="210" fill="#fff6dd" opacity="0.3" />
    <circle r="180" fill="#e0eef0" stroke="#b9d5dc" strokeWidth="12" />
    <path d="M-148 29Q-85-29-15 12T122 5Q163 35 128 88Q43 127-50 101Q-126 82-148 29Z" fill="#d0debf" />
    <path d="M-110 42L-75-30L-28 42M-39 38L2-72L50 38M49 50L98-33L143 50" fill="#e7bacb" opacity="0.82" />
    <WarmStar x={-75} y={-10} r={11} color="#fff3bf" />
    <WarmStar x={73} y={18} r={8} color="#fff3bf" />
    <path d="M-180 0Q0-180 180 0Q0 180-180 0Z" fill="none" stroke="#fff0bc" strokeWidth="5" opacity="0.7" transform={`rotate(${t * 8})`} />
  </g>
);

export const WarmMountain = ({ x = 0, y = 0, s = 1, warm = true }: { x?: number; y?: number; s?: number; warm?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-620 260L-360-170L-75 260L170-270L570 260Z" fill={warm ? "#edcfc2" : "#dfc5d3"} />
    <path d="M-360-170L-305-76L-255-105L-205-24L-75 260H-620Z" fill="#f6c28b" opacity="0.82" />
    <path d="M170-270L239-155L298-195L365-105L570 260H-75Z" fill="#ef9b78" opacity="0.9" />
    <path d="M-620 260Q-360 180-75 260T570 260V390H-620Z" fill="#c94e5b" opacity="0.56" />
  </g>
);

export const WarmBridge = ({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-650 120Q0-220 650 120V170Q0-150-650 170Z" fill="#c94e5b" />
    <path d="M-650 88Q0-250 650 88M-650 43Q0-294 650 43" fill="none" stroke="#ffe9aa" strokeWidth="13" />
    {Array.from({ length: 23 }, (_, i) => {
      const xx = -620 + i * 56;
      const yy = -184 + ((xx * xx) / 2700);
      return <path key={i} d={`M${xx} ${yy}V${yy + 95}`} stroke="#f6c28b" strokeWidth="6" />;
    })}
  </g>
);

export const WarmThread = ({ progress = 1, color = D.red }: { progress?: number; color?: string }) => (
  <path d="M-100 850C260 650 450 980 720 780S1110 620 1330 770S1700 920 2020 660" fill="none" stroke={color} strokeWidth="10" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - clamp(progress)} />
);

export const WarmClock = ({ x = 0, y = 0, r = 120, t = 0 }: { x?: number; y?: number; r?: number; t?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff0c0" stroke="#ddaA58" strokeWidth="12" />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M0-${r - 18}V-${r - 5}`} stroke="#c4774f" strokeWidth="6" transform={`rotate(${i * 30})`} />)}
    <path d={`M0 0V-${r * 0.54}M0 0L${r * 0.5} ${r * 0.28}`} stroke="#8c4f5a" strokeWidth="8" strokeLinecap="round" transform={`rotate(${t * 18})`} />
    <circle r="12" fill="#c94e5b" />
  </g>
);

export const WarmAtmosphere = () => {
  const f = useCurrentFrame();
  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <rect width="1920" height="1080" fill="#fffaf4" opacity="0.025" />
      {Array.from({ length: 30 }, (_, i) => {
        const x = ((i * 257 + f * 3) % 2020) - 50;
        const y = 90 + ((i * 137) % 850);
        const alpha = interpolate(Math.sin(f / 18 + i), [-1, 1], [0.1, 0.34]);
        return <g key={i} opacity={alpha}><WarmStar x={x} y={y} r={2 + (i % 3)} color="#ffe9aa" rotate={i * 18} /></g>;
      })}
    </svg>
  );
};

