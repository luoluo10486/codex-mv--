import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { createContext, useContext, type ReactNode } from "react";
import { D } from "./palette";

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
      <stop offset="0" stopColor="#fff7e8" />
      <stop offset="0.56" stopColor="#f8d5a7" />
      <stop offset="1" stopColor="#eea17d" />
    </linearGradient>
    <linearGradient id="warm-sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#f6b47f" />
      <stop offset="0.52" stopColor="#ef8b78" />
      <stop offset="1" stopColor="#8c4f5a" />
    </linearGradient>
    <linearGradient id="warm-night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#6f3f48" />
      <stop offset="0.62" stopColor="#8c4f5a" />
      <stop offset="1" stopColor="#c56b67" />
    </linearGradient>
    <linearGradient id="warm-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffe9a9" />
      <stop offset="0.52" stopColor="#ddaA58" />
      <stop offset="1" stopColor="#c4774f" />
    </linearGradient>
    <linearGradient id="warm-red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f28f7a" />
      <stop offset="1" stopColor="#c94e5b" />
    </linearGradient>
    <radialGradient id="warm-glow">
      <stop offset="0" stopColor="#fff5c7" stopOpacity="0.95" />
      <stop offset="0.5" stopColor="#f6c28b" stopOpacity="0.42" />
      <stop offset="1" stopColor="#f6c28b" stopOpacity="0" />
    </radialGradient>
    <filter id="warm-shadow" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#6f3f48" floodOpacity="0.2" />
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
        <rect width="1920" height="1080" fill="#fff1dc" opacity="0.07" />
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

export const WarmSanta = ({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
    <path d="M-88 54Q-124 136 0 154Q124 136 88 54Z" fill="#c94e5b" />
    <circle cy="-12" r="61" fill="#f7c19b" />
    <path d="M-64-14Q-44-82 0-76Q50-82 67-14Q25-35 0-25Q-30-37-64-14Z" fill="#fff4d9" />
    <path d="M-52-67Q-13-154 59-101L29-72Z" fill="#c94e5b" />
    <circle cx="57" cy="-102" r="17" fill="#fff3ce" />
    <path d="M-64 0Q-100 22-77 63Q-49 89-18 58M64 0Q100 22 77 63Q49 89 18 58" fill="none" stroke="#fff4d9" strokeWidth="20" strokeLinecap="round" />
    <circle cx="-21" cy="-19" r="6" fill="#4d3030" />
    <circle cx="21" cy="-19" r="6" fill="#4d3030" />
    <path d="M-32 20Q0 45 32 20" fill="none" stroke="#c94e5b" strokeWidth="6" strokeLinecap="round" />
    <path d="M-112 83Q0 134 112 83" fill="none" stroke="#ddaA58" strokeWidth="13" strokeLinecap="round" />
  </g>
);

export const WarmCouple = ({ x = 0, y = 0, s = 1, t = 0, hold = 0 }: { x?: number; y?: number; s?: number; t?: number; hold?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy="170" rx="220" ry="25" fill="#6f3f48" opacity="0.15" />
    <g transform={`translate(-75 ${Math.sin(t) * 2})`}>
      <circle cy="-128" r="48" fill="#f7c19b" />
      <path d="M-55-137Q-38-196 0-190Q47-198 59-135Q20-152-4-135Q-24-156-55-137Z" fill="#6f3f48" />
      <path d="M-64-62Q0-92 64-62L48 99Q0 133-48 99Z" fill="#ef8b78" />
      <path d="M-52 100L-80 176M50 100L78 176" stroke="#8c4f5a" strokeWidth="22" strokeLinecap="round" />
    </g>
    <g transform={`translate(75 ${Math.sin(t + 0.7) * 2})`}>
      <circle cy="-128" r="48" fill="#f7c19b" />
      <path d="M-58-130Q-35-201 8-190Q54-187 60-126Q20-153-2-135Q-32-155-58-130Z" fill="#4d3030" />
      <path d="M-64-62Q0-91 64-62L48 99Q0 133-48 99Z" fill="#d6856f" />
      <path d="M-52 100L-78 176M50 100L77 176" stroke="#8c4f5a" strokeWidth="22" strokeLinecap="round" />
    </g>
    <path d={`M-20-39Q${hold ? 0 : -12} ${hold ? -6 : -18} 20-39`} fill="none" stroke="#f7c19b" strokeWidth="18" strokeLinecap="round" />
    {hold ? <circle cx="0" cy="-29" r="12" fill="#ddaA58" /> : null}
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
    <circle r="210" fill="#fff0c0" opacity="0.3" />
    <circle r="180" fill="#f6c28b" stroke="#ddaA58" strokeWidth="12" />
    <path d="M-148 29Q-85-29-15 12T122 5Q163 35 128 88Q43 127-50 101Q-126 82-148 29Z" fill="#ef8b78" />
    <path d="M-110 42L-75-30L-28 42M-39 38L2-72L50 38M49 50L98-33L143 50" fill="#c94e5b" opacity="0.82" />
    <WarmStar x={-75} y={-10} r={11} color="#fff3bf" />
    <WarmStar x={73} y={18} r={8} color="#fff3bf" />
    <path d="M-180 0Q0-180 180 0Q0 180-180 0Z" fill="none" stroke="#fff0bc" strokeWidth="5" opacity="0.7" transform={`rotate(${t * 8})`} />
  </g>
);

export const WarmMountain = ({ x = 0, y = 0, s = 1, warm = true }: { x?: number; y?: number; s?: number; warm?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-620 260L-360-170L-75 260L170-270L570 260Z" fill={warm ? "#c47764" : "#8c4f5a"} />
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
      <rect width="1920" height="1080" fill="#fff1dc" opacity="0.045" />
      {Array.from({ length: 30 }, (_, i) => {
        const x = ((i * 257 + f * 3) % 2020) - 50;
        const y = 90 + ((i * 137) % 850);
        const alpha = interpolate(Math.sin(f / 18 + i), [-1, 1], [0.1, 0.34]);
        return <g key={i} opacity={alpha}><WarmStar x={x} y={y} r={2 + (i % 3)} color="#ffe9aa" rotate={i * 18} /></g>;
      })}
    </svg>
  );
};

