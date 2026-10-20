import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { WarmGlow, WarmStage, WarmStar } from "../WarmArt";
import { D, smooth } from "../palette";

export const useMoment = (duration: number) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1, duration - 1);
  return { f, p, e: smooth(p * 1.7) };
};

export const Stage = ({
  children,
  night = false,
}: {
  children: ReactNode;
  night?: boolean;
}) => (
  <WarmStage theme={night ? "night" : "paper"}>
    <defs>
      <pattern
        id="a-fleck"
        width="79"
        height="67"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="8" cy="11" r="1" fill="#6f3f48" opacity="0.08" />
        <circle cx="48" cy="39" r="1.4" fill="#fffaf0" opacity="0.42" />
        <path
          d="M29 54h3M65 17h2"
          stroke="#c4774f"
          strokeWidth="1"
          opacity="0.1"
        />
      </pattern>
      <linearGradient id="a-skin" x1="0" y1="0" x2="0.7" y2="1">
        <stop stopColor="#ffe0b5" />
        <stop offset="1" stopColor="#eaaa87" />
      </linearGradient>
      <linearGradient id="a-page" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#f0bc83" />
        <stop offset="0.12" stopColor="#fff9df" />
        <stop offset="0.8" stopColor="#ffe7bc" />
        <stop offset="1" stopColor="#dca16e" />
      </linearGradient>
      <radialGradient id="a-glass">
        <stop stopColor="#fff6d8" stopOpacity="0.12" />
        <stop offset="0.8" stopColor="#f8ce94" stopOpacity="0.45" />
        <stop offset="1" stopColor="#fff4d0" stopOpacity="0.85" />
      </radialGradient>
    </defs>
    {children}
    <rect
      width="1920"
      height="1080"
      fill="url(#a-fleck)"
      pointerEvents="none"
    />
  </WarmStage>
);

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
    <path d="M0 0Q-5-130 77-247" stroke="#a96155" strokeWidth="7" fill="none" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i} transform={`translate(${i * 8} ${-i * 36}) rotate(${i * 5})`}>
        <path
          d="M0 0Q-75-5-61-57Q-16-55 0 0Z"
          fill={i % 2 ? "#d6866e" : "#e9ac7f"}
        />
        <path
          d="M4-7Q67-68 84-26Q63 14 4-7Z"
          fill={i % 2 ? "#c97368" : "#f0c18b"}
        />
      </g>
    ))}
    <g transform="translate(76 -248)">
      <circle r="24" fill="#c94e5b" />
      <circle cx="-15" cy="-6" r="13" fill="#ef8b78" />
      <circle cx="10" cy="-9" r="9" fill="#ffd29b" />
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
    <path d="M-77 7H77V174H-77Z" fill="#f4bb8a" opacity="0.4" />
    <path d="M-116-4L0-117L117-4Z" fill="#713e47" />
    {snow && <path d="M-121-5L0-125L123-5L91-8L0-91L-85-8Z" fill="#fff2d6" />}
    <path d="M51-74V-133H77V-47" fill="#a65758" />
    <path
      d="M45-134H82"
      stroke="#ffefd0"
      strokeWidth="13"
      strokeLinecap="round"
    />
    {[-52, 27].map((xx) => (
      <g key={xx}>
        <rect x={xx} y="22" width="29" height="43" rx="13" fill="#ffdc91" />
        <path
          d={`M${xx + 14} 23V65M${xx} 43H${xx + 29}`}
          stroke="#b36757"
          strokeWidth="4"
        />
      </g>
    ))}
    <path d="M-25 174V111Q0 82 25 111V174" fill="#713e47" />
    <circle cx="12" cy="143" r="3" fill="#ffd493" />
    <path
      d="M-110 176H108"
      stroke="#fff3db"
      strokeWidth="15"
      strokeLinecap="round"
    />
    {tower && (
      <g transform="translate(0 -116)">
        <path d="M-27 7V-122H27V7" fill="#f3c58b" />
        <path d="M-45-122L0-205L45-122Z" fill="#c94e5b" />
        <circle cy="-74" r="20" fill="#ffedc7" />
        <path d="M0-74V-89M0-74L11-68" stroke="#88515a" strokeWidth="3" />
        <path d="M0-205V-228" stroke="#ddaa58" strokeWidth="5" />
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
    <path d="M-9 10V-190H9V10" fill="#a15c53" />
    <path
      d="M0-310L-75-170H-47L-108-65H-69L-132 32H132L69-65H108L47-170H75Z"
      fill="#8c4f5a"
    />
    {snow && (
      <path
        d="M0-310L-48-222Q0-197 48-222ZM-56-159L-83-109Q0-78 83-109L56-159Q0-136-56-159ZM-81-48L-109 0Q0 28 109 0L81-48Q0-19-81-48Z"
        fill="#fce8c8"
      />
    )}
    {[0, 1, 2, 3, 4].map((i) => (
      <circle
        key={i}
        cx={Math.sin(i * 5) * (20 + i * 14)}
        cy={-225 + i * 43}
        r="6"
        fill="#f4bd6d"
      />
    ))}
  </g>
);

export const Ground = ({ snow = false }: { snow?: boolean }) => (
  <>
    <path
      d="M0 854Q260 737 594 839T1186 815T1920 825V1080H0Z"
      fill={snow ? "#f9d9b7" : "#eab084"}
    />
    <path
      d="M0 940Q383 852 798 926T1510 895T1920 933V1080H0Z"
      fill={snow ? "#ffefd7" : "#f6c99a"}
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
      fill="#9c4e54"
    />
    <path
      d="M-407-104Q-195-174 0-87Q195-174 407-104V55Q200 1 0 69Q-200 1-407 55Z"
      fill="#e4b17f"
    />
    <g transform={`scale(${0.07 + open * 0.93} 1)`}>
      <path
        d="M-412-126Q-195-197 0-101V56Q-199-19-412 36Z"
        fill="url(#a-page)"
      />
      <path d="M412-126Q195-197 0-101V56Q199-19 412 36Z" fill="url(#a-page)" />
      <path d="M0-101V56" stroke="#c68c65" strokeWidth="7" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M-365 ${-79 + i * 26}Q-220 ${-119 + i * 26} -65 ${-66 + i * 26}M65 ${-66 + i * 26}Q220 ${-119 + i * 26} 365 ${-79 + i * 26}`}
          stroke="#c98e72"
          strokeWidth="3"
          opacity="0.5"
          fill="none"
        />
      ))}
    </g>
    <path d="M20 74L71 172L95 125L142 130L99 59Z" fill="#c94e5b" />
    <path d="M27 81L76 145" stroke="#ffc582" strokeWidth="3" />
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
      stroke="#ffb49a"
      strokeWidth="4"
    />
    <path d="M-22 0V155H22V0" fill="url(#warm-gold)" />
    {[-83, 78].map((xx) => (
      <g key={xx}>
        {[38, 87, 123].map((yy) => (
          <WarmStar key={yy} x={xx} y={yy} r={4} color="#fbd196" />
        ))}
      </g>
    ))}
    <ellipse cy="-1" rx="120" ry="17" fill="#7b3c45" />
    <g
      transform={`translate(${lift * 25} ${-lift * 175}) rotate(${-lift * 8})`}
    >
      <path d="M-147-44Q0-65 147-44V0Q0 21-147 0Z" fill="#e78878" />
      <path
        d="M-147-40Q0-22 147-40"
        stroke="#ffdf9f"
        strokeWidth="9"
        fill="none"
      />
      <path d="M-24-49H24V11H-24Z" fill="#ffd597" />
      <path
        d="M0-50C-97-143-137-39-9-48C99-147 144-41 10-48"
        fill="#f3bc73"
        stroke="#cc8b51"
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
  <g transform={`translate(${x} ${y}) scale(${s * face} ${s})`}>
    <ellipse cy="155" rx="70" ry="13" fill="#82444b" opacity="0.13" />
    <path
      d={`M-26 62L${-27 + Math.sin(walk) * 12} 143M26 62L${26 - Math.sin(walk) * 12} 143`}
      fill="none"
      stroke="#76454d"
      strokeWidth="24"
      strokeLinecap="round"
    />
    <path
      d={`M${-30 + Math.sin(walk) * 12} 142h-24M${25 - Math.sin(walk) * 12} 142h24`}
      stroke="#4d3030"
      strokeWidth="14"
      strokeLinecap="round"
    />
    <path
      d="M-48-69Q0-89 48-69L58 67Q0 87-58 67Z"
      fill={variant ? "#c99a68" : "#dc7c70"}
    />
    <path
      d="M-48-66L-62 25M45-61L58 26"
      stroke={variant ? "#bb8a5f" : "#d26c65"}
      strokeWidth="24"
      strokeLinecap="round"
    />
    <circle cx="-62" cy="29" r="13" fill="url(#a-skin)" />
    <circle cx="58" cy="29" r="13" fill="url(#a-skin)" />
    <circle cy="-122" r="43" fill="url(#a-skin)" />
    <path
      d={
        variant
          ? "M-45-116Q-61-181 0-180Q51-180 48-120L30-143Q2-119-14-150L-31-117Z"
          : "M-45-107Q-65-159-25-178Q36-201 48-137L31-144Q7-110-25-137L-32-88Z"
      }
      fill={variant ? "#654048" : "#7c454a"}
    />
    <circle cx="17" cy="-123" r="3.4" fill="#57363a" />
    <ellipse cx="25" cy="-110" rx="9" ry="5" fill="#e99682" />
    <path
      d="M9-100Q18-95 25-102"
      stroke="#a86259"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M-39-80Q-3-64 39-80L37-55Q0-43-41-62Z"
      fill={variant ? "#f3c38f" : "#ffe0ad"}
    />
    <path
      d="M-15-56L-26 13L-8 21L9-52"
      fill={variant ? "#f3c38f" : "#ffe0ad"}
    />
    <path d="M-9-42V60" stroke="#f7ba91" strokeWidth="3" opacity="0.6" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx="5" cy={-20 + i * 27} r="3" fill="#ffe0ad" />
    ))}
  </g>
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
    <ellipse cy="40" rx="47" ry="12" fill="#bb7849" />
    <circle cy="46" r="12" fill="#ffe0a1" />
    <path
      d="M-22-19Q-26-37-10-42"
      stroke="#fff0ba"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M-9-55Q-22-89 0-84Q22-89 9-55"
      stroke="#ddaa58"
      strokeWidth="6"
      fill="none"
    />
    <path d="M0-65C-61-114-62-54-3-66C63-112 60-54 4-66" fill="#c94e5b" />
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
      fill={kind % 2 ? "#f8cb93" : "#f4d7a5"}
      stroke="#ffeac2"
      strokeWidth="5"
    />
    <path
      d="M-128 35Q-60-24 0 15T128 34Q100 121 0 130Q-100 118-128 35"
      fill={kind % 2 ? "#d78b74" : "#c98675"}
    />
    {kind % 3 === 0 ? (
      <>
        <House x={7} y={-12} s={0.45} snow={false} />
        <Pine x={-75} y={55} s={0.25} snow={false} />
      </>
    ) : kind % 3 === 1 ? (
      <>
        <path d="M-110 44L-55-67L4 39L50-81L117 44Z" fill="#b76e65" />
        <path
          d="M-55-67L-28-15L-53-27L-74-15ZM50-81L77-27L47-39L24-28Z"
          fill="#ffe6b7"
        />
      </>
    ) : (
      <>
        <path d="M-103 30Q0-53 103 30V48Q0-29-103 48Z" fill="#b96861" />
        <path
          d="M-100 12Q0-70 100 12"
          stroke="#ffdfa7"
          strokeWidth="6"
          fill="none"
        />
        <circle cy="-57" r="28" fill="#ffe7a9" />
      </>
    )}
    <path
      d="M-83-75Q-38-118 3-111"
      stroke="#fff5d8"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
      opacity="0.8"
    />
    <circle r="132" fill="url(#a-glass)" />
  </g>
);
