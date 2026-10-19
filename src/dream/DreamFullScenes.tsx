import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  Bridge,
  Cloud,
  Couple,
  DreamStage,
  Filigree,
  Flower,
  Foliage,
  Garden,
  Island,
  Letter,
  Moon,
  Sea,
  Star,
  Whale,
} from "./DreamArt";
import { D, rnd, smooth } from "./palette";

const useClock = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, t: frame / fps };
};

const Thread = ({
  d,
  t,
  progress = 1,
  color = D.pink,
}: {
  d: string;
  t: number;
  progress?: number;
  color?: string;
}) => (
  <g fill="none" strokeLinecap="round">
    <path d={d} stroke="#372469" strokeWidth="10" opacity=".24" />
    <path
      d={d}
      stroke={color}
      strokeWidth="4"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
    <path
      d={d}
      stroke="#ffe3ad"
      strokeWidth="1.3"
      strokeDasharray="2 15"
      strokeDashoffset={-t * 18}
      opacity=".72"
    />
  </g>
);

const Lantern = ({
  x,
  y,
  s = 1,
  t = 0,
  color = "#ff9cb6",
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
  color?: string;
}) => (
  <g
    transform={`translate(${x} ${y + Math.sin(t * 0.9 + x) * 10}) scale(${s})`}
  >
    <ellipse cy="-4" rx="118" ry="135" fill="url(#d-glow)" opacity=".65" />
    <path
      d="M-34-54Q-52-5-29 36H29Q52-5 34-54Z"
      fill={color}
      stroke="#f7d3bf"
      strokeWidth="3"
    />
    <path
      d="M-29-52H29M-29 35H29M0-52V35M-18-49Q-31-5-15 33M18-49Q31-5 15 33"
      stroke="#fff0bd"
      strokeWidth="2"
      fill="none"
    />
    <path d="M0-54V-78M0 36V63" stroke="#ffd18c" strokeWidth="3" />
    <Star y={-7} r={13} color="#fff5bf" />
  </g>
);

const PaperMountain = ({
  x,
  y,
  s = 1,
  color = "#4c579c",
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#d-fine)">
    <path
      d="M-330 120L-120-170L-20-38L105-235L350 120Z"
      fill={color}
      stroke="#f6c2af"
      strokeWidth="4"
    />
    <path
      d="M-120-170L-20-38L-57-64L-8-85L-46-118Z"
      fill="#ffe4b2"
      opacity=".9"
    />
    <path d="M105-235L350 120H-20L105-235Z" fill="#2d3e83" opacity=".68" />
    <path
      d="M-286 76Q-180 14-90 68T92 46T289 78"
      fill="none"
      stroke="#72d9ce"
      strokeWidth="9"
      opacity=".85"
    />
    <path
      d="M-250 96Q-132 50-23 92T222 85"
      fill="none"
      stroke="#ffc4a8"
      strokeWidth="3"
    />
  </g>
);

const MiniOrb = ({
  x,
  y,
  s = 1,
  t = 0,
  warm = false,
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
  warm?: boolean;
}) => (
  <g transform={`translate(${x} ${y + Math.sin(t * 0.7 + x) * 7}) scale(${s})`}>
    <circle r="150" fill="url(#d-glow)" opacity=".7" />
    <circle
      r="118"
      fill={warm ? "#d878a7" : "#397eb0"}
      stroke="#e7f5dd"
      strokeWidth="4"
    />
    <path d="M-118 35Q-20-15 37 37T122 24V119H-120Z" fill="url(#d-water)" />
    <path
      d="M-78 37L0-57L75 39Z"
      fill="#ffe3aa"
      stroke="#f2b394"
      strokeWidth="3"
    />
    <path
      d="M-44 39V-8H44V39M-57-8H57"
      fill="#e96799"
      stroke="#7c4a89"
      strokeWidth="3"
    />
    <Star x={52} y={-62} r={10} color={D.gold} />
  </g>
);

const ClockFace = ({
  x,
  y,
  r,
  t,
}: {
  x: number;
  y: number;
  r: number;
  t: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${t * 4})`}>
    <circle r={r + 28} fill="url(#d-glow)" opacity=".55" />
    <circle r={r} fill="#27356f" stroke="url(#d-gold)" strokeWidth="7" />
    <circle
      r={r - 20}
      fill="none"
      stroke="#ffdca1"
      strokeWidth="2"
      opacity=".8"
    />
    {Array.from({ length: 12 }, (_, i) => (
      <path
        key={i}
        d={`M0 ${-r + 25}V${-r + (i % 3 === 0 ? 47 : 38)}`}
        transform={`rotate(${i * 30})`}
        stroke="#ffdfa0"
        strokeWidth={i % 3 === 0 ? 5 : 2}
      />
    ))}
    <path
      d={`M0 12L${Math.cos(t * 0.3) * r * 0.55} ${Math.sin(t * 0.3) * r * 0.55}`}
      stroke="#ff91af"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d={`M0 12L${Math.cos(t * 0.52) * r * 0.78} ${Math.sin(t * 0.52) * r * 0.78}`}
      stroke="#b8f4dd"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle r="12" fill="#fff1b4" />
  </g>
);

const StarTrail = ({
  x,
  y,
  t,
  count = 18,
  radius = 280,
}: {
  x: number;
  y: number;
  t: number;
  count?: number;
  radius?: number;
}) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + t * 0.16;
      const rr = radius * (0.72 + rnd(i + 90) * 0.28);
      return (
        <Star
          key={i}
          x={Math.cos(a) * rr}
          y={Math.sin(a) * rr * 0.42}
          r={3 + rnd(i + 150) * 7}
          rotate={i * 19 + t * 10}
          color={i % 3 === 0 ? D.gold : D.cream}
        />
      );
    })}
  </g>
);

export const MoonGarden = () => {
  const { t } = useClock();
  const p = smooth(t / 13.7);
  return (
    <DreamStage theme="dawn" t={t}>
      <Moon x={1450 - p * 130} y={245 + p * 28} r={170} phase />
      <Cloud x={240 - t * 7} y={330} s={1.1} pink />
      <Cloud x={1690 + t * 5} y={420} s={0.85} />
      <Sea y={765} t={t} />
      <Island x={300 - t * 8} y={600} s={0.46} castle />
      <Island x={1635 - t * 5} y={585} s={0.4} />
      <MiniOrb x={1010} y={412 - p * 20} s={0.72 + p * 0.08} t={t} warm />
      <Lantern x={400} y={220} s={0.62} t={t} />
      <Lantern x={1550} y={185} s={0.5} t={t} color="#ffe0a5" />
      <Letter
        x={920 + p * 80}
        y={615 - p * 85}
        s={0.6}
        rotation={-13 + p * 18}
        open={p}
      />
      <Thread
        d="M-80 906C245 711 468 950 706 826S1090 596 1327 735S1722 934 2020 645"
        t={t}
        progress={0.25 + p * 0.75}
      />
      <Flower x={190} y={975} s={1.32} rotation={-22} />
      <Flower x={1710} y={990} s={1.25} rotation={28} blue />
      <Foliage x={410} y={1025} s={1.35} rotation={-33} />
      <Foliage x={1530} y={1050} s={1.4} rotation={31} />
      <Garden t={t} level={2} variant={0} />
    </DreamStage>
  );
};

export const CloudRoom = () => {
  const { t } = useClock();
  const p = smooth(t / 10.8);
  return (
    <DreamStage theme="dawn" t={t}>
      <path
        d="M180 870V310Q180 72 490 72H1430Q1740 72 1740 310V870"
        fill="none"
        stroke="#ffe0b0"
        strokeWidth="18"
        opacity=".45"
      />
      <path
        d="M215 870V320Q215 112 495 112H1425Q1705 112 1705 320V870"
        fill="none"
        stroke="#fff3cf"
        strokeWidth="3"
        opacity=".68"
      />
      <Cloud x={430 - t * 8} y={345} s={1.25} pink />
      <Cloud x={1510 + t * 7} y={380} s={1.15} />
      <Moon x={960} y={305} r={150} />
      <g transform={`translate(960 ${790 - p * 35})`}>
        <ellipse cy="145" rx="470" ry="60" fill="#302f78" opacity=".25" />
        <path
          d="M-420 60Q-270-115 0-60Q270-115 420 60Q250 180 0 132Q-250 180-420 60Z"
          fill="#fff0c7"
          stroke="#d98eab"
          strokeWidth="4"
        />
        <path
          d="M-350 34Q-180-66 0-16Q180-66 350 34"
          fill="none"
          stroke="#f6b4ac"
          strokeWidth="4"
        />
        <Couple s={1.12} t={t} />
        <path
          d="M-142-145Q0-221 142-145"
          fill="none"
          stroke="url(#d-gold)"
          strokeWidth="8"
        />
      </g>
      <Thread
        d="M-80 836C280 628 440 901 720 752S1110 626 1360 764S1710 932 2030 704"
        t={t}
        color="#ff9ca8"
      />
      <StarTrail x={960} y={420} t={t} count={16} radius={370} />
      <Flower x={180} y={1000} s={1.1} rotation={-24} />
      <Flower x={1740} y={1000} s={1.15} rotation={27} blue />
      <Garden t={t} level={2} variant={1} />
    </DreamStage>
  );
};

export const ClockPromise = () => {
  const { t } = useClock();
  const p = smooth(t / 9.8);
  return (
    <DreamStage theme="night" t={t}>
      <Moon x={960} y={390} r={215} />
      <Filigree x={960} y={410} r={325} t={t * 0.4} />
      <ClockFace x={960} y={405} r={160} t={t} />
      <path
        d="M603 564C715 406 844 495 960 622C1076 495 1205 406 1317 564C1265 688 1080 736 960 633C840 736 655 688 603 564Z"
        fill="none"
        stroke="url(#d-gold)"
        strokeWidth="8"
      />
      <g transform={`translate(960 ${827 - p * 16})`}>
        <Bridge x={0} y={94} s={1.08} />
        <Couple s={1.15} t={t} />
      </g>
      <path
        d="M0 934C290 740 490 1020 720 870S1100 640 1310 830S1700 1010 2020 770"
        fill="none"
        stroke="#ff8cae"
        strokeWidth="4"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
      <Lantern x={320} y={240} s={0.62} t={t} />
      <Lantern x={1610} y={230} s={0.58} t={t} color="#ffe0a4" />
      <Star x={706} y={450} r={16} rotate={t * 20} color={D.gold} />
      <Star x={1214} y={450} r={16} rotate={-t * 18} color={D.gold} />
      <Garden t={t} level={2} variant={1} />
    </DreamStage>
  );
};

export const WorldAtlas = () => {
  const { t } = useClock();
  const p = smooth(t / 12.7);
  return (
    <DreamStage theme="violet" t={t}>
      <g
        transform={`translate(${60 - p * 130} ${40 + Math.sin(t * 0.25) * 9}) rotate(-2)`}
      >
        <path
          d="M60 235Q495 85 934 230Q1370 88 1830 235L1800 913Q1370 790 930 910Q480 790 92 913Z"
          fill="url(#d-paper)"
          stroke="#edaaad"
          strokeWidth="7"
          filter="url(#d-shadow)"
        />
        <path
          d="M108 303Q492 195 930 312Q1380 195 1780 303M113 775Q510 680 930 795Q1380 680 1773 775"
          fill="none"
          stroke="#d597a4"
          strokeWidth="3"
          opacity=".7"
        />
        <path
          d="M185 532Q487 343 820 512T1480 468Q1652 424 1775 512"
          fill="none"
          stroke="#ff7fa7"
          strokeWidth="7"
        />
        <PaperMountain x={392} y={635} s={0.52} color="#5c67a7" />
        <PaperMountain x={1505} y={648} s={0.5} color="#705095" />
        <MiniOrb x={805} y={470} s={0.46} t={t} />
        <MiniOrb x={1215} y={536} s={0.4} t={t} warm />
        <Star x={1070} y={351} r={18} rotate={t * 15} />
      </g>
      <Whale x={1280 + t * 17} y={260 + Math.sin(t) * 22} s={0.33} t={t} city />
      <Cloud x={255 - t * 8} y={235} s={0.78} pink />
      <Cloud x={1660 + t * 6} y={320} s={0.8} />
      <Thread
        d="M-50 865C260 686 505 1010 748 821S1130 600 1358 785S1735 974 2040 674"
        t={t}
        progress={0.35 + p * 0.65}
      />
      <Foliage x={120} y={1005} s={1.25} rotation={-35} />
      <Foliage x={1800} y={1020} s={1.3} rotation={34} />
    </DreamStage>
  );
};

export const LanternSea = () => {
  const { t } = useClock();
  const p = smooth(t / 13.1);
  return (
    <DreamStage theme="deep" t={t}>
      <Moon x={1490} y={260} r={175} />
      <Sea y={735} t={t} />
      <PaperMountain x={300} y={650} s={0.75} color="#3f508e" />
      <PaperMountain x={1610} y={640} s={0.65} color="#4a428b" />
      <g
        transform={`translate(${950 + p * 220} ${700 - p * 45}) rotate(${Math.sin(t) * 2})`}
      >
        <path
          d="M-215 25Q0 118 215 25L169 113Q0 176-169 113Z"
          fill="url(#d-roof)"
          stroke="#ffcfaa"
          strokeWidth="4"
        />
        <path
          d="M0-315V45M4-307Q-142-203-150-24Q-58-52 0-39ZM14-299Q137-202 157-27Q73-51 14-41Z"
          fill="url(#d-paper)"
          stroke="#ffe0ab"
          strokeWidth="3"
        />
        <path
          d="M-120-209L-20-71M72-204L133-76"
          stroke="#e6a9b1"
          strokeWidth="3"
        />
        <Couple x={0} y={25} s={0.34} t={t} />
      </g>
      {Array.from({ length: 9 }, (_, i) => (
        <Lantern
          key={i}
          x={180 + i * 196 + Math.sin(t * 0.5 + i) * 18}
          y={290 + (i % 3) * 108}
          s={0.24 + (i % 2) * 0.08}
          t={t + i}
          color={i % 2 ? "#ffe2a0" : "#ff9db5"}
        />
      ))}
      <Thread
        d="M-70 920C250 790 450 910 720 810S1080 670 1290 776S1700 937 2010 730"
        t={t}
        progress={0.4 + p * 0.6}
        color="#ffb0b1"
      />
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};

export const MountainRoute = () => {
  const { t } = useClock();
  const p = smooth(t / 12.1);
  return (
    <DreamStage theme="deep" t={t}>
      <Moon x={1450} y={255} r={145} />
      <PaperMountain x={370 - t * 9} y={625} s={0.82} color="#3f5b9e" />
      <PaperMountain x={1450 - t * 6} y={610} s={0.76} color="#604694" />
      <Island x={260} y={570} s={0.4} castle />
      <Island x={1675} y={540} s={0.44} />
      <Whale x={650 + t * 22} y={420 - Math.sin(t * 0.8) * 28} s={0.29} t={t} />
      <path
        d="M-80 882C200 621 430 909 690 756S1100 571 1305 720S1710 919 2020 574"
        fill="none"
        stroke="#ff8eaf"
        strokeWidth="8"
        opacity=".3"
      />
      <path
        d="M-80 878C200 617 430 905 690 752S1100 567 1305 716S1710 915 2020 570"
        fill="none"
        stroke="#ffcf8d"
        strokeWidth="3"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
      {Array.from({ length: 9 }, (_, i) => (
        <g
          key={i}
          transform={`translate(${210 + i * 190} ${690 - Math.sin(i * 1.7) * 130})`}
        >
          <Star
            r={10 + (i % 3) * 4}
            rotate={t * 18 + i * 30}
            color={i % 2 ? D.mint : D.gold}
          />
          <circle r="25" fill="none" stroke="#ffe5b0" opacity=".5" />
        </g>
      ))}
      <Bridge x={960} y={890} s={1.16} />
      <Couple x={960} y={845} s={0.42} t={t} />
      <Garden t={t} level={2} variant={0} />
    </DreamStage>
  );
};

export const MarkerObservatory = () => {
  const { t } = useClock();
  const p = smooth(t / 10);
  return (
    <DreamStage theme="night" t={t}>
      <Filigree x={960} y={420} r={325} t={t * 0.55} />
      <Moon x={960} y={420} r={190} />
      <path
        d="M260 950V370Q260 200 450 200T640 370V950M1280 950V370Q1280 200 1470 200T1660 370V950"
        fill="none"
        stroke="#ecbd9e"
        strokeWidth="8"
        opacity=".35"
      />
      <path
        d="M0 890Q360 690 720 835T1430 820T1980 700"
        fill="none"
        stroke="#ff91b0"
        strokeWidth="5"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
      <ClockFace x={960} y={420} r={128} t={t * 1.2} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 330 + i * 185;
        const y = 670 + Math.sin(i * 0.9 + t * 0.3) * 100;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0V-90" stroke="#ffdbab" strokeWidth="3" />
            <Star
              y={-107}
              r={11}
              rotate={i * 31 + t * 12}
              color={i % 2 ? D.pink : D.mint}
            />
            <circle r="18" fill="none" stroke="#ffdbab" />
          </g>
        );
      })}
      <Whale x={1450} y={280 + Math.sin(t) * 12} s={0.25} t={t} />
      <Foliage x={230} y={1030} s={1.32} rotation={-31} />
      <Foliage x={1700} y={1030} s={1.34} rotation={30} />
    </DreamStage>
  );
};

export const StarForge = () => {
  const { t } = useClock();
  const p = smooth(t / 12.1);
  return (
    <DreamStage theme="violet" t={t}>
      <Moon x={960} y={370} r={190} />
      <Filigree x={960} y={390} r={300} t={t * 0.7} />
      <g transform={`translate(960 ${730 - p * 38})`}>
        <ellipse cy="120" rx="390" ry="78" fill="#342d78" opacity=".4" />
        <ellipse
          cy="90"
          rx="310"
          ry="66"
          fill="#ffb27f"
          stroke="#ffe4a9"
          strokeWidth="5"
        />
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={i}
            d="M0 56Q-155-20-142-205Q-88-276-26-170Q20-312 72-228Q148-94 0 56Z"
            transform={`rotate(${i * 36 + t * 2})`}
            fill={i % 2 ? "#ff79aa" : "#7ad9d1"}
            stroke="#ffdfae"
            strokeWidth="3"
            opacity={0.74 + (i % 3) * 0.08}
          />
        ))}
        <Star r={74} rotate={t * 14} color="#fff3b3" />
        <Couple y={185} s={0.9} t={t} />
      </g>
      {Array.from({ length: 16 }, (_, i) => (
        <Star
          key={i}
          x={370 + rnd(i + 22) * 1190}
          y={230 + rnd(i + 52) * 490}
          r={4 + rnd(i + 7) * 7}
          rotate={i * 23 + t * 6}
          color={i % 3 ? D.cream : D.gold}
        />
      ))}
      <Thread
        d="M-50 901C260 700 450 978 725 823S1100 618 1322 774S1720 950 2020 694"
        t={t}
        progress={0.35 + p * 0.65}
        color="#ff82b1"
      />
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};

export const SoftGarden = () => {
  const { t } = useClock();
  const p = smooth(t / 7.8);
  return (
    <DreamStage theme="dawn" t={t}>
      <Cloud x={310 - t * 8} y={320} s={1.1} pink />
      <Cloud x={1610 + t * 6} y={360} s={1.05} />
      <Moon x={960} y={300} r={150} />
      <Sea y={790} t={t} />
      <g transform={`translate(960 ${690 - p * 30})`}>
        <ellipse cy="188" rx="380" ry="72" fill="#493c88" opacity=".27" />
        <path
          d="M0 160Q-178 10-180-136Q-120-231-35-102Q0-275 68-162Q185 4 0 160Z"
          fill="#ff86ae"
          stroke="#ffe2b0"
          strokeWidth="4"
        />
        <path
          d="M0 145Q-30 19-111-96"
          stroke="#ffe4af"
          strokeWidth="4"
          fill="none"
        />
        <Star r={35} color="#fff4bf" rotate={t * 18} />
        <Couple y={210} s={0.82} t={t} />
      </g>
      <path
        d="M-70 935C245 750 450 980 722 830S1105 650 1325 770S1715 962 2010 725"
        fill="none"
        stroke="#ff83ae"
        strokeWidth="4"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
      <Flower x={220} y={1010} s={1.3} rotation={-21} />
      <Flower x={1690} y={1005} s={1.28} rotation={27} blue />
      <Garden t={t} level={2} variant={1} />
    </DreamStage>
  );
};

export const MemoryCorridor = () => {
  const { t } = useClock();
  const p = smooth(t / 12.7);
  return (
    <DreamStage theme="deep" t={t}>
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          d={`M${170 + i * 405} 950V${220 + i * 18}Q${170 + i * 405} ${45 + i * 24} ${365 + i * 405} ${220 + i * 18}V950`}
          fill="none"
          stroke={i % 2 ? "#ffcf9c" : "#d2c3e8"}
          strokeWidth={i === 2 ? 12 : 5}
          opacity={0.24 + i * 0.05}
        />
      ))}
      <Moon x={960} y={350} r={160} />
      <g opacity={0.4 + p * 0.6}>
        <Letter x={450 + t * 15} y={590} s={0.58} rotation={-18} open={p} />
        <MiniOrb x={960} y={480} s={0.72} t={t} />
        <Whale
          x={1330 - t * 11}
          y={480 + Math.sin(t) * 18}
          s={0.32}
          t={t}
          city
        />
        <Couple x={950} y={866} s={0.42} t={t} />
      </g>
      <Thread
        d="M-80 900C280 690 470 1020 735 845S1110 626 1342 770S1715 950 2020 680"
        t={t}
        progress={p}
        color="#ffb1af"
      />
      <Foliage x={145} y={1030} s={1.32} rotation={-32} />
      <Foliage x={1780} y={1030} s={1.38} rotation={32} />
    </DreamStage>
  );
};

export const ThreadArchive = () => {
  const { t } = useClock();
  const p = smooth(t / 12.7);
  return (
    <DreamStage theme="violet" t={t}>
      <Moon x={1480} y={280} r={150} />
      <g
        transform={`translate(${960 - p * 250} ${420 + Math.sin(t * 0.3) * 13}) rotate(-3)`}
      >
        <path
          d="M-800-150Q0-290 800-150L755 535Q0 655-755 535Z"
          fill="url(#d-paper)"
          stroke="#e8a5ad"
          strokeWidth="7"
          filter="url(#d-shadow)"
        />
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M-680 ${-40 + i * 74}Q0 ${-135 + i * 74} 680 ${-40 + i * 74}`}
            fill="none"
            stroke="#ca8fa5"
            strokeWidth="2"
            opacity=".58"
          />
        ))}
        <Letter x={-430} y={160} s={0.52} rotation={-7} />
        <Letter x={80} y={100} s={0.48} rotation={9} open={p} />
        <MiniOrb x={470} y={155} s={0.46} t={t} warm />
        <path
          d="M-700 360C-380 150-175 438 50 270S425 120 705 300"
          fill="none"
          stroke="#ff7fa8"
          strokeWidth="8"
        />
      </g>
      <Whale x={1260 + t * 12} y={270 + Math.sin(t) * 16} s={0.3} t={t} />
      <StarTrail x={960} y={470} t={t} count={14} radius={430} />
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};

export const ReturnPost = () => {
  const { t } = useClock();
  const p = smooth(t / 12.1);
  return (
    <DreamStage theme="night" t={t}>
      <Moon x={1450 - p * 100} y={260} r={190} phase />
      <Filigree x={1450} y={260} r={225} t={t * 0.4} />
      <Sea y={735} t={t} />
      <Whale
        x={990 + t * 23}
        y={500 - Math.sin(t * 0.8) * 22}
        s={0.62}
        t={t}
        city
      />
      <Island x={345 - t * 8} y={585} s={0.48} castle />
      <Island x={1680 - t * 5} y={590} s={0.42} />
      <Thread
        d="M-70 905C238 706 480 1004 720 823S1100 617 1322 765S1714 950 2030 690"
        t={t}
        progress={0.3 + p * 0.7}
      />
      <Lantern x={380} y={215} s={0.7} t={t} />
      <Lantern x={1660} y={195} s={0.58} t={t} color="#ffe2a2" />
      <Flower x={175} y={1000} s={1.26} rotation={-27} />
      <Flower x={1740} y={1000} s={1.2} rotation={30} blue />
      <Garden t={t} level={2} variant={0} />
    </DreamStage>
  );
};

export const FinalBridge = () => {
  const { t } = useClock();
  const p = smooth(t / 7.6);
  return (
    <DreamStage theme="dawn" t={t}>
      <Moon x={960} y={300} r={190} />
      <Filigree x={960} y={320} r={270} t={t * 0.3} />
      <Sea y={760} t={t} />
      <Bridge x={960} y={895} s={1.34} />
      <g transform={`translate(${960 + p * 260} ${790 - p * 12})`}>
        <Couple s={1.05} t={t} />
        <path
          d="M-2-118Q-50-172-105-158M2-118Q50-172 105-158"
          fill="none"
          stroke="#ffd582"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M-80 914C222 704 473 1008 710 830S1098 616 1318 762S1710 953 2020 678"
        fill="none"
        stroke="#ffd791"
        strokeWidth="8"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
      <StarTrail x={960} y={380} t={t} count={20} radius={440} />
      <Flower x={185} y={1010} s={1.25} rotation={-26} />
      <Flower x={1735} y={1010} s={1.26} rotation={30} blue />
    </DreamStage>
  );
};

export const StarLetter = () => {
  const { t } = useClock();
  const p = smooth(t / 6.25);
  return (
    <DreamStage theme="night" t={t}>
      <Moon x={960} y={390} r={210} />
      <Sea y={790} t={t} />
      <path
        d="M-60 920C252 730 448 998 720 832S1095 624 1326 770S1706 958 2010 690"
        fill="none"
        stroke="#ff8eae"
        strokeWidth="6"
        opacity={1 - p * 0.35}
      />
      <g transform={`translate(960 ${700 - p * 90}) scale(${1 + p * 0.12})`}>
        <Letter x={0} y={20} s={1.15} rotation={-7 + p * 7} open={p} />
        <Star r={72} rotate={t * 13} color="#fff1b2" />
      </g>
      <Whale x={1240 + t * 19} y={650 - p * 150} s={0.42} t={t} />
      <Couple x={680 + p * 170} y={930 - p * 105} s={0.52} t={t} />
      {Array.from({ length: 23 }, (_, i) => (
        <Star
          key={i}
          x={280 + rnd(i + 100) * 1370}
          y={180 + rnd(i + 200) * 600 - p * 120}
          r={3 + rnd(i + 300) * 7}
          rotate={i * 25 + t * 4}
          color={i % 3 ? D.cream : D.gold}
        />
      ))}
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};
