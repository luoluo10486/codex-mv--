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
    <g transform={`translate(1380 ${639-p*9})`} filter="url(#warm-shadow)"><path d="M-70 20L-46-187H46L70 20Z" fill="#f7d6a1"/><path d="M-46-187L-36-266H36L46-187Z" fill="#b86362"/><path d="M-70-263L0-326L70-263Z" fill="#8d4f57"/><path d="M-55-266H55V-189H-55Z" fill="#f4be75" stroke="#ffebba" strokeWidth="9"/><path d="M-19-264V-194M19-264V-194" stroke="#af6c59" strokeWidth="7"/><path d="M0-323V-378L85-353L0-333" fill="#cf5f65"/><WarmGlow x={0} y={-229} r={140}/><path d="M-44-228L-315-314L-315-146ZM44-228L324-313L324-143Z" fill="#ffe8ab" opacity={.17+.07*Math.sin(t*2)}/></g>
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

const Shine = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={960} y={590} r={430+p*500} opacity={.8}/><BStars count={55}/>
    {Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return <path key={i} d={`M960 590L${960+Math.cos(a)*1700} ${590+Math.sin(a)*1700}`} stroke="#ffdda0" strokeWidth={i%2?2:18} opacity={.07+p*.08} pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>;})}
    <g transform={`translate(960 590) rotate(${t*5})`}><WarmStar r={69+p*12} color="#fff1bb"/><WarmStar r={47} color="#ffe9a7" rotate={45}/></g>
    <path d="M0 1080V919Q200 794 405 906Q630 710 845 914Q1110 770 1332 903Q1650 752 1920 929V1080Z" fill="#99606a"/>
    {Array.from({length:12},(_,i)=><g key={i} transform={`translate(${i*177-15} ${940+(i%3)*28})`}><path d="M-48 0H48V96H-48Z" fill={i%2?"#d89a7d":"#c07a72"}/><path d="M-60 0L0-54L60 0" fill="#8b4d57"/><path d="M-26 24H-5V52H-26ZM10 24H31V52H10Z" fill="#ffe8ac" opacity={.25+p*.75}/></g>)}
    <path d="M960 685Q960 829 1850 940M960 685Q960 829 70 940" stroke="#ffe6ad" strokeWidth="5" fill="none" opacity=".65" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  </BStage>;
};

const Ordinary = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={1150} y={580} r={800} opacity={.45}/><BStars count={130} y={280} height={660}/>
    <g transform={`translate(1070 560) rotate(-17)`}>{Array.from({length:6},(_,i)=><ellipse key={i} rx={330+i*117} ry={66+i*38} fill="none" stroke="#f6c28b" strokeWidth={i===3?35:3} opacity={i===3?.1:.18} transform={`rotate(${p*3})`}/>)}</g>
    {Array.from({length:21},(_,i)=><WarmStar key={i} x={100+(i*431)%1730} y={345+(i*157)%440} r={5+i%4*3} color="#f5d79d" rotate={t+i*3}/>)}
    <path d="M0 1080V1013Q520 883 960 970Q1400 883 1920 1013V1080Z" fill="#70434e"/>
    <path d="M0 1054Q500 948 958 1019T1920 1052" fill="none" stroke="#bd8975" strokeWidth="3"/>
    <BPerson x={960} y={934} s={.43} red back/>
    <path d="M977 908L1004 921L1000 948H980Z" fill="#dbb483"/><path d="M984 908Q995 896 1001 917" fill="none" stroke="#edca9a" strokeWidth="3"/>
    <WarmStar x={974} y={728-p*10} r={8} color="#fff1bf"/>
  </BStage>;
};

const SoftGarden = ({ durationInFrames }: SceneProps) => {
  const { t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={970} y={620} r={690}/><path d="M0 894Q473 755 963 876T1920 873V1080H0Z" fill="#d7937c"/>
    <path d="M0 1024Q482 870 960 1018T1920 1003V1080H0Z" fill="#c48273"/>
    <g transform={`translate(960 ${665+Math.sin(t)*4})`}><path d="M-540 290Q-650 20-382-80Q-239-210-54-109Q0-330 175-178Q432-221 481-40Q732 36 596 286Q389 412 0 342Q-405 424-540 290Z" fill="#f8caa8" opacity=".88" filter="url(#warm-shadow)"/><path d="M-484 229Q-296 77-123 226T264 221Q416 146 565 249" fill="none" stroke="#fff0cf" strokeWidth="28" opacity=".42"/>
      <BPerson x={-52} y={160} s={.72} red/><BPerson x={65} y={160} s={.72}/><path d="M-15 90Q0 78 15 90" stroke="#d57e76" strokeWidth="20" strokeLinecap="round"/>
    </g>
    {[{x:130,y:919,s:.53,r:-17},{x:370,y:850,s:.45,r:16},{x:1525,y:890,s:.63,r:-7},{x:1798,y:847,s:.48,r:21}].map((v,i)=><BFlower key={i} x={v.x} y={v.y} s={v.s} rotation={v.r} pale={i%2===0}/>)}
    <path d="M163 1023Q310 920 475 1020M1438 1025Q1615 904 1798 1007" fill="none" stroke="#f3c29f" strokeWidth="18" strokeLinecap="round"/>
  </BStage>;
};

const Sensitive = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  const tremor = Math.sin(t*7) * (2+p*7);
  return <BStage><WarmGlow x={960} y={590} r={640}/><path d="M0 930Q420 786 960 902T1920 918V1080H0Z" fill="#e6b58f"/>
    <g transform={`translate(${960+tremor} ${563+tremor})`}><path d="M0-239C-105-125-153-45-132 63C-111 170-34 267 0 292C36 265 112 165 132 62C151-46 106-126 0-239Z" fill="url(#b-glass)" stroke="#fff0cd" strokeWidth="8"/><path d="M0-198C-65-117-94-44-84 42C-74 116-29 188 0 217C31 181 75 109 84 39C94-44 67-119 0-198Z" fill="#f3c6a8" opacity=".27"/><path d="M-34-87Q2-130 40-87L19 61Q3 95-16 61Z" fill="#fff6d9" opacity=".64"/><ellipse cx="-17" cy="-84" rx="8" ry="20" fill="#fffef0" opacity=".75"/></g>
    <g transform={`translate(${670-tremor*2} ${810+tremor}) rotate(-12)`}><BFlower x={0} y={0} s={1.13} pale/><path d="M-3 121Q-77 71-119 5" stroke="#b87e76" strokeWidth="6" fill="none"/></g>
    <g transform={`translate(${1270+tremor*2} ${815-tremor}) rotate(19)`}><BFlower x={0} y={0} s={.88} pale/><path d="M3 122Q75 69 127 1" stroke="#b87e76" strokeWidth="6" fill="none"/></g>
    {Array.from({length:7},(_,i)=><path key={i} d={`M${790+i*56} ${340+(i%3)*33}q${24+tremor} ${-40+i*4} ${48} 0`} stroke="#fff4d0" strokeWidth="4" fill="none" opacity=".6"/>)}
  </BStage>;
};

const RingExchange = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={1090} y={635} r={680}/><BStars count={28}/>
    <path d="M0 1080L264 797L1770 1080Z" fill="#9f6565"/><path d="M170 1080L290 849L1665 1080Z" fill="#d8aa85"/>
    <defs><clipPath id="b-ring-crop"><rect y="260" width="1920" height="820"/></clipPath></defs><g clipPath="url(#b-ring-crop)">
    <g transform="translate(990 640) rotate(-21)">
      <path d="M-980 50L-421-62L-313 114L-864 359Z" fill="url(#b-cloth)"/><path d="M-421-62L-352-83L-251 88L-313 114Z" fill="#ffe9c8"/>
      <path d="M-352-83L-220-137Q-188-149-153-129L-55-79L179-67Q218-60 207-35Q201-21 172-23L-8-30L191 6Q220 14 208 37Q201 52 177 45L-23 14L158 67Q187 77 175 100Q164 117 140 106L-53 54L78 104Q104 120 90 138Q75 152 49 140L-177 76Q-237 60-251 88Z" fill="url(#b-skin)"/>
      <g transform={`translate(${99+(1-p)*125} ${-49-(1-p)*100})`}>
        <ellipse rx="35" ry="28" fill="none" stroke="#a97043" strokeWidth="15"/>
        <ellipse cy="-3" rx="35" ry="28" fill="none" stroke="#ffe5a1" strokeWidth="11"/>
        <path d="M-10-29L0-48L17-30L3-15Z" fill="#fff4c7" stroke="#e7b263" strokeWidth="4"/>
      </g>
      <path d={`M${711+(1-p)*70} -339L442-314L292-212Q267-194 257-153L213-74Q200-49 179-63Q167-72 174-94L199-163L160-113Q141-94 122-109Q109-123 125-144L210-255Q227-278 268-287L405-350L660-477Z`} fill="url(#b-skin)"/>
      <path d="M441-314L405-350L660-477L711-339Z" fill="#c38f75"/><path d="M441-314L405-350L450-376L491-328Z" fill="#ffe4b6"/>
    </g></g>
    <WarmStar x={1138} y={558} r={15+Math.sin(t*4)*3} color="#fff0b5"/>
  </BStage>;
};

const SeasonClock = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={645} r={650}/>
    {[0,1,2,3].map((season)=><g key={season} transform={`translate(${[355,1565,355,1565][season]} ${season<2?515:873})`} opacity={.7+.3*Math.sin(p*Math.PI+season)} filter="url(#warm-shadow)">
      <path d="M-217 131V-106Q0-215 217-106V131Z" fill="#bd7c68"/><path d="M-196 110V-94Q0-188 196-94V110Z" fill={["#f7cba4","#edbd7e","#d49a79","#dfc4b0"][season]}/>
      <circle cx="115" cy="-60" r="38" fill="#fff0bc"/>
      <path d="M-195 76Q0-7 195 76V110H-195Z" fill={["#c99a80","#c08a66","#b97c63","#fff0cd"][season]}/>
      <path d="M-81 93V-85M-81-24L-128-60M-81 15L-27-42" stroke="#965f55" strokeWidth="10" strokeLinecap="round"/>
      {season===0 ? Array.from({length:8},(_,i)=><BFlower key={i} x={-144+(i*37)%165} y={-70+(i%3)*30} s={.19} pale={i%2===0}/>) : null}
      {season===1 ? <><ellipse cx="-107" cy="-77" rx="70" ry="41" fill="#d5a572"/><ellipse cx="-48" cy="-46" rx="68" ry="45" fill="#d2a077"/></> : null}
      {season===2 ? Array.from({length:9},(_,i)=><ellipse key={i} cx={-150+(i*51)%280} cy={-84+(i*31)%170} rx="12" ry="24" fill={i%2?"#bd665d":"#eda96d"} transform={`rotate(${i*27})`}/>) : null}
      {season===3 ? Array.from({length:16},(_,i)=><circle key={i} cx={-177+(i*61)%350} cy={-109+(i*43)%195} r={3+i%3} fill="#fff6de"/>) : null}
      <path d="M0-155V111M-196 17H196" stroke="#f7d1a1" strokeWidth="11"/>
    </g>)}
    <g transform="translate(960 680)" filter="url(#warm-shadow)"><circle r="240" fill="#d39368"/><circle r="220" fill="#fff0ca"/><WarmClock r={201} t={t*5}/><circle r="223" fill="none" stroke="#ffe4a5" strokeWidth="8"/><path d="M-138 250H138L106 291H-104Z" fill="#c18764"/><WarmStar x={0} y={-270} r={20} color="#f6d394"/></g>
  </BStage>;
};

const HeldWide = ({ durationInFrames }: SceneProps) => {
  const { p } = useBeat(durationInFrames);
  const zoom = 1.45 - p * .6;
  return <BStage><WarmGlow x={960} y={490} r={650}/><BMountains y={725} shift={-p*20}/><circle cx={1500} cy={350} r={90} fill="#ffeab3" opacity=".7"/>
    <path d="M0 822Q435 724 960 820T1920 806V1080H0Z" fill="#ba7a71"/><path d="M0 966Q465 848 960 947T1920 947V1080H0Z" fill="#8d555d"/>
    <g transform={`translate(960 810) scale(${zoom})`} opacity={Math.min(1,p*2.6)}><BPerson x={-65} y={-12} s={.9} red/><BPerson x={65} y={-12} s={.9}/><path d="M-10-50Q0-13 10-50" fill="none" stroke="#f9caa4" strokeWidth="17" strokeLinecap="round"/><WarmStar x={0} y={-39} r={11} color="#ffe7aa"/></g>
    <g opacity={Math.max(0,1-p*2.6)}><BHands y={650} s={1.3-p*.5} ring/></g>
    {Array.from({length:8},(_,i)=><path key={i} d={`M${250+i*185} 910Q${318+i*185} ${826-(i%2)*20} ${386+i*185} 910`} fill="none" stroke="#f6c492" strokeWidth="7" opacity=".6"/>)}
    <path d="M960 700Q930 760 961 834" fill="none" stroke="#fff0c1" strokeWidth="4" opacity=".7"/>
    <BStars count={24} y={250} height={430}/>
  </BStage>;
};

const DawnRoad = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><rect width="1920" height="1080" fill="url(#warm-sunset)"/><WarmGlow x={1500} y={465} r={560}/><circle cx={1500} cy={465} r={105+p*14} fill="#fff0b3"/>
    <BMountains y={735} shift={-p*38}/><path d="M0 839Q480 734 960 837T1920 831V1080H0Z" fill="#c87e71"/>
    <path d="M652 1080Q741 907 1107 836Q1383 787 1500 657Q1433 827 1150 892Q1033 934 1117 1080Z" fill="#f4cd9b"/><path d="M841 1080Q876 929 1140 866Q1410 803 1500 657Q1420 827 1152 882Q945 949 972 1080Z" fill="#fff0c3" opacity=".68"/>
    <g transform={`translate(${1042+p*165} ${849-p*53}) scale(${1-p*.2})`}><BPerson x={-57} y={0} s={.66} red back/><BPerson x={57} y={0} s={.66} back/><path d="M-4-32Q0-1 5-32" stroke="#f5c39e" strokeWidth="13" fill="none" strokeLinecap="round"/><WarmStar x={0} y={-28} r={8} color="#ffe5a7"/></g>
    <path d="M0 1035Q700 942 960 1004T1920 1030" stroke="#efb27f" strokeWidth="8" fill="none" opacity=".6"/>
    {Array.from({length:20},(_,i)=><WarmStar key={i} x={(i*233+80)%1920} y={270+(i*89)%380} r={2+i%3} color="#fff1be" rotate={t*4+i*17}/>)}
    <path d="M1500 478Q1590 420 1661 478" stroke="#fff1bd" strokeWidth="5" fill="none" opacity=".55"/>
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
  "lyric-25": Shine,
  "lyric-26": Ordinary,
  "lyric-27": SoftGarden,
  "lyric-28": Sensitive,
  "lyric-29": RingExchange,
  "lyric-30": SeasonClock,
  "lyric-31": HeldWide,
  "lyric-32": DawnRoad,
};
