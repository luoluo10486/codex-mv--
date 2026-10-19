import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, SERIF, rand, clamp } from "../design";
import music from "../data/music-analysis.json";

export const Definitions = () => (
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#fffdf5" />
      <stop offset=".55" stopColor="#f5eddf" />
      <stop offset="1" stopColor="#e5d9c7" />
    </linearGradient>
    <linearGradient id="pink" x1="0" y1="0" x2=".8" y2="1">
      <stop stopColor="#f4d9d8" />
      <stop offset="1" stopColor="#d89bad" />
    </linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#dfefeb" />
      <stop offset="1" stopColor="#8ebbc8" />
    </linearGradient>
    <linearGradient id="sage" x1="0" y1="0" x2=".7" y2="1">
      <stop stopColor="#c8d1b5" />
      <stop offset="1" stopColor="#8ba08b" />
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#ddd0be" />
      <stop offset=".5" stopColor="#fffaf0" />
      <stop offset="1" stopColor="#f3eadb" />
    </linearGradient>
    <radialGradient id="wash">
      <stop stopColor="#fffaf0" />
      <stop offset="1" stopColor="#f1e9da" />
    </radialGradient>
    <radialGradient id="aura">
      <stop stopColor="#f5dddd" stopOpacity=".8" />
      <stop offset="1" stopColor="#f5dddd" stopOpacity="0" />
    </radialGradient>
    <filter id="shadow" x="-35%" y="-35%" width="180%" height="190%">
      <feDropShadow
        dx="4"
        dy="12"
        stdDeviation="13"
        floodColor="#76674f"
        floodOpacity=".16"
      />
    </filter>
    <filter id="smallShadow" x="-40%" y="-50%" width="190%" height="220%">
      <feDropShadow
        dx="2"
        dy="5"
        stdDeviation="4"
        floodColor="#75694f"
        floodOpacity=".16"
      />
    </filter>
    <filter id="soft">
      <feGaussianBlur stdDeviation="9" />
    </filter>
    <pattern id="ruling" width="40" height="38" patternUnits="userSpaceOnUse">
      <path d="M0 37H40" stroke="#cfbdad" strokeWidth="1" opacity=".32" />
    </pattern>
    <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r=".8" fill="#776e61" opacity=".17" />
    </pattern>
  </defs>
);

export const CanvasGrain = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const texture = useRef<HTMLCanvasElement | null>(null);
  const frame = useCurrentFrame();
  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!texture.current) {
      const tile = document.createElement("canvas");
      tile.width = 960;
      tile.height = 540;
      const grain = tile.getContext("2d");
      if (!grain) return;
      for (let i = 0; i < 7800; i++) {
        const x = rand(i * 3) * 960,
          y = rand(i * 3 + 1) * 540;
        grain.fillStyle =
          rand(i * 3 + 2) > 0.45
            ? "rgba(96,77,51,.065)"
            : "rgba(255,255,255,.23)";
        grain.fillRect(
          x,
          y,
          0.5 + rand(i + 13) * 1.25,
          0.5 + rand(i + 50) * 0.85,
        );
      }
      grain.strokeStyle = "rgba(126,106,80,.045)";
      grain.lineWidth = 0.45;
      for (let i = 0; i < 130; i++) {
        const x = rand(i + 8100) * 960,
          y = rand(i + 8400) * 540;
        grain.beginPath();
        grain.moveTo(x, y);
        grain.quadraticCurveTo(x + 7, y - 1, x + 12 + rand(i) * 10, y + 2);
        grain.stroke();
      }
      texture.current = tile;
    }
    ctx.clearRect(0, 0, 960, 540);
    ctx.drawImage(texture.current, 0, 0);
    const energy =
      music.envelope[
        Math.min(music.envelope.length - 1, Math.floor(frame / 30 / 0.05))
      ]?.rms ?? 0;
    for (let i = 0; i < 15; i++) {
      const x = ((rand(i + 9300) * 1040 + frame * 0.023) % 1040) - 40;
      const y = rand(i + 9400) * 540 + Math.sin(frame * 0.009 + i) * 5;
      ctx.fillStyle = `rgba(180,146,94,${0.14 + Math.min(0.16, energy * 0.4)})`;
      ctx.beginPath();
      ctx.ellipse(
        x,
        y,
        1.1 + energy * 0.6,
        1.1 + energy * 0.6,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }, [frame]);
  return (
    <canvas
      ref={ref}
      width={960}
      height={540}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "multiply",
      }}
    />
  );
};

export const Stage = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <AbsoluteFill style={{ backgroundColor: C.paper, ...style }}>
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0 }}
    >
      <Definitions />
      <rect width="1920" height="1080" fill="url(#wash)" />
      {children}
    </svg>
  </AbsoluteFill>
);

export const Ink = ({
  d,
  color = C.ink,
  width = 2,
  opacity = 1,
  dash,
}: {
  d: string;
  color?: string;
  width?: number;
  opacity?: number;
  dash?: number;
}) => (
  <g opacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path
      d={d}
      stroke={color}
      strokeWidth={width}
      pathLength="1"
      strokeDasharray={dash === undefined ? undefined : 1}
      strokeDashoffset={dash === undefined ? undefined : 1 - clamp(dash)}
    />
    <path
      d={d}
      stroke={color}
      strokeWidth={width * 0.32}
      opacity=".22"
      transform="translate(.8 1)"
    />
  </g>
);

export const Star = ({
  x,
  y,
  size = 10,
  color = C.gold,
  rotation = 0,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  rotation?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
    <path
      d={`M0 ${-size}Q${size * 0.13} ${-size * 0.13} ${size} 0Q${size * 0.13} ${size * 0.13} 0 ${size}Q${-size * 0.13} ${size * 0.13} ${-size} 0Q${-size * 0.13} ${-size * 0.13} 0 ${-size}`}
      fill={color}
    />
  </g>
);

export const Sprig = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  color = C.leaf,
  flower = false,
  growth = 1,
  bloom,
}: {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  color?: string;
  flower?: boolean;
  growth?: number;
  bloom?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <path
      d="M0 0C-12-70 14-164 2-260"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - clamp(growth)}
    />
    {Array.from({ length: 7 }, (_, i) => {
      const yy = -38 - i * 29,
        side = i % 2 ? 1 : -1,
        s = clamp((growth - i * 0.07) * 1.8);
      return (
        <g
          key={i}
          transform={`translate(${Math.sin(i) * 4} ${yy}) scale(${s})`}
        >
          <path
            d={`M0 0Q${side * 38} -47 ${side * 61} -37Q${side * 48} 2 0 0Z`}
            fill={color}
            opacity={0.55 + i * 0.04}
          />
          <path
            d={`M0 0L${side * 48} -30`}
            stroke={C.cream}
            strokeWidth=".8"
            opacity=".65"
          />
        </g>
      );
    })}
    {flower && (
      <g
        transform={`translate(2 -262) scale(${clamp(bloom ?? (growth - 0.45) * 2)})`}
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-19"
            rx="13"
            ry="25"
            fill={a % 120 === 0 ? C.blush : C.pink}
            transform={`rotate(${a})`}
            stroke="#b77d8d"
            strokeWidth=".5"
          />
        ))}
        <circle r="12" fill="#d6b674" />
        {Array.from({ length: 7 }, (_, i) => (
          <circle
            key={i}
            cx={Math.cos(i) * 7}
            cy={Math.sin(i) * 7}
            r="1.4"
            fill="#957b4c"
          />
        ))}
      </g>
    )}
  </g>
);

export const Fern = ({
  x,
  y,
  scale = 1,
  rotation = 0,
  color = C.sage,
}: {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  color?: string;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <path d="M0 0Q-20-130 25-310" fill="none" stroke={color} strokeWidth="2" />
    {Array.from({ length: 12 }, (_, i) => {
      const yy = -20 - i * 23,
        xx = i * i * 0.16 - 8;
      return (
        <g key={i}>
          <path
            d={`M${xx} ${yy}q-65 -16 ${-70 + i * 3} -41q40 3 ${70 - i * 3} 41`}
            fill={color}
            opacity=".8"
          />
          <path
            d={`M${xx} ${yy - 8}q52 -46 ${58 - i * 3} -61q-10 42 ${-58 + i * 3} 61`}
            fill={color}
            opacity=".65"
          />
        </g>
      );
    })}
  </g>
);

export const Daisy = ({
  x,
  y,
  scale = 1,
  rotation = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse
        key={i}
        cy="-23"
        rx="7"
        ry="23"
        fill={i % 2 ? C.cream : "#f2e6db"}
        stroke="#d1bca6"
        strokeWidth=".6"
        transform={`rotate(${i * 30})`}
      />
    ))}
    <circle r="13" fill="#cfb274" />
    <circle r="8" fill="url(#dots)" />
  </g>
);

export const Envelope = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  open = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  open?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <g filter="url(#shadow)">
      <path d="M-280-160H280V180H-280Z" fill="#d3c5b2" />
      <path
        d={`M-280 -160L0 ${-170 - open * 200}L280 -160L0 60Z`}
        fill="url(#shade)"
        stroke="#c7b69f"
        strokeWidth="1.5"
      />
      {open > 0.01 && (
        <g transform={`translate(0 ${-open * 150})`}>
          <path d="M-238-150H238V170H-238Z" fill="#fff9ee" />
          <path
            d="M-195-97H195M-195-56H150M-195-15H195M-195 26H120"
            stroke="#cbb7ac"
            strokeWidth="2"
          />
          <path
            d="M-50-100Q-14-145 18-104Q55-151 77-119Q93-88 18-45Q-30-62-50-100"
            fill="none"
            stroke={C.pink}
            strokeWidth="2"
          />
        </g>
      )}
      <path
        d="M-280-160L0 50L280-160V180H-280Z"
        fill="url(#paper)"
        stroke="#cdbba4"
        strokeWidth="1.4"
      />
      <path
        d="M-280 180L-5-20L280 180"
        fill="#f5e9d8"
        stroke="#cdbba4"
        strokeWidth="1.4"
      />
      {open < 0.08 && (
        <path
          d="M-280-160L0 43L280-160"
          fill="url(#paper)"
          stroke="#baa98e"
          strokeWidth="1.6"
        />
      )}
    </g>
    {open < 0.08 && (
      <g transform="translate(0 28)" filter="url(#smallShadow)">
        <path
          d="M-28-15Q-18-41 7-31Q34-36 33-9Q46 15 20 32Q-6 43-27 23Q-44 7-28-15Z"
          fill={C.rose}
        />
        <circle r="21" fill="none" stroke="#e5afbc" strokeWidth="1" />
        <path
          d="M-13-5Q-7-16 0-7Q8-18 14-8Q20 1 0 14Q-17 3-13-5"
          fill="none"
          stroke="#f5d1d8"
          strokeWidth="1.5"
        />
      </g>
    )}
  </g>
);

export const Bird = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  flap = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  flap?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
    filter="url(#smallShadow)"
  >
    <path
      d="M-140 42L-48-48L116-10L28 42Z"
      fill="#f7eee0"
      stroke="#b3aaa0"
      strokeWidth="1.2"
    />
    <path
      d={`M-48-48L${-20 + flap * 18} ${-155 - flap * 40}L116-10L28 42Z`}
      fill="url(#blue)"
      stroke="#8aaab3"
      strokeWidth="1.1"
    />
    <path d="M-48-48L28 42L-50 21Z" fill="#a6c7ce" />
    <path
      d="M-140 42L-50 21L-93 79Z"
      fill="#ebcfcc"
      stroke="#bc9f9c"
      strokeWidth="1"
    />
    <path
      d="M28 42L116-10L91 44L171 53L111 72L-50 21"
      fill="#fff9ed"
      stroke="#a89f92"
      strokeWidth="1.2"
    />
    <circle cx="108" cy="40" r="2.3" fill={C.ink} />
    <path d="M116 53L171 53" stroke={C.gold} />
    <path d="M-21-111L73-17" fill="none" stroke="#edf6ef" strokeWidth="2" />
  </g>
);

export const Book = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <ellipse
      cx="0"
      cy="135"
      rx="530"
      ry="60"
      fill="#827661"
      opacity=".12"
      filter="url(#soft)"
    />
    <path
      d="M-495-52Q-270-165 0-25Q250-165 490-52L525 105Q240 21 0 143Q-240 21-525 105Z"
      fill="#ae8f88"
      filter="url(#shadow)"
    />
    <path
      d="M-480-75Q-270-180 0-46Q250-178 480-75L510 74Q244-12 0 119Q-240-12-510 74Z"
      fill="#e9dcc7"
      stroke="#bead93"
      strokeWidth="2"
    />
    {Array.from({ length: 5 }, (_, i) => (
      <path
        key={i}
        d={`M${-487 - i * 3} ${55 + i * 4}Q-240 ${-30 + i * 4} 0 ${99 + i * 4}Q240 ${-30 + i * 4} ${487 + i * 3} ${55 + i * 4}`}
        fill="none"
        stroke="#bda88a"
        strokeWidth="1"
      />
    ))}
    <path
      d="M-480-91Q-260-210 0-57L0 102Q-230-45-502 48Z"
      fill="url(#paper)"
      stroke="#c9b89e"
      strokeWidth="1.5"
    />
    <path
      d="M480-91Q260-210 0-57L0 102Q230-45 502 48Z"
      fill="url(#shade)"
      stroke="#c9b89e"
      strokeWidth="1.5"
    />
    <path d="M0-57V102" stroke="#b4a085" strokeWidth="3" />
    <path
      d="M-437-55Q-249-148-47-51M-430-21Q-248-114-46-17M-420 12Q-248-80-46 17M47-51Q249-148 437-55M46-17Q248-114 430-21M46 17Q248-80 420 12"
      fill="none"
      stroke="#bcad99"
      strokeWidth="1"
      opacity=".6"
    />
    <path
      d="M8 102Q64 154 108 173L123 144L150 150Q65 117 26 91"
      fill={C.pink}
    />
  </g>
);

export const Stamp = ({
  x,
  y,
  rotation = 0,
  scale = 1,
}: {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
    filter="url(#smallShadow)"
  >
    <rect
      x="-65"
      y="-80"
      width="130"
      height="160"
      fill="#fcf6ea"
      stroke="#d0beaa"
      strokeWidth="4"
      strokeDasharray="2 8"
    />
    <rect x="-53" y="-66" width="106" height="120" fill={C.sky} />
    <circle cx="12" cy="-30" r="22" fill="#f5e6c8" />
    <path
      d="M-53 37L-20-9L0 15L23-18L53 29V54H-53"
      fill={C.teal}
      opacity=".65"
    />
    <text
      y="72"
      textAnchor="middle"
      fontFamily="Georgia"
      fontSize="13"
      letterSpacing="4"
      fill={C.ink}
    >
      TO YOU
    </text>
  </g>
);

export const Postmark = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(-14) scale(${scale})`}
    fill="none"
    stroke={C.rose}
    opacity=".5"
  >
    <circle r="63" strokeWidth="1.3" />
    <circle r="55" strokeWidth=".8" />
    {[-22, -8, 6, 20].map((yy) => (
      <path key={yy} d={`M45 ${yy}q22-12 44 0t44 0t44 0`} strokeWidth="1.2" />
    ))}
    <text
      textAnchor="middle"
      y="-11"
      fill={C.rose}
      stroke="none"
      fontFamily="Georgia"
      fontSize="10"
      letterSpacing="2"
    >
      LOVE LETTER
    </text>
    <text
      textAnchor="middle"
      y="15"
      fill={C.rose}
      stroke="none"
      fontFamily={FONT}
      fontSize="22"
    >
      寄给你
    </text>
  </g>
);

export const LittleCloud = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M-90 20Q-130 16-115-12Q-106-34-75-26Q-66-75-26-67Q6-68 18-34Q44-58 68-31Q108-39 112-9Q139 20 94 25Z"
      fill="#fffaf0"
      stroke="#d3d0bf"
      strokeWidth="1.5"
    />
    <path d="M-71 39H68M-39 49H34" stroke="#c2cabc" opacity=".55" />
  </g>
);

export const DistantHills = ({
  y = 690,
  drift = 0,
}: {
  y?: number;
  drift?: number;
}) => (
  <g transform={`translate(${drift} ${y})`}>
    <path
      d="M-250 180L-80-70L110 46L300-172L560 122L730-89L950 104L1120-168L1390 71L1630-80L1990 153L2180 20V390H-250Z"
      fill="#cbdedb"
      opacity=".64"
    />
    <path
      d="M-170 228L150-32L380 112L590-46L810 171L1070-71L1360 131L1580-33L1950 240L2200 100V390H-170Z"
      fill="#b7c9b1"
      opacity=".8"
    />
    <path
      d="M-80 305Q190 60 480 225T1050 216T1660 220T2200 250V430H-80Z"
      fill="#e5d5bc"
    />
    <path
      d="M-80 310Q190 65 480 230T1050 221T1660 225T2200 255"
      fill="none"
      stroke="#b4a38b"
      strokeWidth="1.5"
    />
  </g>
);

export const SideNote = ({
  x,
  y,
  children,
  rotation = 0,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  rotation?: number;
}) => (
  <text
    x="0"
    y="0"
    transform={`translate(${x} ${y}) rotate(${rotation})`}
    fill={C.muted}
    fontSize="22"
    fontFamily={SERIF}
    letterSpacing="5"
  >
    {children}
  </text>
);
