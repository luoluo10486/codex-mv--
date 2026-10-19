import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import glyphData from "./glyphs.json";
import captions from "../data/lyrics.json";
import fullCaptions from "../data/full-lyrics.json";
import { D, clamp } from "./palette";
import { DreamDefs, Star } from "./DreamArt";
const glyphs: Record<string, { d: string; advance: number }> = glyphData;

export const GlyphLine = ({
  text,
  x,
  y,
  size = 110,
  start = 0,
  delay = 3,
  title = false,
}: {
  text: string;
  x: number;
  y: number;
  size?: number;
  start?: number;
  delay?: number;
  title?: boolean;
}) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    letters = Array.from(text),
    step = size * (title ? 1.12 : 1.08),
    width = step * letters.length;
  return (
    <g aria-label={text}>
      {letters.map((char, i) => {
        const age = f - start - i * delay;
        if (age < 0) return null;
        const p = spring({
            frame: age,
            fps,
            config: { damping: 10, stiffness: 190, mass: 0.7 },
          }),
          s = 0.35 + p * 0.65;
        const left = x - width / 2 + i * step,
          yy =
            y +
            (1 - p) * (title ? 86 : 48) +
            Math.sin((f / fps) * 1.4 + i) * 1.4;
        const decorated =
          title || ["信", "诗", "童", "话", "奇", "迹"].includes(char);
        return (
          <g
            key={`${char}-${i}`}
            data-letter={char}
            data-enter-frame={start + i * delay}
            transform={`translate(${left + size * 0.5} ${yy + size * 0.5}) rotate(${(1 - p) * [-12, 10, -7, 12][i % 4] + (title ? [-5, 3, -3, 5][i % 4] : 0)}) scale(${s}) translate(${-size * 0.5} ${-size * 0.5})`}
            opacity={clamp(age / 2)}
          >
            <g
              transform={`scale(${size / 1000})`}
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path
                d={glyphs[char].d}
                fill="#4d3b8f"
                stroke="#252755"
                strokeWidth={title ? 75 : 60}
                transform="translate(14 55)"
              />
              <path
                d={glyphs[char].d}
                fill={decorated ? "url(#d-type)" : "url(#d-type-blue)"}
                stroke="#fff1d2"
                strokeWidth={title ? 38 : 26}
                paintOrder="stroke fill"
              />
              <path
                d={glyphs[char].d}
                fill="none"
                stroke={decorated ? "#e8a9a0" : "#6494c7"}
                strokeWidth="4"
              />
            </g>
            {decorated && (
              <>
                <Star
                  x={size * 0.89}
                  y={size * 0.14}
                  r={size * (title ? 0.073 : 0.045)}
                  rotate={20}
                  color={D.cream}
                />
                <circle
                  cx={size * 0.1}
                  cy={size * 0.85}
                  r={size * 0.017}
                  fill={D.mint}
                />
                {title && (
                  <path
                    d={`M${size * 0.04} ${size * 0.55}q${-size * 0.15} ${-size * 0.06} ${-size * 0.08} ${-size * 0.18}`}
                    fill="none"
                    stroke={D.gold}
                    strokeWidth="1.8"
                  />
                )}
              </>
            )}
            {age < 13 && (
              <g opacity={1 - age / 13}>
                <Star
                  x={size * 0.8 + (age / 13) * 25}
                  y={size * 0.1 - (age / 13) * 25}
                  r={size * 0.055}
                  rotate={age * 6}
                />
                <circle cx={-age * 2} cy={size * 0.5} r="2.5" fill={D.pink} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const DreamLyrics = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    ms = (f / fps) * 1000;
  const cue = captions.find((c) => ms >= c.startMs && ms < c.endMs);
  if (!cue) return null;
  const start = Math.ceil((cue.startMs / 1000) * fps),
    first = cue === captions[0];
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <DreamDefs />
      {first ? (
        <>
          <GlyphLine
            text="你是信的开头"
            x={521}
            y={345}
            size={112}
            start={start}
            delay={3}
          />
          <GlyphLine
            text="诗的内容"
            x={530}
            y={505}
            size={120}
            start={start + 21}
            delay={3}
          />
          <path
            d="M249 663Q460 632 730 661"
            stroke={D.gold}
            strokeWidth="2"
            fill="none"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - clamp((f - start - 20) / 22)}
          />
          <Star x={753} y={660} r={9} />
        </>
      ) : (
        <>
          <GlyphLine
            text={cue.text}
            x={960}
            y={155}
            size={cue === captions[1] ? 128 : 112}
            start={start}
            delay={3}
          />
          <path
            d={
              cue === captions[1]
                ? "M677 320Q960 289 1243 320"
                : "M465 320Q960 289 1455 320"
            }
            stroke={D.gold}
            strokeWidth="2"
            fill="none"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - clamp((f - start - 8) / 26)}
          />
        </>
      )}
    </svg>
  );
};

type FullCaption = (typeof fullCaptions)[number];

const accentColor: Record<FullCaption["accent"], string> = {
  pink: D.pink,
  mint: D.mint,
  gold: D.gold,
  coral: D.coral,
  violet: D.lilac,
};

const lineParts = (text: string, layout: FullCaption["layout"]) => {
  if (layout !== "split" || text.length < 8) return [text];
  const pivot = Math.ceil(text.length / 2);
  return [text.slice(0, pivot), text.slice(pivot)];
};

const FullGlyphLine = ({
  text,
  x,
  y,
  size,
  start,
  delay,
  keywords,
  accent,
  style,
}: {
  text: string;
  x: number;
  y: number;
  size: number;
  start: number;
  delay: number;
  keywords: string[];
  accent: FullCaption["accent"];
  style: FullCaption["style"];
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = Array.from(text);
  const step = size * (letters.length > 11 ? 0.84 : 0.96);
  const width = step * letters.length;
  const keywordChars = new Set(keywords.flatMap((word) => Array.from(word)));
  const color = accentColor[accent];
  return (
    <g aria-label={text} data-cue-text={text}>
      {letters.map((char, i) => {
        const age = f - start - i * delay;
        if (age < 0) return null;
        const p = spring({
          frame: age,
          fps,
          config:
            style === "chorus" || style === "reprise"
              ? { damping: 9, stiffness: 205, mass: 0.65 }
              : { damping: 11, stiffness: 175, mass: 0.75 },
        });
        const emphasized = keywordChars.has(char);
        const s = 0.34 + p * 0.66;
        const left = x - width / 2 + i * step;
        const yy =
          y +
          (1 - p) * (style === "chorus" ? 55 : 43) +
          Math.sin(f / fps + i) * 1.2;
        return (
          <g
            key={`${char}-${i}`}
            data-letter={char}
            data-enter-frame={start + i * delay}
            transform={`translate(${left + size * 0.5} ${yy + size * 0.5}) rotate(${(1 - p) * [-11, 8, -6, 10][i % 4]}) scale(${s}) translate(${-size * 0.5} ${-size * 0.5})`}
            opacity={clamp(age / 2)}
          >
            <g
              transform={`scale(${size / 1000})`}
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path
                d={glyphs[char].d}
                fill="#45347e"
                stroke="#252755"
                strokeWidth="62"
                transform="translate(14 55)"
              />
              <path
                d={glyphs[char].d}
                fill={emphasized ? "url(#d-type)" : "url(#d-type-blue)"}
                stroke="#fff1d2"
                strokeWidth="27"
                paintOrder="stroke fill"
              />
              <path
                d={glyphs[char].d}
                fill="none"
                stroke={emphasized ? color : "#6494c7"}
                strokeWidth="5"
              />
            </g>
            {emphasized && (
              <>
                <Star
                  x={size * 0.88}
                  y={size * 0.12}
                  r={size * 0.052}
                  color={color}
                />
                <path
                  d={`M${size * 0.08} ${size * 0.9}q${size * 0.18} ${size * 0.12} ${size * 0.34} 0`}
                  fill="none"
                  stroke={color}
                  strokeWidth="2.2"
                />
              </>
            )}
            {age < 13 && (
              <g opacity={1 - age / 13}>
                <Star
                  x={size * 0.8 + (age / 13) * 24}
                  y={size * 0.1 - (age / 13) * 25}
                  r={size * 0.05}
                  color={color}
                />
                <circle cx={-age * 2} cy={size * 0.5} r="2.5" fill={color} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const DreamLyricsFull = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (f / fps) * 1000;
  const active = fullCaptions.filter(
    (cue) => ms >= cue.startMs && ms < cue.endMs,
  );
  const cue = active[active.length - 1];
  if (!cue) return null;
  const start = Math.ceil((cue.startMs / 1000) * fps);
  const specialFirst = cue.id === "lyric-01";
  const parts = specialFirst
    ? ["你是信的开头", "诗的内容"]
    : lineParts(cue.text, cue.layout);
  // Keep the painted glyph and its dark extrusion inside the title-safe area.
  // The custom glyph paths are wider than their nominal advance, so the
  // previous 485/1435 anchors could clip the first/last character on long
  // left/right cues. These anchors leave a consistent 60px breathing margin
  // while preserving the asymmetric composition.
  const x = cue.layout === "left" ? 560 : cue.layout === "right" ? 1360 : 960;
  const size = cue.style === "chorus" || cue.style === "reprise" ? 108 : 98;
  const delay = Math.max(
    2,
    Math.min(4, Math.floor(34 / Math.max(1, cue.text.length))),
  );
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <DreamDefs />
      <g data-cue-id={cue.id} data-cue-start-frame={start}>
        {parts.map((part, i) => (
          <FullGlyphLine
            key={`${cue.id}-${i}`}
            text={part}
            x={specialFirst ? (i === 0 ? 521 : 530) : x}
            y={specialFirst ? (i === 0 ? 345 : 505) : 150 + i * 142}
            size={specialFirst ? (i === 0 ? 112 : 120) : size}
            start={start + (specialFirst && i === 1 ? 21 : i * 5)}
            delay={delay}
            keywords={cue.keywords}
            accent={cue.accent}
            style={cue.style}
          />
        ))}
        <path
          d={
            specialFirst
              ? "M249 663Q460 632 730 661"
              : `M${x - 310} ${parts.length > 1 ? 445 : 320}Q${x} ${parts.length > 1 ? 414 : 289} ${x + 310} ${parts.length > 1 ? 445 : 320}`
          }
          stroke={accentColor[cue.accent]}
          strokeWidth="2"
          fill="none"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - clamp((f - start - 8) / 24)}
        />
      </g>
    </svg>
  );
};
