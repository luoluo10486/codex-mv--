# Act B Revision 02

## Scope

Updated `lyric-17` through `lyric-32` in the root repository. Source changes are limited to `src/dream/remake/ActB.tsx` and `src/dream/remake/ActBArt.tsx`. This handoff is the only added document. No commits were created.

## Changes

- All 16 scenes use bright, low saturation local colors. Large dark mountain, ground, town and contract fills now use pale pink, cream, apricot and rose.
- `BPerson` delegates to `StoryPerson` with `s * 0.61`, `girl={red}`, and retained `back` and `turn`. Original scene anchors are preserved. The world-heart couple also uses this wrapper.
- `lyric-17`: pale blue `b-water` gradient (`#e8f5f7`, `#d6edf2`, `#bcdde8`), pink mountains and banks, pink flowers and soft green leaves.
- `lyric-18` to `lyric-20`: pale marker/map and divided/sewn landscapes; rose route/thread accents remain visible against the lighter panels.
- `lyric-21`, `lyric-23`, `lyric-25`, `lyric-26`, `lyric-29`: pink-white/pale-yellow star field via `b-starry`, with muted rose and pale gold micro stars.
- `lyric-22`, `lyric-24`, `lyric-29`, `lyric-31`: soft pink cloth, peach skin and pale gold contract material. Small ring contours retain enough color to identify the exchange.
- `lyric-27`, `lyric-28`, `lyric-30`: pink petals, soft green stems/leaves, pale garden and seasonal window fills; glass retains a pale rose edge.
- `lyric-31`, `lyric-32`: lighter mountains/road/sky, retained hands-to-wide and sunrise journey actions. Hand links in the garden and walking compositions align with the new character hand positions.
- Local `b-gold` softens large gold memory frames and heart without altering shared definitions.

## Actual Checks

- Read `docs/MV_REVISION_02.md` and the actual `StoryCharacters.tsx` implementation.
- `npm.cmd run lint`: exit 0 after final source edits (ESLint and TypeScript).
- `git diff --check -- src/dream/remake/ActB.tsx src/dream/remake/ActBArt.tsx`: exit 0.
- Static scan: no local B hex color has all RGB channels below 180; no `WarmCouple` or local legacy figure paths remain in B sources.
- `node scripts/render-remake-scenes.mjs agent-b src/dream/remake/entry-b.tsx D:/develop/github-repositity/codex-mv/film/out/remake-v2/agent-b`: exit 0; all 16 fresh main frames and contact sheet generated.
- Inspected final `contact-sheet.jpg` with `view_image`, plus separate `lyric-17.png` and `lyric-31.png` views. Pale blue river, reference-based girl/boy, pink mountains, light star fields, pink flowers/green leaves and held hands are visible. No blank scene or missing character observed.

Evidence: `D:/develop/github-repositity/codex-mv/film/out/remake-v2/agent-b/frame-manifest.json` and `contact-sheet.jpg`.

No full film render was performed. Integrated captions, all-frame animation and final export validation remain root-stage checks. B source is frozen for root review and grouped commit.
