import { useCurrentFrame } from "remotion";
import { StoryCouple } from "./StoryCharacters";
import { WarmStage } from "./WarmArt";
import { smooth } from "./palette";

const palettes = [
  { sky: "#fff5e4", hill: "#e3e9cf", grass: "#dbe5c8", leaf: "#f4c3d2", light: "#fff1ce" },
  { sky: "#fff5d8", hill: "#dee7c6", grass: "#d3dfb8", leaf: "#bfcf99", light: "#ffedb7" },
  { sky: "#fff0df", hill: "#f1d3b8", grass: "#ebc9ad", leaf: "#e9ae8f", light: "#fff0c7" },
  { sky: "#f6e9ed", hill: "#eadde1", grass: "#fffaf4", leaf: "#e9d3d4", light: "#fff3d5" },
] as const;

const BranchTree = ({ season, f }: { season: number; f: number }) => <g transform="translate(435 830)">
  <path d="M-35 20Q-15-146-37-310L-17-398L15-405L16-285Q29-140 35 20Z" fill="#c5a69c" />
  <path d="M-10-195L-126-324M0-267L117-386M-21-303L-116-414M18-167L143-277" fill="none" stroke="#c5a69c" strokeWidth="21" strokeLinecap="round" />
  {season !== 3 && [[-134,-366,118,95],[-45,-426,114,93],[81,-420,120,96],[146,-312,103,86],[-120,-272,111,80],[13,-319,143,103]].map(([x,y,rx,ry],i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={palettes[season].leaf} />)}
  {season === 0 && Array.from({length: 26}, (_,i) => <g key={i} transform={`translate(${-204 + (i * 67) % 405} ${-465 + (i * 47) % 224})`}>
    {Array.from({length:5},(_,j)=><ellipse key={j} cy="-10" rx="7" ry="12" transform={`rotate(${j*72})`} fill={i%2 ? "#fff7f1" : "#ffe3e8"} />)}<circle r="4" fill="#e7c383" />
  </g>)}
  {season === 1 && <path d="M-179-357Q-110-430-42-396M48-431Q109-442 160-392M-184-269Q-125-321-62-287" stroke="#dce6b9" strokeWidth="14" fill="none" strokeLinecap="round" />}
  {season === 2 && Array.from({length:14},(_,i) => <path key={i} d="M0-17Q-24-5 0 17Q24-5 0-17" fill={i%2 ? "#d99e7f" : "#edbb8f"} transform={`translate(${-220+(i*91+f*(.5+i%3*.25))%510} ${-415+(i*47+f*(1+i%2))%470}) rotate(${i*31+f})`} />)}
  {season === 3 && <>
    <path d="M-119-326L-14-207M13-271L108-379M-106-412L-30-322M39-189L136-278" fill="none" stroke="#fffaf4" strokeWidth="14" strokeLinecap="round" />
    <path d="M-74 23Q-12-5 72 23" stroke="#fffaf4" strokeWidth="22" strokeLinecap="round" />
  </>}
</g>;

// The same path, tree and couple stay in place while the year passes around them.
export const SharedSeasons = ({ durationInFrames, reprise = 0 }: { durationInFrames: number; reprise?: number }) => {
  const f = useCurrentFrame();
  const p = f / Math.max(1, durationInFrames - 1);
  const reveal = [1, ...[.25,.5,.75].map(at=>smooth((p-at+.035)/.07))];
  return <WarmStage>
    {palettes.map((color,season)=><g key={season} opacity={reveal[season]} data-season={season}>
      <rect width="1920" height="1080" fill={color.sky} />
      <circle cx="1495" cy="369" r={season===1?111:86} fill={color.light} />
      <path d="M0 710Q290 554 650 670T1330 654T1920 692V1080H0Z" fill={color.hill} />
      <g fill="#f7e5dc" stroke="#d8beb3" strokeWidth="5">
        <path d="M1320 777V522H1710V777Z" /><path d="M1298 523L1515 407L1735 523Z" />
        {[1370,1485,1600].map(x=><path key={x} d={`M${x} 578H${x+57}V650H${x}Z`} fill="#fff7e5" />)}
        <path d="M1490 777V686H1550V777Z" fill="#dfc5bd" />
      </g>
      <path d="M0 848Q550 756 1045 830T1920 804V1080H0Z" fill={color.grass} />
      <path d="M715 1080Q822 936 941 865Q1075 785 1256 777L1301 788Q1102 819 1016 897Q911 987 942 1080Z" fill="#fff9ed" />
      <BranchTree season={season} f={f} />
      {season===0 && Array.from({length:12},(_,i)=><ellipse key={i} cx={160+(i*139+f*.5)%1530} cy={410+(i*93+f*1.2)%540} rx="7" ry="12" fill="#f5ccd7" transform={`rotate(${i*23} ${160+(i*139+f*.5)%1530} ${410+(i*93+f*1.2)%540})`} />)}
      {season===3 && Array.from({length:35},(_,i)=><circle key={i} cx={(i*173+f*.6)%1920} cy={(i*83+f*2.4)%970} r={3+i%3} fill="#fffdf9" />)}
    </g>)}
    <g transform={`translate(980 747) scale(${1.05 + reprise*.045})`}>
      <g opacity={reveal[3]} fill="none" stroke="#dba5b8" strokeLinecap="round">
        <path d="M-99-72Q-108-92-79-94Q-49-94-54-73M55-73Q49-94 79-94Q108-92 99-72" strokeWidth="15" />
        <path d="M-72-76Q0-34 72-76" strokeWidth="14" />
      </g>
      <StoryCouple gap={78} embrace={.25 + reprise*.1} />
      <g opacity={reveal[3]}>
        <path d="M-98-72Q-78-60-56-73M56-73Q78-60 99-72" fill="none" stroke="#f1c1ce" strokeWidth="16" strokeLinecap="round" />
        <path d="M-83-66L-91-23L-73-19L-63-64M77-65L85-25L104-29L94-68" fill="#f1c1ce" />
        <path d="M-87-35L-69-31M83-39L101-42" stroke="#fff7ef" strokeWidth="3.5" />
        <path d="M-95-69Q-78-63-60-70M60-70Q78-63 96-69" fill="none" stroke="#f9dae3" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  </WarmStage>;
};
