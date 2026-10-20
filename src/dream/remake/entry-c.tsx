import { Composition, registerRoot } from "remotion";
import storyboard from "../../data/remake-storyboard.json";
import { actCScenes } from "./ActC";

const AgentC = () => <>{storyboard.filter(shot => shot.owner === "agent-c").map(shot => <Composition key={shot.sceneId} id={shot.sceneId} component={actCScenes[shot.sceneId]} width={1920} height={1080} fps={30} durationInFrames={shot.endFrame - shot.startFrame} defaultProps={{ durationInFrames: shot.endFrame - shot.startFrame }} />)}</>;

registerRoot(AgentC);
