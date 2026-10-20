import { Composition, registerRoot } from "remotion";
import { WarmStage, WarmCouple, WarmSanta, WarmSleigh, WarmGift, WarmLetter, WarmMoon, WarmWorld, WarmMountain, WarmBridge, WarmLadle, WarmClock } from "../WarmArt";

const Assets = () => <WarmStage theme="paper">
  <WarmCouple x={230} y={380} s={.8} />
  <WarmSanta x={700} y={330} s={1.2} />
  <WarmSleigh x={1230} y={360} s={.9} />
  <WarmGift x={1710} y={370} s={1.2} />
  <WarmLetter x={230} y={750} s={.8} open={.7} />
  <WarmMoon x={700} y={750} r={115} />
  <WarmWorld x={1180} y={750} s={.8} />
  <WarmClock x={1700} y={750} r={110} />
</WarmStage>;
const Landscape = () => <WarmStage theme="sunset">
  <WarmMountain x={380} y={800} s={1.1} />
  <WarmBridge x={1000} y={780} s={1} />
  <WarmLadle x={1550} y={600} s={1} />
</WarmStage>;
registerRoot(() => <>
  <Composition id="WarmAssets" component={Assets} durationInFrames={60} fps={30} width={1920} height={1080}/>
  <Composition id="WarmLandscapeAssets" component={Landscape} durationInFrames={60} fps={30} width={1920} height={1080}/>
</>);
