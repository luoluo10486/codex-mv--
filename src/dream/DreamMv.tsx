import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import {
  TransitionSeries,
  linearTiming,
  type TransitionPresentationComponentProps,
} from "@remotion/transitions";
import {
  StarPond,
  MoonPost,
  AcrossWorlds,
  ThousandWorlds,
  GoldenPromise,
  DreamTitle,
  PoetryGate,
  FairytaleBloom,
} from "./DreamScenes";
import { Atmosphere } from "./DreamArt";
import { DreamLyrics } from "./DreamType";
const DreamReveal = ({
  children,
  presentationDirection,
  presentationProgress: p,
  passedProps: { kind },
}: TransitionPresentationComponentProps<{ kind: number }>) => {
  if (presentationDirection === "exiting")
    return <AbsoluteFill>{children}</AbsoluteFill>;
  const clip =
    kind === 0
      ? `ellipse(${p * 140}% ${p * 140}% at 60% 56%)`
      : kind === 1
        ? `polygon(0 0,${p * 155}% 0,${p * 155 - 42}% 100%,0 100%)`
        : undefined;
  return (
    <AbsoluteFill style={{ clipPath: clip, opacity: kind === 2 ? p : 1 }}>
      {children}
    </AbsoluteFill>
  );
};
const reveal = (kind: number) => ({ component: DreamReveal, props: { kind } });
export const DreamMv = () => (
  <AbsoluteFill style={{ backgroundColor: "#20265b" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="星滴与月海" durationInFrames={124}>
        <StarPond />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(0)}
        timing={linearTiming({ durationInFrames: 18 })}
      />
      <TransitionSeries.Sequence name="鲸背邮局" durationInFrames={103}>
        <MoonPost />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(1)}
        timing={linearTiming({ durationInFrames: 18 })}
      />
      <TransitionSeries.Sequence name="万水千山" durationInFrames={145}>
        <AcrossWorlds />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(0)}
        timing={linearTiming({ durationInFrames: 18 })}
      />
      <TransitionSeries.Sequence name="一瓢三千世界" durationInFrames={145}>
        <ThousandWorlds />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(2)}
        timing={linearTiming({ durationInFrames: 18 })}
      />
      <TransitionSeries.Sequence name="金色契约" durationInFrames={124}>
        <GoldenPromise />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(0)}
        timing={linearTiming({ durationInFrames: 18 })}
      />
      <TransitionSeries.Sequence name="勾指起誓" durationInFrames={116}>
        <DreamTitle />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(1)}
        timing={linearTiming({ durationInFrames: 18 })}
      />
      <TransitionSeries.Sequence name="信与诗" durationInFrames={118}>
        <PoetryGate />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(2)}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence name="童话里的奇迹" durationInFrames={143}>
        <FairytaleBloom />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <DreamLyrics />
    <Atmosphere />
    <Audio src={staticFile("audio/song.mp3")} durationInFrames={900} />
  </AbsoluteFill>
);
