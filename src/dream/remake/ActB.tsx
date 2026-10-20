import type { ComponentType } from "react";
import { useCurrentFrame } from "remotion";
import { WarmCloud, WarmCouple, WarmGlow, WarmStar, WarmWorld, WarmClock } from "../WarmArt";
import { mix } from "../palette";
import { BStage, BStars, BMountains, BPerson, BHome, BFlower, BHands } from "./ActBArt";
import type { SceneProps } from "./types";

const useBeat = (duration: number) => {
  const f = useCurrentFrame();
  return { f, p: mix(f, 0, duration * .72), t: f / 30 };
};

const Journey = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={1370} y={500} r={620}/><circle cx="1370" cy="490" r="139" fill="url(#b-sun)"/>
    <BMountains y={650} shift={-p * 20}/><path d="M0 766Q450 688 960 774T1920 750V1080H0Z" fill="url(#b-water)"/>
    {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${(i * 293) % 1920 - 150} ${789 + i * 16}h${70 + i % 5 * 38}`} stroke="#ffe4b1" opacity=".48" strokeWidth={i % 3 + 2} transform={`translate(${-p * 70} 0)`}/>)}
    <g transform={`translate(${700 + p * 390} ${820 + Math.sin(t * 2) * 8})`}><ellipse cy="65" rx="228" ry="18" fill="#734c54" opacity=".2"/><BPerson x={-65} y={-53} s={.6} red/><BPerson x={15} y={-52} s={.62}/><path d="M-211-18Q0 9 220-18L156 51Q0 91-153 48Z" fill="#914d51"/><path d="M-211-18Q0 9 220-18" stroke="#ffe0a0" strokeWidth="10" fill="none"/><path d="M95-61L180 99" stroke="#d3a05f" strokeWidth="9"/><ellipse cx="183" cy="104" rx="13" ry="38" fill="#d3a05f" transform="rotate(-25 183 104)"/></g>
    <WarmCloud x={270-p*40} y={480} s={.7}/><WarmCloud x={1750-p*55} y={400} s={.5}/>
    <path d="M0 970Q119 836 324 958L430 1080H0ZM1920 934Q1722 873 1541 1080H1920Z" fill="#92555b"/>
    <BFlower x={108} y={951} s={.48} rotation={-20}/><BFlower x={1806} y={968} s={.55} rotation={12}/>
  </BStage>;
};

const Marker = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={1380} y={500} r={500}/><BMountains y={720} shift={-p*6}/>
    <path d="M1000 1080L1310 590L1470 620L1810 1080Z" fill="#a66564"/><path d="M1310 590L1379 716L1470 620L1810 1080H1360Z" fill="#dd9c7d"/>
    <g transform={`translate(1380 ${600-p*9})`} filter="url(#warm-shadow)"><path d="M-70 20L-46-187H46L70 20Z" fill="#f7d6a1"/><path d="M-46-187L-36-266H36L46-187Z" fill="#b86362"/><path d="M-70-263L0-326L70-263Z" fill="#8d4f57"/><path d="M-55-266H55V-189H-55Z" fill="#f4be75" stroke="#ffebba" strokeWidth="9"/><path d="M-19-264V-194M19-264V-194" stroke="#af6c59" strokeWidth="7"/><path d="M0-323V-378L85-353L0-333" fill="#cf5f65"/><WarmGlow x={0} y={-229} r={140}/><path d="M-44-228L-315-314L-315-146ZM44-228L324-313L324-143Z" fill="#ffe8ab" opacity={.17+.07*Math.sin(t*2)}/></g>
    <g transform={`translate(${500+p*25} 770) rotate(-8)`} filter="url(#warm-shadow)"><path d="M-360-185L-106-219L118-163L340-205V193L112 232L-101 181L-360 222Z" fill="#f6dfb0"/><path d="M-106-219V181M118-163V232" stroke="#d3ae82" strokeWidth="7"/><path d="M-331 92Q-195-118-99 5T117-9Q200-144 301-106" stroke="#cc7270" strokeWidth="12" strokeDasharray="18 14" fill="none" pathLength="1" strokeDashoffset={1-p}/><path d="M-302-66L-252-130L-210-67M-32 112L29 29L86 114M183 91L241 12L295 88" fill="#d6a27d"/><circle cx="298" cy="-105" r="22" fill="#c95f67"/><circle cx="298" cy="-105" r="9" fill="#ffe6b4"/></g>
    <g transform={`translate(775 889) rotate(${p*18-10})`} filter="url(#warm-shadow)"><circle r="104" fill="url(#warm-gold)"/><circle r="86" fill="#fff0cb"/><path d="M0-75L22 0L0 75L-22 0Z" fill="#c35d63"/><path d="M0 75L-22 0H22Z" fill="#b98866"/><circle r="13" fill="#f8cf86"/></g>
  </BStage>;
};

const LifeLine = ({ durationInFrames }: SceneProps) => {
  const { p } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={630} r={650}/>
    <g transform={`translate(${-p*26} 0)`}><path d="M0 330H930L877 1080H0Z" fill="#e8bd91"/><circle cx="400" cy="569" r="195" fill="#ffeac2"/><BHome x={348} y={760} s={.92}/><BPerson x={590} y={823} s={.85} red/><path d="M0 945Q330 853 875 970V1080H0Z" fill="#c18b79"/><BFlower x={160} y={900} s={.6}/></g>
    <g transform={`translate(${p*26} 0)`}><path d="M990 330H1920V1080H1043Z" fill="#925a62"/><circle cx="1540" cy="525" r="130" fill="#edbc88"/><path d="M1050 867L1260 501L1435 766L1640 438L1920 861V1080H1050Z" fill="#ba7a71"/><path d="M1230 1080Q1260 889 1570 874T1920 818" stroke="#e8b383" strokeWidth="48" fill="none"/><BPerson x={1400} y={833} s={.8}/></g>
    <path d="M960 300C860 470 1050 520 948 684S1037 892 960 1110" fill="none" stroke="#682e44" strokeWidth="40" opacity=".2"/>
    <path d="M960 300C860 470 1050 520 948 684S1037 892 960 1110" fill="none" stroke="#cb4e60" strokeWidth="16" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
    <path d="M960 300C860 470 1050 520 948 684S1037 892 960 1110" fill="none" stroke="#ffb896" strokeWidth="4" opacity=".8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  </BStage>;
};

const SewWorlds = ({ durationInFrames }: SceneProps) => {
  const { p } = useBeat(durationInFrames);
  const gap = 85 * (1-p);
  return <BStage><WarmGlow x={960} y={620} r={600}/><BStars count={30}/>
    <g transform={`translate(${-gap} 0)`}><path d="M80 430Q460 280 885 435L920 923Q503 1056 100 943Z" fill="#edba91" filter="url(#warm-shadow)"/><path d="M100 855Q330 590 570 799T912 818L920 923Q503 1056 100 943Z" fill="#cb8274"/><BHome x={446} y={661} s={.55}/><BPerson x={780} y={746} s={.7} red/></g>
    <g transform={`translate(${gap} 0)`}><path d="M1035 435Q1460 280 1840 430L1820 943Q1417 1056 1000 923Z" fill="#d99681" filter="url(#warm-shadow)"/><path d="M1010 800L1220 460L1430 753L1650 489L1840 840L1820 943Q1417 1056 1000 923Z" fill="#a66a66"/><BPerson x={1145} y={746} s={.7}/></g>
    {Array.from({ length: 9 }, (_, i) => <g key={i} opacity={p > i/12 ? 1 : .12}><ellipse cx={900-gap} cy={450+i*52} rx="9" ry="12" fill="#a55f59"/><ellipse cx={1020+gap} cy={450+i*52} rx="9" ry="12" fill="#a55f59"/><path d={`M${900-gap} ${450+i*52}L${1020+gap} ${502+i*52}`} stroke="#ca4d5c" strokeWidth="9" fill="none"/><path d={`M${1020+gap} ${450+i*52}L${900-gap} ${502+i*52}`} stroke="#ef947d" strokeWidth="7" fill="none"/></g>)}
    <g transform={`translate(${1100-p*120} ${540+p*360}) rotate(-32)`}><path d="M0-110V110Q18 137 25 110V-110Q13-143 0-110Z" fill="#fff2cd" stroke="#ba8e64" strokeWidth="3"/><ellipse cx="12" cy="-92" rx="5" ry="15" fill="#a76461"/><path d="M12-90Q180-118 146-15T262 107" fill="none" stroke="#c94e5b" strokeWidth="9"/></g>
  </BStage>;
};

const Memories = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={960} y={680} r={700}/><BStars count={35}/>
    <path d="M0 990Q960 862 1920 990V1080H0Z" fill="#75454e"/>
    {[-2,-1,0,1,2].map((n,i) => <g key={n} transform={`translate(${960+n*337} ${610+Math.abs(n)*53}) rotate(${n*7}) scale(${1-Math.abs(n)*.11})`} opacity={.6+.4*(1-Math.abs(n)/3)} filter="url(#warm-shadow)">
      <path d="M-159 228V-150Q0-328 159-150V228Z" fill="url(#warm-gold)"/><path d="M-140 208V-144Q0-301 140-144V208Z" fill={i%2 ? "#ba7f76" : "#e5b28d"}/>
      <circle cy="-89" r="67" fill="#ffe2aa" opacity=".55"/><path d="M-140 108Q0 29 140 108V208H-140Z" fill="#a96b67"/>
      <g transform={`rotate(${Math.sin(t+i)*2})`}><BPerson x={-56} y={90} s={.63} red turn={p}/><BPerson x={55} y={90} s={.63} turn={-p}/></g>
      <path d="M-140-18Q0-57 140-18M-140 135Q0 116 140 135" stroke="#fff1c7" strokeWidth="3" opacity=".3"/>
      <circle cy="-224" r="10" fill="#fff0b6"/>
    </g>)}
    <path d="M158 912Q960 1090 1760 915" fill="none" stroke="#e7b06e" strokeWidth="5" opacity=".6"/>
  </BStage>;
};

const Devotion = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={630} r={650}/>
    <path d="M0 839Q480 683 960 835T1920 819V1080H0Z" fill="#edc5a3"/>
    <path d="M0 966Q621 795 1920 978V1080H0Z" fill="#dba68b"/>
    <g transform={`translate(0 ${Math.sin(t)*3})`}><BHands y={670} s={1.22} gap={30*(1-p)}/></g>
    <path d="M803 756Q956 839 1097 707" fill="none" stroke="#c94e5b" strokeWidth="7"/>
    <WarmGlow x={966} y={658} r={130} opacity={.5+p*.3}/>
    {Array.from({length:9},(_,i)=><g key={i} transform={`translate(${200+i*193} ${950+Math.sin(i)*23}) rotate(${i*33})`}><ellipse rx="24" ry="12" fill="#ffe3b8"/><path d="M-15 0H15" stroke="#e7b89b" strokeWidth="2"/></g>)}
    <BFlower x={146} y={674} s={.6} rotation={-28} pale/><BFlower x={1776} y={796} s={.75} rotation={23}/>
  </BStage>;
};

const WorldHeart = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={960} y={650} r={630}/><BStars count={66}/>
    {Array.from({length:10},(_,i)=>{const a=i*Math.PI/5; const r=600-p*190;const x=960+Math.cos(a)*r;const y=650+Math.sin(a)*r*.48;return <g key={i}><path d={`M${x} ${y}Q960 ${430+i*39} 960 670`} fill="none" stroke="#efc185" strokeWidth="3" opacity=".45"/><WarmWorld x={x} y={y} s={.2+i%3*.045} t={t}/></g>;})}
    <g transform={`translate(960 650) scale(${.86+p*.14})`} filter="url(#warm-shadow)"><path d="M0 225C-95 156-300 7-224-133C-166-242-42-206 0-127C52-215 181-239 235-120C301 26 102 173 0 225Z" fill="url(#warm-gold)"/><path d="M-164-112C-123-177-57-142-28-84" fill="none" stroke="#fff4c9" strokeWidth="17" strokeLinecap="round" opacity=".65"/><path d="M-185 12Q-56-66 38 8T194-13M-108 123Q0 58 116 102" fill="none" stroke="#bd7e56" strokeWidth="6" opacity=".45"/><WarmStar x={40} y={-10} r={43} color="#fff3be" rotate={t*10}/></g>
    <WarmCouple x={960} y={970} s={.38} hold={1} t={t}/>
  </BStage>;
};

const SharedHome = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={650} r={650}/><BStars count={28}/>
    <g transform={`translate(960 ${683-Math.sin(t)*8}) scale(${.96+p*.04})`}>
      <circle r="334" fill="url(#b-glass)" stroke="#fff0cb" strokeWidth="7"/><ellipse cy="179" rx="270" ry="92" fill="#ad736c"/><ellipse cy="151" rx="274" ry="81" fill="#edbd8c"/>
      <path d="M-64 198Q3 134 118 167" stroke="#ffdfac" strokeWidth="29" fill="none"/>
      <BHome x={-55} y={38} s={.98}/><BPerson x={98} y={131} s={.45} red/><BPerson x={148} y={132} s={.45}/>
      <BFlower x={-214} y={90} s={.36} rotation={-13}/><BFlower x={217} y={136} s={.32} pale/>
      <path d="M-287-59Q-282-239-128-294" fill="none" stroke="#fff8dd" strokeWidth="17" strokeLinecap="round" opacity=".65"/>
      <path d="M184 264Q266 213 292 117" fill="none" stroke="#fff3d4" strokeWidth="6" strokeLinecap="round" opacity=".6"/>
    </g>
    <path d="M320 1080Q384 903 683 935L838 987Q872 1003 849 1030L772 1062H1133L1059 1030Q1036 1001 1067 987L1222 935Q1521 903 1600 1080Z" fill="url(#b-skin)"/>
    <path d="M438 1042Q563 966 682 977M1482 1042Q1357 966 1238 977" stroke="#ffdfb6" strokeWidth="12" fill="none" strokeLinecap="round"/>
  </BStage>;
};

export const actBScenes: Record<string, ComponentType<SceneProps>> = {
  "lyric-17": Journey,
  "lyric-18": Marker,
  "lyric-19": LifeLine,
  "lyric-20": SewWorlds,
  "lyric-21": Memories,
  "lyric-22": Devotion,
  "lyric-23": WorldHeart,
  "lyric-24": SharedHome,
};
