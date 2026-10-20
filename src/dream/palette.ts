import { Easing, interpolate } from "remotion";
export const D = {
  ink: "#4d3030",
  navy: "#e9c5d2",
  indigo: "#e4bfcc",
  blue: "#d6edf2",
  cyan: "#dceef0",
  teal: "#bfdad5",
  mint: "#d7e5c9",
  pink: "#f5d5e1",
  coral: "#efbcb4",
  red: "#d58298",
  lilac: "#eddae4",
  purple: "#dbbbc9",
  gold: "#e6c68b",
  cream: "#fff7df",
  white: "#fffdf8",
  paper: "#fffaf4",
  apricot: "#f4ddc5",
  plum: "#d7acbc",
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
