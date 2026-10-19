import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import {
  TransitionSeries,
  linearTiming,
  type TransitionPresentationComponentProps,
} from "@remotion/transitions";
import type { ComponentType } from "react";
import {
  AcrossWorlds,
  DreamTitle,
  FairytaleBloom,
  GoldenPromise,
  MoonPost,
  PoetryGate,
  StarPond,
  ThousandWorlds,
} from "./DreamScenes";
import {
  ClockPromise,
  CloudRoom,
  FinalBridge,
  LanternSea,
  MarkerObservatory,
  MemoryCorridor,
  MountainRoute,
  MoonGarden,
  ReturnPost,
  SoftGarden,
  StarForge,
  StarLetter,
  ThreadArchive,
  WorldAtlas,
} from "./DreamFullScenes";
import { Atmosphere } from "./DreamArt";
import { DreamLyricsFull } from "./DreamType";
import timeline from "../data/full-timeline.json";

type Shot = (typeof timeline)[number];
type TransitionKind = Shot["transition"];

const sceneById: Record<string, ComponentType> = {
  StarPond,
  MoonPost,
  AcrossWorlds,
  ThousandWorlds,
  GoldenPromise,
  DreamTitle,
  PoetryGate,
  FairytaleBloom,
  MoonGarden,
  CloudRoom,
  ClockPromise,
  WorldAtlas,
  LanternSea,
  MountainRoute,
  MarkerObservatory,
  StarForge,
  SoftGarden,
  MemoryCorridor,
  ThreadArchive,
  ReturnPost,
  FinalBridge,
  StarLetter,
};

const FullReveal = ({
  children,
  presentationDirection,
  presentationProgress: p,
  passedProps: { kind },
}: TransitionPresentationComponentProps<{ kind: TransitionKind }>) => {
  if (presentationDirection === "exiting")
    return <AbsoluteFill>{children}</AbsoluteFill>;
  const clip =
    kind === "orb-morph"
      ? `ellipse(${p * 145}% ${p * 145}% at 55% 55%)`
      : kind === "line-wipe"
        ? `polygon(0 0,${p * 156}% 0,${p * 156 - 44}% 100%,0 100%)`
        : kind === "page-fold"
          ? `polygon(0 0,${p * 118}% 0,${p * 94}% 100%,0 100%)`
          : kind === "star-burst"
            ? `circle(${p * 125}% at 50% 48%)`
            : undefined;
  return (
    <AbsoluteFill
      style={{ clipPath: clip, opacity: kind === "crossfade" ? p : 1 }}
    >
      {children}
    </AbsoluteFill>
  );
};

const reveal = (kind: TransitionKind) => ({
  component: FullReveal,
  props: { kind },
});

export const DreamFullMv = () => (
  <AbsoluteFill style={{ backgroundColor: "#20265b" }}>
    <TransitionSeries>
      {timeline
        .map((shot, index) => {
          const Scene = sceneById[shot.id];
          if (!Scene) throw new Error(`Unknown full MV scene: ${shot.id}`);
          const isLast = index === timeline.length - 1;
          const durationInFrames =
            shot.endFrame -
            shot.startFrame +
            (isLast ? 0 : shot.transitionFrames);
          return (
            <TransitionSeries.Sequence
              key={shot.id}
              name={shot.name}
              durationInFrames={durationInFrames}
            >
              <Scene />
            </TransitionSeries.Sequence>
          );
        })
        .flatMap((sequence, index) => {
          if (index === timeline.length - 1) return [sequence];
          const shot = timeline[index];
          return [
            sequence,
            <TransitionSeries.Transition
              key={`${shot.id}-transition`}
              presentation={reveal(shot.transition)}
              timing={linearTiming({ durationInFrames: shot.transitionFrames })}
            />,
          ];
        })}
    </TransitionSeries>
    <DreamLyricsFull />
    <Atmosphere />
    <Audio src={staticFile("audio/song.mp3")} durationInFrames={5508} />
  </AbsoluteFill>
);
