import type { ComponentType } from "react";
import type { SceneProps } from "./types";
import { openingScenes } from "./Opening";
import { actAScenes } from "./ActA";
import { actBScenes } from "./ActB";
import { actCScenes } from "./ActC";

export const remakeScenes:Record<string,ComponentType<SceneProps>> = {...openingScenes,...actAScenes,...actBScenes,...actCScenes};
