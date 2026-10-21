import { useCurrentFrame } from "remotion";
import { WarmGift, WarmGlow, WarmLetter, WarmMoon, WarmStar } from "../WarmArt";
import { StoryPerson, StoryCouple } from "../StoryCharacters";

export const C = { cream: "#fffaf4", gold: "#ead7a0", peach: "#f8dfe8", coral: "#e6b8c6", red: "#dca7b8", wine: "#bfa6b1", ink: "#bc9fa5" };

export const Room = ({ fire = 1 }: { fire?: number }) => {
  const f = useCurrentFrame();
  return <g>
    <path d="M0 0H1920V840H0Z" fill="#fffaf4" />
    <path d="M0 0H1920V290H0Z" fill="#fffaf4" />
    {Array.from({length: 12}, (_, i) => <path key={i} d={`M${i * 180} 300V840`} stroke="#f3e5df" strokeWidth="3" />)}
    <path d="M0 825H1920V1080H0Z" fill="#f1d3b5" />
    <path d="M0 825H1920V850H0Z" fill="#dcc4b7" />
    {Array.from({length: 5}, (_, i) => <path key={i} d={`M0 ${870 + i * 54}H1920`} stroke="#f8e6d7" strokeWidth="3" />)}
    <ellipse cx="1000" cy="960" rx="560" ry="110" fill="#e6b8c6" />
    <ellipse cx="1000" cy="960" rx="500" ry="78" fill="#f8dfe8" />
    <path d="M1240 730V438Q1240 290 1395 290Q1550 290 1550 438V730Z" fill="#e9c5d2" stroke="#fffaf4" strokeWidth="25" />
    <WarmMoon x={1443} y={421} r={65} />
    <path d="M1250 650Q1390 550 1540 650V719H1250Z" fill="#fce2d8" />
    <path d="M1395 300V730M1245 515H1545" stroke="#fffaf4" strokeWidth="13" />
    <path d="M1185 300Q1230 490 1170 740L1260 755Q1320 505 1270 295ZM1610 300Q1560 500 1630 740L1540 755Q1480 490 1520 295Z" fill="#f8dfe8" />
    <path d="M1190 302H1605" stroke="#ead7a0" strokeWidth="14" strokeLinecap="round" />
    <path d="M175 715V445Q175 415 210 415H615Q650 415 650 445V715Z" fill="#f1d3b5" />
    <path d="M205 712V515Q205 459 260 459H562Q615 459 615 515V712Z" fill="#dbc1c4" />
    <path d="M257 710V550Q257 490 410 490Q562 490 562 550V710Z" fill="#bc9fa5" />
    <path d="M145 710H680V770H145Z" fill="#f5e5d4" />
    <path d="M148 402H675V447H148Z" fill="#fffaf4" />
    <path d="M215 450V708M607 450V708" stroke="#fce2d8" strokeWidth="18" />
    <WarmGlow x={410} y={650} r={300} opacity={fire * 0.75} />
    <g opacity={fire}>
      <path d={`M300 695Q279 636 345 ${570 - Math.sin(f / 5) * 18}Q347 614 378 624Q385 535 428 ${505 + Math.sin(f / 7) * 24}Q414 590 470 607Q486 556 508 568Q553 660 518 695Z`} fill="#f0c8ae" />
      <path d={`M345 697Q322 655 381 608Q375 660 411 ${576 + Math.sin(f / 4) * 15}Q444 644 471 628Q505 672 470 697Z`} fill="#fff4ce" />
      <path d="M304 703L511 682M328 681L494 709" stroke="#c9aaa2" strokeWidth="15" strokeLinecap="round" />
    </g>
    <path d="M340 390V335H485V390" fill="#dca7b8" />
    <WarmStar x={412} y={359} r={13} color="#fff4ce" />
    <path d="M530 445V509Q580 552 600 505V445Z" fill="#dca7b8" stroke="#fffaf4" strokeWidth="10" />
    <g transform="translate(1580 860)">
      <path d="M-190 0H190L220 40H-220Z" fill="#c9b0a6" />
      <path d="M-185 35L-200 190M185 35L202 190" stroke="#c9b0a6" strokeWidth="23" />
      <WarmLetter x={-20} y={-29} s={0.46} rotation={-8} />
      <path d="M130-20V-175" stroke="#c9b0a6" strokeWidth="10" />
      <path d="M75-175L95-260H165L185-175Z" fill="#fff4ce" />
      <WarmGlow x={130} y={-190} r={100} opacity={0.7} />
    </g>
    <WarmGift x={270} y={871} s={0.6} />
    <path d="M35 1080Q50 850 120 810Q90 940 165 980Q130 856 217 813Q197 960 230 1080Z" fill="#c9d8bd" />
  </g>;
};

export const Person = ({ x, y, second = false, lean = 0, walk = 0, arm = 0 }: { x: number; y: number; second?: boolean; lean?: number; walk?: number; arm?: number }) => <StoryPerson x={x} y={y} girl={!second} lean={lean} walk={walk} arm={arm} face={second ? -1 : 1} />;

export const Couple = ({ x = 960, y = 740, s = 1, gap = 75, walk = 0, embrace = 0, boyHandLeft }: { x?: number; y?: number; s?: number; gap?: number; walk?: number; embrace?: number; boyHandLeft?: {x:number;y:number} }) => {
  return <StoryCouple x={x} y={y} s={s} gap={gap} walk={walk} embrace={embrace} boyHandLeft={boyHandLeft}/>;
};

export const Hillscape = ({ shift = 0, snow = false }: { shift?: number; snow?: boolean }) => <g>
  <path d={`M-100 750L${340 + shift} 365L${700 + shift} 750L${1120 + shift} 315L1920 800V1080H0Z`} fill="#e6b8c6" />
  <path d={`M${340 + shift} 365L${490 + shift} 532L${393 + shift} 500L${351 + shift} 555L${285 + shift} 504L${191 + shift} 540Z`} fill={snow ? "#fffaf4" : "#fce2d8"} />
  <path d={`M${1120 + shift} 315L${1305 + shift} 510L${1190 + shift} 471L${1127 + shift} 530L${1060 + shift} 466L${951 + shift} 516Z`} fill={snow ? "#fffaf4" : "#fce2d8"} />
  <path d="M0 855Q380 625 740 834T1450 815T1920 796V1080H0Z" fill="#d8ddce" />
  <path d="M0 990Q380 740 800 930T1610 870T1920 944V1080H0Z" fill={snow ? "#fffaf4" : "#c9d8bd"} />
</g>;

export const Sprig = ({ x, y, s = 1, color = "#c9d8bd" }: { x: number; y: number; s?: number; color?: string }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M0 0Q-8-100 18-200" fill="none" stroke="#c7b3a8" strokeWidth="8" />
  {[-1,1].map(side => [0,1,2].map(i => <ellipse key={`${side}${i}`} cx={side * (30 - i * 5)} cy={-42 - i * 55} rx="22" ry="48" transform={`rotate(${side * 48} ${side * (30 - i * 5)} ${-42 - i * 55})`} fill={color} />))}
</g>;

export const House = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-95 0V-125H95V0Z" fill="#fce2d8" />
  <path d="M-130-115L0-235L130-115Z" fill="#e6b8c6" />
  <path d="M-111-128L0-231L107-130" fill="none" stroke="#fffaf4" strokeWidth="17" />
  <path d="M-25 0V-76Q0-98 25-76V0Z" fill="#c4aab1" />
  <path d="M-70-95H-39V-51H-70ZM40-95H71V-51H40Z" fill="#fff4ce" />
  <path d="M60-190V-239H83V-169Z" fill="#efd3c8" />
  <WarmGlow x={0} y={-75} r={135} opacity={0.4} />
</g>;

export const SeasonGarden = ({ season, f = 0 }: { season: number; f?: number }) => <g>
  <path d="M-170 150Q-200-25-130-160Q-100-210-50-230M-165-30Q-260-105-285-185M-150-75Q-40-140-15-210" fill="none" stroke="#c1aaa4" strokeWidth="18" strokeLinecap="round" />
  {season < 3 ? Array.from({length: 9}, (_, i) => {
    const x = -255 + (i % 3) * 105;
    const y = -180 + Math.floor(i / 3) * 80;
    return <g key={i} transform={`translate(${x + Math.sin(f / 21 + i) * 5} ${y})`}>
      {season === 0 ? <><circle r="34" fill="#f8dfe8" /><circle cx="-26" cy="-6" r="24" fill="#e6b8c6" /><circle cx="15" cy="20" r="24" fill="#f8dfe8" /><circle r="9" fill="#fff4ce" /></> : <ellipse rx={season === 1 ? 62 : 38} ry={season === 1 ? 48 : 22} transform={`rotate(${i * 47})`} fill={season === 1 ? "#c9d8bd" : i % 2 ? "#dca7b8" : "#ead7a0"} />}
    </g>;
  }) : <><path d="M-260-165L-190-130M-140-180L-78-203M-205-10L-160 10M-80-120L-30-148" stroke="#fffaf4" strokeWidth="24" strokeLinecap="round" />{Array.from({length: 12}, (_, i) => <circle key={i} cx={-285 + ((i * 97) % 320)} cy={-260 + ((i * 67 + f * 2) % 440)} r={5} fill="#fffaf4" />)}</>}
  <path d="M-320 170Q-110 100 90 170Z" fill={season === 3 ? "#fffaf4" : "#fce2d8"} />
  {season === 1 && <circle cx="40" cy="-220" r="44" fill="#fff4ce" />}
</g>;
