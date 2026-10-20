import { Composition, Folder } from "remotion";
import { DreamMv } from "./dream/DreamMv";
import { DreamFullMv } from "./dream/DreamFullMv";
import storyboard from "./data/remake-storyboard.json";
import { remakeScenes } from "./dream/remake/registry";

export const RemotionRoot = () => <>
  <Composition id="GouZhiQiShi" component={DreamMv} durationInFrames={900} fps={30} width={1920} height={1080}/>
  <Composition id="GouZhiQiShiFull" component={DreamFullMv} durationInFrames={5508} fps={30} width={1920} height={1080}/>
  <Folder name="Warm-Storyboard">
    {storyboard.map(shot=><Composition key={shot.sceneId} id={shot.sceneId} component={remakeScenes[shot.sceneId]} durationInFrames={shot.endFrame-shot.startFrame} defaultProps={{durationInFrames:shot.endFrame-shot.startFrame}} fps={30} width={1920} height={1080}/>)}
  </Folder>
</>;
