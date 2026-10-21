import type { ComponentType } from "react";
import { SharedSeasons } from "../SharedSeasons";
import { SharedSensitivity, SharedTenderness } from "../SharedTenderness";
import { STORY_OUTFIT, StoryCouple, StoryPerson } from "../StoryCharacters";
import { useCurrentFrame } from "remotion";
import { WarmCloud, WarmGlow, WarmStar, WarmWorld } from "../WarmArt";
import { mix, smooth } from "../palette";
import { BStage, BStars, BMountains, BPerson, BHome, BFlower } from "./ActBArt";
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
    <g transform={`translate(${700 + p * 390} ${820 + Math.sin(t * 2) * 8})`}>
      <ellipse cy="65" rx="228" ry="18" fill="#dcd3d5" opacity=".2"/>
      <g transform={`rotate(${Math.sin(t*3)*12} 95 -61)`}><path d="M95-61L180 99" stroke="#c3a286" strokeWidth="11" strokeLinecap="round"/><ellipse cx="183" cy="104" rx="15" ry="39" fill="#d5b59a" transform="rotate(-25 183 104)"/><path d="M178 86L188 122" stroke="#e8ccb0" strokeWidth="3" strokeLinecap="round"/></g>
      <StoryPerson x={-65} y={-53} s={.39} girl handRight={{x:105,y:-66}}/>
      <StoryPerson x={35} y={-53} s={.41} handRight={{x:146,y:-20}} handLeft={{x:-33,y:20}}/>
      <path d="M-211-18Q0 9 220-18L156 51Q0 91-153 48Z" fill="#cda7b6"/><path d="M-211-18Q0 9 220-18" stroke="#f4f0e8" strokeWidth="10" fill="none"/>
    </g>
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
  const { f, p } = useBeat(durationInFrames);
  const gap = 85 * (1-p);
  const meet = smooth((f / Math.max(1,durationInFrames-1)-.36)/.5);
  return <BStage><WarmGlow x={960} y={620} r={600}/><BStars count={30}/>
    <g transform={`translate(${-gap} 0)`}><path d="M80 430Q460 280 885 435L920 923Q503 1056 100 943Z" fill="#f2eae3" filter="url(#warm-shadow)"/><path d="M100 855Q330 590 570 799T912 818L920 923Q503 1056 100 943Z" fill="#e6b8c6"/><BHome x={446} y={661} s={.55}/></g>
    <g transform={`translate(${gap} 0)`}><path d="M1035 435Q1460 280 1840 430L1820 943Q1417 1056 1000 923Z" fill="#eee3df" filter="url(#warm-shadow)"/><path d="M1010 800L1220 460L1430 753L1650 489L1840 840L1820 943Q1417 1056 1000 923Z" fill="#e1c3cf"/></g>
    {Array.from({ length: 9 }, (_, i) => <g key={i} opacity={p > i/12 ? 1 : .12}><ellipse cx={900-gap} cy={450+i*52} rx="9" ry="12" fill="#e4d8da"/><ellipse cx={1020+gap} cy={450+i*52} rx="9" ry="12" fill="#e4d8da"/><path d={`M${900-gap} ${450+i*52}L${1020+gap} ${502+i*52}`} stroke="#cc8da2" strokeWidth="9" fill="none"/><path d={`M${1020+gap} ${450+i*52}L${900-gap} ${502+i*52}`} stroke="#e6b8c6" strokeWidth="7" fill="none"/></g>)}
    <g opacity={1-meet} transform={`translate(${1100-p*120} ${540+p*360}) rotate(-32)`}><path d="M0-110V110Q18 137 25 110V-110Q13-143 0-110Z" fill="#f7f5ee" stroke="#e8dadd" strokeWidth="3"/><ellipse cx="12" cy="-92" rx="5" ry="15" fill="#e4d9dc"/><path d="M12-90Q180-118 146-15T262 107" fill="none" stroke="#cc8da2" strokeWidth="9"/></g>
    <path d="M660 907Q960 805 1260 907" stroke="#fff5df" strokeWidth="38" fill="none" strokeLinecap="round" opacity={meet}/>
    <StoryCouple x={960} y={763} s={.68} gap={310-meet*232} walk={f/5*(1-meet)} />
  </BStage>;
};

const Memories = ({ durationInFrames }: SceneProps) => {
  const { f, t } = useBeat(durationInFrames);
  const progress = f / Math.max(1,durationInFrames-1);
  const turn = smooth((progress-.19)/.5);
  const faceWidth = .15+.85*Math.abs(Math.cos(turn*Math.PI));
  const ground = ["#e4e9cd","#d4dfbc","#f0d7c6","#edcfad","#fffaf4"];
  return <BStage night><WarmGlow x={960} y={680} r={700}/><BStars count={35}/>
    <path d="M0 990Q960 862 1920 990V1080H0Z" fill="#ead4de"/>
    {[-2,-1,0,1,2].map((n,i) => <g key={n} transform={`translate(${960+n*337} ${610+Math.abs(n)*53}) rotate(${n*7}) scale(${1-Math.abs(n)*.11})`} opacity={n===0?1:.8} filter="url(#warm-shadow)">
      <path d="M-159 228V-150Q0-328 159-150V228Z" fill="url(#b-gold)"/><path d="M-140 208V-144Q0-301 140-144V208Z" fill={i%2 ? "#e8dde0" : "#f1e8e2"}/>
      <circle cx={n===0?70:0} cy="-89" r="53" fill="#fff3cf" opacity=".72"/>
      <path d="M-140 108Q0 29 140 108V208H-140Z" fill={ground[i]}/>
      {n!==0 && <g transform="translate(-91 100)">
        <path d="M0 0L4-193M2-96L-34-151M3-131L35-169" stroke="#c2a89b" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {i===0 && [-1,0,1].map((v)=><g key={v} transform={`translate(${v*25} ${-173+Math.abs(v)*22})`}><circle r="27" fill="#f1c4d2"/><circle cx="-9" cy="-7" r="9" fill="#fff2ec"/><circle cx="12" cy="5" r="8" fill="#fff2ec"/></g>)}
        {i===1 && <path d="M-40-124Q-66-186-16-217Q26-250 58-201Q97-151 45-123Z" fill="#c0d3a3"/>}
        {i===3 && <><path d="M-42-128Q-64-192-17-213Q28-247 57-200Q95-156 43-124Z" fill="#e7b087"/>{[0,1,2].map(k=><ellipse key={k} cx={32+k*20} cy={-100+((f+k*37)%95)} rx="6" ry="13" fill="#d89c75" transform={`rotate(${k*28})`}/>)}</>}
        {i===4 && <><path d="M4-186L32-166M-31-150L-5-110" stroke="#fffaf4" strokeWidth="8" strokeLinecap="round"/>{[0,1,2,3,4,5].map(k=><circle key={k} cx={-20+k*27} cy={-204+(k*39+f)%210} r="3" fill="#fffaf4"/>)}</>}
      </g>}
      {n===0 && <>
        <path d="M-140 90H140M-125 90V-100M125 90V-100M-141-104Q0-185 141-104" stroke="#dfc2b6" strokeWidth="12" fill="none"/>
        <g transform={`translate(0 52) scale(${faceWidth} 1)`}>
          {turn<.5 ? <><StoryPerson x={-67} y={26} s={.61} girl back/><StoryPerson x={67} y={26} s={.61} back/></> : <StoryCouple y={26} s={.72} gap={78} embrace={.25}/>}
        </g>
        <path d="M-30-27Q-2-47 29-27" stroke="#f7d2c9" strokeWidth="6" fill="none" opacity={turn} strokeLinecap="round"/>
      </>}
      {n!==0 && <g transform={`translate(14 91) rotate(${Math.sin(t+i)})`}><StoryCouple s={.47} gap={78} back={i===1}/></g>}
      <path d="M-130-144Q0-183 130-144" stroke="#fffaf4" strokeWidth="3" opacity=".3" fill="none"/>
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
    <path d="M300 894Q590 754 834 845T1320 838T1660 894" fill="none" stroke="#f7eee2" strokeWidth="22" opacity=".72"/>
    <g transform={`translate(960 ${770 + Math.sin(t)*3}) scale(${1.22 + p*.08})`}><StoryCouple gap={76} walk={t*.65}/></g>
    <circle cx="960" cy="806" r={48 + p * 12} fill="none" stroke="#e6c68b" strokeWidth="6" opacity={.35 + p*.2}/>
    <WarmGlow x={960} y={806} r={140} opacity={.32+p*.25}/>
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
      <BHome x={-65} y={38} s={.92}/><StoryCouple x={126} y={132} s={.33} gap={78}/>
      <BFlower x={-214} y={90} s={.36} rotation={-13}/><BFlower x={217} y={136} s={.32} pale/>
      <path d="M-287-59Q-282-239-128-294" fill="none" stroke="#f8f6f0" strokeWidth="17" strokeLinecap="round" opacity=".65"/>
      <path d="M184 264Q266 213 292 117" fill="none" stroke="#f7f5ef" strokeWidth="6" strokeLinecap="round" opacity=".6"/>
    </g>
    <path d="M220 1100L386 1005Q430 973 482 982L662 1013L794 984Q822 978 830 998Q838 1018 813 1029L743 1052L830 1040Q850 1038 853 1055Q855 1074 833 1079L720 1100ZM1700 1100L1534 1005Q1490 973 1438 982L1258 1013L1126 984Q1098 978 1090 998Q1082 1018 1107 1029L1177 1052L1090 1040Q1070 1038 1067 1055Q1065 1074 1087 1079L1200 1100Z" fill="url(#b-skin)" stroke="#dfb89f" strokeWidth="3"/>
    <path d="M647 1037Q713 1047 743 1052M1273 1037Q1207 1047 1177 1052M455 1016L603 1057M1465 1016L1317 1057" stroke="#dfb89f" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M0 1060L357 1001L389 1100H0ZM1920 1060L1563 1001L1531 1100H1920Z" fill={STORY_OUTFIT.blouse} stroke="#dfc8bd" strokeWidth="3"/>
  </BStage>;
};

const Shine = ({ durationInFrames }: SceneProps) => {
  const { f, p, t } = useBeat(durationInFrames);
  const light = smooth((f/Math.max(1,durationInFrames-1)-.12)/.65);
  return <BStage night><WarmGlow x={1040} y={660} r={230+light*390} opacity={.25+light*.5}/><BStars count={30}/>
    {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <path key={i} d={`M1040 660L${1040+Math.cos(a)*1300} ${660+Math.sin(a)*800}`} fill="none" stroke="#fff0c6" strokeWidth={i%2?3:13} opacity={light*.1} pathLength="1" strokeDasharray="1" strokeDashoffset={1-light}/>;})}
    <path d="M0 1080V919Q200 794 405 906Q630 710 845 914Q1110 770 1332 903Q1650 752 1920 929V1080Z" fill="#f1d3d8"/>
    {Array.from({length:12},(_,i)=><g key={i} transform={`translate(${i*177-15} ${940+(i%3)*28})`}><path d="M-48 0H48V96H-48Z" fill={i%2?"#eee4df":"#e9dddf"}/><path d="M-60 0L0-54L60 0" fill="#cfacbd"/><path d="M-26 24H-5V52H-26ZM10 24H31V52H10Z" fill="#f5f2e9" opacity={.25+p*.75}/></g>)}
    <path d="M1040 685Q1040 829 1850 940M1040 685Q1040 829 70 940" stroke="#fff4ce" strokeWidth="5" fill="none" opacity={light*.65} pathLength="1" strokeDasharray="1" strokeDashoffset={1-light}/>
    <path d="M530 1080V991Q960 828 1390 991V1080Z" fill="#e6c6d2"/>
    <path d="M703 966Q960 875 1217 966" stroke="#f9e9df" strokeWidth="24" fill="none" strokeLinecap="round"/>
    <StoryCouple x={960} y={759} s={.9} gap={105-p*22} embrace={.2}/>
    <WarmGlow x={1035} y={718} r={85+light*65} opacity={light*.4}/>
    <WarmStar x={1035} y={718} r={8+light*8} color="#fff4ce" rotate={t*12}/>
    <path d="M1045 630Q1090 505 1175 446" fill="none" stroke="#ead7a0" strokeWidth="4" opacity={light*.5} pathLength="1" strokeDasharray="1" strokeDashoffset={1-light}/>
    <WarmStar x={1175} y={446} r={11+light*22} color="#e8ce98" rotate={t*5}/>
  </BStage>;
};

const Ordinary = ({ durationInFrames }: SceneProps) => {
  const { p, t } = useBeat(durationInFrames);
  return <BStage night><WarmGlow x={1150} y={580} r={800} opacity={.45}/><BStars count={130} y={280} height={660}/>
    <g transform={`translate(1070 560) rotate(-17)`}>{Array.from({length:6},(_,i)=><ellipse key={i} rx={330+i*117} ry={66+i*38} fill="none" stroke="#d6b8c8" strokeWidth={i===3?35:3} opacity={i===3?.1:.18} transform={`rotate(${p*3})`}/>)}</g>
    {Array.from({length:15},(_,i)=><WarmStar key={i} x={100+(i*431)%1730} y={345+(i*157)%440} r={3+i%3*2} color="#dac49b" rotate={t+i*3}/>)}
    <path d="M0 1080V1013Q520 883 960 970Q1400 883 1920 1013V1080Z" fill="#e7ced8"/>
    <path d="M0 1054Q500 948 958 1019T1920 1052" fill="none" stroke="#e9dde0" strokeWidth="3"/>
    <g transform="translate(960 885) scale(.48)">
      <StoryPerson girl back/>
      <path d="M-30-61L-42 18M30-61L42 18" stroke="#d0a7a9" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M-26-48Q0-67 26-48L33 27Q0 44-33 27Z" fill="#e5c1b6" stroke="#ba9393" strokeWidth="3"/>
      <path d="M-16-51V-65Q0-81 16-65V-51" stroke="#ba9393" strokeWidth="6" fill="none"/>
      <path d="M-30-25Q0-36 30-25M-20 7H20V26H-20Z" fill="#f4ddd0" stroke="#ba9393" strokeWidth="3"/>
      <circle cx="11" cy="-23" r="3" fill="#b48c8e"/>
    </g>
    <WarmGlow x={1175} y={446} r={100} opacity={.22+p*.1}/>
    <WarmStar x={1175} y={446} r={30} color="#e8ce98" rotate={t*5}/>
  </BStage>;
};

const SoftGarden = ({ durationInFrames }: SceneProps) => <SharedTenderness durationInFrames={durationInFrames} reprise={1} />;

const Sensitive = ({ durationInFrames }: SceneProps) => <SharedSensitivity durationInFrames={durationInFrames} />;

const RingExchange = ({ durationInFrames }: SceneProps) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1,durationInFrames-1);
  const slide = smooth((p-.18)/.62);
  const release = smooth((p-.8)/.2);
  const ringX = 247-slide*266;
  const ringY = 70;
  const pinchX = ringX + release*108;
  const pinchY = ringY - release*115;
  return <BStage night><WarmGlow x={960} y={650} r={620}/><BStars count={24}/>
    <path d="M0 1000Q960 826 1920 1000V1080H0Z" fill="#f3e8e2"/>
    <g transform="translate(960 660)">
      <path d="M-1100-112L-407-99L-379 132L-1100 284Z" fill={STORY_OUTFIT.blouse} stroke="#e2cec2" strokeWidth="3"/>
      <path d="M-465-103L-397-105L-371 133L-444 150Z" fill="#fffaf4" stroke="#e2cec2" strokeWidth="3"/>
      <circle cx="-410" cy="104" r="5" fill="#d6b3b9"/>
      <g transform={`translate(${ringX} ${ringY})`}>
        <ellipse rx="19" ry="34" fill="none" stroke="#c7aa75" strokeWidth="12"/>
        <ellipse rx="19" ry="34" fill="none" stroke="#f2dfaa" strokeWidth="7"/>
      </g>
      <path d="M-407-86L-320-89Q-275-147-232-186Q-208-211-187-191Q-173-174-193-152L-244-95Q-195-111-141-108L156-108Q186-108 187-85Q188-63 160-61L-81-46L208-46Q239-46 240-21Q240 4 210 5L-75 16L178 45Q205 49 202 74Q200 98 173 94L-91 74L121 124Q145 133 138 155Q131 176 108 167L-176 121Q-243 143-319 117L-395 121Z" fill="url(#b-skin)" stroke="#dfb89f" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M-244-95Q-202-57-193-13M-116-62L-100-32M-111 9L-99 39M-126 72L-112 105" fill="none" stroke="#dfb89f" strokeWidth="3" strokeLinecap="round"/>
      <path d="M148-96L167-96M199-34L219-34M162 57L185 59M107 137L122 142" stroke="#f8e8d9" strokeWidth="8" strokeLinecap="round"/>
      <g transform={`translate(${ringX} ${ringY})`}>
        <path d="M-19-1A19 34 0 0 0 19-1" fill="none" stroke="#c7aa75" strokeWidth="12"/>
        <path d="M-19-1A19 34 0 0 0 19-1" fill="none" stroke="#f4e4b5" strokeWidth="7"/>
        <path d="M-12-28L0-44L13-28L0-14Z" fill="#fffaf4" stroke="#d3b781" strokeWidth="3"/>
      </g>
      <g transform={`translate(${pinchX} ${pinchY})`}>
        <path d="M1250-310L350-185L296-62L1250 21Z" fill={STORY_OUTFIT.blouse} stroke="#e2cec2" strokeWidth="3"/>
        <path d="M350-185L300-193L253-76L296-62Z" fill="#fffaf4" stroke="#dfc8bd" strokeWidth="3"/>
        <circle cx="294" cy="-93" r="5" fill="#d6b3b9"/>
        <path d="M300-189L227-188Q181-190 146-156L64-92Q26-85 7-58L-13-29Q-22-14-8-5Q4 4 16-12L34-31L58-39Q39-24 31-5Q24 12 39 19Q55 26 65 8L81-17Q104-42 144-53L200-67L255-77Z" fill="url(#b-skin)" stroke="#dfb89f" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M144-53Q111-84 137-112M172-68L152-84M198-80L177-96" fill="none" stroke="#dfb89f" strokeWidth="3" strokeLinecap="round"/>
        <path d="M-7-24L1-20M35-1L44 3" stroke="#f8e8d9" strokeWidth="6" strokeLinecap="round"/>
      </g>
      <WarmStar x={ringX-34} y={ringY-68} r={8+release*5} color="#fff5d5" rotate={f}/>
    </g>
  </BStage>;
};

const SeasonClock = ({ durationInFrames }: SceneProps) => <SharedSeasons durationInFrames={durationInFrames} reprise={1} />;

const HeldWide = ({ durationInFrames }: SceneProps) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1,durationInFrames-1);
  const zoom = 1.35 - p * .62;
  return <BStage><WarmGlow x={960} y={490} r={650}/><BMountains y={725} shift={-p*20}/><circle cx={1500} cy={350} r={90} fill="#f5f2ea" opacity=".7"/>
    <path d="M0 822Q435 724 960 820T1920 806V1080H0Z" fill="#e8dcdf"/><path d="M0 966Q465 848 960 947T1920 947V1080H0Z" fill="#e6b8c6"/>
    <g transform={`translate(960 ${770 + Math.sin(f / 18) * 2}) scale(${zoom})`}><StoryCouple gap={78} walk={f/22}/></g>
    <circle cx="960" cy={805} r={42 + p*15} fill="none" stroke="#e6c68b" strokeWidth="5" opacity={.25 + p*.22}/>
    <WarmStar x={960} y={735} r={11} color="#f5f1e9"/>
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
