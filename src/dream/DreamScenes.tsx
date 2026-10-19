import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { rnd, smooth, mix } from "./palette";
import {
  DreamStage,
  Star,
  Moon,
  Cloud,
  Sea,
  Flower,
  Foliage,
  Garden,
  Island,
  Whale,
  Letter,
  Couple,
  Bridge,
  Filigree,
} from "./DreamArt";
import { GlyphLine } from "./DreamType";
const useTime = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  return { f, fps, t: f / fps };
};
const Thread = ({
  d,
  t = 0,
  progress = 1,
}: {
  d: string;
  t?: number;
  progress?: number;
}) => (
  <g fill="none" strokeLinecap="round">
    <path d={d} stroke="#612c87" strokeWidth="7" opacity=".24" />
    <path
      d={d}
      stroke="#ff86ae"
      strokeWidth="3.5"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
    <path
      d={d}
      stroke="#ffd7ae"
      strokeWidth="1"
      opacity=".7"
      strokeDasharray="2 13"
      strokeDashoffset={-t * 12}
    />
  </g>
);
const Lantern = ({
  x,
  y,
  s = 1,
  t = 0,
  gift = false,
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
  gift?: boolean;
}) => (
  <g
    transform={`translate(${x} ${y + Math.sin(t * 0.8 + x) * 10}) scale(${s})`}
  >
    <ellipse cy="-15" rx="95" ry="120" fill="url(#d-glow)" />
    <path
      d="M-29-50Q-46-7-27 29H27Q46-7 29-50Z"
      fill={gift ? "#fc9cb8" : "#ffe0a4"}
      stroke="#e7a99a"
      strokeWidth="2"
    />
    <path
      d="M-26-50H26M-26 29H26M0-48V27M-17-46Q-27-8-15 26M17-46Q27-8 15 26"
      stroke="#fff0bd"
      strokeWidth="2"
      fill="none"
    />
    <path d="M0-51V-72M0 30V51" stroke="#ffc786" strokeWidth="2" />
    <Star y={-8} r={12} color={gift ? "#fff3b3" : "#f3a2b3"} />
    {gift ? (
      <>
        <path
          d="M-27 57H27V100H-27Z"
          fill="#ccacf3"
          stroke="#8c6cae"
          strokeWidth="2"
        />
        <path d="M0 57V100M-27 72H27" stroke="#ffe5a4" strokeWidth="6" />
        <path
          d="M0 57Q-30 37-29 50Q-25 64 0 57Q29 35 28 48Q25 64 0 57"
          fill="none"
          stroke="#ffe5a4"
          strokeWidth="4"
        />
      </>
    ) : (
      <path d="M-5 48V75M3 48V82M10 48V69" stroke="#f3a5bd" strokeWidth="2" />
    )}
  </g>
);
const Boat = ({
  x,
  y,
  s = 1,
  t = 0,
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${Math.sin(t) * 3}) scale(${s})`}>
    <path
      d="M-133 0Q0 65 133 0L95 79Q0 116-94 79Z"
      fill="url(#d-roof)"
      stroke="#944c86"
      strokeWidth="2"
    />
    <path
      d="M-133 0Q0 65 133 0M-110 32Q0 89 109 34"
      fill="none"
      stroke="#ffcf9e"
      strokeWidth="4"
    />
    <path d="M4-229V23" stroke="#ffe4ac" strokeWidth="5" />
    <path
      d="M-1-221Q-104-151-105-24Q-30-52-1-39Z"
      fill="url(#d-paper)"
      stroke="#e9b195"
      strokeWidth="2"
    />
    <path
      d="M11-216Q92-160 113-37Q42-61 11-42Z"
      fill="#72d9d3"
      stroke="#aaf0d4"
      strokeWidth="2"
    />
    <path d="M-7-185L-68-75M17-181L80-71" stroke="#e5c6ab" strokeWidth="1" />
    <Star x={-45} y={-109} r={20} color="#ef93af" />
    <Couple y={8} x={-8} s={0.33} t={t} />
    <path
      d="M-119 71Q-161 64-177 79"
      stroke="#ffb7af"
      strokeWidth="2"
      fill="none"
    />
  </g>
);
const Book = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#d-shadow)">
    <path
      d="M-620-57Q-297-203 0-48Q297-203 620-57L650 158Q318 64 0 228Q-318 64-650 158Z"
      fill="#675292"
      stroke="#d48fb2"
      strokeWidth="7"
    />
    <path
      d="M-610-79Q-290-225 0-70Q290-225 610-79L635 122Q310 35 0 202Q-310 35-635 122Z"
      fill="#e7b5ad"
      stroke="#bd80a4"
      strokeWidth="3"
    />
    {Array.from({ length: 7 }, (_, i) => (
      <path
        key={i}
        d={`M${-616 - i * 2} ${78 + i * 6}Q-306 ${-24 + i * 6} 0 ${160 + i * 5}Q306 ${-24 + i * 6} ${616 + i * 2} ${78 + i * 6}`}
        fill="none"
        stroke="#ffdfa9"
        strokeWidth="1.5"
      />
    ))}
    <path
      d="M-610-99Q-290-246 0-89V170Q-290-15-628 89Z"
      fill="url(#d-paper)"
      stroke="#ffdca8"
      strokeWidth="2"
    />
    <path
      d="M610-99Q290-246 0-89V170Q290-15 628 89Z"
      fill="url(#d-paper)"
      stroke="#ffdca8"
      strokeWidth="2"
    />
    <path d="M0-89V170" stroke="#c78da1" strokeWidth="4" />
    {[-50, 0, 50].map((yy) => (
      <path
        key={yy}
        d={`M-549 ${yy}Q-296 ${yy - 110} -60 ${yy + 7}M60 ${yy + 7}Q296 ${yy - 110} 549 ${yy}`}
        stroke="#c38ea7"
        strokeWidth="1.5"
        fill="none"
        opacity=".5"
      />
    ))}
    <path
      d="M10 165Q77 237 154 271L174 227L217 231Q98 191 31 153Z"
      fill="#f66f9e"
      stroke="#ffc8ab"
      strokeWidth="1.5"
    />
    <path
      d="M-583 47Q-492 25-432 33M462 26Q519 20 582 45"
      stroke="#d7ae9d"
      strokeWidth="1"
      fill="none"
    />
  </g>
);
const Orb = ({
  x,
  y,
  s = 1,
  t = 0,
  castle = false,
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
  castle?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r="247" fill="url(#d-glow)" />
    <g clipPath="url(#d-orb-clip)">
      <circle r="215" fill="#514f9a" />
      <circle cx="54" cy="-84" r="107" fill="#fbd4ac" />
      <path d="M-230 41Q-81-15 12 41T231 22V230H-230Z" fill="url(#d-water)" />
      <Island x={-3} y={61} s={0.63} castle={castle} />
      <Cloud x={-118} y={-96} s={0.22} />
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d={`M${rnd(i + 31) * 400 - 200} ${102 + rnd(i + 16) * 100}h${9 + rnd(i) * 28}`}
          stroke="#b1e7dd"
          opacity=".45"
          strokeWidth="1.5"
        />
      ))}
    </g>
    <circle r="215" fill="url(#d-glass)" stroke="#e4fbe5" strokeWidth="2" />
    <path
      d="M-155-117Q-70-212 91-162"
      fill="none"
      stroke="#efffe8"
      strokeWidth="7"
      opacity=".65"
    />
    <path
      d="M-174-88L-184-65"
      stroke="#efffe8"
      strokeWidth="6"
      strokeLinecap="round"
      opacity=".65"
    />
    <ellipse
      rx="282"
      ry="61"
      fill="none"
      stroke="url(#d-gold)"
      strokeWidth="2"
      transform={`rotate(${-25 + Math.sin(t) * 3})`}
    />
  </g>
);

const StarPondInner = () => {
  const { t } = useTime(),
    p = smooth(t / 3.8);
  return (
    <DreamStage t={t} theme="night">
      <Moon x={1485 - p * 110} y={255 + p * 15} r={137} />
      <Cloud x={240 - t * 9} y={371} s={1.1} pink />
      <Cloud x={1600 + t * 6} y={470} s={0.95} />
      <Island x={420 - t * 9} y={556} s={0.35} castle />
      <Island x={1590 - t * 10} y={553} s={0.42} />
      <Sea y={655} t={t} />
      <g
        transform={`translate(960 700) scale(${1.22 - p * 0.23}) translate(-960 -700)`}
      >
        <ellipse
          cx="962"
          cy="849"
          rx="490"
          ry="92"
          fill="#182c70"
          opacity=".4"
        />
        <ellipse
          cx="957"
          cy="817"
          rx="480"
          ry="50"
          fill="none"
          stroke="#c4f3c5"
          opacity=".4"
        />
        <path
          d="M500 810Q626 741 871 769L1020 809Q766 922 500 810Z"
          fill="#43baa5"
          stroke="#9ce3be"
          strokeWidth="2"
        />
        <path
          d="M1018 809Q1177 711 1436 782Q1278 906 1018 809Z"
          fill="#35a7a5"
          stroke="#90e1c2"
          strokeWidth="2"
        />
        <path
          d="M623 815Q764 793 954 819M1070 812Q1226 780 1362 795"
          stroke="#b2e7b9"
          strokeWidth="2"
          fill="none"
        />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i} transform={`translate(960 760) rotate(${(i - 3) * 15})`}>
            <path
              d="M0 31Q-153-27-146-156Q-112-228-33-142Q25-265 63-205Q122-97 0 31Z"
              fill="url(#d-petal)"
              stroke="#e88ca8"
              strokeWidth="2"
            />
            <path
              d="M0 20Q-24-58-72-146"
              fill="none"
              stroke="#ffdfb8"
              strokeWidth="2"
              opacity=".7"
            />
          </g>
        ))}
        <ellipse cx="960" cy="745" rx="92" ry="28" fill="#ffe3a0" />
        <Letter
          x={960}
          y={652 - Math.sin(t * 0.8) * 13}
          s={0.4 + p * 0.09}
          rotation={-8 + p * 8}
        />
        <g
          transform={`translate(960 ${430 - mix(t, 0, 1.8, 0, 130)}) scale(${0.82 + Math.sin(t * 1.4) * 0.04})`}
        >
          <ellipse cy="24" rx="135" ry="160" fill="url(#d-glow)" />
          <path
            d="M0-88C-25-42-81 4-66 58C-46 130 53 128 70 58C82 13 32-36 0-88Z"
            fill="url(#d-glass)"
            stroke="#f7e9b3"
            strokeWidth="2"
          />
          <Star y={29} r={32} rotate={t * 15} />
          <path
            d="M-32 1Q-52 38-31 68"
            stroke="#fff4d1"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <Thread
          d="M-90 931C286 723 388 1047 714 942S1092 690 1338 841S1760 1059 2010 738"
          t={t}
          progress={0.45 + p * 0.55}
        />
      </g>
      <Lantern x={235} y={190} s={0.55} t={t} gift />
      <Lantern x={1702} y={220} s={0.46} t={t} />
      <Garden t={t} level={2} variant={0} />
    </DreamStage>
  );
};
const MoonPostInner = () => {
  const { t } = useTime(),
    p = smooth(t / 3.4);
  return (
    <DreamStage t={t} theme="dawn">
      <Moon x={1441} y={340} r={210} phase />
      <Filigree x={1441} y={340} r={255} t={t * 0.4} />
      <Island x={245 - t * 13} y={541} s={0.46} />
      <Island x={1735 - t * 10} y={630} s={0.39} castle />
      <Cloud x={400 - t * 9} y={224} s={0.91} />
      <Cloud x={1524 + t * 7} y={732} s={1.22} pink />
      <Sea y={860} t={t} />
      <g transform={`translate(${58 - p * 90} ${32 - p * 20})`}>
        <Whale
          x={929 + p * 40}
          y={620 + Math.sin(t * 0.8) * 15}
          s={1.27 + p * 0.04}
          t={t}
          city
        />
        <Letter
          x={442 + t * 28}
          y={442 - Math.sin(t) * 21}
          s={0.22}
          rotation={-15 + t * 3}
        />
        <Letter
          x={1520 + t * 14}
          y={586 + Math.sin(t * 0.7) * 23}
          s={0.16}
          rotation={18}
        />
      </g>
      <Thread
        d="M-70 749C261 907 386 428 685 505S1113 911 1390 750S1743 319 2010 521"
        t={t}
      />
      <Lantern x={174} y={203} s={0.7} t={t} gift />
      <Lantern x={1594} y={164} s={0.49} t={t} gift />
      <Cloud x={-86 + t * 19} y={945} s={1.28} pink />
      <Cloud x={1930 - t * 13} y={982} s={1.3} />
      <Garden t={t} variant={1} />
    </DreamStage>
  );
};
const AcrossWorldsInner = () => {
  const { t } = useTime(),
    p = smooth(t / 4.7);
  return (
    <DreamStage t={t} theme="deep">
      <Moon x={1454 - t * 6} y={246} r={162} />
      <Cloud x={295 - t * 14} y={213} s={0.95} pink />
      <Cloud x={1001 - t * 10} y={354} s={0.65} />
      <g transform={`translate(${-p * 110} 0)`} opacity=".7">
        <Island x={363} y={485} s={0.44} castle />
        <Island x={1261} y={499} s={0.48} />
        <Island x={1820} y={478} s={0.36} castle />
      </g>
      <Sea y={755} t={t} />
      <Bridge x={995 - p * 80} y={669} s={1.28} />
      <Island x={315 - p * 125} y={780} s={0.86} />
      <Island x={1788 - p * 125} y={792} s={1.02} castle />
      <Thread
        d="M-80 682C240 437 393 799 690 711S1064 360 1315 497S1706 864 2020 593"
        t={t}
        progress={0.55 + p * 0.45}
      />
      <Boat
        x={663 + p * 573}
        y={610 - Math.sin(p * Math.PI) * 105}
        s={0.88}
        t={t}
      />
      <Lantern x={501 - p * 50} y={340} s={0.48} t={t} />
      <Lantern x={1576 - p * 40} y={481} s={0.42} t={t} gift />
      <g transform={`translate(${-p * 80} 0)`}>
        <Foliage x={38} y={1230} s={1.95} rotation={43} dark />
        <Flower x={176} y={1240} s={1.45} rotation={-17} />
        <Foliage x={2003} y={1240} s={1.9} rotation={-45} />
      </g>
      <Star x={1285} y={365} r={19} rotate={t * 5} />
    </DreamStage>
  );
};
const ThousandWorldsInner = () => {
  const { t } = useTime(),
    p = smooth(t / 4.7);
  return (
    <DreamStage t={t} theme="violet">
      <g fill="none" stroke="#f6c59e" opacity=".35">
        <path
          d="M116 1020V225Q116 87 263 87Q405 87 405 225V1020M1518 1020V225Q1518 87 1665 87Q1807 87 1807 225V1020"
          strokeWidth="7"
        />
        <path
          d="M135 1020V231Q135 111 263 111Q386 111 386 231V1020M1537 1020V231Q1537 111 1665 111Q1788 111 1788 231V1020"
          strokeWidth="1.5"
        />
        <path d="M263 90V802M1665 90V802" strokeWidth="2" />
      </g>
      <Sea y={847} t={t} />
      <Filigree x={978} y={486} r={361} t={t} />
      <g transform={`translate(${15 - p * 20} ${12 - p * 15})`}>
        <path
          d="M180 1019C329 863 536 895 693 831C793 789 812 706 800 650"
          fill="none"
          stroke="#7a528c"
          strokeWidth="31"
        />
        <path
          d="M180 1009C329 853 536 885 693 821C793 779 812 696 800 640"
          fill="none"
          stroke="url(#d-gold)"
          strokeWidth="24"
        />
        <ellipse
          cx="994"
          cy="722"
          rx="281"
          ry="86"
          fill="#b87488"
          stroke="#ffe5a8"
          strokeWidth="7"
        />
        <ellipse
          cx="994"
          cy="709"
          rx="261"
          ry="70"
          fill="url(#d-water)"
          stroke="#f5c99c"
          strokeWidth="3"
        />
        <Orb
          x={994}
          y={482 + Math.sin(t * 0.7) * 10}
          s={1.14 + p * 0.05}
          t={t}
          castle
        />
        <path
          d="M951 219Q920 170 942 137Q963 99 980 135Q996 169 951 219Z"
          fill="url(#d-glass)"
          stroke="#d7ecdf"
          strokeWidth="1.5"
        />
      </g>
      <Orb x={360 + Math.sin(t * 0.5) * 12} y={392} s={0.47} t={t} />
      <Orb
        x={1530 + Math.sin(t * 0.5 + 1) * 13}
        y={502}
        s={0.55}
        t={t}
        castle
      />
      <Cloud x={1423} y={285} s={0.75} pink />
      <Whale x={1618} y={222 + Math.sin(t) * 8} s={0.19} t={t} />
      <Thread
        d="M-50 836C272 604 389 766 594 859S1093 997 1363 772S1723 460 2010 688"
        t={t}
      />
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};
const GoldenPromiseInner = () => {
  const { t } = useTime(),
    p = smooth(t / 4);
  return (
    <DreamStage t={t} theme="night">
      <Moon x={967} y={408} r={235} />
      <Filigree x={967} y={408} r={316} t={t} />
      <ellipse
        cx="967"
        cy="408"
        rx="565"
        ry="156"
        fill="none"
        stroke="#ffcb9a"
        strokeWidth="2"
        transform={`rotate(${-19 + p * 9} 967 408)`}
      />
      <ellipse
        cx="967"
        cy="408"
        rx="481"
        ry="138"
        fill="none"
        stroke="#cc9ddb"
        strokeWidth="1.6"
        transform={`rotate(${22 - p * 8} 967 408)`}
      />
      <Island x={264 - t * 5} y={604} s={0.45} castle />
      <Island x={1649 - t * 7} y={604} s={0.48} />
      <Cloud x={371 - t * 8} y={309} s={0.75} pink />
      <Cloud x={1570 + t * 4} y={293} s={0.74} />
      <Sea y={762} t={t} />
      <Bridge x={960} y={893} s={1.2} />
      <g transform={`translate(960 825) scale(${1.11 + p * 0.08})`}>
        <Couple s={1.25} t={t} />
      </g>
      <path
        d="M748 452C692 344 830 314 960 448C1090 302 1232 344 1172 452C1110 570 813 565 748 452Z"
        fill="none"
        stroke="url(#d-gold)"
        strokeWidth="7"
      />
      <path
        d="M748 452C692 344 830 314 960 448C1090 302 1232 344 1172 452C1110 570 813 565 748 452Z"
        fill="none"
        stroke="#fff6c9"
        strokeWidth="1.5"
      />
      <Star x={750 + Math.sin(t * 0.7) * 16} y={442} r={14} rotate={t * 12} />
      <Star x={1162} y={449 - Math.sin(t) * 14} r={12} />
      <Thread
        d="M-80 935C211 741 511 1050 701 891S845 627 963 682S1138 1019 1409 875S1776 733 2030 917"
        t={t}
      />
      <Lantern x={309} y={278} s={0.65} t={t} gift />
      <Lantern x={1650} y={232} s={0.6} t={t} />
      <Garden t={t} level={2} variant={1} />
    </DreamStage>
  );
};
const DreamTitleInner = () => {
  const { t } = useTime();
  return (
    <DreamStage t={t} theme="violet">
      <Moon x={960} y={435} r={244} />
      <Filigree x={960} y={453} r={375} t={t * 0.6} />
      <g opacity=".22" stroke="#ffdbae" fill="none">
        {Array.from({ length: 24 }, (_, i) => (
          <path
            key={i}
            d="M960 155L960-200"
            strokeWidth={i % 3 ? 1 : 2}
            transform={`rotate(${i * 15} 960 453)`}
          />
        ))}
      </g>
      <Cloud x={200 - t * 7} y={455} s={1.2} pink />
      <Cloud x={1720 + t * 6} y={485} s={1.3} />
      <Island x={189} y={748} s={0.57} castle />
      <Island x={1740} y={746} s={0.57} castle />
      <Sea y={847} t={t} />
      <path
        d="M302 629Q960 767 1618 629L1567 754Q960 901 353 754Z"
        fill="#754d92"
        stroke="#ffc2a2"
        strokeWidth="3"
      />
      <path
        d="M306 646Q960 784 1614 646"
        stroke="#df98b2"
        strokeWidth="2"
        fill="none"
      />
      <Thread
        d="M-50 766C227 523 387 775 604 683S856 331 1045 450S1301 802 1509 661S1783 419 2000 671"
        t={t}
      />
      <GlyphLine
        text="勾指起誓"
        x={980}
        y={327}
        size={267}
        start={7}
        delay={6}
        title
      />
      <Whale x={997} y={867 + Math.sin(t) * 10} s={0.33} t={t} />
      <Letter x={323} y={220 + Math.sin(t * 0.8) * 9} s={0.25} rotation={-18} />
      <Lantern x={1658} y={237} s={0.68} t={t} gift />
      <Flower x={266} y={842} s={1.1} rotation={-27} />
      <Flower x={1645} y={863} s={1.08} rotation={25} blue />
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};
const PoetryGateInner = () => {
  const { t } = useTime(),
    p = mix(t, 0, 1.5);
  return (
    <DreamStage t={t} theme="deep">
      <Moon x={1449} y={243} r={145} />
      <Cloud x={198 - t * 8} y={190} s={0.86} pink />
      <g fill="none" stroke="#d6b4cf" opacity=".24">
        <path
          d="M1020 900V274Q1020 22 1325 22Q1628 22 1628 274V900"
          strokeWidth="12"
        />
        <path
          d="M1045 900V274Q1045 51 1325 51Q1603 51 1603 274V900"
          strokeWidth="2"
        />
      </g>
      <Sea y={827} t={t} />
      <g transform={`translate(${17 - t * 4} ${12 - t * 2})`}>
        <Book x={1335} y={841} s={0.83} />
        <Island x={1331} y={565} s={0.61} castle />
        <Letter
          x={1325}
          y={634 - p * 46}
          s={1.03}
          rotation={-7 + p * 7}
          open={p}
        />
        <Whale x={1640 + t * 8} y={414 + Math.sin(t) * 12} s={0.25} t={t} />
        <Flower x={1055} y={936} s={0.83} rotation={-25} />
        <Foliage x={1647} y={984} s={1.05} rotation={27} />
      </g>
      <path
        d="M149 249Q536 163 900 254L859 719Q549 803 151 712Z"
        fill="#283f78"
        opacity=".55"
      />
      <path
        d="M176 274Q536 201 870 271M179 701Q529 773 840 707"
        fill="none"
        stroke="#e8b28e"
        strokeWidth="1.6"
        opacity=".65"
      />
      <Star x={200} y={291} r={10} />
      <Star x={838} y={704} r={10} />
      <Thread
        d="M-60 922C242 716 469 1038 762 897S991 586 1200 517S1513 799 1724 637S1920 397 2020 460"
        t={t}
      />
      <Lantern x={1794} y={164} s={0.56} t={t} />
      <Garden t={t} variant={1} />
    </DreamStage>
  );
};
const FairytaleBloomInner = () => {
  const { t } = useTime(),
    p = smooth(t / 4.8);
  return (
    <DreamStage t={t} theme="night">
      <Moon x={1010} y={495} r={214} />
      <Filigree x={1010} y={507} r={322} t={t * 0.6} />
      <Cloud x={320 - t * 7} y={409} s={1.1} pink />
      <Cloud x={1646 + t * 6} y={389} s={1.08} />
      <Sea y={805} t={t} />
      <Book x={958} y={901} s={1.05} />
      <g transform={`translate(0 ${24 - p * 25})`}>
        <Island x={683} y={656} s={0.42} castle />
        <Island x={1276} y={688} s={0.38} />
        <Whale
          x={1073 + t * 8}
          y={564 - Math.sin(t * 0.8) * 20}
          s={0.55}
          t={t}
          city
        />
        <Couple x={947} y={962} s={0.57} t={t} />
        <Flower
          x={463}
          y={990}
          s={0.95}
          rotation={-20}
          bloom={mix(t, 0.2, 1.5, 0.4, 1)}
        />
        <Flower
          x={1460}
          y={997}
          s={1.1}
          rotation={24}
          blue
          bloom={mix(t, 2.6, 4.1, 0.2, 1)}
        />
        <Foliage x={590} y={1045} s={0.82} rotation={-20} />
        <Foliage x={1384} y={1092} s={0.89} rotation={28} />
      </g>
      <Thread
        d="M-70 918C254 723 443 1003 716 924S1041 795 1190 878S1592 1023 1762 849S1945 681 2020 773"
        t={t}
      />
      {Array.from({ length: 14 }, (_, i) => (
        <Star
          key={i}
          x={425 + rnd(i + 44) * 1080}
          y={399 + rnd(i + 55) * 508 - Math.sin(t * 0.5 + i) * 12}
          r={3 + rnd(i + 18) * 5}
          rotate={i * 21 + t * 4}
        />
      ))}
      <Garden t={t} level={2} variant={2} />
    </DreamStage>
  );
};
export const StarPond = Interactive.create({
  Component: StarPondInner,
  layout: "absolute-fill",
});
export const MoonPost = Interactive.create({
  Component: MoonPostInner,
  layout: "absolute-fill",
});
export const AcrossWorlds = Interactive.create({
  Component: AcrossWorldsInner,
  layout: "absolute-fill",
});
export const ThousandWorlds = Interactive.create({
  Component: ThousandWorldsInner,
  layout: "absolute-fill",
});
export const GoldenPromise = Interactive.create({
  Component: GoldenPromiseInner,
  layout: "absolute-fill",
});
export const DreamTitle = Interactive.create({
  Component: DreamTitleInner,
  layout: "absolute-fill",
});
export const PoetryGate = Interactive.create({
  Component: PoetryGateInner,
  layout: "absolute-fill",
});
export const FairytaleBloom = Interactive.create({
  Component: FairytaleBloomInner,
  layout: "absolute-fill",
});
