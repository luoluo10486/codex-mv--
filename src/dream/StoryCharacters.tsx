import vectors from "./character-vectors.json";

export const STORY_OUTFIT = {
  blouse: "#fff8ef",
  vest: "#f5e4cc",
  knitEdge: "#d2b99e",
  rose: "#e6b2c4",
  roseEdge: "#c48fa4",
  trousers: "#ddcbb9",
  shoes: "#fff9f2",
} as const;

export type StoryPersonProps = {
  x?: number; y?: number; s?: number; girl?: boolean;
  walk?: number; lean?: number; arm?: number; face?: number;
  back?: boolean; turn?: number;
};

// Crop the original vector faces, preserving the supplied hair, eyes and glasses.
export const StoryPortrait = ({ girl = false, back = false }: { girl?: boolean; back?: boolean }) => back ? <g>
  {girl && <path d="M25-172Q87-207 78-148Q68-113 84-91Q47-90 40-128Z" fill="#353535"/>}
  <path d={girl ? "M-49-134Q-57-194 0-197Q55-197 51-135L39-90Q0-68-39-93Z" : "M-53-132Q-63-187-15-193Q27-195 43-206L48-181Q67-161 52-125L39-92Q0-74-39-95Z"} fill={girl ? "#353535" : "#2d2c2d"}/>
  <path d="M-31-113Q0-97 32-114" stroke="#55504f" strokeWidth="3" opacity=".35" fill="none"/>
</g> : girl ? <svg x="-64" y="-198" width="146" height="118" viewBox="270 135 575 455" overflow="hidden">
  <path transform="scale(2)" d="M153 184Q150 127 190 100Q258 46 332 107Q347 74 382 101Q420 130 415 191Q400 229 398 253Q399 276 414 279Q385 288 364 267L351 222Q339 201 329 153Q297 163 274 151Q292 173 250 160Q223 154 211 136Q185 169 166 184Z" fill="#353535"/>
  {vectors.girl.map((path,i)=><path key={i} d={path.d} fill={path.fill} transform={path.transform} fillRule="nonzero"/>)}
</svg> : <svg x="-65" y="-203" width="132" height="124" viewBox="235 110 550 508" overflow="hidden">
  <path d="M280 390Q240 280 330 210Q460 110 540 160Q570 140 590 180Q675 190 685 135Q715 125 735 200Q760 260 730 320L700 410L670 420Q620 390 590 300Q540 355 480 350Q385 350 325 420Z" fill="#2d2c2d"/>
  {vectors.boy.map((path,i)=><path key={i} d={path.d} fill={path.fill} transform={path.transform} fillRule="nonzero"/>)}
</svg>;

export const StoryPerson = ({ x = 0, y = 0, s = 1, girl = false, walk = 0, lean = 0, arm = 0, face = 1, back = false, turn = 0 }: StoryPersonProps) => {
  const stride = Math.sin(walk) * 14;
  const handY = 30 - arm * 95;
  const sleeve = STORY_OUTFIT.blouse;
  const edge = "#dbc9bf";
  return <g data-story-character={girl ? "girl" : "boy"} transform={`translate(${x} ${y}) rotate(${lean}) scale(${s * face} ${s})`}>
    <ellipse cy="181" rx="62" ry="10" fill="#b6a1a2" opacity=".16"/>
    <path d={`M-24 74L${-26 + stride} 168M24 74L${26 - stride} 168`} stroke={girl ? "#f5dfd5" : STORY_OUTFIT.trousers} strokeWidth={girl ? 20 : 26} strokeLinecap="round"/>
    {!girl && <path d={`M${-37 + stride} 154l23 0M${14 - stride} 154h23`} stroke="#c7b29f" strokeWidth="5" fill="none"/>}
    {girl && <>
      <path d={`M${-26 + stride} 137V164M${26 - stride} 137V164`} stroke="#fff9f2" strokeWidth="21"/>
      <path d={`M${-36 + stride} 138h20M${16 - stride} 138h20`} stroke="#e6c4cc" strokeWidth="3"/>
    </>}
    <path d={`M${-26 + stride} 166q-28-1-27 12h43v-12ZM${26 - stride} 166q28-1 27 12H${10 - stride}v-12Z`} fill={STORY_OUTFIT.shoes} stroke={girl ? STORY_OUTFIT.roseEdge : "#bca38c"} strokeWidth="3"/>
    {girl && <path d={`M${-42 + stride} 167l19 2M${23 - stride} 169l19-2`} stroke={STORY_OUTFIT.roseEdge} strokeWidth="4" strokeLinecap="round"/>}
    <path d="M-15-94H15V-58H-15Z" fill="#ffcdaa"/>
    <path d="M-15-89Q0-80 15-88V-80Q0-72-15-80Z" fill="#efb893"/>
    <path d="M-47-62Q-27-77-18-70Q0-53 18-70Q30-77 47-62L44 42Q0 52-44 42Z" fill={sleeve} stroke={edge} strokeWidth="3" strokeLinejoin="round"/>
    {!girl && <path d="M-39 27H39L37 82H11L0 70L-11 82H-37Z" fill={STORY_OUTFIT.trousers}/>}
    {girl ? <>
      <path d="M-34 24H34L56 103Q0 117-56 103Z" fill={STORY_OUTFIT.rose} stroke={STORY_OUTFIT.roseEdge} strokeWidth="2.5"/>
      {[-24,-8,8,24].map(x=><path key={x} d={`M${x} 31L${x * 1.7} 104L${x * 1.7 + 10} 105L${x + 8} 31Z`} fill="#f1cbd7"/>)}
      <path d="M-45 97Q0 109 45 97" stroke="#ce97ad" strokeWidth="2" fill="none"/>
    </> : <>
      {!back && <path d="M0 46V72M-31 52H31" stroke="#bca38c" strokeWidth="2" fill="none"/>}
    </>}
    <path d={back ? "M-35-65L-19-72Q0-59 19-72L35-65Q27-37 41-22L40 36Q0 45-40 36L-41-22Q-27-37-35-65Z" : "M-35-65L-20-70L0-37L20-70L35-65Q27-37 41-22L40 36Q0 45-40 36L-41-22Q-27-37-35-65Z"} fill={girl ? STORY_OUTFIT.rose : STORY_OUTFIT.vest} stroke={girl ? STORY_OUTFIT.roseEdge : STORY_OUTFIT.knitEdge} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d={back ? "M-18-66Q0-53 18-66" : "M-20-65L0-32L20-65"} stroke={girl ? "#f6d8e2" : "#fff4df"} strokeWidth="3" fill="none"/>
    <path d="M-38 31Q0 40 38 31M-37 36Q0 45 37 36" stroke={girl ? STORY_OUTFIT.roseEdge : STORY_OUTFIT.knitEdge} strokeWidth="2" fill="none"/>
    {!back && <>
      <path d="M-18-70L0-57L-12-43L-27-61ZM18-70L0-57L12-43L27-61Z" fill="#fffdf8" stroke="#dbc9bf" strokeWidth="2"/>
      {girl ? <path d="M0-52L-15-59L-14-44L0-49L14-44L15-59ZM-3-48L-9-32L0-37L9-32L3-48Z" fill="#c98b9f"/> : <path d="M-5-55H5L8-47L3-43L7-18L0-10L-7-18L-3-43L-8-47Z" fill="#c98b9f"/>}
      <path d="M22-20L30-20V-10Q26-5 22-10Z" fill={girl ? "#fff4df" : "#efd0d8"} stroke={girl ? STORY_OUTFIT.roseEdge : STORY_OUTFIT.knitEdge} strokeWidth="1"/>
    </>}
    <path d="M-44-48Q-55-21-61 12M44-48Q56-19 61 12" stroke={edge} strokeWidth="30" strokeLinecap="round" fill="none"/>
    <path d="M-44-48Q-55-21-61 12M44-48Q56-19 61 12" stroke={sleeve} strokeWidth="25" strokeLinecap="round" fill="none"/>
    <path d="M-70 7L-52 12M52 12L70 7" stroke="#ead9ce" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d={`M-61 8Q-71 ${17-arm*30} -70 ${handY}M61 8Q71 ${17-arm*30} 70 ${handY}`} stroke="#ffcdaa" strokeWidth="18" strokeLinecap="round" fill="none"/>
    <circle cx="-70" cy={handY} r="11" fill="#ffcdaa"/>
    <circle cx="70" cy={handY} r="11" fill="#ffcdaa"/>
    <g transform={`translate(${turn * 5} 0)`}><StoryPortrait girl={girl} back={back}/></g>
  </g>;
};
