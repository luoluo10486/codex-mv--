import { Composition, registerRoot } from "remotion";
import storyboard from "../../data/remake-storyboard.json";
import { actAScenes } from "./ActA";

const ActARoot = () => (
  <>
    {storyboard
      .filter((shot) => shot.owner === "agent-a" && actAScenes[shot.sceneId])
      .map((shot) => (
        <Composition
          key={shot.sceneId}
          id={shot.sceneId}
          component={actAScenes[shot.sceneId]}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={shot.endFrame - shot.startFrame}
          defaultProps={{ durationInFrames: shot.endFrame - shot.startFrame }}
        />
      ))}
  </>
);
registerRoot(ActARoot);
