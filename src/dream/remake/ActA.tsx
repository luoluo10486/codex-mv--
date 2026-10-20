import { STORY_OUTFIT, StoryCouple } from "../StoryCharacters";
import { SharedSeasons } from "../SharedSeasons";
import { SharedTenderness } from "../SharedTenderness";
import { HeldHands } from "../HeldHands";
import type { ComponentType } from "react";
import {
  WarmGlow,
  WarmLetter,
  WarmMoon,
  WarmSantaRig,
  WarmSnow,
  WarmStar,
} from "../WarmArt";
import { smooth } from "../palette";
import {
  Bell,
  Book,
  Dust,
  Gift,
  Ground,
  House,
  MiniWorld,
  Pine,
  ReadingProps,
  Sprig,
  Stage,
  useMoment,
} from "./ActAArt";
import type { SceneProps } from "./types";

export const Letter = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage>
      <WarmGlow x={1000} y={614} r={520} />
      <ellipse
        cx="960"
        cy="930"
        rx="540"
        ry="48"
        fill="#d8c9c4"
        opacity="0.17"
      />
      <ReadingProps x={360} y={875} s={1.05}/>
      <ReadingProps x={1570} y={880} s={1.05} ink/>
      <g transform={`translate(960 ${665 - e * 45}) rotate(${-5 + e * 4})`}>
        <g
          transform={`translate(0 ${-e * 110}) rotate(4)`}
          filter="url(#warm-shadow)"
        >
          <path d="M-230-180L214-203L239 93L-211 110Z" fill="#f6f1e7" />
          <path
            d="M-207-159L193-179L216 73L-193 88Z"
            fill="none"
            stroke="#e7dccd"
            strokeWidth="2"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-163 ${-110 + i * 32}q95-16 ${230 - (i % 2) * 50}-13`}
              stroke="#d5c8c4"
              strokeWidth="4"
              opacity="0.5"
              fill="none"
            />
          ))}
          <path
            d="M123 37q-20-39-41-11q-38-27-39 10q8 25 47 39q32-22 33-38"
            fill="#dcc7c6"
          />
        </g>
        <WarmLetter s={1.36} open={0} />
      </g>
      <g transform={`translate(${1350 - e * 40} ${695 - e * 50}) rotate(24)`}>
        <path d="M0 190Q-24 34 95-119Q142-31 23 147Z" fill="#e3d3cc" />
        <path d="M0 208L79-85" stroke="#f5efe2" strokeWidth="6" />
        <path
          d="M20 115L76 41M30 72L-6 48M44 25L101-27"
          stroke="#f5efe2"
          strokeWidth="3"
        />
      </g>
      <Dust f={f} />
    </Stage>
  );
};

export const Storybook = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useMoment(durationInFrames);
  const opening = p < 0.28 ? 1 - smooth(p / 0.28) : smooth((p - 0.28) / 0.46);
  return (
    <Stage>
      <WarmGlow x={960} y={667} r={590} />
      <path d="M0 906Q960 818 1920 906V1080H0Z" fill="#e7dcd1" />
      <ReadingProps x={245} y={875} s={1.1}/>
      <ReadingProps x={1700} y={910} s={1.1} ink/>
      <Book x={960} y={790} s={1.45} open={opening} />
      <g opacity={opening} transform={`translate(0 ${80 * (1 - opening)})`}>
        <path
          d="M740 643L740 532L792 532L792 457L830 402L869 457V530H923V645Z"
          fill="#dbc9c7"
        />
        <path
          d="M738 529L765 484L793 529M791 456L830 394L872 456M872 529L898 484L924 529"
          fill="#cfbebf"
        />
        <path d="M813 643V589Q830 562 848 589V643" fill="#f1e9d7" />
        <path
          d="M1060 643L1060 512L1107 512V438L1150 375L1194 438V515H1239V646"
          fill="#e4d4ca"
        />
        <path
          d="M1054 512L1084 461L1110 512M1106 440L1150 368L1194 440M1191 515L1218 464L1245 515"
          fill="#d7c5c3"
        />
        <path d="M1130 645V578Q1150 552 1170 578V645" fill="#f5efe1" />
        <path
          d="M829 410V370L878 383L829 395M1150 379V336L1206 349L1150 366"
          fill="#dfa5b2"
          stroke="#dfd1c4"
          strokeWidth="3"
        />
        <path
          d="M865 628Q960 520 1060 628"
          stroke="#e8dccd"
          strokeWidth="15"
          fill="none"
        />
        <WarmStar x={973} y={420} r={29} color="#f4efde" rotate={f * 0.2} />
      </g>
      <Dust f={f} count={18} />
    </Stage>
  );
};

export const Miracle = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage night>
      <WarmGlow x={960} y={660 - e * 100} r={600} />
      <path
        d={`M592 841L${898 - e * 160} 404Q960 359 ${1022 + e * 160} 404L1328 841Z`}
        fill="#f1e9d7"
        opacity="0.1"
      />
      <path d="M0 972Q960 849 1920 972V1080H0Z" fill="#d7c8c5" />
      <Book y={862} s={1.12} />
      <g
        transform={`translate(960 ${755 - e * 220}) scale(${0.45 + e * 0.55})`}
      >
        <ellipse cy="111" rx="178" ry="43" fill="#d5c5c3" />
        <path
          d="M-177 97Q0 54 177 97L102 162L-3 193L-118 151Z"
          fill="#dfcfc7"
        />
        <path d="M-175 94Q0 47 175 94Q0 153-175 94" fill="#ede3d5" />
        <House x={0} y={-2} s={0.66} snow={false} tower />
        <Pine x={-118} y={94} s={0.4} snow={false} />
        <Pine x={120} y={95} s={0.3} snow={false} />
        <path
          d="M26 115Q96 141 15 161Q-4 168-10 188"
          stroke="#f4eedf"
          strokeWidth="12"
          fill="none"
        />
      </g>
      {Array.from({ length: 13 }, (_, i) => (
        <WarmStar
          key={i}
          x={700 + i * 43}
          y={815 - ((f * (1 + (i % 4)) + i * 43) % 455)}
          r={5 + (i % 3) * 3}
          color="#f1ead7"
          rotate={f + i * 12}
        />
      ))}
      <ReadingProps x={300} y={970} s={1.1}/>
      <ReadingProps x={1660} y={960} s={1.1} ink/>
    </Stage>
  );
};

export const MoonTown = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage night>
      <defs><linearGradient id="moon-town-night" x2="0" y2="1"><stop stopColor="#50455f"/><stop offset=".58" stopColor="#8a7085"/><stop offset="1" stopColor="#d7a6a0"/></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#moon-town-night)"/>
      {Array.from({length:30},(_,i)=><WarmStar key={i} x={70+(i*293)%1770} y={90+(i*137)%360} r={2+i%3} color="#ffedc4"/>)}
      <WarmMoon x={1395 - e * 35} y={438} r={148} />
      <path
        d="M0 701Q380 553 730 678T1330 653T1920 712V1080H0Z"
        fill="#d2c4c3"
      />
      <g transform={`translate(${-e * 20} 0)`}>
        <House x={260} y={657} s={0.9} color="#d5c5c3" />
        <House x={555} y={640} s={1.12} color="#dcccc8" />
        <House x={968} y={656} s={1.2} color="#e2d1cb" tower />
        <House x={1340} y={684} s={0.84} color="#d7c5c3" />
        <House x={1650} y={673} s={1.05} color="#e2d1cb" />
        <Pine x={81} y={838} s={0.8} />
        <Pine x={757} y={859} s={0.6} />
        <Pine x={1495} y={864} s={0.65} />
      </g>
      <Ground snow />
      <StoryCouple x={900} y={804} s={.68} gap={78}/>
      <path
        d="M880 1080Q1170 945 1010 826"
        fill="none"
        stroke="#e2d6ce"
        strokeWidth="112"
        opacity="0.44"
      />
      <g transform="translate(1590 915)">
        <path d="M0 0V-240M-38-240H38" stroke="#cbbfbd" strokeWidth="12" />
        <rect x="-37" y="-233" width="74" height="79" rx="11" fill="#efe5d1" />
        <path d="M-48-233L0-266L48-233" fill="#cdbebd" />
        <WarmGlow x={0} y={-192} r={122} />
      </g>
      <Pine x={130} y={1080} s={1.25} />
      <Pine x={1845} y={1080} s={1.25} />
      <WarmSnow count={55} seed={4} />
      <Dust f={f} count={8} />
    </Stage>
  );
};

export const SantaDelivery = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useMoment(durationInFrames);
  const arrive = smooth(p / 0.42);
  const drop = smooth((p - 0.36) / 0.47);
  const sledX = 425 + arrive * 255;
  const sledY = 555 + arrive * 20;
  const giftStartX = sledX + 60;
  const giftStartY = sledY - 128;
  const giftX = giftStartX + (1600 - giftStartX) * drop;
  const giftY = giftStartY + (755 - giftStartY) * drop + Math.sin(drop * Math.PI) * 115;
  return (
    <Stage night>
      <defs>
        <linearGradient id="santa-delivery-night" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#50455f" />
          <stop offset="0.58" stopColor="#8a7085" />
          <stop offset="1" stopColor="#d7a6a0" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#santa-delivery-night)" />
      {Array.from({ length: 24 }, (_, i) => <WarmStar key={i} x={95 + (i * 317) % 1740} y={105 + (i * 113) % 310} r={2 + i % 3} color="#fff3d0" />)}
      <WarmMoon x={1450} y={260} r={105} />
      <path d="M0 773Q410 669 950 754T1920 720V1080H0Z" fill="#bda4b0" />
      <House x={272} y={736} s={0.64} color="#b7a0ad" />
      <Pine x={1282} y={814} s={0.55} />
      <Ground snow />
      <g transform="translate(1620 726)">
        <path d="M-184 75V-174L0-300L190-174V75Z" fill="#d5b4b5" />
        <path d="M-215-165L0-322L220-165" fill="none" stroke="#fff6e8" strokeWidth="24" strokeLinecap="round" />
        <path d="M-165 69V-152H168V69" fill="#e7cbd0" />
        <rect x="-55" y="-118" width="108" height="190" rx="13" fill="#986e7b" stroke="#f7e6d5" strokeWidth="10" />
        <rect x="-32" y="-94" width="62" height="86" rx="8" fill="#ffe7aa" />
        <path d="M-29-52H29M1-91V-11" stroke="#bb8e8d" strokeWidth="5" />
        <circle cx="30" cy="28" r="5" fill="#f6d49b" />
        <rect x="-145" y="-80" width="54" height="68" rx="8" fill="#ffe7aa" stroke="#f8e8d7" strokeWidth="8" />
        <rect x="91" y="-80" width="54" height="68" rx="8" fill="#ffe7aa" stroke="#f8e8d7" strokeWidth="8" />
        <path d="M-195 84H198V110H-195ZM-174 111H177V129H-174Z" fill="#e6c8b9" />
        <path d="M-195 79H198" stroke="#fff9ef" strokeWidth="13" strokeLinecap="round" />
        <path d="M-133-139Q0-105 135-139" fill="none" stroke="#b9c7a5" strokeWidth="12" />
        {[-120,-60,0,60,120].map((x,i) => <circle key={x} cx={x} cy={-130 + (i % 2) * 9} r="7" fill={i % 2 ? "#ffe4a7" : "#e29cad"} />)}
        <WarmGlow x={0} y={-32} r={205} opacity={0.42} />
      </g>
      <Pine x={1880} y={888} s={0.85} />
      <WarmSantaRig x={sledX} y={sledY} t={f / 5} release={drop} />
      <path d={`M${giftStartX} ${giftStartY}Q${1150} 900 1600 755`} fill="none" stroke="#fff0c9" strokeWidth="4" strokeDasharray="7 14" opacity={drop > 0 && drop < 1 ? 0.45 : 0} />
      <Gift x={giftX} y={giftY} s={0.33} rotate={-6 * (1 - drop)} />
      <WarmGlow x={1600} y={811} r={130} opacity={drop * 0.32} />
      <Bell x={342} y={287} s={0.55} tilt={Math.sin(f / 7) * 10} />
      <WarmSnow count={44} seed={8} />
    </Stage>
  );
};

export const OpenGift = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage>
      <WarmGlow x={956} y={687} r={520} />
      <path d="M0 924Q960 809 1920 924V1080H0Z" fill="#eadfd2" />
      <Sprig x={313} y={937} s={1.28} />
      <Sprig x={1620} y={955} s={1.25} flip />
      <Gift x={960} y={762} s={1.6} lift={e} />
      <g opacity={e} transform={`translate(0 ${80 - e * 80})`}>
        <MiniWorld x={700} y={560} s={0.58} kind={1} f={f} />
        <MiniWorld x={1200} y={520} s={0.53} kind={2} f={f} />
        <WarmStar x={990} y={406} r={35} color="#f6f3e5" rotate={f * 0.5} />
        <path
          d="M903 711Q731 642 789 530M1006 707Q1181 662 1119 517"
          fill="none"
          stroke="#f1ead8"
          strokeWidth="6"
          strokeDasharray="8 17"
        />
      </g>
      <Bell x={1415} y={815} s={0.95} tilt={23} />
      <Dust f={f} />
    </Stage>
  );
};

export const ManyWorlds = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage night>
      <WarmGlow x={960} y={625} r={620} />
      <Ground />
      <g transform={`translate(${960} ${640}) rotate(${e * 12 - 6})`}>
        {Array.from({ length: 9 }, (_, i) => (
          <MiniWorld
            key={i}
            x={Math.cos(i * 0.7) * (190 + (i % 3) * 160)}
            y={Math.sin(i * 0.7) * (110 + (i % 2) * 100)}
            s={0.34 + (i % 3) * 0.06}
            kind={i}
            f={f}
          />
        ))}
        <path
          d="M-480 91Q-239-247 0-47T483 26"
          fill="none"
          stroke="#f1ead8"
          strokeWidth="7"
          opacity="0.75"
          strokeDasharray="13 16"
        />
        <WarmStar x={0} y={0} r={42} color="#f3eedc" rotate={f * 0.4} />
      </g>
      <WarmSnow count={28} seed={10} />
    </Stage>
  );
};

export const LadleWorld = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useMoment(durationInFrames);
  const dip = smooth(p / 0.34);
  const lift = smooth((p - 0.42) / 0.43);
  const water = smooth((p - 0.28) / 0.22);
  const ladleY = 500 + dip * 260 - lift * 300;
  const angle = -19 + dip * 8 + lift * 8;
  return (
    <Stage>
      <WarmGlow x={990} y={627} r={520} opacity={0.35} />
      <path
        d="M0 607Q380 486 704 601T1338 585T1920 622V1080H0Z"
        fill="#f1d3b5"
      />
      <path
        d="M0 637Q365 531 723 638T1378 617T1920 660V1080H0Z"
        fill="#f8dfe8"
      />
      <path
        d="M0 709Q377 584 753 694T1375 690T1920 726V1080H0Z"
        fill="#d6edf2"
      />
      <path
        d="M0 839Q377 715 753 825T1375 817T1920 850V1080H0Z"
        fill="#bcdde8"
        opacity="0.55"
      />
      <path
        d="M0 709Q377 584 753 694T1375 690T1920 726"
        fill="none"
        stroke="#fffaf4"
        strokeWidth="13"
      />
      {Array.from({ length: 7 }, (_, i) => (
        <path
          key={i}
          d={`M${-160 + ((i * 347 + f * 1.8) % 1880)} ${754 + (i % 3) * 95}q74-20 154 0t156 0`}
          stroke={i % 2 ? "#fffaf4" : "#f8dfe8"}
          strokeWidth={5 + (i % 2) * 2}
          strokeLinecap="round"
          fill="none"
          opacity="0.66"
        />
      ))}
      <House x={376} y={492} s={0.48} color="#e6b8c6" snow={false} />
      <Pine x={210} y={595} s={0.38} snow={false} />
      <Sprig x={1648} y={677} s={0.72} flip />
      <g opacity={dip * (1 - lift * 0.6)}>
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx="994"
            cy={786 + i * 11}
            rx={123 + i * 60 + lift * 77}
            ry={25 + i * 16 + lift * 17}
            fill="none"
            stroke={i % 2 ? "#fffaf4" : "#a7d1de"}
            strokeWidth="5"
          />
        ))}
      </g>
      <g transform={`translate(1080 ${ladleY}) rotate(${angle}) scale(.9)`}>
        <path
          d="M32 20L443-119"
          stroke="#c4a78e"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <path
          d="M32 16L443-123"
          stroke="#f1d3b5"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M167-25L414-112"
          stroke="#fff4ce"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <ellipse
          cx="-105"
          cy="10"
          rx="272"
          ry="152"
          fill="#e5c5a8"
          stroke="#c4a78e"
          strokeWidth="10"
        />
        <ellipse cx="-105" cy="-10" rx="235" ry="119" fill="#fff4ce" />
        <ellipse
          cx="-105"
          cy="-10"
          rx="225"
          ry="109"
          fill="#d6edf2"
          opacity={water}
        />
        <g opacity={water}>
          <MiniWorld x={-108} y={-17} s={0.49} kind={0} f={f} />
          <path
            d="M-302 6Q-105 87 92 6"
            stroke="#fffaf4"
            strokeWidth="7"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M-271-67Q-208-99-160-91"
            stroke="#fffaf4"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <ellipse
          cx="-105"
          cy="-10"
          rx="247"
          ry="130"
          fill="none"
          stroke="#e6c7aa"
          strokeWidth="12"
        />
        {[0, 1, 2].map((i) => {
          const falling = smooth((p - 0.56 - i * 0.07) / 0.23);
          const visible = p > 0.56 + i * 0.07 && falling < 1;
          return (
            <g
              key={i}
              transform={`translate(${-275 + i * 28} ${113 + falling * 190}) scale(${0.85 - falling * 0.2})`}
              opacity={visible ? 0.94 : 0}
            >
              <path
                d="M0-24C-8-9-18 2-18 14A18 18 0 0 0 18 14C18 2 8-9 0-24Z"
                fill="#a9d3e2"
              />
              <path
                d="M-7 7Q-11 16-4 20"
                stroke="#fffaf4"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>
      <path d="M0 1004Q210 921 390 996L484 1080H0Z" fill="#fce2d8" />
      <path d="M1536 1080Q1664 911 1920 958V1080Z" fill="#f8dfe8" />
      <Sprig x={1790} y={1080} s={0.85} flip />
      <Sprig x={115} y={1080} s={0.66} />
      <Dust f={f} count={9} />
    </Stage>
  );
};

export const Approach = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useMoment(durationInFrames);
  const close = smooth((p - 0.1) / 0.8);
  return (
    <Stage>
      <WarmGlow x={960} y={690} r={620} />
      <path d="M0 851Q960 672 1920 851V1080H0Z" fill="#dfcec9" />
      <Ground />
      <path
        d="M0 811Q420 710 610 810M1920 811Q1500 710 1310 810"
        stroke="#d5c8c4"
        strokeWidth="12"
        fill="none"
      />
      {[120, 260, 400, 1520, 1660, 1800].map((x) => (
        <path key={x} d={`M${x} 776V869`} stroke="#d8c9c6" strokeWidth="9" />
      ))}
      <House x={270} y={609} s={0.56} color="#dfcec9" snow={false} />
      <House x={1650} y={610} s={0.56} color="#d8c9c6" snow={false} />
      <path
        d={`M960 932Q${960 - close * 780} 718 ${450 - close * 450} 575`}
        fill="none"
        stroke="#ecdfd1"
        strokeWidth="86"
        opacity="0.3"
      />
      <StoryCouple x={960} y={760+close*35} s={1.04} gap={105-close*30} walk={f/8}/>
      <WarmStar x={960} y={613} r={18} color="#f2eedb" rotate={f * 0.4} />
      <Dust f={f} count={10} />
    </Stage>
  );
};

export const Fireplace = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage>
      <path d="M0 0H1920V1080H0Z" fill="#dfcfc8" opacity="0.2" />
      <WarmGlow x={958} y={740} r={470} opacity={0.9} />
      <path d="M0 902H1920V1080H0Z" fill="#f1d3b5" />
      <path
        d="M0 958H1920M440 902L320 1080M1480 902L1600 1080M960 902V1080"
        stroke="#e3d3cc"
        strokeWidth="5"
        opacity="0.35"
      />
      <ellipse cx="960" cy="987" rx="637" ry="75" fill="#dfcec9" />
      <ellipse
        cx="960"
        cy="987"
        rx="583"
        ry="54"
        fill="none"
        stroke="#ecded2"
        strokeWidth="6"
        strokeDasharray="10 13"
      />
      <path d="M617 936V475H1303V936Z" fill="#e6b8c6" />
      <path d="M548 479H1372V558H548Z" fill="#cfbebc" />
      <path d="M680 890V649Q960 408 1240 649V890Z" fill="#ddc4c4" />
      <path d="M736 864Q755 648 960 612Q1164 648 1183 864Z" fill="#d4beb9" />
      <g
        transform={`translate(960 861) scale(${1 + Math.sin(f / 4) * 0.03} ${1 + Math.sin(f / 5) * 0.05}) translate(-960 -861)`}
      >
        <path
          d="M821 861Q819 747 910 686Q962 727 962 570Q1094 721 1080 863Z"
          fill="#efe5d1"
        />
        <path
          d="M871 861Q888 785 945 748Q954 789 1020 694Q1048 786 1020 861Z"
          fill="#f3eedc"
        />
      </g>
      <path
        d="M789 883L1104 836M833 836L1140 883"
        stroke="#c2b0b2"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <WarmMoon x={960} y={352} r={67} />
      <path
        d="M697 479V421H719V479M1201 479V421H1223V479"
        stroke="#f3ebdc"
        strokeWidth="20"
      />
      <path
        d={`M708 410Q692 ${387 + Math.sin(f / 4) * 6} 708 379Q724 395 708 410M1212 410Q1196 388 1212 379Q1229 395 1212 410`}
        fill="#eee4cf"
      />
      <StoryCouple x={960} y={790} s={.95} gap={85}/>
      <WarmStar x={960} y={625} r={14 + e * 8} color="#f2eedb" rotate={f} />
    </Stage>
  );
};

export const Resilience = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage night>
      <WarmMoon x={1530} y={370} r={100} />
      <WarmSnow count={31} seed={16} />
      <path
        d="M0 846L285 458L557 846L819 391L1110 846L1390 487L1920 848V1080H0Z"
        fill="#dfc5d1"
      />
      <path
        d="M0 853L285 458L347 559L284 531L220 598L120 734L0 854ZM819 391L873 511L820 484L755 564L663 697L554 846Z"
        fill="#ecdfd1"
        opacity="0.86"
      />
      <path d="M0 930Q562 797 976 919T1920 897V1080H0Z" fill="#eadfd2" />
      <path
        d="M630 636Q960 283 1290 636Q1230 602 1168 636Q1102 605 1036 636Q960 603 884 636Q814 604 748 636Q688 605 630 636Z"
        fill="#dac5c4"
      />
      <path
        d="M960 459Q825 480 748 636M960 459Q1090 480 1168 636"
        stroke="#e5d4cc"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="M960 459V835Q960 875 1000 849"
        fill="none"
        stroke="#e8dccb"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <StoryCouple x={960} y={739} s={.98} gap={90} walk={f/15}/>
      <WarmStar
        x={960}
        y={459 - e * 25}
        r={14}
        color="#f1e9d7"
        rotate={f * 0.3}
      />
    </Stage>
  );
};

export const SoftCloth = ({ durationInFrames }: SceneProps) => <SharedTenderness durationInFrames={durationInFrames} />;

export const Contract = ({ durationInFrames }: SceneProps) => {
  const { f, p } = useMoment(durationInFrames);
  const exchange = smooth((p - 0.18) / 0.65);
  const ringX = 1037 - exchange * 110;
  return (
    <Stage>
      <WarmGlow x={960} y={652} r={550} />
      <g transform="translate(960 657) rotate(-5)" filter="url(#warm-shadow)">
        <path d="M-359-194H358V212H-359Z" fill="#f4eedf" />
        <path
          d="M-340-175H339V192H-340Z"
          fill="none"
          stroke="#ddd1c1"
          strokeWidth="4"
        />
        <path
          d="M-315-211Q-370-226-381-181V188Q-370 221-319 203M319-211Q370-225 383-181V188Q370 222 320 204"
          fill="#e7dccc"
        />
        <path
          d="M-232-98H233M-198-60H201M-222 126H-48M50 126H231"
          stroke="#dcd2c6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cy="148" r="27" fill="#dac2c3" />
        <WarmStar x={0} y={148} r={9} color="#f0e6d4" />
      </g>
      <g
        opacity={0.4 + exchange * 0.6}
        transform={`translate(960 420) scale(${1.3 - exchange * 0.3})`}
      >
        <ellipse
          cx="-33"
          rx="56"
          ry="43"
          fill="none"
          stroke="url(#warm-gold)"
          strokeWidth="12"
          transform={`rotate(${-21 + exchange * 21})`}
        />
        <ellipse
          cx="40"
          rx="56"
          ry="43"
          fill="none"
          stroke="#e5d7c4"
          strokeWidth="12"
        />
      </g>
      <g transform="translate(960 670)">
        <path d="M-900-32L-253-43L-180 86L-900 183Z" fill={STORY_OUTFIT.blouse} />
        <path d="M-330-49L-250-52L-174 93L-269 112Z" fill="#f2eadb" />
        <path
          d="M-246-31L-164-58Q-118-91-75-69L66-42Q91-35 91-15Q82 9 58 1L-49-16L-2 24L85 45Q107 55 94 75Q84 85 65 81L-34 59L54 87Q75 99 61 117Q49 129 28 120L-62 87L-2 115Q20 133 3 148Q-11 156-29 145L-127 104L-212 83Z"
          fill="url(#a-skin)"
        />
        <path
          d="M-126 43Q-91 4-50-16"
          fill="none"
          stroke="#e0cfca"
          strokeWidth="5"
        />
        <path d="M900-22L263-37L196 97L900 198Z" fill={STORY_OUTFIT.blouse} />
        <path d="M329-42L263-45L184 105L266 120Z" fill="#eadfd1" />
      </g>
      <g transform={`translate(${ringX} 656)`}>
        <ellipse
          rx="17"
          ry="31"
          fill="none"
          stroke="#d7cbbb"
          strokeWidth="12"
        />
        <path
          d="M-12-28Q0-39 12-28"
          fill="none"
          stroke="#f1ead8"
          strokeWidth="8"
        />
        <path
          d="M11-29Q48-77 83-55L197 4L173 87L89 79Q54 100 31 66L7 38Q-2 21 14 14Q28 12 49 35L80 47L66 15L26-4Q-3-6 1-22Z"
          fill="url(#a-skin)"
        />
        <path
          d="M29-4L69 15M49 36L79 47"
          stroke="#dfcec9"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M-13 9Q-4 29 11 26"
          stroke="#f1ead8"
          strokeWidth="9"
          fill="none"
        />
        <WarmStar x={-24} y={-48} r={9} color="#f5f1e3" rotate={f} />
      </g>
      <Sprig x={390} y={972} s={0.95} />
      <Sprig x={1560} y={966} s={0.95} flip />
      <Dust f={f} count={12} />
    </Stage>
  );
};

export const Seasons = ({ durationInFrames }: SceneProps) => <SharedSeasons durationInFrames={durationInFrames} />;

export const Hands = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage>
      <WarmGlow x={960} y={655} r={500} />
      <path d="M0 939Q960 832 1920 939V1080H0Z" fill="#e7dad2" />
      <HeldHands x={960} y={707 + Math.sin(f / 18) * 3} s={1.34} gap={(1 - e) * 12} ring />
      <WarmStar x={960} y={483} r={27} color="#f2ebda" rotate={f * 0.3} />
      <Dust f={f} count={12} />
    </Stage>
  );
};

export const LongRoad = ({ durationInFrames }: SceneProps) => {
  const { f, e } = useMoment(durationInFrames);
  return (
    <Stage night>
      <WarmMoon x={1420} y={380} r={120} />
      <path
        d="M0 640Q430 525 821 638T1517 627T1920 657V1080H0Z"
        fill="#e9c5d2"
      />
      <path
        d="M0 820Q344 694 728 799T1334 786T1920 830V1080H0Z"
        fill="#f1d3b5"
      />
      <path
        d="M881 1080Q846 922 908 817Q950 751 960 673Q970 751 1012 817Q1074 922 1039 1080Z"
        fill="#ede3d5"
        opacity="0.72"
      />
      <path
        d="M0 965Q510 850 855 934T1480 903T1920 964"
        fill="none"
        stroke="#f5efe2"
        strokeWidth="8"
        strokeDasharray="28 32"
        opacity="0.7"
      />
      <Pine x={165} y={850} s={0.82} />
      <Pine x={1770} y={862} s={0.72} />
      <StoryCouple x={970 + Math.sin(f / 18) * 5} y={782} s={0.74} gap={78} walk={f / 15} back />
      <path
        d="M960 751Q960 691 960 643"
        stroke="#ebddd1"
        strokeWidth="11"
        strokeDasharray="11 12"
      />
      <WarmStar
        x={960}
        y={531 - e * 22}
        r={25}
        color="#f2eeda"
        rotate={f * 0.35}
      />
      <WarmSnow count={22} seed={21} />
    </Stage>
  );
};

export const actAScenes: Record<string, ComponentType<SceneProps>> = {
  "lyric-01": Letter,
  "lyric-02": Storybook,
  "lyric-03": Miracle,
  "lyric-04": MoonTown,
  "lyric-05": SantaDelivery,
  "lyric-06": OpenGift,
  "lyric-07": ManyWorlds,
  "lyric-08": LadleWorld,
  "lyric-09": Approach,
  "lyric-10": Fireplace,
  "lyric-11": Resilience,
  "lyric-12": SoftCloth,
  "lyric-13": Contract,
  "lyric-14": Seasons,
  "lyric-15": Hands,
  "lyric-16": LongRoad,
};
