# Agent C Handoff

Scope: lyric-33 through lyric-40 and six owner agent-c bridges in `src/data/remake-storyboard.json`.

Room geometry: fireplace left, arched moon window right, letter and lamp on foreground right desk, gift on hearth left. `Room` is exported from `ActCArt.tsx` for the opening scene. Couple uses coral and pottery coats, cream/apricot scarves, wine/brown hair.

All 14 scenes are implemented, rendered, visually inspected, and committed. Code commit: `d4f8a61b464af254a82c7345629b905f47b69891`.

## Integration

- Import `actCScenes` from `src/dream/remake/ActC.tsx`. It contains lyric-33 through lyric-40, bridge-santa-route, bridge-santa-worlds, bridge-map-fold, bridge-map-return, bridge-final-rise, and bridge-final-star.
- All scenes consume only `SceneProps.durationInFrames`; animation uses local `useCurrentFrame()`. There are no audio tracks or captions.
- `entry-c.tsx` registers exactly the 14 owner agent-c storyboard IDs at their original frame lengths, 1920x1080 and 30 fps.
- The quiet top band reserves the global lyric area; the hand-closeup crop begins below y=270.
- Reuse `Room` from `ActCArt.tsx` for the opening. The room's animated fire reads local current frame.

## Verified Evidence

Output directory: `D:/develop/github-repositity/codex-mv/film/out/remake/agent-c`.

- `frame-manifest.json`: all 14 initial representative frames rendered by the required shared renderer.
- `motion-samples.json`: 56 samples, four per scene (start, 30%, 62%, 95%), rendered by `node docs/agents/agent-c/render-check.mjs` against the final code. Metadata records the selected composition dimensions, fps, and frame duration.
- `motion-contact-sheet.jpg`: visually inspected animation contact sheet. The initial `contact-sheet.jpg` is retained as first-pass review evidence.
- `pixel-motion-check.json`: four different sample hashes per scene, no sampled near-black pixels, no pixels with blue > 1.12 * red in the 62% frames; mean red exceeds mean green and blue for every scene. This is a limited sample check, not a claim about every full-video frame.
- `npm run lint` passed after the final source edits; this invokes eslint and TypeScript.

Visual revisions made after actual renders: seasons changed to four distinct seasonal trees; hand clasp now pulls back to the full couple; paper map folds toward the envelope; gift worlds open into a mountain route; letter follows the gold return curve; embracing figures retain separate heads; the road uses a broad curved perspective; the contract compresses into its halo and the letter compresses into the final star.

The required shared renderer successfully rendered the 14 scene PNGs but its final contact-sheet step failed because bundled ffmpeg lacks `drawtext` and `xstack`. System.Drawing assembled the review contact sheets instead. Shared scripts were not modified. No full MP4 or browser playback was produced by this owner; final audio, subtitles, integrated rendering and playback remain root integration checks.

## Scene Recovery Commits

Delivery branch: `codex/mv-agent-c-scenes`.
Backup reference: `codex/mv-agent-c-backup-9389075` points to `93890753b0ea98ce40b7d7d5eb3787adaaa13bf7`.
Shared illustration foundation: `38ff797a2604bdcd4dcaf669cb2fa580929c1a25`.

Each scene commit adds one complete scene implementation, its registry entry and its recovery status. The entry registers only implemented scenes at intermediate checkpoints. Every checkpoint passed `npm run lint` (eslint and TypeScript).

| Scene | Recovery Commit |
| --- | --- |
| bridge-santa-route | `1a7c24c3853f8ddc7a5274b9ea3a1f3068a58798` |
| bridge-santa-worlds | `64865c9e49df7529d0b26020a051fb2fea595c28` |
| bridge-map-fold | `c993f8f2ff367067f7dc1caf69f584fc4bae9a60` |
| bridge-map-return | `db95c106d6f40be9fcd607210f2da724e322b10d` |
| lyric-33 | `ea60031a1c2690416e9636e7bad79e357efbb423` |
| lyric-34 | `bfd82cfedd83a56a6c599da7720f4dc89c0f66b1` |
| lyric-35 | `62b6fb462681a9f02ff4b1d02e1a47ee1d4b67d7` |
| lyric-36 | `c10b24a8c6c887eca0aa8e7f5c15524dcdfb91c9` |
| lyric-37 | `c5e3e5517ef7008f191c8db86e4586c3bb5bd534` |
| lyric-38 | `4950fe6b69946b41617abafc0a16c4ba3879688a` |
| lyric-39 | `9c08a111924c07dd5d6dbd43825adbd09c7dc490` |
| lyric-40 | `7baa45eb4fedf38980a3e823bc74d5d914481cab` |
| bridge-final-rise | `76157ce6e4dd9d5061116cdfb648f6083ef208b3` |
| bridge-final-star | `d4f8a61b464af254a82c7345629b905f47b69891` |

Final source equality was verified with `git diff --exit-code codex/mv-agent-c-backup-9389075 HEAD -- src/dream/remake/ActC.tsx src/dream/remake/ActCArt.tsx src/dream/remake/entry-c.tsx` (exit 0). The final scene source and illustrations are identical to the already rendered and visually inspected delivery, so its 56-frame render evidence remains applicable. No additional rendering was performed for the commit-history reconstruction. Merge state is pending root integration.
