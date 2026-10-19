import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  type TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { C, FONT, range, shots } from "./design";
import type { Caption } from "@remotion/captions";
import { CanvasGrain } from "./art/PaperWorld";
import {
  FirstMark,
  Unfolding,
  PaperFlight,
  BookGarden,
  LittleUniverse,
  PromiseTitle,
  LetterOpening,
  GrowingVerse,
} from "./scenes/Scenes";
import captions from "./data/lyrics.json";
import "./fonts";
const timedLyrics: Caption[] = captions;

const PaperReveal = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps: { kind },
}: TransitionPresentationComponentProps<{ kind: number }>) => {
  if (presentationDirection === "exiting")
    return <AbsoluteFill>{children}</AbsoluteFill>;
  const p = presentationProgress;
  const cut = -25 + p * 150;
  const clipPath =
    kind === 0
      ? `polygon(0 0, ${cut}% 0, ${cut - 28}% 100%, 0 100%)`
      : kind === 1
        ? `circle(${p * 125}% at 61% 57%)`
        : kind === 2
          ? `inset(0 ${(1 - p) * 100}% 0 0)`
          : `polygon(0 ${100 - p * 145}%,100% ${130 - p * 145}%,100% 100%,0 100%)`;
  return <AbsoluteFill style={{ clipPath }}>{children}</AbsoluteFill>;
};
const reveal = (kind: number) => ({ component: PaperReveal, props: { kind } });

const LyricOverlay = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    time = frame / fps;
  const caption = timedLyrics.find(
    (c) => time * 1000 >= c.startMs && time * 1000 < c.endMs,
  );
  if (!caption) return null;
  const local = time - caption.startMs / 1000;
  const first = caption === captions[0];
  const lines = first ? ["你是信的开头", "诗的内容"] : [caption.text];
  const x = first ? 178 : 960,
    y = first ? 438 : 302;
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <g transform={`translate(0 ${range(local, 0, 0.42, 13, 0)})`}>
        {lines.map((line, j) => (
          <text
            key={line}
            x={x}
            y={y + j * 112}
            textAnchor={first ? "start" : "middle"}
            fontFamily={FONT}
            fontSize={first ? 77 : 76}
            letterSpacing={first ? 7 : 9}
            fill={C.ink}
          >
            {Array.from(line).map((char, i) => (
              <tspan
                key={i}
                fill={
                  ["信", "诗", "童", "话", "奇", "迹"].includes(char)
                    ? C.rose
                    : C.ink
                }
              >
                {char}
              </tspan>
            ))}
          </text>
        ))}
        <path
          d={
            first
              ? "M180 599Q352 586 490 600"
              : caption === captions[1]
                ? "M795 347Q960 330 1125 347"
                : "M704 349Q960 326 1216 349"
          }
          fill="none"
          stroke={C.pink}
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - range(local, 0.08, 0.9)}
        />
      </g>
    </svg>
  );
};

export const Mv = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="纸上的第一笔"
        durationInFrames={
          shots[0].endFrame - shots[0].startFrame + shots[0].transitionOutFrames
        }
      >
        <FirstMark />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(0)}
        timing={linearTiming({
          durationInFrames: shots[0].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="世界展开"
        durationInFrames={
          shots[1].endFrame - shots[1].startFrame + shots[1].transitionOutFrames
        }
      >
        <Unfolding />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(1)}
        timing={linearTiming({
          durationInFrames: shots[1].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="轻盈出发"
        durationInFrames={
          shots[2].endFrame - shots[2].startFrame + shots[2].transitionOutFrames
        }
      >
        <PaperFlight />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(2)}
        timing={linearTiming({
          durationInFrames: shots[2].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="书页花园"
        durationInFrames={
          shots[3].endFrame - shots[3].startFrame + shots[3].transitionOutFrames
        }
      >
        <BookGarden />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(3)}
        timing={linearTiming({
          durationInFrames: shots[3].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="小宇宙形成"
        durationInFrames={
          shots[4].endFrame - shots[4].startFrame + shots[4].transitionOutFrames
        }
      >
        <LittleUniverse />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(1)}
        timing={linearTiming({
          durationInFrames: shots[4].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="歌名揭示"
        durationInFrames={
          shots[5].endFrame - shots[5].startFrame + shots[5].transitionOutFrames
        }
      >
        <PromiseTitle />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(0)}
        timing={linearTiming({
          durationInFrames: shots[5].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="信件开启"
        durationInFrames={
          shots[6].endFrame - shots[6].startFrame + shots[6].transitionOutFrames
        }
      >
        <LetterOpening />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={reveal(3)}
        timing={linearTiming({
          durationInFrames: shots[6].transitionOutFrames,
        })}
      />
      <TransitionSeries.Sequence
        name="诗行生长"
        durationInFrames={shots[7].endFrame - shots[7].startFrame}
      >
        <GrowingVerse />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <LyricOverlay />
    <CanvasGrain />
    <Audio src={staticFile("audio/song.mp3")} durationInFrames={900} />
  </AbsoluteFill>
);
