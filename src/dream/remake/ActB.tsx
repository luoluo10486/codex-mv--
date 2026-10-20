import type { ComponentType } from "react";
import { SharedSeasons } from "../SharedSeasons";
import { SharedSensitivity, SharedTenderness } from "../SharedTenderness";
import { STORY_OUTFIT, StoryCouple } from "../StoryCharacters";
import { useCurrentFrame } from "remotion";
import { WarmCloud, WarmGlow, WarmStar, WarmWorld } from "../WarmArt";
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
    {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${(i * 293) % 1920 - 150} ${789 + i * 16}h${70 + i % 5 * 38}`} stroke="#f5f1ea" opacity=".48" strokeWidth={i % 3 + 2} transform={`translate(${-p * 70} 0)`}/>)}
    <g transform={`translate(${700 + p * 390} ${820 + Math.sin(t * 2) * 8})`}><ellipse cy="65" rx="228" ry="18" fill="#dcd3d5" opacity=".2"/><BPerson x={-65} y={-53} s={.6} red/><BPerson x={15} y={-52} s={.62}/><path d="M-211-18Q0 9 220-18L156 51Q0 91-153 48Z" fill="#cda7b6"/><path d="M-211-18Q0 9 220-18" stroke="#f4f0e8" strokeWidth="10" fill="none"/><path d="M95-61L180 99" stroke="#d8bdac" strokeWidth="9"/><ellipse cx="183" cy="104" rx="13" ry="38" fill="#d8bdac" transform="rotate(-25 183 104)"/></g>
    <WarmCloud x={270-p*40} y={480} s={.7}/><WarmCloud x={1750-p*55} y={400} s={.5}/>
    <path d="M0 970Q119 836 324 958L430 1080H0ZM1920 934Q1722 873 1541 1080H1920Z" fill="#e6b8c6"/>
    <BFlower x={108} y={951} s={.48} rotation={-20}/><BFlower x={1806} y={968} s={.55} rotation={12}/>
  </BStage>;
};

const Marker = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={1380} y={500} r={500}/><BMountains y={720} shift={-p*6}/>
    <path d="M1000 1080L1310 590L1470 620L1810 1080Z" fill="#e1c3cf"/><path d="M1310 590L1379 716L1470 620L1810 1080H1360Z" fill="#f1d3b5"/>
    <g transform={`translate(1380 ${639-p*9})`} filter="url(#warm-shadow)"><path d="M-70 20L-46-187H46L70 20Z" fill="#f4efe7"/><path d="M-46-187L-36-266H36L46-187Z" fill="#f1d3b5"/><path d="M-70-263L0-326L70-263Z" fill="#cfacbd"/><path d="M-55-266H55V-189H-55Z" fill="#f4e7bd" stroke="#f6f3eb" strokeWidth="9"/><path d="M-19-264V-194M19-264V-194" stroke="#cba6b6" strokeWidth="7"/><path d="M0-323V-378L85-353L0-333" fill="#d99eb3"/><WarmGlow x={0} y={-229} r={140}/><path d="M-44-228L-315-314L-315-146ZM44-228L324-313L324-143Z" fill="#f5f2e9" opacity={.17+.07*Math.sin(t*2)}/></g>
    <g transform={`translate(${500+p*25} 770) rotate(-8)`} filter="url(#warm-shadow)"><path d="M-360-185L-106-219L118-163L340-205V193L112 232L-101 181L-360 222Z" fill="#f7edda"/><path d="M-106-219V181M118-163V232" stroke="#ede7e0" strokeWidth="7"/><path d="M-331 92Q-195-118-99 5T117-9Q200-144 301-106" stroke="#e6b8c6" strokeWidth="12" strokeDasharray="18 14" fill="none" pathLength="1" strokeDashoffset={1-p}/><path d="M-302-66L-252-130L-210-67M-32 112L29 29L86 114M183 91L241 12L295 88" fill="#ddc3c7"/><circle cx="298" cy="-105" r="22" fill="#d49db0"/><circle cx="298" cy="-105" r="9" fill="#f5f2ea"/></g>
    <g transform={`translate(775 889) rotate(${p*18-10})`} filter="url(#warm-shadow)"><circle r="104" fill="url(#b-gold)"/><circle r="86" fill="#f7f4ee"/><path d="M0-75L22 0L0 75L-22 0Z" fill="#c999ae"/><path d="M0 75L-22 0H22Z" fill="#e8dbdd"/><circle r="13" fill="#f2ede3"/></g>
  </BStage>;
};

const LifeLine = ({ durationInFrames }: SceneProps) => {
  const { p } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={630} r={650}/>
    <g transform={`translate(${-p*26} 0)`}><path d="M0 330H930L877 1080H0Z" fill="#f2eae3"/><circle cx="400" cy="569" r="195" fill="#f6f3ec"/><BHome x={348} y={760} s={.92}/><BPerson x={590} y={823} s={.85} red/><path d="M0 945Q330 853 875 970V1080H0Z" fill="#eadee0"/><BFlower x={160} y={900} s={.6}/></g>
    <g transform={`translate(${p*26} 0)`}><path d="M990 330H1920V1080H1043Z" fill="#e1d7d9"/><circle cx="1540" cy="525" r="130" fill="#f1eae2"/><path d="M1050 867L1260 501L1435 766L1640 438L1920 861V1080H1050Z" fill="#e8dcdf"/><path d="M1230 1080Q1260 889 1570 874T1920 818" stroke="#f1e8e1" strokeWidth="48" fill="none"/><BPerson x={1400} y={833} s={.8}/></g>
    <path d="M960 300C860 470 1050 520 948 684S1037 892 960 1110" fill="none" stroke="#caa3b4" strokeWidth="40" opacity=".2"/>
    <path d="M960 300C860 470 1050 520 948 684S1037 892 960 1110" fill="none" stroke="#cc8da2" strokeWidth="16" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
    <path d="M960 300C860 470 1050 520 948 684S1037 892 960 1110" fill="none" stroke="#f3ebe6" strokeWidth="4" opacity=".8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  </BStage>;
};

const SewWorlds = ({ durationInFrames }: SceneProps) => {
  const { p } = useBeat(durationInFrames);
  const gap = 85 * (1-p);
  return <BStage><WarmGlow x={960} y={620} r={600}/><BStars count={30}/>
    <g transform={`translate(${-gap} 0)`}><path d="M80 430Q460 280 885 435L920 923Q503 1056 100 943Z" fill="#f2eae3" filter="url(#warm-shadow)"/><path d="M100 855Q330 590 570 799T912 818L920 923Q503 1056 100 943Z" fill="#e6b8c6"/><BHome x={446} y={661} s={.55}/><BPerson x={780} y={746} s={.7} red/></g>
    <g transform={`translate(${gap} 0)`}><path d="M1035 435Q1460 280 1840 430L1820 943Q1417 1056 1000 923Z" fill="#eee3df" filter="url(#warm-shadow)"/><path d="M1010 800L1220 460L1430 753L1650 489L1840 840L1820 943Q1417 1056 1000 923Z" fill="#e1c3cf"/><BPerson x={1145} y={746} s={.7}/></g>
    {Array.from({ length: 9 }, (_, i) => <g key={i} opacity={p > i/12 ? 1 : .12}><ellipse cx={900-gap} cy={450+i*52} rx="9" ry="12" fill="#e4d8da"/><ellipse cx={1020+gap} cy={450+i*52} rx="9" ry="12" fill="#e4d8da"/><path d={`M${900-gap} ${450+i*52}L${1020+gap} ${502+i*52}`} stroke="#cc8da2" strokeWidth="9" fill="none"/><path d={`M${1020+gap} ${450+i*52}L${900-gap} ${502+i*52}`} stroke="#e6b8c6" strokeWidth="7" fill="none"/></g>)}
    <g transform={`translate(${1100-p*120} ${540+p*360}) rotate(-32)`}><path d="M0-110V110Q18 137 25 110V-110Q13-143 0-110Z" fill="#f7f5ee" stroke="#e8dadd" strokeWidth="3"/><ellipse cx="12" cy="-92" rx="5" ry="15" fill="#e4d9dc"/><path d="M12-90Q180-118 146-15T262 107" fill="none" stroke="#cc8da2" strokeWidth="9"/></g>
  </BStage>;
};

const Memories = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={960} y={680} r={700}/><BStars count={35}/>
    <path d="M0 990Q960 862 1920 990V1080H0Z" fill="#ead4de"/>
    {[-2,-1,0,1,2].map((n,i) => <g key={n} transform={`translate(${960+n*337} ${610+Math.abs(n)*53}) rotate(${n*7}) scale(${1-Math.abs(n)*.11})`} opacity={.6+.4*(1-Math.abs(n)/3)} filter="url(#warm-shadow)">
      <path d="M-159 228V-150Q0-328 159-150V228Z" fill="url(#b-gold)"/><path d="M-140 208V-144Q0-301 140-144V208Z" fill={i%2 ? "#e8dde0" : "#f1e8e2"}/>
      <circle cy="-89" r="67" fill="#f5f1e9" opacity=".55"/><path d="M-140 108Q0 29 140 108V208H-140Z" fill="#e5dadd"/>
      <g transform={`rotate(${Math.sin(t+i)*2})`}><BPerson x={-56} y={90} s={.63} red turn={p}/><BPerson x={55} y={90} s={.63} turn={-p}/></g>
      <path d="M-140-18Q0-57 140-18M-140 135Q0 116 140 135" stroke="#f7f4ed" strokeWidth="3" opacity=".3"/>
      <circle cy="-224" r="10" fill="#f5f3eb"/>
    </g>)}
    <path d="M158 912Q960 1090 1760 915" fill="none" stroke="#efe7de" strokeWidth="5" opacity=".6"/>
  </BStage>;
};

const Devotion = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={630} r={650}/>
    <path d="M0 839Q480 683 960 835T1920 819V1080H0Z" fill="#f3ece6"/>
    <path d="M0 966Q621 795 1920 978V1080H0Z" fill="#efe6e1"/>
    <g transform={`translate(0 ${Math.sin(t)*3})`}><BHands y={670} s={1.22} gap={30*(1-p)}/></g>
    <path d="M803 756Q956 839 1097 707" fill="none" stroke="#cc8da2" strokeWidth="7"/>
    <WarmGlow x={966} y={658} r={130} opacity={.5+p*.3}/>
    {Array.from({length:9},(_,i)=><g key={i} transform={`translate(${200+i*193} ${950+Math.sin(i)*23}) rotate(${i*33})`}><ellipse rx="24" ry="12" fill="#f6f1eb"/><path d="M-15 0H15" stroke="#f2e9e4" strokeWidth="2"/></g>)}
    <BFlower x={146} y={674} s={.6} rotation={-28} pale/><BFlower x={1776} y={796} s={.75} rotation={23}/>
  </BStage>;
};

const WorldHeart = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={960} y={650} r={630}/><BStars count={66}/>
    {Array.from({length:10},(_,i)=>{const a=i*Math.PI/5; const r=600-p*190;const x=960+Math.cos(a)*r;const y=650+Math.sin(a)*r*.48;return <g key={i}><path d={`M${x} ${y}Q960 ${430+i*39} 960 670`} fill="none" stroke="#f1ebe2" strokeWidth="3" opacity=".45"/><WarmWorld x={x} y={y} s={.2+i%3*.045} t={t}/></g>;})}
    <g transform={`translate(960 650) scale(${.86+p*.14})`} filter="url(#warm-shadow)"><path d="M0 225C-95 156-300 7-224-133C-166-242-42-206 0-127C52-215 181-239 235-120C301 26 102 173 0 225Z" fill="url(#b-gold)"/><path d="M-164-112C-123-177-57-142-28-84" fill="none" stroke="#f7f5ed" strokeWidth="17" strokeLinecap="round" opacity=".65"/><path d="M-185 12Q-56-66 38 8T194-13M-108 123Q0 58 116 102" fill="none" stroke="#e8d8db" strokeWidth="6" opacity=".45"/><WarmStar x={40} y={-10} r={43} color="#f6f4ec" rotate={t*10}/></g>
    <StoryCouple x={960} y={970+Math.sin(t)*.7} s={.38} gap={75}/>
  </BStage>;
};

const SharedHome = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><WarmGlow x={960} y={650} r={650}/><BStars count={28}/>
    <g transform={`translate(960 ${683-Math.sin(t)*8}) scale(${.96+p*.04})`}>
      <circle r="334" fill="url(#b-glass)" stroke="#f7f4ee" strokeWidth="7"/><ellipse cy="179" rx="270" ry="92" fill="#e5dbde"/><ellipse cy="151" rx="274" ry="81" fill="#f2eae3"/>
      <path d="M-64 198Q3 134 118 167" stroke="#f5f0e9" strokeWidth="29" fill="none"/>
      <BHome x={-55} y={38} s={.98}/><BPerson x={98} y={131} s={.45} red/><BPerson x={148} y={132} s={.45}/>
      <BFlower x={-214} y={90} s={.36} rotation={-13}/><BFlower x={217} y={136} s={.32} pale/>
      <path d="M-287-59Q-282-239-128-294" fill="none" stroke="#f8f6f0" strokeWidth="17" strokeLinecap="round" opacity=".65"/>
      <path d="M184 264Q266 213 292 117" fill="none" stroke="#f7f5ef" strokeWidth="6" strokeLinecap="round" opacity=".6"/>
    </g>
    <path d="M320 1080Q384 903 683 935L838 987Q872 1003 849 1030L772 1062H1133L1059 1030Q1036 1001 1067 987L1222 935Q1521 903 1600 1080Z" fill="url(#b-skin)"/>
    <path d="M438 1042Q563 966 682 977M1482 1042Q1357 966 1238 977" stroke="#f5f1eb" strokeWidth="12" fill="none" strokeLinecap="round"/>
  </BStage>;
};

const Shine = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={960} y={590} r={430+p*500} opacity={.8}/><BStars count={55}/>
    {Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return <path key={i} d={`M960 590L${960+Math.cos(a)*1700} ${590+Math.sin(a)*1700}`} stroke="#f4f0e8" strokeWidth={i%2?2:18} opacity={.07+p*.08} pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>;})}
    <g transform={`translate(960 590) rotate(${t*5})`}><WarmStar r={69+p*12} color="#e8d3a3"/><WarmStar r={47} color="#fff4ce" rotate={45}/></g>
    <path d="M0 1080V919Q200 794 405 906Q630 710 845 914Q1110 770 1332 903Q1650 752 1920 929V1080Z" fill="#f1d3d8"/>
    {Array.from({length:12},(_,i)=><g key={i} transform={`translate(${i*177-15} ${940+(i%3)*28})`}><path d="M-48 0H48V96H-48Z" fill={i%2?"#eee4df":"#e9dddf"}/><path d="M-60 0L0-54L60 0" fill="#cfacbd"/><path d="M-26 24H-5V52H-26ZM10 24H31V52H10Z" fill="#f5f2e9" opacity={.25+p*.75}/></g>)}
    <path d="M960 685Q960 829 1850 940M960 685Q960 829 70 940" stroke="#f5f1e9" strokeWidth="5" fill="none" opacity=".65" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  </BStage>;
};

const Ordinary = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={1150} y={580} r={800} opacity={.45}/><BStars count={130} y={280} height={660}/>
    <g transform={`translate(1070 560) rotate(-17)`}>{Array.from({length:6},(_,i)=><ellipse key={i} rx={330+i*117} ry={66+i*38} fill="none" stroke="#d6b8c8" strokeWidth={i===3?35:3} opacity={i===3?.1:.18} transform={`rotate(${p*3})`}/>)}</g>
    {Array.from({length:21},(_,i)=><WarmStar key={i} x={100+(i*431)%1730} y={345+(i*157)%440} r={5+i%4*3} color="#dac49b" rotate={t+i*3}/>)}
    <path d="M0 1080V1013Q520 883 960 970Q1400 883 1920 1013V1080Z" fill="#e7ced8"/>
    <path d="M0 1054Q500 948 958 1019T1920 1052" fill="none" stroke="#e9dde0" strokeWidth="3"/>
    <BPerson x={960} y={934} s={.43} red back/>
    <path d="M977 908L1004 921L1000 948H980Z" fill="#efe8e0"/><path d="M984 908Q995 896 1001 917" fill="none" stroke="#f2ede4" strokeWidth="3"/>
    <WarmStar x={974} y={728-p*10} r={8} color="#f6f4ec"/>
  </BStage>;
};

const SoftGarden = ({ durationInFrames }: SceneProps) => <SharedTenderness durationInFrames={durationInFrames} reprise={1} />;

const Sensitive = ({ durationInFrames }: SceneProps) => <SharedSensitivity durationInFrames={durationInFrames} />;

const RingExchange = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={1090} y={635} r={680}/><BStars count={28}/>
    <path d="M0 1080L264 797L1770 1080Z" fill="#e3dadc"/><path d="M170 1080L290 849L1665 1080Z" fill="#eee6e0"/>
    <defs><clipPath id="b-ring-crop"><rect y="260" width="1920" height="820"/></clipPath></defs><g clipPath="url(#b-ring-crop)">
    <g transform="translate(990 640) rotate(10)">
      <path d="M-980 50L-421-62L-313 114L-864 359Z" fill={STORY_OUTFIT.blouse}/><path d="M-421-62L-352-83L-251 88L-313 114Z" fill="#f7f3ed"/>
      <path d="M-352-83L-220-137Q-188-149-153-129L-55-79L179-67Q218-60 207-35Q201-21 172-23L-8-30L191 6Q220 14 208 37Q201 52 177 45L-23 14L158 67Q187 77 175 100Q164 117 140 106L-53 54L78 104Q104 120 90 138Q75 152 49 140L-177 76Q-237 60-251 88Z" fill="url(#b-skin)"/>
      <g transform={`translate(${99+(1-p)*125} ${-49-(1-p)*100})`}>
        <ellipse rx="35" ry="28" fill="none" stroke="#d4bb8b" strokeWidth="15"/>
        <ellipse cy="-3" rx="35" ry="28" fill="none" stroke="#f4e6bc" strokeWidth="11"/>
        <path d="M-10-29L0-48L17-30L3-15Z" fill="#f7f5ed" stroke="#d4bc94" strokeWidth="4"/>
      </g>
      <path d={`M${711+(1-p)*70} -339L442-314L292-212Q267-194 257-153L213-74Q200-49 179-63Q167-72 174-94L199-163L160-113Q141-94 122-109Q109-123 125-144L210-255Q227-278 268-287L405-350L660-477Z`} fill="url(#b-skin)"/>
      <path d="M441-314L405-350L660-477L711-339Z" fill={STORY_OUTFIT.blouse}/><path d="M441-314L405-350L450-376L491-328Z" fill="#f5f1eb"/>
    </g></g>
    <WarmStar x={1138} y={558} r={15+Math.sin(t*4)*3} color="#f5f3eb"/>
  </BStage>;
};

const SeasonClock = ({ durationInFrames }: SceneProps) => <SharedSeasons durationInFrames={durationInFrames} reprise={1} />;

const HeldWide = ({ durationInFrames }: SceneProps) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1,durationInFrames-1);
  const zoom = 1.45 - p * .6;
  return <BStage><WarmGlow x={960} y={490} r={650}/><BMountains y={725} shift={-p*20}/><circle cx={1500} cy={350} r={90} fill="#f5f2ea" opacity=".7"/>
    <path d="M0 822Q435 724 960 820T1920 806V1080H0Z" fill="#e8dcdf"/><path d="M0 966Q465 848 960 947T1920 947V1080H0Z" fill="#e6b8c6"/>
    <g opacity={Math.max(0,Math.min(1,(p-.35)*3))}><StoryCouple x={960} y={790} s={zoom*.65} gap={82}/><WarmStar x={960} y={735} r={11} color="#f5f1e9"/></g>
    <g opacity={Math.max(0,Math.min(1,(.6-p)*4))}><BHands y={650} s={1.3-p*.5} ring/></g>
    {Array.from({length:8},(_,i)=><path key={i} d={`M${250+i*185} 910Q${318+i*185} ${826-(i%2)*20} ${386+i*185} 910`} fill="none" stroke="#f3ece5" strokeWidth="7" opacity=".6"/>)}
    <path d="M960 700Q930 760 961 834" fill="none" stroke="#f6f4ec" strokeWidth="4" opacity=".7"/>
    <BStars count={24} y={250} height={430}/>
  </BStage>;
};

const DawnRoad = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage><rect width="1920" height="1080" fill="url(#warm-sunset)"/><WarmGlow x={1500} y={465} r={560}/><circle cx={1500} cy={465} r={105+p*14} fill="#f5f3ea"/>
    <BMountains y={735} shift={-p*38}/><path d="M0 839Q480 734 960 837T1920 831V1080H0Z" fill="#e6b8c6"/>
    <path d="M652 1080Q741 907 1107 836Q1383 787 1500 657Q1433 827 1150 892Q1033 934 1117 1080Z" fill="#f3ede6"/><path d="M841 1080Q876 929 1140 866Q1410 803 1500 657Q1420 827 1152 882Q945 949 972 1080Z" fill="#f6f4ec" opacity=".68"/>
    <StoryCouple x={1042+p*165} y={849-p*53} s={.5-p*.1} gap={78} back walk={t*3}/>
    <path d="M0 1035Q700 942 960 1004T1920 1030" stroke="#f1e8e1" strokeWidth="8" fill="none" opacity=".6"/>
    {Array.from({length:20},(_,i)=><WarmStar key={i} x={(i*233+80)%1920} y={270+(i*89)%380} r={2+i%3} color="#f6f4ec" rotate={t*4+i*17}/>)}
    <path d="M1500 478Q1590 420 1661 478" stroke="#f6f4ec" strokeWidth="5" fill="none" opacity=".55"/>
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
