import vectors from "./character-vectors.json";

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
  const shirt = girl ? "#c9dfc7" : "#bed8b7";
  return <g data-story-character={girl ? "girl" : "boy"} transform={`translate(${x} ${y}) rotate(${lean}) scale(${s * face} ${s})`}>
    <ellipse cy="181" rx="62" ry="10" fill="#b6a1a2" opacity=".16"/>
    <path d={`M-24 82L${-26 + stride} 168M24 82L${26 - stride} 168`} stroke={girl ? "#d4bac8" : "#d6c6b6"} strokeWidth="24" strokeLinecap="round"/>
    {girl && <path d="M-45 48H45L58 111Q0 129-58 111Z" fill="#efd1dc" stroke="#d5aebf" strokeWidth="3"/>}
    <path d={`M${-26 + stride} 166q-28-1-27 12h43v-12ZM${26 - stride} 166q28-1 27 12H${10 - stride}v-12Z`} fill="#faf7f1" stroke="#ad9b9d" strokeWidth="3"/>
    <path d="M-15-94H15V-58H-15Z" fill="#ffcdaa"/>
    <path d="M-15-89Q0-80 15-88V-80Q0-72-15-80Z" fill="#efb893"/>
    <path d="M-47-62Q-27-77-18-70Q0-53 18-70Q30-77 47-62L51 76Q0 97-51 76Z" fill={shirt} stroke="#739977" strokeWidth="3.5" strokeLinejoin="round"/>
    <path d="M-19-68Q0-49 20-68" stroke="#7da584" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <path d="M-44-48Q-55-21-61 12M44-48Q56-19 61 12" stroke={shirt} strokeWidth="27" strokeLinecap="round" fill="none"/>
    <path d={`M-61 8Q-71 ${17-arm*30} -70 ${handY}M61 8Q71 ${17-arm*30} 70 ${handY}`} stroke="#ffcdaa" strokeWidth="18" strokeLinecap="round" fill="none"/>
    <circle cx="-70" cy={handY} r="11" fill="#ffcdaa"/>
    <circle cx="70" cy={handY} r="11" fill="#ffcdaa"/>
    <path d="M-39 68Q0 80 39 68" stroke="#a6c7a4" strokeWidth="5" fill="none"/>
    <path d="M18 2h19v29H18Z" fill="#dbead5" stroke="#9abb97" strokeWidth="2"/>
    {!back && <path d="M26 12c-7-7-14 2 0 11c14-9 7-18 0-11Z" fill="#e4afbd"/>}
    <g transform={`translate(${turn * 5} 0)`}><StoryPortrait girl={girl} back={back}/></g>
  </g>;
};
