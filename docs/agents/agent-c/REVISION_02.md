# Agent C Revision 02

## Scope

Modified only `src/dream/remake/ActC.tsx`, `ActCArt.tsx`, and this handoff. Working directory: `D:/develop/github-repositity/codex-mv/film`. Changes remain uncommitted for root review.

All 14 scene IDs, storyboard frame lengths and main spatial anchors remain unchanged. No audio, caption, timeline, shared art, shared character, script or global progress file was edited by C.

## Changes

- `Room`, reused by the opening and lyric-33/34: milk-white walls `#fffaf4`, pale pink curtains `#f8dfe8`, pale apricot floor `#f1d3b5`, pink rug and twilight window. Hearth and desk use restrained pale detail colors.
- lyric-35: snowy ridges now pink/white; foreground uses soft green and white. The shelter and walking animations remain.
- lyric-36/37: pale pink embracing cloth, milk-white paper, soft gold halo; action timing and original positions remain.
- lyric-38: pink spring flowers, soft green summer canopy, low-saturation pink/gold autumn, white winter branches.
- lyric-39: hand-closeup sleeves match the shared green clothing and hands match shared skin color. Pullback, ring detail, clasp and below-title crop remain.
- lyric-40: pale pink sky and mountains, soft green foreground, white road. Final rise and final star retain the letter transformation on a bright pink background.
- bridge-santa-route/worlds and bridge-map-fold/return: original route, worlds, gift and folding actions remain; local route/map/landscape colors are pale pink, milk white, soft gold and green. Shared WarmArt supplies the revised sky, moon and props.

## Shared Characters

`Person` delegates to `StoryPerson` from `../StoryCharacters`. `second=false` maps to the girl with `girl=true` and `face=1`; `second=true` maps to the boy with `girl=false` and `face=-1`. Existing x/y, lean, walk, arm and outer Couple scale anchors remain.

The connecting curve in `Couple` uses actual shared hand coordinates `(±70, 30 - arm * 95)`. Its endpoints include the existing mirrored lean rotation and walking vertical offset, keeping the curve attached during approach, embrace and walking.

## Lyric-39 Safety

- The crop remains x=0, y=270, width=1920, height=810; global lyric area y=70..240 stays free of the hand/character group.
- Camera scale remains 3.5 to 1.16 and vertical anchor remains `650 + wide * 75`.
- Full characters appear only over eased `wide=.67..87`. At reveal start, a conservative local head bound of y=-216 gives screen y=282.89, below the safe crop edge. As the camera pulls back, that bound moves downward.
- New local frame samples 0, 59 and 91 were rendered after the reveal adjustment. They cover the hand-only start, mid-pullback hands and final full-body composition.

## Checks

- `npm.cmd run lint`: passed; eslint and TypeScript run together. Final pass after the last source edit is recorded in the task tool output.
- `git diff --check` on both C TSX files: passed.
- TypeScript AST check confirmed the 14 scene registry ID/component mappings match the pre-revision version.
- Shared role mapping and conservative lyric-39 head safety calculation passed.
- New revision samples, not reused from the previous delivery: `out/remake-v2/agent-c/revision-02-samples.json` and eight PNGs for lyric-33 f50, lyric-36 f67, lyric-38 f46, lyric-39 f0/f59/f91, lyric-40 f46 and bridge-final-star f50. Final lyric-39 samples were refreshed after its safety adjustment.
- `out/remake-v2/agent-c/revision-02-contact.jpg` was visually inspected. Root should regenerate the full 48-scene review and inspect integration with subtitles. This owner did not render a full video, run full export verification or commit changes.
