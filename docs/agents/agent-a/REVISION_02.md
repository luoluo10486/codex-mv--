# Act A Revision 02

Implemented in the root repository. Changed only `src/dream/remake/ActA.tsx`, `src/dream/remake/ActAArt.tsx`, and this handoff. No commits or full-film renders were started by agent A.

## Scenes Changed

All `lyric-01` through `lyric-16` use the revised bright pastel direction. Act A now defines a cream/peach/pink daylight background and a bright pink evening background. Local buildings, books, mountains, cloth, road, fireplace, and miniature worlds use lighter low-saturation fills. Sprigs and pines introduce soft green, while gifts and Santa retain recognizable muted rose accents. Dark facial details remain localized.

The `Person` wrapper now delegates to `../StoryCharacters`'s `StoryPerson`: `variant === 0` selects the girl, `variant === 1` selects the boy; `walk` and `face` are forwarded. The scale factor `155 / 180` preserves the former foot anchor and approximates the old overall proportion. The supplied face, glasses, ponytail, and body implementation remain owned by the shared component. Ring-exchange and hand-closeup sleeves match its two mint clothing colors.

## One Ladle Of Water

`lyric-08` now includes a continuous pale-blue river, pink/cream reflections, peach/pink banks, green riverside plants, a wooden ladle, contact ripples, a visible water fill, the existing miniature world inside the bowl, and three falling drops. All animation uses local frame progress.

The shot lasts 60 frames, globally 1257..1316. Key action locations:

| Local Frames | Global Frames | Action |
| --- | --- | --- |
| 0..20 | 1257..1277 | Bowl descends from y=500 to y=760 and rotates toward the river. |
| 17..30 | 1274..1287 | Water fills the bowl and reveals the miniature world; river contact ripples expand. |
| 25..50 | 1282..1307 | Filled ladle rises from the river toward y=460. |
| 34..55 | 1291..1312 | Three staggered drops fall from the lifted rim toward the river. |
| 50..59 | 1307..1316 | Lifted bowl holds the contained world above the pale-blue water. |

Suggested independent review frames: local 0, 20, 36, and 50; inspect 09/10/12/16 for the shared characters at different distances and 13/15 for sleeve continuity.

## Checks And Limits

`npm.cmd run lint` passes (`eslint src && tsc`). Scoped `git diff --check` passes. No scene rendering was performed for this revision by agent A; visual correctness and the precise river/bowl contact need the root agent's fresh `out/remake-v2/` keyframe review before marking this group verified.
