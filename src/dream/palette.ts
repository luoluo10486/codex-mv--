import { Easing, interpolate } from "remotion";
export const D = {
  ink: "#272657",
  navy: "#151d50",
  indigo: "#3449a5",
  blue: "#4c8cff",
  cyan: "#34d9dd",
  teal: "#128eaa",
  mint: "#9cf6cf",
  pink: "#ff70a8",
  coral: "#ff8a8c",
  red: "#ed477d",
  lilac: "#bc92ff",
  purple: "#7946c0",
  gold: "#ffd38a",
  cream: "#fff2cc",
  white: "#fff8ed",
};
export const rnd = (i: number) => {
  const n = Math.sin(i * 127.1 + 291.7) * 43758.5453;
  return n - Math.floor(n);
};
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (n: number) =>
  Easing.bezier(0.22, 0.76, 0.25, 1)(clamp(n));
export const mix = (n: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(n, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 0.76, 0.25, 1),
  });
