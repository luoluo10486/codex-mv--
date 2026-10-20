import { Easing, interpolate } from "remotion";
export const D = {
  ink: "#4d3030",
  navy: "#6f3f48",
  indigo: "#8c4f5a",
  blue: "#d98c72",
  cyan: "#f1b27e",
  teal: "#d6856f",
  mint: "#f5c58c",
  pink: "#ef8b78",
  coral: "#f28f7a",
  red: "#c94e5b",
  lilac: "#bd7180",
  purple: "#8c4f5a",
  gold: "#ddaA58",
  cream: "#fff1dc",
  white: "#fffaf0",
  paper: "#fff1dc",
  apricot: "#f6c28b",
  plum: "#8c4f5a",
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
