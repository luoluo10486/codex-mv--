import { Composition, registerRoot } from "remotion";
import storyboard from "../../data/remake-storyboard.json";
import { actBScenes } from "./ActB";

const ActBRoot = () => <>{storyboard.filter(shot => shot.owner === "agent-b" && actBScenes[shot.sceneId]).map(shot => <Composition key={shot.sceneId} id={shot.sceneId} component={actBScenes[shot.sceneId]} width={1920} height={1080} fps={30} durationInFrames={shot.endFrame - shot.startFrame} defaultProps={{ durationInFrames: shot.endFrame - shot.startFrame }}/>)}</>;
registerRoot(ActBRoot);
