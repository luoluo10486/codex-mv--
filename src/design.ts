import { Easing, interpolate } from "remotion";
import timeline from "./data/timeline.json";

export const C = {
  paper: "#f6f0e5",
  cream: "#fffaf0",
  ink: "#515254",
  muted: "#96908a",
  pink: "#d995a8",
  blush: "#edc9cd",
  rose: "#bf718e",
  blue: "#a3cbd5",
  sky: "#d9e8e8",
  teal: "#739c9b",
  sage: "#a9b69b",
  leaf: "#899c85",
  violet: "#aca0b7",
  gold: "#bd9b66",
  light: "#e9dfce",
};
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (n: number) => Easing.bezier(0.22, 0.8, 0.25, 1)(clamp(n));
export const range = (n: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(n, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 0.8, 0.25, 1),
  });
export const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
export const FONT = "LetterKaiti";
export const SERIF = "LetterFangSong";

export const shots = timeline;
