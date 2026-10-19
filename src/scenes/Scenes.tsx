import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SERIF, clamp, ease, range, rand } from "../design";
import {
  Stage,
  Envelope,
  Sprig,
  Fern,
  Daisy,
  Bird,
  Book,
  Stamp,
  Postmark,
  Star,
  LittleCloud,
  DistantHills,
  SideNote,
} from "../art/PaperWorld";

const Dust = ({ count = 18, time = 0 }: { count?: number; time?: number }) => (
  <g>
    {Array.from({ length: count }, (_, i) => (
      <g
        key={i}
        transform={`translate(${100 + rand(i + 50) * 1720 + Math.sin(time * 0.4 + i) * 12} ${110 + rand(i + 120) * 800 + Math.cos(time * 0.3 + i) * 12}) rotate(${i * 27 + time * 3})`}
        opacity={0.25 + rand(i) * 0.35}
      >
        {i % 3 === 0 ? (
          <path d="M-9 0Q0-12 9 0Q0 8-9 0Z" fill={C.blush} />
        ) : i % 3 === 1 ? (
          <circle r="2.4" fill={C.gold} />
        ) : (
          <path d="M-4 0H4M0-4V4" stroke={C.gold} strokeWidth="1.1" />
        )}
      </g>
    ))}
  </g>
);

const Thread = ({
  d,
  progress = 1,
  opacity = 1,
  width = 3,
}: {
  d: string;
  progress?: number;
  opacity?: number;
  width?: number;
}) => (
  <g fill="none" strokeLinecap="round" opacity={opacity}>
    <path d={d} stroke="#f1d6d7" strokeWidth={width + 5} opacity=".35" />
    <path
      d={d}
      stroke={C.rose}
      strokeWidth={width}
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - clamp(progress)}
    />
  </g>
);

const writingPath =
  "M-160 960C170 810 360 974 558 798C750 628 730 253 980 314C1190 365 1080 603 948 563C788 515 928 353 1083 429C1227 500 1220 602 1370 557C1500 520 1535 425 1650 450";
const writingSegments = [
  [-160, 960, 170, 810, 360, 974, 558, 798],
  [558, 798, 750, 628, 730, 253, 980, 314],
  [980, 314, 1190, 365, 1080, 603, 948, 563],
  [948, 563, 788, 515, 928, 353, 1083, 429],
  [1083, 429, 1227, 500, 1220, 602, 1370, 557],
  [1370, 557, 1500, 520, 1535, 425, 1650, 450],
];
const pathSamples: { x: number; y: number; length: number }[] = [];
let cumulative = 0;
for (const a of writingSegments) {
  for (let j = 0; j <= 120; j++) {
    const u = j / 120,
      v = 1 - u;
    const x =
        v * v * v * a[0] +
        3 * v * v * u * a[2] +
        3 * v * u * u * a[4] +
        u * u * u * a[6],
      y =
        v * v * v * a[1] +
        3 * v * v * u * a[3] +
        3 * v * u * u * a[5] +
        u * u * u * a[7];
    const prev = pathSamples[pathSamples.length - 1];
    if (prev) cumulative += Math.hypot(x - prev.x, y - prev.y);
    pathSamples.push({ x, y, length: cumulative });
  }
}
const penAt = (progress: number) => {
  const length = clamp(progress) * cumulative;
  let i = pathSamples.findIndex((pt) => pt.length >= length);
  i = Math.max(1, i);
  const a = pathSamples[i - 1],
    b = pathSamples[i],
    q = (length - a.length) / (b.length - a.length || 1);
  return {
    x: a.x + (b.x - a.x) * q,
    y: a.y + (b.y - a.y) * q,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 180,
  };
};

const FirstMarkInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 3.8);
  const progress = 0.33 + p * 0.67,
    pen = penAt(progress);
  return (
    <Stage>
      <g
        transform={`translate(${10 - p * 25} ${30 - p * 10}) rotate(${-6 + p * 2} 960 540) scale(${1.1 - p * 0.08})`}
      >
        <path
          d="M330-140L1810-20L1910 1100L260 1250Z"
          fill="url(#paper)"
          stroke="#d9ccb8"
          filter="url(#shadow)"
        />
        <path
          d="M435 136L1700 225M429 207L1693 296M422 278L1686 367M415 349L1679 438M408 420L1672 509M401 491L1665 580M394 562L1658 651M387 633L1651 722M380 704L1644 793M373 775L1637 864"
          stroke="#b5b6a7"
          strokeWidth="1"
          opacity=".2"
        />
        <Envelope x={1540} y={910} scale={1.22} rotation={-8} />
        <Stamp x={1470} y={160} rotation={9} scale={0.88} />
        <Postmark x={1570} y={250} scale={0.8} />
        <Thread d={writingPath} progress={progress} width={3.2} />
        <g
          transform={`translate(${pen.x} ${pen.y}) rotate(${pen.angle}) translate(63 0)`}
        >
          <path
            d="M0-15L280-15L330 0L280 15H0Z"
            fill="#708f95"
            filter="url(#smallShadow)"
          />
          <path d="M-35-9L0-15V15L-35 9L-63 0Z" fill="#d3b881" />
          <path d="M-63 0L-37-4V4Z" fill="#5a5551" />
          <path d="M23-9H270" stroke="#bad6d6" strokeWidth="3" />
        </g>
        <text
          x="940"
          y="172"
          fontFamily="Georgia"
          fontStyle="italic"
          fontSize="25"
          fill={C.muted}
        >
          a letter, a little universe.
        </text>
      </g>
      <g
        transform={`translate(${170 - p * 15} ${260 - p * 5})`}
        opacity={range(t, 0.2, 1)}
      >
        <text fontFamily={FONT} fontSize="81" fill={C.ink} letterSpacing="8">
          <tspan x="0" y="0">
            把喜欢，
          </tspan>
          <tspan x="0" y="112">
            折成一个小宇宙
          </tspan>
        </text>
        <path d="M8 151H95" stroke={C.rose} strokeWidth="2" />
        <text
          x="0"
          y="196"
          fontFamily={SERIF}
          fontSize="23"
          letterSpacing="7"
          fill={C.muted}
        >
          一封正在出发的信
        </text>
      </g>
      <Sprig x={95} y={1150} scale={1.53} rotation={22} color="#a4b59a" />
      <Daisy x={175} y={875} scale={0.83} rotation={15} />
      <Dust time={t} count={12} />
    </Stage>
  );
};

const UnfoldingInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 3.7);
  return (
    <Stage>
      <ellipse cx="1060" cy="518" rx="470" ry="379" fill="url(#aura)" />
      <g
        transform={`translate(${15 - p * 22} ${30 - p * 25}) scale(${0.97 + p * 0.035})`}
      >
        <g transform={`translate(960 780) scale(1 ${0.72 + p * 0.28})`}>
          <path
            d="M-760 73L-400-260L110-280L752 70L72 250Z"
            fill="#e6d7be"
            filter="url(#shadow)"
          />
          <path
            d="M-760 56L-395-280L110-298L752 52L72 230Z"
            fill="url(#paper)"
            stroke="#ccbaa0"
            strokeWidth="2"
          />
          <path
            d="M-395-280L-317 80L72 230L110-298"
            fill="url(#shade)"
            stroke="#d7c6aa"
          />
          <path
            d="M-760 56L-317 80L752 52"
            fill="none"
            stroke="#c5b195"
            strokeWidth="1.5"
          />
        </g>
        <g
          transform={`translate(1000 760) scale(1 ${range(t, 0, 1.4, 0.12, 1)}) translate(-1000 -760)`}
        >
          <path
            d="M468 756L661 385L907 744Z"
            fill="url(#blue)"
            filter="url(#smallShadow)"
          />
          <path d="M661 385L733 744H907Z" fill="#8ab4bd" />
          <path
            d="M1070 757L1262 338L1531 763Z"
            fill="url(#sage)"
            filter="url(#smallShadow)"
          />
          <path d="M1262 338L1320 759L1531 763Z" fill="#9aaa8e" />
          <path d="M661 385L606 493L665 465L697 501Z" fill="#f7f2e5" />
          <path d="M1262 338L1204 467L1269 434L1327 482Z" fill="#f7f2e5" />
        </g>
        <Sprig
          x={558}
          y={796}
          scale={0.94}
          rotation={-13 + Math.sin(t) * 1.2}
          color={C.teal}
          flower
        />
        <Sprig x={1480} y={801} scale={1.22} rotation={14} color={C.sage} />
        <Fern x={1340} y={845} scale={0.61} rotation={-19} />
        <Envelope
          x={965}
          y={696}
          scale={0.88}
          rotation={-7 + Math.sin(t * 0.8)}
        />
        <Stamp x={1169} y={851} rotation={17} scale={0.7} />
        <Thread
          d="M70 1010C350 885 322 658 530 702S828 1008 1133 889S1387 595 1600 651S1810 811 2040 593"
          progress={0.4 + p * 0.6}
        />
      </g>
      <LittleCloud x={454 - t * 6} y={305} scale={0.72} />
      <LittleCloud x={1510 + t * 8} y={224} scale={0.61} />
      <text
        x="173"
        y="218"
        fontFamily={FONT}
        fontSize="58"
        fill={C.ink}
        letterSpacing="9"
      >
        世界，轻轻展开
      </text>
      <text
        x="179"
        y="267"
        fontFamily="Georgia"
        fontSize="18"
        letterSpacing="5"
        fill={C.muted}
      >
        A PLACE FOR ALL THE LITTLE THINGS
      </text>
      <Sprig x={1870} y={1170} scale={1.6} rotation={-28} color="#b5bca1" />
      <Dust time={t} />
    </Stage>
  );
};

const PaperFlightInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = clamp(t / 4.65);
  const bx = 540 + ease(p) * 830,
    by = 525 - Math.sin(p * Math.PI) * 158;
  return (
    <Stage>
      <circle cx="1498" cy="289" r="124" fill="#efdbbd" />
      <circle
        cx="1498"
        cy="289"
        r="142"
        fill="none"
        stroke="#cfba95"
        strokeWidth="1"
        opacity=".6"
      />
      <LittleCloud x={310 - t * 14} y={241} scale={1.25} />
      <LittleCloud x={1020 - t * 23} y={194} scale={0.6} />
      <LittleCloud x={1690 - t * 17} y={460} scale={0.94} />
      <DistantHills y={720} drift={-t * 24} />
      <g transform={`translate(${-t * 53} 0)`} opacity=".45">
        <path
          d="M-30 987L430 712L780 1010L1130 675L1470 1010L1810 733L2250 1010V1200H-30Z"
          fill="#a3b7a7"
        />
      </g>
      <Thread
        d={`M-90 727C160 533 333 870 578 660S869 381 1090 500S1410 752 1587 503S1811 339 2070 444`}
        progress={0.23 + ease(p) * 0.77}
        opacity={0.8}
        width={2.7}
      />
      <path
        d={`M${bx - 145} ${by + 68}C${bx - 265} ${by + 145} ${bx - 335} ${by + 50} ${bx - 405} ${by + 94}`}
        fill="none"
        stroke={C.pink}
        strokeWidth="2.2"
      />
      <Bird
        x={bx}
        y={by}
        scale={1.38}
        rotation={-12 + Math.sin(p * Math.PI * 2) * 9}
        flap={Math.sin(t * 2.7) * 0.12}
      />
      <g transform={`translate(${-t * 90} 0)`}>
        <Sprig x={85} y={1150} scale={1.45} rotation={-9} color={C.teal} />
        <Fern x={320} y={1220} scale={1.1} rotation={18} />
        <Sprig
          x={1930}
          y={1190}
          scale={1.8}
          rotation={-26}
          color={C.sage}
          flower
        />
      </g>
      <SideNote x={161} y={934}>
        沿着风，去见你
      </SideNote>
      <Dust time={t} count={24} />
    </Stage>
  );
};

const BookGardenInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 4.8);
  return (
    <Stage>
      <circle cx="1122" cy="438" r="326" fill="#dce7df" opacity=".66" />
      <circle
        cx="1122"
        cy="438"
        r="360"
        fill="none"
        stroke="#bfcbbd"
        strokeWidth="1"
        strokeDasharray="3 12"
      />
      <g
        transform={`translate(${35 - p * 74} ${40 - p * 28}) scale(${0.96 + p * 0.07})`}
      >
        <Book x={1060} y={753} scale={1.29} rotation={-4} />
        <g transform="rotate(-4 1060 753)">
          <path
            d="M752 638L851 436L985 646Z"
            fill="url(#blue)"
            filter="url(#smallShadow)"
          />
          <path d="M851 436L890 646H985Z" fill="#a1bdc4" />
          <path
            d="M1140 644L1251 405L1422 645Z"
            fill="url(#sage)"
            filter="url(#smallShadow)"
          />
          <path d="M1251 405L1315 645H1422Z" fill="#99ab91" />
          <Sprig
            x={1080}
            y={687}
            scale={0.99}
            color={C.teal}
            flower
            growth={range(t, 0, 1.4, 0.4, 1)}
            rotation={Math.sin(t) * 1.5}
          />
          <Sprig
            x={1460}
            y={709}
            scale={1.16}
            color={C.sage}
            rotation={14 + Math.sin(t * 0.7)}
          />
          <Fern x={737} y={719} scale={0.77} rotation={-24} />
          <Sprig
            x={897}
            y={689}
            scale={0.45}
            color={C.violet}
            flower
            rotation={-10}
          />
          <Daisy x={1204} y={625} scale={0.58} />
          <Thread
            d="M633 759C778 674 855 845 1027 750S1126 635 1280 694S1489 710 1570 609"
            progress={0.52 + p * 0.48}
            width={2}
          />
        </g>
        <Bird
          x={1316 + t * 24}
          y={320 - Math.sin(t * 0.8) * 32}
          scale={0.52}
          rotation={-8}
        />
        <LittleCloud x={1410} y={269} scale={0.57} />
      </g>
      <g transform={`translate(178 ${301 - p * 9})`}>
        <text fontFamily={FONT} fontSize="72" fill={C.ink} letterSpacing="8">
          <tspan x="0" y="0">
            一页，
          </tspan>
          <tspan x="0" y="92">
            一整个世界
          </tspan>
        </text>
        <path d="M5 137H95" stroke={C.rose} strokeWidth="2" />
        <text
          x="5"
          y="184"
          fontFamily="Georgia"
          fontSize="19"
          fontStyle="italic"
          fill={C.muted}
        >
          where little feelings grow.
        </text>
      </g>
      <Sprig x={72} y={1160} scale={1.25} rotation={20} color="#b6bca5" />
      <Daisy x={1780} y={984} scale={1.2} rotation={-12} />
      <Sprig x={1845} y={1260} scale={1.2} rotation={-15} color={C.violet} />
      <Dust time={t} count={18} />
    </Stage>
  );
};

const LittleUniverseInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 4.5);
  const angle = -12 + p * 21;
  return (
    <Stage>
      <g
        transform={`translate(${1050 - p * 42} ${540 - p * 8}) rotate(${angle})`}
      >
        <circle r="337" fill="url(#aura)" />
        <ellipse
          rx="595"
          ry="226"
          fill="none"
          stroke="#baa17c"
          strokeWidth="1.5"
          transform="rotate(-19)"
        />
        <ellipse
          rx="541"
          ry="216"
          fill="none"
          stroke={C.rose}
          strokeWidth="1.4"
          strokeDasharray="2 10"
          transform="rotate(22)"
        />
        <ellipse
          rx="394"
          ry="329"
          fill="none"
          stroke="#b7c5ba"
          strokeWidth="1"
          transform="rotate(32)"
        />
        <g filter="url(#shadow)">
          <circle r="279" fill="url(#paper)" />
          <path
            d="M-279 9Q-130-98 13 29T279 11V33A279 279 0 01-279 9Z"
            fill="url(#blue)"
          />
          <path
            d="M-267 83Q-124-17-20 81T254 116A279 279 0 01-267 83Z"
            fill="url(#sage)"
          />
          <path
            d="M-218 176Q-56 83 184 210A279 279 0 01-218 176Z"
            fill="#d0b89a"
          />
          <path
            d="M-233-142Q-41-204 201-193M-276-39Q-24-102 273-57"
            fill="none"
            stroke="#e4d8c5"
            strokeWidth="1.4"
          />
          <Sprig
            x={-74}
            y={75}
            scale={0.65}
            color={C.teal}
            flower
            rotation={-12}
          />
          <Sprig x={143} y={130} scale={0.61} color={C.sage} rotation={18} />
          <Envelope x={22} y={-56} scale={0.38} rotation={-12} />
        </g>
        <g transform={`rotate(${t * 8})`}>
          <Bird x={-471} y={-160} scale={0.5} rotation={-20} />
          <Stamp x={442} y={166} scale={0.57} rotation={20} />
        </g>
        <Thread
          d="M-588 271C-359 405 77 364 383 135S549-198 461-280"
          progress={0.55 + p * 0.45}
          width={3}
        />
        <Star x={-328} y={-239} size={20} />
        <Star x={334} y={-285} size={13} />
        <Star x={-184} y={342} size={13} />
        <circle cx="505" cy="-93" r="12" fill={C.pink} />
        <circle cx="-484" cy="158" r="9" fill={C.blue} />
      </g>
      <g transform="translate(178 255)">
        <text fontFamily={FONT} fontSize="62" fill={C.ink} letterSpacing="9">
          <tspan x="0" y="0">
            小小心事
          </tspan>
          <tspan x="0" y="88">
            自成宇宙
          </tspan>
        </text>
        <text
          x="4"
          y="150"
          fontFamily="Georgia"
          fontSize="17"
          letterSpacing="4"
          fill={C.muted}
        >
          A UNIVERSE, JUST FOR YOU
        </text>
      </g>
      <Postmark x={1682} y={913} scale={0.68} />
      <Dust time={t} count={28} />
    </Stage>
  );
};

const PromiseTitleInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 4.7);
  return (
    <Stage>
      <ellipse cx="961" cy="566" rx="650" ry="407" fill="url(#aura)" />
      <g
        transform={`translate(960 540) rotate(${-2 + p * 2}) scale(${0.94 + p * 0.08})`}
      >
        <g filter="url(#shadow)">
          <path
            d="M-598-234L-204-263L-129-214L301-247L607-190L574 237L158 254L-212 218L-606 246Z"
            fill="url(#paper)"
          />
          <path
            d="M-204-263L-212 218M158-239L158 254"
            stroke="#d8c9b7"
            strokeWidth="1.3"
            opacity=".7"
          />
          <path d="M-598-234L-556-188L-606 246" fill="#ece0cf" />
          <path d="M607-190L551-150L574 237" fill="#ebdecd" />
        </g>
        <path
          d="M-665 30C-568-186-350-260-209-127S-100 151 63 135S246-258 436-181S604 89 677 14"
          fill="none"
          stroke={C.pink}
          strokeWidth="3"
          opacity=".55"
        />
        {["勾", "指", "起", "誓"].map((char, i) => {
          const q = range(t, i * 0.12, 0.85 + i * 0.12);
          return (
            <g
              key={char}
              transform={`translate(${-417 + i * 276} ${28 + (1 - q) * 72 + Math.sin(t * 0.65 + i) * 3}) rotate(${[-5, 3, -2, 4][i] * (1 - q * 0.75)})`}
              opacity={q}
            >
              <path
                d={
                  i % 2
                    ? "M-95 46Q-19 32 90 49L82 63Q-7 50-96 65Z"
                    : "M-98-72Q-10-88 86-69L92-50Q-8-65-98-52Z"
                }
                fill={i % 2 ? C.blush : C.sky}
                opacity=".9"
              />
              <text
                textAnchor="middle"
                fontFamily={FONT}
                fontSize="203"
                fill={C.ink}
              >
                {char}
              </text>
            </g>
          );
        })}
        <text
          x="0"
          y="154"
          textAnchor="middle"
          fontFamily={SERIF}
          fontSize="30"
          letterSpacing="9"
          fill={C.muted}
        >
          洛天依 · ilem
        </text>
      </g>
      <Sprig
        x={263}
        y={880}
        scale={1.35}
        rotation={-27 + Math.sin(t * 0.8)}
        color={C.teal}
        flower
      />
      <Fern x={1724} y={946} scale={1.35} rotation={25} color={C.sage} />
      <Daisy x={1600} y={851} scale={0.93} rotation={-9} />
      <Bird
        x={1620 - t * 15}
        y={236 + Math.sin(t) * 13}
        scale={0.63}
        rotation={-7}
      />
      <Stamp x={323} y={232} rotation={-12} scale={0.8} />
      <SideNote x={730} y={930}>
        把喜欢，折成一个小宇宙
      </SideNote>
      <Star x={1486} y={235} size={12} />
      <Star x={428} y={859} size={14} />
      <Dust time={t} />
    </Stage>
  );
};

const LetterOpeningInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 1.5);
  return (
    <Stage>
      <g transform={`translate(${-t * 8} ${-t * 3})`}>
        <path
          d="M1038-40L2020 120L1908 1200L869 1090Z"
          fill="#e6d9c3"
          opacity=".42"
        />
        <path
          d="M1159-90L2100 205L1894 1197L990 1036Z"
          fill="url(#paper)"
          stroke="#ddceb8"
        />
        <path
          d="M1180 180L1950 421M1158 253L1928 494M1136 326L1906 567M1114 399L1884 640M1092 472L1862 713M1070 545L1840 786"
          stroke="#c8b6a2"
          opacity=".22"
        />
        <Sprig
          x={1644}
          y={965}
          scale={1.9}
          rotation={-12 + Math.sin(t) * 0.5}
          color="#a0b19b"
        />
        <Fern x={1810} y={1210} scale={1.9} rotation={15} color="#c1c7ac" />
        <Envelope
          x={1290}
          y={720 - t * 8}
          scale={1.22}
          rotation={-10 + p * 3}
          open={p}
        />
        <Stamp x={1634} y={287} rotation={14} scale={0.81} />
        <Postmark x={1573} y={382} scale={0.8} />
        <Thread
          d="M-70 900C186 736 438 1063 739 882S983 448 1159 412S1378 653 1500 540"
          progress={0.7 + p * 0.3}
        />
      </g>
      <text
        x="174"
        y="232"
        fontFamily="Georgia"
        fontSize="18"
        letterSpacing="6"
        fill={C.muted}
      >
        DEAR YOU,
      </text>
      <path d="M176 285H268" stroke={C.rose} strokeWidth="1.5" />
      <Daisy x={920} y={972} scale={0.72} />
      <Sprig x={56} y={1250} scale={1.5} rotation={28} color="#b5bea4" />
      <Dust time={t} count={14} />
    </Stage>
  );
};

const GrowingVerseInner = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    p = ease(t / 3.8);
  return (
    <Stage>
      <g
        transform={`translate(${10 - p * 18} ${28 - p * 18}) rotate(${-2 + p * 1.6} 960 540)`}
      >
        <path
          d="M390 70L1533 85L1550 1088L358 1099Z"
          fill="url(#paper)"
          stroke="#dacbb5"
          filter="url(#shadow)"
        />
        <path
          d="M461 396H1440M461 453H1440M461 510H1440M461 567H1440M461 624H1440M461 681H1440M461 738H1440M461 795H1440"
          stroke="#cab9a4"
          strokeWidth="1"
          opacity=".25"
        />
        <path
          d="M1144 96L1472 100L1474 150L1144 143Z"
          fill="#d5d6b9"
          opacity=".5"
          transform="rotate(8 1300 120)"
        />
        <g transform={`translate(956 879) scale(${0.88 + p * 0.16})`}>
          <path
            d="M-367 73Q-190-29 0 5Q179-35 367 72L320 115Q131 75 0 90Q-178 62-324 122Z"
            fill="#d1d7be"
          />
          <path
            d="M-290 94Q-148 55 0 72Q144 41 291 91"
            fill="none"
            stroke="#9ca78c"
          />
          <Sprig
            x={-8}
            y={78}
            scale={1.06}
            flower
            color={C.teal}
            growth={0.62 + p * 0.38}
            bloom={range(t, 2.75, 4.2)}
            rotation={Math.sin(t * 0.8) * 1.5}
          />
          <Sprig
            x={-188}
            y={89}
            scale={0.8}
            flower
            color={C.violet}
            growth={0.58 + p * 0.42}
            rotation={-18}
          />
          <Sprig
            x={188}
            y={83}
            scale={0.84}
            color={C.sage}
            growth={0.64 + p * 0.36}
            rotation={20}
          />
          <Fern x={-299} y={111} scale={0.64} rotation={-32} />
          <Daisy x={295} y={43} scale={0.67} />
          <Bird
            x={196 + p * 37}
            y={-225 - Math.sin(t) * 15}
            scale={0.43}
            rotation={-8}
          />
        </g>
        <Thread
          d="M-60 820C200 661 350 1030 586 936S860 793 1004 893S1393 1092 1573 824S1836 720 2000 740"
          progress={0.5 + p * 0.5}
          width={2.8}
        />
        <Postmark x={1413} y={947} scale={0.56} />
      </g>
      <Sprig x={142} y={1190} scale={1.84} rotation={24} color="#b2bea8" />
      <Fern x={1791} y={1180} scale={1.8} rotation={-17} color="#a7b69e" />
      <Stamp x={280} y={446} rotation={-15} scale={0.83} />
      <Daisy x={1675} y={895} scale={1.14} rotation={12} />
      <Dust time={t} count={20} />
    </Stage>
  );
};

export const FirstMark = Interactive.create({
  Component: FirstMarkInner,
  layout: "absolute-fill",
});
export const Unfolding = Interactive.create({
  Component: UnfoldingInner,
  layout: "absolute-fill",
});
export const PaperFlight = Interactive.create({
  Component: PaperFlightInner,
  layout: "absolute-fill",
});
export const BookGarden = Interactive.create({
  Component: BookGardenInner,
  layout: "absolute-fill",
});
export const LittleUniverse = Interactive.create({
  Component: LittleUniverseInner,
  layout: "absolute-fill",
});
export const PromiseTitle = Interactive.create({
  Component: PromiseTitleInner,
  layout: "absolute-fill",
});
export const LetterOpening = Interactive.create({
  Component: LetterOpeningInner,
  layout: "absolute-fill",
});
export const GrowingVerse = Interactive.create({
  Component: GrowingVerseInner,
  layout: "absolute-fill",
});
