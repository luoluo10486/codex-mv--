# Act B Handoff

Branch: `codex/mv-agent-b`

Entry: `src/dream/remake/entry-b.tsx`

Registry: `actBScenes` from `src/dream/remake/ActB.tsx`, exactly `lyric-17` through `lyric-32`. Components accept `SceneProps` with `durationInFrames`. They use scene-local Remotion frames, no audio or captions. Durations come from the frozen storyboard; output is 1920 x 1080, 30 fps.

## Owned Files

- `src/dream/remake/ActB.tsx`: 16 distinct scenes and registry.
- `src/dream/remake/ActBArt.tsx`: local filled illustration materials, hands, characters, flowers, mountains, home, stars.
- `src/dream/remake/entry-b.tsx`: isolated composition registration.
- `docs/agents/agent-b/render-evidence.mjs`: reproducible start/main/end sample renderer.
- `docs/agents/agent-b/status.json`: per-scene state and commits.

## Visual Content

17 boat through warm mountain water; 18 marker tower, folded map and compass; 19 life panels split by red thread; 20 stitching the worlds; 21 five memory frames with turning characters; 22 held hands close-up; 23 worlds converge into golden heart; 24 shared miniature home protected in hands; 25 star spreads light to town; 26 tiny ordinary person under vast stars; 27 soft cloth and flowers; 28 trembling glass drop with protective flowers; 29 close ring exchange; 30 seasonal windows around clock; 31 hands close-up pulls to full figures; 32 couple follows curving road toward sunrise.

## Checks And Evidence

- `npm run lint`: exit 0 (ESLint and TypeScript).
- `npm run build`: exit 0.
- Requested `render-remake-scenes.mjs` rendered all 16 main PNGs and manifest; original contact assembly failed because the bundled FFmpeg has no `drawtext` or `xstack` filters. No shared script was changed by this agent.
- `node docs/agents/agent-b/render-evidence.mjs`: exit 0, 48 samples at frame 0, 62 percent and last frame.
- Main output folder: `D:/develop/github-repositity/codex-mv/film/out/remake/agent-b`.
- `motion-samples.json`: 48 frame paths and exact local frame numbers.
- `contact-sheet.jpg`, `contact-sheet-start.jpg`, `contact-sheet-end.jpg`: System.Drawing assembled 4x4 sheets, ordered lyric-17 to lyric-32. All three were visually inspected using `view_image`.
- Warm cream, apricot, coral, amber, red wine throughout. No blue/teal-dominant scene, blank main frame, or cropped narrative focal subject observed. Caption band is kept quiet; integration with actual global captions remains the root task.

## Commits

Each scene has its own implementation commit, recorded in `status.json`. Follow-up `f43f1cf` corrects tower and sun caption clearance, ensures the couple follows the sunrise road and adds the hands-to-wide camera transition. `d21389d` frames the ring exchange below the caption region.

## Integration

Merge/cherry-pick this branch's commits after base `6154004`. Import `actBScenes` into the shared registry. Use only the shared production root for final audio, captions and timing. Do not register the isolated entry in the production entry. Next timeline handoff after lyric-32 is `bridge-map-fold` owned by agent-c.

Known limitation: sampling verifies scene composition and endpoint changes, not final full-length audio/video playback. Global caption fit and transitions require the root's integrated export QA. Scene status intentionally keeps `merged` false until root integration.
