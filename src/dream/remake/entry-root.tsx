import {Composition, registerRoot} from "remotion";
import storyboard from "../../data/remake-storyboard.json";
import {openingScenes} from "./Opening";

registerRoot(()=> <>{storyboard.filter(s=>s.owner==="root").map(s=>{
  const Component=openingScenes[s.sceneId as keyof typeof openingScenes];
  return <Composition key={s.sceneId} id={s.sceneId} component={Component} durationInFrames={s.endFrame-s.startFrame} fps={30} width={1920} height={1080} defaultProps={{durationInFrames:s.endFrame-s.startFrame}}/>;
})}</>);
