import storyboard from "../../data/remake-storyboard.json";

export type RemakeShot = (typeof storyboard)[number];
export type SceneProps = { durationInFrames: number };
export const shotFor = (id: string): RemakeShot => {
  const shot = storyboard.find((item) => item.sceneId === id);
  if (!shot) throw new Error(`Unknown remake shot: ${id}`);
  return shot;
};
