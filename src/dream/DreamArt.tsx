import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { D, rnd } from "./palette";

export const DreamDefs = () => (
  <defs>
    <linearGradient id="d-night" x2=".25" y2="1">
      <stop stopColor="#19255f" />
      <stop offset=".48" stopColor="#6458b5" />
      <stop offset="1" stopColor="#f493b1" />
    </linearGradient>
    <linearGradient id="d-dawn" x2=".1" y2="1">
      <stop stopColor="#684fa7" />
      <stop offset=".48" stopColor="#f38eac" />
      <stop offset="1" stopColor="#ffc58d" />
    </linearGradient>
    <linearGradient id="d-deep" x2=".5" y2="1">
      <stop stopColor="#132d65" />
      <stop offset=".55" stopColor="#286b9a" />
      <stop offset="1" stopColor="#7ccdcc" />
    </linearGradient>
    <linearGradient id="d-violet" x2=".7" y2="1">
      <stop stopColor="#343172" />
      <stop offset=".6" stopColor="#775bb2" />
      <stop offset="1" stopColor="#d276a3" />
    </linearGradient>
    <linearGradient id="d-water" x2=".45" y2="1">
      <stop stopColor="#73e4d4" />
      <stop offset=".35" stopColor="#347fc2" />
      <stop offset="1" stopColor="#263777" />
    </linearGradient>
    <linearGradient id="d-whale" x1=".2" y1="0" x2=".65" y2="1">
      <stop stopColor="#8af2e9" />
      <stop offset=".35" stopColor="#459cdb" />
      <stop offset=".72" stopColor="#3757ad" />
      <stop offset="1" stopColor="#603d92" />
    </linearGradient>
    <linearGradient id="d-belly" x2="0" y2="1">
      <stop stopColor="#e6ddf7" />
      <stop offset="1" stopColor="#a6b8e8" />
    </linearGradient>
    <linearGradient id="d-gold" x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#fff5c5" />
      <stop offset=".22" stopColor="#ffcc6f" />
      <stop offset=".48" stopColor="#fff2b1" />
      <stop offset=".7" stopColor="#d38a69" />
      <stop offset="1" stopColor="#ffcc87" />
    </linearGradient>
    <linearGradient id="d-petal" x2=".9" y2="1">
      <stop stopColor="#ffcfae" />
      <stop offset=".45" stopColor="#ff83ae" />
      <stop offset="1" stopColor="#bd4c92" />
    </linearGradient>
    <linearGradient id="d-leaf" x2="1" y2="1">
      <stop stopColor="#b2f5c4" />
      <stop offset=".45" stopColor="#30bcb7" />
      <stop offset="1" stopColor="#205d88" />
    </linearGradient>
    <linearGradient id="d-leaf-dark" x2="1" y2="1">
      <stop stopColor="#359dac" />
      <stop offset="1" stopColor="#184168" />
    </linearGradient>
    <linearGradient id="d-cliff" x2=".6" y2="1">
      <stop stopColor="#bca0cf" />
      <stop offset=".5" stopColor="#6264a1" />
      <stop offset="1" stopColor="#363b79" />
    </linearGradient>
    <linearGradient id="d-roof" x2="1" y2="1">
      <stop stopColor="#ffb2a2" />
      <stop offset=".5" stopColor="#e55f97" />
      <stop offset="1" stopColor="#924e9f" />
    </linearGradient>
    <linearGradient id="d-paper" x2=".65" y2="1">
      <stop stopColor="#fff8d9" />
      <stop offset=".6" stopColor="#ffdfb1" />
      <stop offset="1" stopColor="#eab0a0" />
    </linearGradient>
    <linearGradient id="d-type" x2=".3" y2="1">
      <stop stopColor="#fff8c9" />
      <stop offset=".45" stopColor="#ffda8f" />
      <stop offset="1" stopColor="#ff9d9e" />
    </linearGradient>
    <linearGradient id="d-type-blue" x2=".2" y2="1">
      <stop stopColor="#d4ffeb" />
      <stop offset=".5" stopColor="#86efe1" />
      <stop offset="1" stopColor="#74a9f8" />
    </linearGradient>
    <radialGradient id="d-glow">
      <stop stopColor="#fff4bd" stopOpacity=".8" />
      <stop offset=".35" stopColor="#ffc17f" stopOpacity=".3" />
      <stop offset="1" stopColor="#ffc17f" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="d-moon">
      <stop stopColor="#fff6d5" />
      <stop offset=".65" stopColor="#ffe4ac" />
      <stop offset="1" stopColor="#f4c0a4" />
    </radialGradient>
    <radialGradient id="d-glass">
      <stop stopColor="#a5f8e7" stopOpacity=".08" />
      <stop offset=".75" stopColor="#adddf9" stopOpacity=".18" />
      <stop offset="1" stopColor="#e1f7ff" stopOpacity=".58" />
    </radialGradient>
    <filter id="d-shadow" x="-40%" y="-40%" width="180%" height="190%">
      <feDropShadow
        dx="0"
        dy="13"
        stdDeviation="14"
        floodColor="#211e60"
        floodOpacity=".32"
      />
    </filter>
    <filter id="d-fine" x="-35%" y="-35%" width="175%" height="180%">
      <feDropShadow
        dx="0"
        dy="4"
        stdDeviation="4"
        floodColor="#26244c"
        floodOpacity=".24"
      />
    </filter>
    <filter id="d-shine" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="7" />
    </filter>
    <pattern
      id="d-hatch"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(30)"
    >
      <path d="M0 0V10" stroke="#353f76" opacity=".16" strokeWidth="1" />
    </pattern>
    <pattern id="d-scales" width="28" height="20" patternUnits="userSpaceOnUse">
      <path
        d="M0 0Q14 27 28 0M-14 10Q0 37 14 10M14 10Q28 37 42 10"
        fill="none"
        stroke="#fff1c7"
        strokeWidth=".8"
        opacity=".24"
      />
    </pattern>
    <clipPath id="d-orb-clip">
      <circle r="215" />
    </clipPath>
  </defs>
);

export const Star = ({
  x = 0,
  y = 0,
  r = 10,
  rotate = 0,
  color = D.cream,
}: {
  x?: number;
  y?: number;
  r?: number;
  rotate?: number;
  color?: string;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <path
      d={`M0 ${-r}Q${r * 0.16} ${-r * 0.16} ${r} 0Q${r * 0.16} ${r * 0.16} 0 ${r}Q${-r * 0.16} ${r * 0.16} ${-r} 0Q${-r * 0.16} ${-r * 0.16} 0 ${-r}`}
      fill={color}
    />
    <circle r={r * 0.13} fill="#fff9e6" />
  </g>
);

export const Sky = ({
  theme = "night",
  t = 0,
}: {
  theme?: string;
  t?: number;
}) => (
  <>
    <rect width="1920" height="1080" fill={`url(#d-${theme})`} />
    <ellipse
      cx="1020"
      cy="405"
      rx="810"
      ry="560"
      fill="url(#d-glow)"
      opacity={theme === "deep" ? 0.28 : 0.45}
    />
    {Array.from({ length: 105 }, (_, i) => {
      const x = rnd(i + 80) * 1920,
        y = rnd(i + 240) * 720,
        op = 0.25 + rnd(i + 400) * 0.55 + Math.sin(t * 0.6 + i) * 0.12;
      return (
        <g key={i} opacity={op}>
          {i % 11 === 0 ? (
            <Star x={x} y={y} r={5 + rnd(i + 600) * 7} rotate={i * 23} />
          ) : (
            <circle cx={x} cy={y} r={0.8 + rnd(i) * 1.7} fill={D.cream} />
          )}
        </g>
      );
    })}
    <path
      d="M95 285L244 193L420 231L591 139L718 205M1372 140L1450 217L1590 186L1700 300"
      fill="none"
      stroke="#d2c5ff"
      strokeWidth="1"
      opacity=".23"
    />
    {[
      [95, 285],
      [244, 193],
      [420, 231],
      [591, 139],
      [718, 205],
      [1372, 140],
      [1450, 217],
      [1590, 186],
      [1700, 300],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill={D.gold} opacity=".65" />
    ))}
  </>
);

export const Moon = ({
  x = 0,
  y = 0,
  r = 150,
  phase = false,
}: {
  x?: number;
  y?: number;
  r?: number;
  phase?: boolean;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r * 1.65} fill="url(#d-glow)" />
    {phase ? (
      <path
        d={`M${r * 0.58} ${-r * 0.86}A${r} ${r} 0 1 0 ${r * 0.58} ${r * 0.86}A${r * 0.77} ${r * 0.77} 0 0 1 ${r * 0.58} ${-r * 0.86}`}
        fill="url(#d-moon)"
      />
    ) : (
      <circle r={r} fill="url(#d-moon)" />
    )}
    {!phase &&
      Array.from({ length: 16 }, (_, i) => (
        <ellipse
          key={i}
          cx={(rnd(i + 10) - 0.5) * r * 1.45}
          cy={(rnd(i + 40) - 0.5) * r * 1.45}
          rx={4 + rnd(i + 70) * r * 0.09}
          ry={3 + rnd(i + 90) * r * 0.04}
          fill="#d7b0aa"
          opacity=".2"
        />
      ))}
    <circle
      r={r * 1.1}
      fill="none"
      stroke={D.gold}
      strokeWidth="1"
      opacity=".55"
    />
    <circle
      r={r * 1.18}
      fill="none"
      stroke={D.gold}
      strokeWidth=".7"
      opacity=".25"
      strokeDasharray="2 10"
    />
  </g>
);

export const Cloud = ({
  x = 0,
  y = 0,
  s = 1,
  pink = false,
}: {
  x?: number;
  y?: number;
  s?: number;
  pink?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M-240 40Q-288 10-249-27Q-221-54-180-36Q-178-98-119-95Q-95-161-35-132Q10-145 37-91Q111-117 135-58Q196-75 208-31Q263-39 264 6Q295 47 217 57L-193 64Z"
      fill={pink ? "#f5abc4" : "#d4d8f3"}
      stroke={pink ? "#d78bb5" : "#a5b8e0"}
      strokeWidth="1.4"
    />
    <path
      d="M-222 13Q-189-28-151-8Q-126-86-72-62Q-40-117 5-73Q52-78 69-27Q128-61 156-11Q196-19 218 12M-182 41Q-116 17-68 36T56 30T189 29"
      fill="none"
      stroke={pink ? "#ffe3d7" : "#edf5ff"}
      strokeWidth="2"
      opacity=".8"
    />
    <path
      d="M-155 79Q-21 97 154 74M-102 94H75"
      fill="none"
      stroke={pink ? "#f4bed5" : "#b2bfe9"}
      strokeWidth="2"
      opacity=".5"
    />
  </g>
);

export const Sea = ({ y = 670, t = 0 }: { y?: number; t?: number }) => (
  <g>
    <path
      d={`M0 ${y}Q420 ${y - 50} 960 ${y + 12}T1920 ${y - 20}V1080H0Z`}
      fill="url(#d-water)"
    />
    {Array.from({ length: 58 }, (_, i) => {
      const yy = y + 15 + rnd(i + 210) * 450,
        xx = rnd(i + 900) * 2100 - 90 + Math.sin(t * 0.32 + i) * 9,
        w = 10 + rnd(i + 600) * 140;
      return (
        <path
          key={i}
          d={`M${xx} ${yy}q${w * 0.5} ${-3 - rnd(i) * 5} ${w} 0`}
          stroke={i % 4 === 0 ? "#ffdfa3" : i % 3 === 0 ? "#91f2de" : "#a9c9ee"}
          opacity={0.13 + rnd(i + 88) * 0.28}
          strokeWidth={1 + rnd(i + 60) * 2.5}
          fill="none"
        />
      );
    })}
    <path
      d={`M0 ${y + 89}Q360 ${y + 45} 655 ${y + 95}T1330 ${y + 66}T2020 ${y + 93}`}
      fill="none"
      stroke="#bcf2e8"
      opacity=".35"
    />
  </g>
);

export const Flower = ({
  x = 0,
  y = 0,
  s = 1,
  rotation = 0,
  blue = false,
  bloom = 1,
}: {
  x?: number;
  y?: number;
  s?: number;
  rotation?: number;
  blue?: boolean;
  bloom?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}>
    <path d="M0 0Q-10-94 16-184" stroke="#67c7b4" strokeWidth="4" fill="none" />
    <path
      d="M-2-47Q-83-115-76-142Q-7-127 1-64M4-91Q76-164 80-125Q55-79 4-91"
      fill="url(#d-leaf)"
      stroke="#73d2bc"
      strokeWidth="1"
    />
    <path
      d="M-4-60L-61-128M7-101L66-135"
      fill="none"
      stroke="#b8f1c9"
      strokeWidth="1.4"
    />
    <g transform={`translate(15 -186) scale(${bloom})`} filter="url(#d-fine)">
      {[0, 51, 103, 154, 206, 257, 309].map((a, i) => (
        <g key={a} transform={`rotate(${a})`}>
          <path
            d="M0 10C-49-7-53-69-25-77C4-90 29-35 0 10Z"
            fill={blue ? (i % 2 ? "#a4ceff" : "#8195ef") : "url(#d-petal)"}
            stroke={blue ? "#6379c0" : "#d3709b"}
            strokeWidth="1"
          />
          <path
            d="M-2-3Q-29-32-26-67"
            fill="none"
            stroke={blue ? "#d7f0ff" : "#ffe3c1"}
            strokeWidth="1.5"
            opacity=".65"
          />
        </g>
      ))}
      <circle r="23" fill="url(#d-gold)" stroke="#e4b56b" />
      {Array.from({ length: 15 }, (_, i) => (
        <circle
          key={i}
          cx={Math.cos(i * 2.4) * Math.sqrt(i) * 4.8}
          cy={Math.sin(i * 2.4) * Math.sqrt(i) * 4.8}
          r="1.8"
          fill="#8e6192"
        />
      ))}
    </g>
  </g>
);

export const Foliage = ({
  x = 0,
  y = 0,
  s = 1,
  rotation = 0,
  dark = false,
}: {
  x?: number;
  y?: number;
  s?: number;
  rotation?: number;
  dark?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}>
    <path
      d="M0 20Q-27-160 25-403"
      fill="none"
      stroke={dark ? "#409aab" : "#9af2cf"}
      strokeWidth="3"
    />
    {Array.from({ length: 11 }, (_, i) => {
      const yy = -15 - i * 34,
        xx = Math.sin(i * 0.6) * 8,
        side = i % 2 ? -1 : 1;
      return (
        <g key={i}>
          <path
            d={`M${xx} ${yy}Q${xx + side * 110} ${yy - 28} ${xx + side * (109 - i * 5)} ${yy - 86}Q${xx + side * 14} ${yy - 78} ${xx} ${yy}Z`}
            fill={dark ? "url(#d-leaf-dark)" : "url(#d-leaf)"}
            stroke={dark ? "#2f8294" : "#8cddba"}
            strokeWidth="1"
          />
          <path
            d={`M${xx} ${yy}Q${xx + side * 37} ${yy - 34} ${xx + side * (91 - i * 4)} ${yy - 73}`}
            stroke={dark ? "#66b6b3" : "#d3efb9"}
            strokeWidth="1.1"
            fill="none"
            opacity=".6"
          />
          {[0.25, 0.46, 0.67].map((q, j) => (
            <path
              key={j}
              d={`M${xx + side * (91 - i * 4) * q} ${yy - 73 * q}q${-side * 4} ${-14 + j * 2} ${side * 8} ${-23 + j * 2}`}
              fill="none"
              stroke={dark ? "#67b1b3" : "#c8efbd"}
              strokeWidth=".75"
              opacity=".48"
            />
          ))}
        </g>
      );
    })}
  </g>
);

export const Garden = ({
  t = 0,
  level = 1,
  variant = 0,
}: {
  t?: number;
  level?: number;
  variant?: number;
}) => (
  <>
    <g
      transform={`translate(${-Math.sin(t * 0.24) * 10} ${(variant % 3) * 42})`}
    >
      <Foliage x={50} y={1160} s={1.6} rotation={33 + Math.sin(t * 0.7)} dark />
      <Foliage
        x={1835}
        y={1210}
        s={1.9}
        rotation={-28 + Math.sin(t * 0.6)}
        dark
      />
      <Flower x={100} y={1110} s={0.96} rotation={-22} />
      <Flower
        x={248}
        y={1210}
        s={1.3}
        rotation={-16 + Math.sin(t * 0.8)}
        blue
      />
      <Foliage x={-70} y={980} s={1.1} rotation={65} />
      <Foliage x={1940} y={1050} s={1.3} rotation={-61} />
      <Flower x={1760} y={1150} s={1.34} rotation={23 + Math.sin(t * 0.7)} />
      <Flower x={1870} y={960} s={0.7} rotation={-14} blue />
    </g>
    {level > 1 && (
      <>
        <Flower x={380} y={1195} s={0.73} rotation={-19} />
        <Flower x={1560} y={1200} s={0.86} rotation={10} blue />
        <Foliage x={390} y={1290} s={1.05} rotation={-24} />
        <Foliage x={1570} y={1320} s={1.1} rotation={35} />
      </>
    )}
  </>
);

export const Palace = ({
  x = 0,
  y = 0,
  s = 1,
}: {
  x?: number;
  y?: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#d-fine)">
    <path
      d="M-210 30V-115L-145-147L-80-116V25M-80 25V-193L0-241L83-193V25M84 25V-114L148-147L210-113V30Z"
      fill="#ffc9b3"
      stroke="#9d6da2"
      strokeWidth="2"
    />
    <path
      d="M-240-113L-145-245L-51-113ZM-103-190L0-358L105-190ZM54-112L148-246L240-112Z"
      fill="url(#d-roof)"
      stroke="#9b5394"
      strokeWidth="2"
    />
    <path
      d="M-145-242V-278M0-358V-403M148-246V-279"
      stroke={D.gold}
      strokeWidth="2"
    />
    <Star x={0} y={-405} r={12} />
    <path d="M-145-278l34 8-34 11M148-279l34 8-34 10" fill={D.mint} />
    <g stroke="#ffd0af" fill="none" opacity=".55">
      {Array.from({ length: 6 }, (_, i) => {
        const yy = -328 + i * 23,
          w = ((yy + 358) / 168) * 105;
        return (
          <g key={i}>
            <path d={`M${-w} ${yy}Q0 ${yy + 7} ${w} ${yy}`} strokeWidth="1.3" />
            {Array.from({ length: Math.floor(w / 13) }, (_, j) => (
              <path
                key={j}
                d={`M${-w + 12 + j * 25} ${yy}q9-14 18 0`}
                strokeWidth=".8"
              />
            ))}
          </g>
        );
      })}
      {[-145, 148].map((xx) => (
        <g key={xx}>
          {Array.from({ length: 4 }, (_, i) => {
            const yy = -220 + i * 25,
              w = ((yy + 245) / 132) * 90;
            return (
              <path
                key={i}
                d={`M${xx - w} ${yy}Q${xx} ${yy + 8} ${xx + w} ${yy}`}
                strokeWidth="1.2"
              />
            );
          })}
        </g>
      ))}
    </g>
    <path
      d="M-215-104H-79M-69-180H70M83-103H213M-218 7H219"
      stroke="#ffe9c1"
      strokeWidth="7"
    />
    {[-145, 0, 148].map((xx, i) => (
      <g key={xx}>
        <path
          d={`M${xx - 24} ${i === 1 ? -142 : -66}v-22a24 24 0 0 1 48 0v22Z`}
          fill="#535293"
          stroke="#e7a28e"
          strokeWidth="4"
        />
        <path
          d={`M${xx - 19} ${i === 1 ? -147 : -71}v-17a19 19 0 0 1 38 0v17Z`}
          fill="#ffe5a0"
        />
        <path
          d={`M${xx} ${i === 1 ? -184 : -108}v37M${xx - 19} ${i === 1 ? -164 : -88}h38`}
          stroke="#b77fa7"
          strokeWidth="2"
        />
      </g>
    ))}
    <path
      d="M-40 25V-39A40 40 0 0 1 40-39V25Z"
      fill="#73548e"
      stroke="#dd9b9f"
      strokeWidth="3"
    />
    <path d="M-27 25V-39A27 27 0 0 1 27-39V25Z" fill="#f6b58d" />
    <path d="M0-67V24" stroke="#9b6c9e" strokeWidth="2" />
    <g transform="translate(0 -117)">
      <circle r="29" fill="#7960a4" stroke="#ffe2a5" strokeWidth="3" />
      <circle r="23" fill="#c8afdf" stroke="#ffc69b" strokeWidth="1" />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d="M0-18V-13"
          transform={`rotate(${i * 45})`}
          stroke="#ffe9b4"
          strokeWidth="2"
        />
      ))}
      <path d="M0-15V0L12 6" fill="none" stroke="#705282" strokeWidth="2.5" />
      <Star r={5} />
    </g>
    <path
      d="M-72-173V18M72-173V18M-202-100V-7M202-100V-7"
      stroke="#e49bad"
      strokeWidth="3"
    />
    <g fill="none" stroke="#b774a1" strokeWidth="1.2">
      <path d="M-69-89Q-50-113-42-89Q-35-69-62-57M69-89Q50-113 42-89Q35-69 62-57M-195-62Q-181-91-174-66M195-62Q181-91 174-66" />
      {[-170, 170].map((xx) => (
        <g key={xx}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${xx} ${-49 + i * 17}q-11-14-13-5q-1 12 13 5q15-13 15-4q-2 12-15 4`}
            />
          ))}
        </g>
      ))}
    </g>
    {[
      [-181, -29],
      [-106, -29],
      [109, -29],
      [183, -29],
    ].map(([xx, yy], i) => (
      <path
        key={i}
        d={`M${xx - 9} ${yy}v-16q9-16 18 0v16Z`}
        fill="#ffd799"
        stroke="#ad7d9b"
      />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <path
        key={i}
        d={`M${-200 + i * 43} 17v23h12V17`}
        fill="#eaa1ab"
        stroke="#bc7d9e"
        strokeWidth="1"
      />
    ))}
    <path
      d="M-224 40H227L239 56H-239Z"
      fill="#ffddad"
      stroke="#af7696"
      strokeWidth="2"
    />
    <path
      d="M-63-206L0-309L62-206M-179-129L-145-203L-108-129M113-129L148-205L184-129"
      fill="none"
      stroke="#ffcbac"
      strokeWidth="1.2"
      opacity=".7"
    />
  </g>
);

export const Island = ({
  x = 0,
  y = 0,
  s = 1,
  castle = false,
}: {
  x?: number;
  y?: number;
  s?: number;
  castle?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M-235 12Q-259 90-157 122L-107 242L-27 153L37 281L91 155L163 193L204 105L247 24Z"
      fill="url(#d-cliff)"
      stroke="#7975b7"
      strokeWidth="2"
    />
    <path
      d="M-157 122L-171 40L-90 63L-107 242M37 281L17 72L96 43L91 155M163 193L137 67L204 105"
      fill="none"
      stroke="#c5a7cc"
      strokeWidth="2"
      opacity=".5"
    />
    <path
      d="M-245 13Q-178-73-80-49Q-21-93 55-52Q181-69 246 14Q231 81 0 82Q-213 74-245 13Z"
      fill="#53c8bb"
      stroke="#b5e9be"
      strokeWidth="2"
    />
    <path
      d="M-218 17Q-93-31 16 7T214 22M-169 47Q-82 18 1 40T139 42"
      fill="none"
      stroke="#ccf2ba"
      strokeWidth="2"
      opacity=".6"
    />
    <path
      d="M-78 62Q-92 131-83 245Q-80 281-101 329L-61 326Q-43 264-55 207Q-66 135-46 66"
      fill="#b1ecf7"
      opacity=".86"
    />
    <path
      d="M-67 72Q-81 149-69 239T-84 321"
      stroke="#f4f8df"
      strokeWidth="5"
      opacity=".75"
      fill="none"
    />
    <ellipse cx="-77" cy="332" rx="67" ry="14" fill="#c1e6f3" opacity=".23" />
    {castle ? (
      <Palace y={-8} s={0.55} />
    ) : (
      <>
        <path d="M-96-17L-54-175L15-17Z" fill="#6fa8b1" stroke="#b4e2c7" />
        <path d="M-54-175L-37-17H15Z" fill="#486f9a" />
        <path d="M-20 6L72-227L165 9Z" fill="#95b9be" stroke="#c2e5cf" />
        <path d="M72-227L95 8H165Z" fill="#5f84a7" />
        <path d="M72-227L37-139L73-155L104-137Z" fill="#e3e8d0" />
        <Foliage x={-159} y={36} s={0.26} rotation={-15} />
        <Flower x={131} y={44} s={0.3} />
      </>
    )}
    <Flower x={-183} y={44} s={0.22} blue />
    <Foliage x={184} y={42} s={0.27} rotation={26} />
  </g>
);

export const Whale = ({
  x = 0,
  y = 0,
  s = 1,
  t = 0,
  city = false,
}: {
  x?: number;
  y?: number;
  s?: number;
  t?: number;
  city?: boolean;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${Math.sin(t * 0.7) * 2}) scale(${s})`}
  >
    <g transform={`rotate(${Math.sin(t * 1.4) * 4} 270 50)`}>
      <path
        d="M251 5Q409-126 478-79Q465-21 352 72Q475 67 496 140Q419 197 282 99Z"
        fill="url(#d-whale)"
        stroke="#454c96"
        strokeWidth="2"
      />
      <path
        d="M302 49Q412-45 462-67M326 81Q425 92 478 138"
        stroke="#b0dbec"
        strokeWidth="2"
        fill="none"
        opacity=".7"
      />
    </g>
    <path
      d="M-405-25C-385-159-221-189-53-141C125-186 239-95 298 34C202 173-11 228-224 148C-333 126-426 72-405-25Z"
      fill="url(#d-whale)"
      stroke="#3f518f"
      strokeWidth="2.5"
      filter="url(#d-shadow)"
    />
    <path
      d="M-399 39Q-305 158-72 164Q123 169 277 65Q186 182-14 194Q-302 201-399 39Z"
      fill="url(#d-belly)"
    />
    {Array.from({ length: 14 }, (_, i) => (
      <path
        key={i}
        d={`M${-371 + i * 17} ${79 + i * 2}Q${-240 + i * 25} ${192 + i * 0.3} ${-119 + i * 27} ${164 + i * 0.1}`}
        fill="none"
        stroke="#6b82b7"
        strokeWidth="1.2"
        opacity=".5"
      />
    ))}
    <path
      d="M-242-71Q-178-149-66-114Q78-142 184-47"
      stroke="#c0f2ed"
      strokeWidth="3"
      fill="none"
      opacity=".5"
    />
    <path
      d="M-303-51Q-132-93 65-54Q159-25 228 27"
      fill="none"
      stroke="#ffdba6"
      strokeWidth="1.4"
      strokeDasharray="3 8"
    />
    <g fill="none" stroke="#93d9e8" opacity=".4" strokeWidth=".8">
      {Array.from({ length: 15 }, (_, i) => {
        const xx = -225 + i * 26,
          yy = -16 + Math.sin(i * 0.5) * 27;
        return (
          <path
            key={i}
            d={`M${xx} ${yy}q12-13 24 0q-12 14-24 0M${xx + 12} ${yy - 7}v14`}
          />
        );
      })}
    </g>
    <g
      transform="translate(52 19) rotate(-18)"
      fill="none"
      stroke="#f3d5b3"
      opacity=".7"
    >
      <ellipse rx="38" ry="16" strokeWidth="1" />
      <circle r="22" strokeWidth="1" />
      <Star r={9} color="#ffe5ad" />
    </g>
    <path
      d="M-142 105Q-104 255 45 286Q72 223-15 127"
      fill="url(#d-whale)"
      stroke="#4a65aa"
      strokeWidth="2"
      transform={`rotate(${Math.sin(t * 1.5) * 5} -100 122)`}
    />
    <path
      d="M-91 140Q-69 220 22 265"
      fill="none"
      stroke="#98dae6"
      strokeWidth="2"
    />
    <path
      d="M-382 43Q-320 71-268 44"
      fill="none"
      stroke="#2c4175"
      strokeWidth="3"
    />
    <ellipse cx="-287" cy="-6" rx="11" ry="12" fill="#28375d" />
    <circle cx="-290" cy="-10" r="3" fill="#fff5c5" />
    <path
      d="M-306-24Q-291-40-275-27"
      fill="none"
      stroke="#5a6f9f"
      strokeWidth="2"
    />
    <ellipse cx="-309" cy="27" rx="20" ry="8" fill="#e4a0c7" opacity=".65" />
    <path
      d="M-71-102L-14-64L65-106L114-53L185-48"
      fill="none"
      stroke="#ffdfad"
      strokeWidth="1.8"
    />
    {[
      [-71, -102],
      [-14, -64],
      [65, -106],
      [114, -53],
      [185, -48],
    ].map(([xx, yy], i) => (
      <Star key={i} x={xx} y={yy} r={i % 2 ? 4 : 7} color={D.gold} />
    ))}
    <path
      d="M-373-18Q-335-78-270-86"
      stroke="#a2e9e1"
      strokeWidth="1.4"
      fill="none"
    />
    {city && (
      <>
        <path
          d="M-184-131Q-54-181 136-129L151-115Q-56-158-198-113Z"
          fill="#67d7c5"
          stroke="#d4eab7"
          strokeWidth="2"
        />
        <Palace x={-15} y={-160} s={0.58} />
        <Flower x={-158} y={-127} s={0.36} />
        <Foliage x={127} y={-117} s={0.4} />
      </>
    )}
  </g>
);

export const Letter = ({
  x = 0,
  y = 0,
  s = 1,
  rotation = 0,
  open = 0,
}: {
  x?: number;
  y?: number;
  s?: number;
  rotation?: number;
  open?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}
    filter="url(#d-shadow)"
  >
    <path
      d={`M-180-100L0 ${-110 - open * 150}L180-100V119H-180Z`}
      fill="#cf81a6"
      stroke="#9362a0"
      strokeWidth="2"
    />
    <g transform={`translate(0 ${-open * 110})`}>
      <path d="M-154-99H154V95H-154Z" fill="url(#d-paper)" stroke="#e3b38c" />
      <path
        d="M-120-66H85M-120-33H120M-120 0H98"
        stroke="#cc98a3"
        strokeWidth="2"
      />
      <path d="M-25 35Q-25 7-3 24Q20-3 35 23Q43 43 0 64Z" fill="#ed7e9e" />
    </g>
    <path
      d="M-180-100L0 35L180-100V119H-180Z"
      fill="url(#d-paper)"
      stroke="#e6b292"
      strokeWidth="2"
    />
    <path
      d="M-180 119L0-9L180 119Z"
      fill="#f8c8a5"
      stroke="#dba0a0"
      strokeWidth="1.5"
    />
    {open < 0.1 && (
      <>
        <path
          d="M-180-100L0 35L180-100Z"
          fill="#ffe6ba"
          stroke="#d2a2a4"
          strokeWidth="2"
        />
        <circle
          cy="30"
          r="25"
          fill="#e95f96"
          stroke="#ffc2ac"
          strokeWidth="3"
        />
        <Star y={30} r={13} />
      </>
    )}
    <path
      d="M118-67H150V-34H118Z"
      fill="#83cbbf"
      stroke="#fff7cc"
      strokeWidth="2"
    />
    <path d="M122-40L132-56L145-40" fill="#ffde9a" />
  </g>
);

export const Couple = ({
  x = 0,
  y = 0,
  s = 1,
  t = 0,
}: {
  x?: number;
  y?: number;
  s?: number;
  t?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy="17" rx="118" ry="18" fill="#262b68" opacity=".2" />
    <g transform={`translate(-48 ${Math.sin(t) * 2}) rotate(-3)`}>
      <path d="M-22-52L-22 5M15-52L22 7" stroke="#eed0bc" strokeWidth="11" />
      <path d="M-32 10Q-14-4-12 15H-34M13 15Q21-8 37 13Z" fill="#7b4d80" />
      <path
        d="M-27-146Q0-165 28-138L46-48Q0-29-43-48Z"
        fill="#f574a8"
        stroke="#a54d8d"
        strokeWidth="2"
      />
      <path d="M-10-133L2-59M12-134L22-60" stroke="#ffbcbd" strokeWidth="2" />
      <path
        d="M24-133Q45-110 59-119"
        stroke="#ffceb7"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M-22-136Q-38-108-53-122"
        stroke="#ffceb7"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M-39-171Q-46-226-4-233Q43-235 36-179L18-141L-33-144Z"
        fill="#423259"
      />
      <ellipse cy="-185" rx="29" ry="36" fill="#ffd6ba" />
      <path
        d="M-32-197Q-17-228 22-209L38-177Q9-181-4-202Q-14-183-32-181Z"
        fill="#49355c"
      />
      <circle cx="14" cy="-181" r="2.5" fill="#46314f" />
      <path
        d="M13-162q7 3 12-2"
        stroke="#be7a87"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M-42-216Q-2-249 42-215L51-202Q-3-215-47-199Z"
        fill="#ffd68e"
        stroke="#dca07f"
        strokeWidth="2"
      />
      <path
        d="M-28-219Q-5-266 23-224"
        fill="#ffc987"
        stroke="#dca07f"
        strokeWidth="2"
      />
      <path d="M-44-207L-55-175L-35-185L-21-174L-15-207" fill="#ff91b1" />
      <path
        d="M-20-146Q3-133 26-145"
        stroke="#ffe2ae"
        strokeWidth="10"
        fill="none"
      />
      <path d="M-17-141Q-39-112-73-119L-80-105Q-32-91-10-132" fill="#ffe5ad" />
    </g>
    <g transform={`translate(54 ${Math.sin(t + 0.8) * 2}) rotate(3)`}>
      <path d="M-21-56L-23 4M15-56L18 6" stroke="#354372" strokeWidth="14" />
      <path
        d="M-35 12Q-24-4-13 11L-10 17H-35M8 16Q18-8 37 13Z"
        fill="#ffd293"
      />
      <path
        d="M-30-142Q0-158 30-138L37-60Q0-42-37-59Z"
        fill="#6fcfd1"
        stroke="#3b9eb6"
        strokeWidth="2"
      />
      <path d="M0-139V-59" stroke="#b5eadb" strokeWidth="2" />
      <path
        d="M-25-132Q-45-109-62-119"
        stroke="#ffceb7"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M25-132Q38-104 41-88"
        stroke="#67b8cf"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cy="-186" rx="31" ry="36" fill="#ffdab9" />
      <path
        d="M-33-180Q-46-229-4-233Q38-235 34-189L20-201L10-192L-6-209Q-16-185-33-180Z"
        fill="#464378"
      />
      <circle cx="-15" cy="-183" r="2.5" fill="#46314f" />
      <path
        d="M-25-163q7 4 12 0"
        stroke="#be7a87"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M-28-145Q-3-131 25-146"
        fill="none"
        stroke="#ffd799"
        strokeWidth="10"
      />
      <path d="M18-140Q55-130 79-149L88-138Q57-112 24-129" fill="#ffca91" />
    </g>
    <path
      d="M-1-117Q0-137 12-117"
      fill="none"
      stroke="#ffdbb2"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M-33-118Q2-82 36-119"
      stroke="#f563a0"
      strokeWidth="2"
      fill="none"
    />
  </g>
);

export const Bridge = ({
  x = 0,
  y = 0,
  s = 1,
}: {
  x?: number;
  y?: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M-620 150Q0-147 620 150V180Q0-90-620 180Z"
      fill="#e1a8b6"
      stroke="#a16b99"
      strokeWidth="2"
    />
    <path
      d="M-620 120Q0-177 620 120M-620 68Q0-229 620 68"
      stroke="#ffe0a8"
      strokeWidth="7"
      fill="none"
    />
    {Array.from({ length: 29 }, (_, i) => {
      const xx = -610 + i * 43.5,
        yy = -80 + (xx * xx) / 1900;
      return (
        <g key={i}>
          <path d={`M${xx} ${yy}v61`} stroke="#efc0ae" strokeWidth="5" />
          <circle cx={xx} cy={yy - 2} r="5" fill="#ffe6a8" />
        </g>
      );
    })}
    <path
      d="M-615 165Q0-123 615 165"
      stroke="#f5d4bc"
      strokeWidth="2"
      fill="none"
    />
  </g>
);

export const Filigree = ({
  x = 0,
  y = 0,
  r = 290,
  t = 0,
}: {
  x?: number;
  y?: number;
  r?: number;
  t?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${t * 2})`}
    fill="none"
    stroke="url(#d-gold)"
  >
    <circle r={r} strokeWidth="9" />
    <circle r={r - 17} strokeWidth="1.3" />
    <circle r={r + 20} strokeWidth="1" />
    <circle r={r + 34} strokeWidth="1" opacity=".5" />
    {Array.from({ length: 48 }, (_, i) => (
      <path
        key={i}
        d={`M0 ${-r - 4}v${i % 4 === 0 ? -25 : -11}`}
        transform={`rotate(${i * 7.5})`}
        strokeWidth={i % 4 === 0 ? 3 : 1.5}
      />
    ))}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <g key={a} transform={`rotate(${a}) translate(0 ${-r - 44})`}>
        <path
          d="M0-21Q25 0 0 21Q-25 0 0-21ZM0-13V13M-11 0H11"
          strokeWidth="1.5"
        />
        <circle cy="-27" r="3" fill={D.gold} />
      </g>
    ))}
    <path
      d={`M${-r * 0.7} ${-r * 0.35}Q0 ${-r * 0.88} ${r * 0.7} ${-r * 0.35}M${-r * 0.7} ${r * 0.35}Q0 ${r * 0.88} ${r * 0.7} ${r * 0.35}`}
      strokeWidth="1"
      opacity=".35"
    />
  </g>
);

export const DreamStage = ({
  children,
  theme = "night",
  t = 0,
}: {
  children: React.ReactNode;
  theme?: string;
  t?: number;
}) => (
  <AbsoluteFill>
    <svg width="1920" height="1080" viewBox="0 0 1920 1080">
      <DreamDefs />
      <Sky theme={theme} t={t} />
      {children}
    </svg>
  </AbsoluteFill>
);

export const Atmosphere = () => {
  const ref = useRef<HTMLCanvasElement>(null),
    tile = useRef<HTMLCanvasElement | null>(null);
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  useLayoutEffect(() => {
    const c = ref.current,
      ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    if (!tile.current) {
      const g = document.createElement("canvas");
      g.width = 960;
      g.height = 540;
      const p = g.getContext("2d");
      if (!p) return;
      for (let i = 0; i < 14000; i++) {
        p.fillStyle = i % 3 ? "rgba(255,241,209,.055)" : "rgba(18,20,64,.08)";
        p.fillRect(
          rnd(i * 4) * 960,
          rnd(i * 4 + 1) * 540,
          0.4 + rnd(i) * 1.1,
          0.45 + rnd(i + 5),
        );
      }
      tile.current = g;
    }
    ctx.clearRect(0, 0, 960, 540);
    ctx.drawImage(tile.current, 0, 0);
    const t = f / fps;
    for (let i = 0; i < 36; i++) {
      const x = ((rnd(i + 8800) * 1040 + t * 7) % 1040) - 40,
        y = rnd(i + 9100) * 560 + Math.sin(t * 0.55 + i) * 12;
      ctx.fillStyle = `rgba(255,232,162,${0.22 + 0.18 * Math.sin(t * 1.2 + i)})`;
      ctx.beginPath();
      ctx.arc(x, y, 0.7 + rnd(i + 300) * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [f, fps]);
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
      }}
    />
  );
};
