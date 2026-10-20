import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import {
  WarmGlow,
  WarmStage,
  WarmStar,
  useSharedDefinitions,
} from "../WarmArt";
import { D, smooth } from "../palette";
import { StoryPerson } from "../StoryCharacters";

export const useMoment = (duration: number) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1, duration - 1);
  return { f, p, e: smooth(p * 1.7) };
};

export const ActADefs = () => (
  <defs>
    <linearGradient id="a-day" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="#fffaf4" />
      <stop offset="0.55" stopColor="#fce2d8" />
      <stop offset="1" stopColor="#f8dfe8" />
    </linearGradient>
    <linearGradient id="a-pink-evening" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="#f8dfe8" />
      <stop offset="0.65" stopColor="#e9c5d2" />
      <stop offset="1" stopColor="#fce2d8" />
    </linearGradient>
    <pattern id="a-fleck" width="79" height="67" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="11" r="1" fill="#c2afb2" opacity="0.08" />
      <circle cx="48" cy="39" r="1.4" fill="#f8f4ec" opacity="0.42" />
      <path
        d="M29 54h3M65 17h2"
        stroke="#d7c7be"
        strokeWidth="1"
        opacity="0.1"
      />
    </pattern>
    <linearGradient id="a-skin" x1="0" y1="0" x2="0.7" y2="1">
      <stop stopColor="#fce1ce" />
      <stop offset="1" stopColor="#edc8b7" />
    </linearGradient>
    <linearGradient id="a-page" x1="0" y1="0" x2="1" y2="0">
      <stop stopColor="#e9dccf" />
      <stop offset="0.12" stopColor="#f7f4e7" />
      <stop offset="0.8" stopColor="#f3ecde" />
      <stop offset="1" stopColor="#e1d3c8" />
    </linearGradient>
    <radialGradient id="a-glass">
      <stop stopColor="#f6f2e6" stopOpacity="0.12" />
      <stop offset="0.8" stopColor="#ede2d3" stopOpacity="0.45" />
      <stop offset="1" stopColor="#f5f1e3" stopOpacity="0.85" />
    </radialGradient>
  </defs>
);

export const Stage = ({
  children,
  night = false,
}: {
  children: ReactNode;
  night?: boolean;
}) => {
  const sharedDefinitions = useSharedDefinitions();
  return (
    <WarmStage theme={night ? "night" : "paper"}>
      {!sharedDefinitions && <ActADefs />}
      <rect
        width="1920"
        height="1080"
        fill={night ? "url(#a-pink-evening)" : "url(#a-day)"}
      />
      {children}
      <rect
        width="1920"
        height="1080"
        fill="url(#a-fleck)"
        pointerEvents="none"
      />
    </WarmStage>
  );
};

export const Dust = ({
  f,
  count = 24,
  y = 330,
}: {
  f: number;
  count?: number;
  y?: number;
}) => (
  <g>
    {Array.from({ length: count }, (_, i) => (
      <WarmStar
        key={i}
        x={110 + ((i * 277) % 1700)}
        y={y + ((i * 139 - f * (0.5 + (i % 3)) + 2000) % 620)}
        r={2 + (i % 3)}
        color={D.cream}
        rotate={i * 17 + f * 0.3}
      />
    ))}
  </g>
);

export const Sprig = ({
  x,
  y,
  s = 1,
  flip = false,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M0 0Q-5-130 77-247" stroke="#d0c0be" strokeWidth="7" fill="none" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i} transform={`translate(${i * 8} ${-i * 36}) rotate(${i * 5})`}>
        <path
          d="M0 0Q-75-5-61-57Q-16-55 0 0Z"
          fill={i % 2 ? "#c9d8bd" : "#dde5d2"}
        />
        <path
          d="M4-7Q67-68 84-26Q63 14 4-7Z"
          fill={i % 2 ? "#b9cbaa" : "#d1ddc4"}
        />
      </g>
    ))}
    <g transform="translate(76 -248)">
      <circle r="24" fill="#dfa5b2" />
      <circle cx="-15" cy="-6" r="13" fill="#e8d0cb" />
      <circle cx="10" cy="-9" r="9" fill="#f0e4d5" />
    </g>
  </g>
);

export const House = ({
  x,
  y,
  s = 1,
  color = D.red,
  snow = true,
  tower = false,
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
  snow?: boolean;
  tower?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-93-10H95V174H-93Z" fill={color} />
    <path d="M-77 7H77V174H-77Z" fill="#ebddd1" opacity="0.4" />
    <path d="M-116-4L0-117L117-4Z" fill="#cba6b3" />
    {snow && <path d="M-121-5L0-125L123-5L91-8L0-91L-85-8Z" fill="#f6f1e5" />}
    <path d="M51-74V-133H77V-47" fill="#cfbebe" />
    <path
      d="M45-134H82"
      stroke="#f5efe3"
      strokeWidth="13"
      strokeLinecap="round"
    />
    {[-52, 27].map((xx) => (
      <g key={xx}>
        <rect x={xx} y="22" width="29" height="43" rx="13" fill="#efe6d3" />
        <path
          d={`M${xx + 14} 23V65M${xx} 43H${xx + 29}`}
          stroke="#d3c2bf"
          strokeWidth="4"
        />
      </g>
    ))}
    <path d="M-25 174V111Q0 82 25 111V174" fill="#cba6b3" />
    <circle cx="12" cy="143" r="3" fill="#eee3d4" />
    <path
      d="M-110 176H108"
      stroke="#f6f1e6"
      strokeWidth="15"
      strokeLinecap="round"
    />
    {tower && (
      <g transform="translate(0 -116)">
        <path d="M-27 7V-122H27V7" fill="#ebdfd1" />
        <path d="M-45-122L0-205L45-122Z" fill="#dfa5b2" />
        <circle cy="-74" r="20" fill="#f4eee1" />
        <path d="M0-74V-89M0-74L11-68" stroke="#c8b8bb" strokeWidth="3" />
        <path d="M0-205V-228" stroke="#dfd4c2" strokeWidth="5" />
      </g>
    )}
  </g>
);

export const Pine = ({
  x,
  y,
  s = 1,
  snow = true,
}: {
  x: number;
  y: number;
  s?: number;
  snow?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-9 10V-190H9V10" fill="#cebebc" />
    <path
      d="M0-310L-75-170H-47L-108-65H-69L-132 32H132L69-65H108L47-170H75Z"
      fill="#c9d8bd"
    />
    {snow && (
      <path
        d="M0-310L-48-222Q0-197 48-222ZM-56-159L-83-109Q0-78 83-109L56-159Q0-136-56-159ZM-81-48L-109 0Q0 28 109 0L81-48Q0-19-81-48Z"
        fill="#f3ece1"
      />
    )}
    {[0, 1, 2, 3, 4].map((i) => (
      <circle
        key={i}
        cx={Math.sin(i * 5) * (20 + i * 14)}
        cy={-225 + i * 43}
        r="6"
        fill="#e8dbc9"
      />
    ))}
  </g>
);

export const Ground = ({ snow = false }: { snow?: boolean }) => (
  <>
    <path
      d="M0 854Q260 737 594 839T1186 815T1920 825V1080H0Z"
      fill={snow ? "#f8dfe8" : "#f1d3b5"}
    />
    <path
      d="M0 940Q383 852 798 926T1510 895T1920 933V1080H0Z"
      fill={snow ? "#fffaf4" : "#fce2d8"}
    />
  </>
);

export const Book = ({
  x = 960,
  y = 775,
  s = 1,
  open = 1,
}: {
  x?: number;
  y?: number;
  s?: number;
  open?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#warm-shadow)">
    <path
      d="M-420 58Q-198 9 0 67Q195 9 420 58L439 89Q220 48 0 103Q-220 48-439 89Z"
      fill="#cdbabb"
    />
    <path
      d="M-407-104Q-195-174 0-87Q195-174 407-104V55Q200 1 0 69Q-200 1-407 55Z"
      fill="#e5d9cd"
    />
    <g transform={`scale(${0.07 + open * 0.93} 1)`}>
      <path
        d="M-412-126Q-195-197 0-101V56Q-199-19-412 36Z"
        fill="url(#a-page)"
      />
      <path d="M412-126Q195-197 0-101V56Q199-19 412 36Z" fill="url(#a-page)" />
      <path d="M0-101V56" stroke="#d9cdc4" strokeWidth="7" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M-365 ${-79 + i * 26}Q-220 ${-119 + i * 26} -65 ${-66 + i * 26}M65 ${-66 + i * 26}Q220 ${-119 + i * 26} 365 ${-79 + i * 26}`}
          stroke="#dbcec8"
          strokeWidth="3"
          opacity="0.5"
          fill="none"
        />
      ))}
    </g>
    <path d="M20 74L71 172L95 125L142 130L99 59Z" fill="#dfa5b2" />
    <path d="M27 81L76 145" stroke="#eedfcf" strokeWidth="3" />
  </g>
);

export const Gift = ({
  x,
  y,
  s = 1,
  lift = 0,
  rotate = 0,
}: {
  x: number;
  y: number;
  s?: number;
  lift?: number;
  rotate?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}
    filter="url(#warm-shadow)"
  >
    <path d="M-131-5H131V146Q0 174-131 146Z" fill="url(#warm-red)" />
    <path
      d="M-119 10V134Q0 155 119 134"
      fill="none"
      stroke="#f0dcd5"
      strokeWidth="4"
    />
    <path d="M-22 0V155H22V0" fill="url(#warm-gold)" />
    {[-83, 78].map((xx) => (
      <g key={xx}>
        {[38, 87, 123].map((yy) => (
          <WarmStar key={yy} x={xx} y={yy} r={4} color="#eee3d4" />
        ))}
      </g>
    ))}
    <ellipse cy="-1" rx="120" ry="17" fill="#c5afb2" />
    <g
      transform={`translate(${lift * 25} ${-lift * 175}) rotate(${-lift * 8})`}
    >
      <path d="M-147-44Q0-65 147-44V0Q0 21-147 0Z" fill="#e5cfcb" />
      <path
        d="M-147-40Q0-22 147-40"
        stroke="#f1e8d7"
        strokeWidth="9"
        fill="none"
      />
      <path d="M-24-49H24V11H-24Z" fill="#f0e5d4" />
      <path
        d="M0-50C-97-143-137-39-9-48C99-147 144-41 10-48"
        fill="#e9dcca"
        stroke="#daccbf"
        strokeWidth="5"
      />
    </g>
  </g>
);

export const Person = ({
  x,
  y,
  s = 1,
  variant = 0,
  walk = 0,
  face = 1,
}: {
  x: number;
  y: number;
  s?: number;
  variant?: number;
  walk?: number;
  face?: number;
}) => (
  <StoryPerson
    x={x}
    y={y}
    s={s * (155 / 180)}
    girl={variant === 0}
    walk={walk}
    face={face}
  />
);

export const Bell = ({
  x,
  y,
  s = 1,
  tilt = 0,
}: {
  x: number;
  y: number;
  s?: number;
  tilt?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
    <path
      d="M-47 40Q-34 23-34-10Q-34-52 0-54Q34-52 34-10Q34 23 47 40Z"
      fill="url(#warm-gold)"
    />
    <ellipse cy="40" rx="47" ry="12" fill="#d4c6bc" />
    <circle cy="46" r="12" fill="#f1e8d7" />
    <path
      d="M-22-19Q-26-37-10-42"
      stroke="#f3efde"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M-9-55Q-22-89 0-84Q22-89 9-55"
      stroke="#dfd4c2"
      strokeWidth="6"
      fill="none"
    />
    <path d="M0-65C-61-114-62-54-3-66C63-112 60-54 4-66" fill="#dfa5b2" />
  </g>
);

export const MiniWorld = ({
  x,
  y,
  s = 1,
  kind = 0,
  f = 0,
}: {
  x: number;
  y: number;
  s?: number;
  kind?: number;
  f?: number;
}) => (
  <g
    transform={`translate(${x} ${y + Math.sin(f / 27 + kind) * 9}) scale(${s})`}
  >
    <WarmGlow x={0} y={0} r={190} opacity={0.5} />
    <circle
      r="132"
      fill={kind % 2 ? "#ede2d3" : "#ede5d8"}
      stroke="#f4ede0"
      strokeWidth="5"
    />
    <path
      d="M-128 35Q-60-24 0 15T128 34Q100 121 0 130Q-100 118-128 35"
      fill={kind % 2 ? "#e0cfc9" : "#dccdc9"}
    />
    {kind % 3 === 0 ? (
      <>
        <House x={7} y={-12} s={0.45} snow={false} />
        <Pine x={-75} y={55} s={0.25} snow={false} />
      </>
    ) : kind % 3 === 1 ? (
      <>
        <path d="M-110 44L-55-67L4 39L50-81L117 44Z" fill="#d5c5c3" />
        <path
          d="M-55-67L-28-15L-53-27L-74-15ZM50-81L77-27L47-39L24-28Z"
          fill="#f3ebdd"
        />
      </>
    ) : (
      <>
        <path d="M-103 30Q0-53 103 30V48Q0-29-103 48Z" fill="#d5c4c2" />
        <path
          d="M-100 12Q0-70 100 12"
          stroke="#f1e8d8"
          strokeWidth="6"
          fill="none"
        />
        <circle cy="-57" r="28" fill="#f2ebd9" />
      </>
    )}
    <path
      d="M-83-75Q-38-118 3-111"
      stroke="#f6f2e6"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
      opacity="0.8"
    />
    <circle r="132" fill="url(#a-glass)" />
  </g>
);
