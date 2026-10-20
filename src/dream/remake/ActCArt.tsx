import { useCurrentFrame } from "remotion";
import { WarmGift, WarmGlow, WarmLetter, WarmMoon, WarmStar } from "../WarmArt";

export const C = { cream: "#fff1dc", gold: "#ddaa58", peach: "#f6c28b", coral: "#ef8b78", red: "#c94e5b", wine: "#6f3f48", ink: "#4d3030" };

export const Room = ({ fire = 1 }: { fire?: number }) => {
  const f = useCurrentFrame();
  return <g>
    <path d="M0 0H1920V840H0Z" fill="#f4c39c" />
    <path d="M0 0H1920V290H0Z" fill="#ffe7c4" />
    {Array.from({length: 12}, (_, i) => <path key={i} d={`M${i * 180} 300V840`} stroke="#e9b28e" strokeWidth="3" />)}
    <path d="M0 825H1920V1080H0Z" fill="#c87f6a" />
    <path d="M0 825H1920V850H0Z" fill="#9c5b58" />
    {Array.from({length: 5}, (_, i) => <path key={i} d={`M0 ${870 + i * 54}H1920`} stroke="#e7a181" strokeWidth="3" />)}
    <ellipse cx="1000" cy="960" rx="560" ry="110" fill="#bb6065" />
    <ellipse cx="1000" cy="960" rx="500" ry="78" fill="#e8a27f" />
    <path d="M1240 730V438Q1240 290 1395 290Q1550 290 1550 438V730Z" fill="#8b4f59" stroke="#fff0d3" strokeWidth="25" />
    <WarmMoon x={1443} y={421} r={65} />
    <path d="M1250 650Q1390 550 1540 650V719H1250Z" fill="#d58d83" />
    <path d="M1395 300V730M1245 515H1545" stroke="#f4c99e" strokeWidth="13" />
    <path d="M1185 300Q1230 490 1170 740L1260 755Q1320 505 1270 295ZM1610 300Q1560 500 1630 740L1540 755Q1480 490 1520 295Z" fill="#c65c64" />
    <path d="M1190 302H1605" stroke="#ddaA58" strokeWidth="14" strokeLinecap="round" />
    <path d="M175 715V445Q175 415 210 415H615Q650 415 650 445V715Z" fill="#d99077" />
    <path d="M205 712V515Q205 459 260 459H562Q615 459 615 515V712Z" fill="#713e43" />
    <path d="M257 710V550Q257 490 410 490Q562 490 562 550V710Z" fill="#4d3030" />
    <path d="M145 710H680V770H145Z" fill="#e9b58a" />
    <path d="M148 402H675V447H148Z" fill="#ffe4b7" />
    <path d="M215 450V708M607 450V708" stroke="#efb798" strokeWidth="18" />
    <WarmGlow x={410} y={650} r={300} opacity={fire * 0.75} />
    <g opacity={fire}>
      <path d={`M300 695Q279 636 345 ${570 - Math.sin(f / 5) * 18}Q347 614 378 624Q385 535 428 ${505 + Math.sin(f / 7) * 24}Q414 590 470 607Q486 556 508 568Q553 660 518 695Z`} fill="#ec975b" />
      <path d={`M345 697Q322 655 381 608Q375 660 411 ${576 + Math.sin(f / 4) * 15}Q444 644 471 628Q505 672 470 697Z`} fill="#ffe2a0" />
      <path d="M304 703L511 682M328 681L494 709" stroke="#9d5351" strokeWidth="15" strokeLinecap="round" />
    </g>
    <path d="M340 390V335H485V390" fill="#c94e5b" />
    <WarmStar x={412} y={359} r={13} color="#ffe4a4" />
    <path d="M530 445V509Q580 552 600 505V445Z" fill="#c94e5b" stroke="#fff0d3" strokeWidth="10" />
    <g transform="translate(1580 860)">
      <path d="M-190 0H190L220 40H-220Z" fill="#8d4d4d" />
      <path d="M-185 35L-200 190M185 35L202 190" stroke="#85504b" strokeWidth="23" />
      <WarmLetter x={-20} y={-29} s={0.46} rotation={-8} />
      <path d="M130-20V-175" stroke="#9b5651" strokeWidth="10" />
      <path d="M75-175L95-260H165L185-175Z" fill="#ffdf9b" />
      <WarmGlow x={130} y={-190} r={100} opacity={0.7} />
    </g>
    <WarmGift x={270} y={871} s={0.6} />
    <path d="M35 1080Q50 850 120 810Q90 940 165 980Q130 856 217 813Q197 960 230 1080Z" fill="#a66360" />
  </g>;
};

export const Person = ({ x, y, second = false, lean = 0, walk = 0, arm = 0 }: { x: number; y: number; second?: boolean; lean?: number; walk?: number; arm?: number }) => <g transform={`translate(${x} ${y}) rotate(${lean})`}>
  <path d={`M-29 87L${-34 + walk * 22} 170M27 87L${32 - walk * 22} 170`} stroke="#8c4f5a" strokeWidth="24" strokeLinecap="round" />
  <path d={`M${-34 + walk * 22} 170h-27M${32 - walk * 22} 170h27`} stroke="#4d3030" strokeWidth="18" strokeLinecap="round" />
  <path d="M-55-65Q0-92 55-65L49 100Q0 128-49 100Z" fill={second ? "#d6856f" : "#ef8b78"} />
  <path d="M-48-38L-65 44" stroke={second ? "#bf735f" : "#e67d72"} strokeWidth="28" strokeLinecap="round" />
  <circle cy="-128" r="46" fill="#f7c19b" />
  <path d="M-51-130Q-42-195 5-188Q54-191 54-129Q27-153 2-137Q-24-153-51-130Z" fill={second ? "#4d3030" : "#6f3f48"} />
  {!second && <path d="M-46-133Q-68-88-39-62L-31-126Z" fill="#6f3f48" />}
  <circle cx={second ? -14 : 15} cy="-122" r="3.5" fill="#4d3030" />
  <ellipse cx={second ? -28 : 29} cy="-108" rx="11" ry="6" fill="#eb9d87" />
  <path d="M-40-65Q0-42 43-67L40-45Q0-24-43-46Z" fill={second ? "#f6c28b" : "#ffe1ad"} />
  <path d={`M${second ? -40 : 40}-42Q${second ? -49 : 52} ${-10 - arm * 32} ${second ? -73 : 73} ${5 - arm * 70}`} fill="none" stroke="#f7c19b" strokeWidth="19" strokeLinecap="round" />
  <path d="M-4-36V95" stroke={second ? "#b76c5d" : "#d87068"} strokeWidth="4" />
  {[0, 1, 2].map(i => <circle key={i} cx="9" cy={-5 + i * 29} r="4" fill="#ffe4ad" />)}
</g>;

export const Couple = ({ x = 960, y = 740, s = 1, gap = 75, walk = 0, embrace = 0 }: { x?: number; y?: number; s?: number; gap?: number; walk?: number; embrace?: number }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="181" rx="210" ry="25" fill="#6f3f48" opacity="0.16" />
  <Person x={-gap} y={Math.abs(walk) * -4} lean={embrace * 8} walk={walk} arm={embrace} />
  <Person x={gap} y={Math.abs(walk) * -4} second lean={embrace * -8} walk={-walk} arm={embrace} />
  <path d={`M${-gap + 73} ${5 - embrace * 70}Q0 ${24 - embrace * 50} ${gap - 73} ${5 - embrace * 70}`} stroke="#f7c19b" strokeWidth="18" fill="none" strokeLinecap="round" />
</g>;

export const Hillscape = ({ shift = 0, snow = false }: { shift?: number; snow?: boolean }) => <g>
  <path d={`M-100 750L${340 + shift} 365L${700 + shift} 750L${1120 + shift} 315L1920 800V1080H0Z`} fill="#bc7776" />
  <path d={`M${340 + shift} 365L${490 + shift} 532L${393 + shift} 500L${351 + shift} 555L${285 + shift} 504L${191 + shift} 540Z`} fill={snow ? "#ffedce" : "#f1b789"} />
  <path d={`M${1120 + shift} 315L${1305 + shift} 510L${1190 + shift} 471L${1127 + shift} 530L${1060 + shift} 466L${951 + shift} 516Z`} fill={snow ? "#ffedce" : "#f1b789"} />
  <path d="M0 855Q380 625 740 834T1450 815T1920 796V1080H0Z" fill="#de987e" />
  <path d="M0 990Q380 740 800 930T1610 870T1920 944V1080H0Z" fill={snow ? "#f8d3b0" : "#f4bb88"} />
</g>;

export const Sprig = ({ x, y, s = 1, color = "#c46e67" }: { x: number; y: number; s?: number; color?: string }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M0 0Q-8-100 18-200" fill="none" stroke="#ae6b60" strokeWidth="8" />
  {[-1,1].map(side => [0,1,2].map(i => <ellipse key={`${side}${i}`} cx={side * (30 - i * 5)} cy={-42 - i * 55} rx="22" ry="48" transform={`rotate(${side * 48} ${side * (30 - i * 5)} ${-42 - i * 55})`} fill={color} />))}
</g>;

export const House = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-95 0V-125H95V0Z" fill="#e8a183" />
  <path d="M-130-115L0-235L130-115Z" fill="#b85a61" />
  <path d="M-111-128L0-231L107-130" fill="none" stroke="#ffdeb1" strokeWidth="17" />
  <path d="M-25 0V-76Q0-98 25-76V0Z" fill="#854a4f" />
  <path d="M-70-95H-39V-51H-70ZM40-95H71V-51H40Z" fill="#ffe4a1" />
  <path d="M60-190V-239H83V-169Z" fill="#d2846d" />
  <WarmGlow x={0} y={-75} r={135} opacity={0.4} />
</g>;

export const SeasonGarden = ({ season, f = 0 }: { season: number; f?: number }) => <g>
  <path d="M-170 150Q-200-25-130-160Q-100-210-50-230M-165-30Q-260-105-285-185M-150-75Q-40-140-15-210" fill="none" stroke="#9f625c" strokeWidth="18" strokeLinecap="round" />
  {season < 3 ? Array.from({length: 9}, (_, i) => {
    const x = -255 + (i % 3) * 105;
    const y = -180 + Math.floor(i / 3) * 80;
    return <g key={i} transform={`translate(${x + Math.sin(f / 21 + i) * 5} ${y})`}>
      {season === 0 ? <><circle r="34" fill="#f4b2a2" /><circle cx="-26" cy="-6" r="24" fill="#ef8b78" /><circle cx="15" cy="20" r="24" fill="#f4b2a2" /><circle r="9" fill="#fff0b5" /></> : <ellipse rx={season === 1 ? 62 : 38} ry={season === 1 ? 48 : 22} transform={`rotate(${i * 47})`} fill={season === 1 ? "#c99369" : i % 2 ? "#c94e5b" : "#ddaa58"} />}
    </g>;
  }) : <><path d="M-260-165L-190-130M-140-180L-78-203M-205-10L-160 10M-80-120L-30-148" stroke="#fff0ce" strokeWidth="24" strokeLinecap="round" />{Array.from({length: 12}, (_, i) => <circle key={i} cx={-285 + ((i * 97) % 320)} cy={-260 + ((i * 67 + f * 2) % 440)} r={5} fill="#fff4d9" />)}</>}
  <path d="M-320 170Q-110 100 90 170Z" fill={season === 3 ? "#ffebce" : "#edac83"} />
  {season === 1 && <circle cx="40" cy="-220" r="44" fill="#ffe4a0" />}
</g>;
