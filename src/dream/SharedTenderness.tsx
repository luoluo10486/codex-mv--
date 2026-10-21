import { useCurrentFrame } from "remotion";
import { StoryPerson } from "./StoryCharacters";
import { WarmStage } from "./WarmArt";
import { smooth } from "./palette";

const CampusShelter = ({ interior = false }: { interior?: boolean }) => interior ? <>
  <rect width="1920" height="1080" fill="#fff5e8" />
  <path d="M0 880H1920V1080H0Z" fill="#efdbc8" />
  <path d="M0 951H1920M0 1030H1920M430 880L360 1080M1460 880L1550 1080" fill="none" stroke="#f9ebdd" strokeWidth="5" />
  <rect x="334" y="349" width="322" height="384" rx="110" fill="#f6e1df" stroke="#dfbeb8" strokeWidth="15" />
  <circle cx="562" cy="437" r="53" fill="#fff1cd" />
  <path d="M350 663Q460 558 640 643V718H350Z" fill="#e3d6cf" />
  <path d="M497 350V732M338 531H656" stroke="#fff9ef" strokeWidth="13" />
  <path d="M301 346Q360 530 298 744H364Q411 530 371 346M685 346Q622 530 687 744H621Q575 530 613 346" fill="#edc8d3" />
  <path d="M1300 930V508M1224 511L1252 396H1348L1376 511Z" fill="#fff0c8" stroke="#d9b7a3" strokeWidth="8" />
  <ellipse cx="1300" cy="930" rx="70" ry="15" fill="#d9b7a3" />
  <path d="M713 772Q713 728 755 728H1169Q1211 728 1211 772V920H713Z" fill="#edc8d3" />
  <path d="M701 842H1223V918H701Z" fill="#f5dfe4" />
  <path d="M743 919V955M1180 919V955" stroke="#c9ae9d" strokeWidth="15" />
</> : <>
  <rect width="1920" height="1080" fill={interior?"#fff5e8":"#fff3e9"} />
  <path d="M0 735Q365 560 700 722T1350 681T1920 721V1080H0Z" fill="#e7e5ce" />
  <path d="M0 856Q650 745 1920 851V1080H0Z" fill="#f7dfd9" />
  <path d="M0 1000Q960 849 1920 1000V1080H0Z" fill="#fff8eb" />
  <path d="M365 906V333H1555V906" stroke="#d8b9a8" strokeWidth="23" fill="none" />
  <path d="M294 340L440 235H1480L1625 340Z" fill="#ebc0c6" stroke="#d4a7b0" strokeWidth="6" />
  <path d="M325 340H1595V366H325Z" fill="#fff8eb" />
  <path d="M420 363V770M1500 363V770M420 770H1500" stroke="#e7d1c3" strokeWidth="11" fill="none" />
  <path d="M534 843H1395V877H534Z" fill="#dec3b0" />
  <path d="M581 875V964M1350 875V964" stroke="#c9ae9d" strokeWidth="15" />
  <path d="M544 810H1385M544 781H1385" stroke="#e4cdbc" strokeWidth="20" strokeLinecap="round" />
</>;

const TenderPair = ({ relax, gap, tremble = 0 }: { relax: number; gap: number; tremble?: number }) => {
  const girlX = -gap + tremble + relax * 6;
  const shoulder = { x: girlX - 43, y: -45 };
  const hand = {
    x: 70 + (gap - shoulder.x - 70) * relax,
    y: 30 + (shoulder.y - 30) * relax,
  };
  return <g transform="translate(960 724)">
    <StoryPerson x={gap} face={-1} headLean={relax*2} handRight={hand} backArm={1} hideHand={1} />
    <StoryPerson x={girlX} girl headLean={relax*7} handRight={{x:65-relax*22,y:30-relax*2}} />
    <g transform={`translate(${gap-hand.x} ${hand.y}) rotate(${-18+relax*32})`}>
      <path d="M-7-10Q-13-6-10 3L-7 11Q-3 16 2 12L7 7Q11 3 8-3L5-9Q0-14-7-10Z" fill="#ffd2b2" stroke="#dfb18e" strokeWidth="1.2" />
      <path d="M-5 0L1 3M-5 4L0 7M-1-7L3-5" fill="none" stroke="#dfb18e" strokeWidth="1.1" strokeLinecap="round" />
    </g>
  </g>;
};

export const SharedTenderness = ({ durationInFrames, reprise = 0 }: { durationInFrames: number; reprise?: number }) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1,durationInFrames-1);
  const relax = smooth((p-.13)/.69);
  return <WarmStage>
    <CampusShelter interior={reprise===2} />
    <g transform={`translate(960 715) scale(${1.15+reprise*.075}) translate(-960 -715)`}>
      <TenderPair relax={relax} gap={91-relax*27} />
    </g>
    <g transform="translate(1405 898)">
      <path d="M-42 0H26V51H-42Z" fill="#fff8eb" stroke="#d6b0a7" strokeWidth="3" />
      <path d="M26 12Q62 11 51 36Q42 44 26 37" stroke="#d6b0a7" strokeWidth="6" fill="none" />
      <path d={`M-16-14Q${-29+Math.sin(f/18)*7}-33-12-49M7-13Q${-6+Math.sin(f/20)*5}-31 10-45`} stroke="#fffaf4" strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  </WarmStage>;
};

export const SharedSensitivity = ({ durationInFrames }: { durationInFrames: number }) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1,durationInFrames-1);
  const comfort = smooth((p-.28)/.6);
  const tremble = Math.sin(f*1.2)*2.6*(1-comfort);
  return <WarmStage>
    <CampusShelter />
    <g opacity={.65}>
      {Array.from({length:38},(_,i)=>{
        const x=(i*179+f*2)%1920; const y=(i*89+f*11)%1080;
        return (x<365 || x>1555 || y<310) && <path key={i} d={`M${x} ${y}l-8 28`} stroke="#bfd3da" strokeWidth="4" strokeLinecap="round" />;
      })}
      {[168,290,1640,1770].map((x,i)=><ellipse key={x} cx={x} cy={936+i%2*72} rx={45+(f+i*13)%35} ry="9" fill="none" stroke="#c6d8db" strokeWidth="3" />)}
    </g>
    <g transform="translate(960 724) scale(1.2) translate(-960 -724)"><TenderPair relax={comfort} gap={136-comfort*72} tremble={tremble} /></g>
    <g opacity={1-comfort} stroke="#c6a9b1" strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M795 642q-13 13-3 29M781 636q-18 18-5 43M825 727q-12 9-3 22" />
    </g>
    <path d="M1255 879H1320V932H1255Z" fill="#fff9ed" stroke="#d8b9a8" strokeWidth="4" />
    <path d="M1320 890Q1350 888 1341 912Q1333 922 1320 918" stroke="#d8b9a8" strokeWidth="5" fill="none" />
    <path d="M1277 867Q1266 850 1280 835M1300 867Q1289 851 1303 840" stroke="#fffaf4" strokeWidth="5" fill="none" strokeLinecap="round" />
  </WarmStage>;
};
