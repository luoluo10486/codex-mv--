import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

loadFont({
  family: "LetterKaiti",
  url: staticFile("fonts/STKaiti.ttf"),
  weight: "400",
});
loadFont({
  family: "LetterFangSong",
  url: staticFile("fonts/FangSong.ttf"),
  weight: "400",
});
