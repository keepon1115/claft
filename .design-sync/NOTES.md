# design-sync notes — CLAFT

## What this repo is
`claft-web` is a **Next.js 14 website**, not a component-library package. There is
no Storybook and no standalone `dist/` of components. `components/` holds mostly
page-level client components tied to the Next.js app router / `next/image` /
`'use client'`, so they don't bundle as isolated design-system parts.

## Scope decision (owner)
Synced as **tokens + styling only**. We do NOT ship React components. We ship the
Craft design tokens, the type/button utilities, and the `craft-*` component-class
vocabulary, plus the two Google fonts — so the Claude Design agent stays on-brand
and composes its own markup.

## How the bundle was produced (off-script)
The converter (`package-build.mjs`) targets component packages, so it does not
apply here. The `ds-bundle/` layout was hand-authored from `app/globals.css`,
extracting only the reusable, page-agnostic layers:
- `:root` tokens (globals.css ~L9–98) → `tokens/tokens.css`
- base + type/button utilities (~L119–246) → `tokens/tokens.css`
- the CRAFT SYSTEM layer (~L1368–1652) + shared keyframes (~L1045–1102) → `tokens/craft.css`
- fonts (Zen Maru Gothic + Noto Sans JP, bound in `app/layout.tsx` via next/font)
  → `fonts/fonts.css` (loaded here directly from Google Fonts)

**Excluded** (page-specific, not design vocabulary): site-grid/header/footer/nav,
`game-exhibition-page`, and the `hp-*`/`es-*`/`nd-*`/`cs-*`/`ab-*`/`sc-*` page layers.

### Adaptations
- `.btn`/`.btn-primary`/`.btn-ghost` used Tailwind `@apply`; expanded to plain CSS
  so they render without Tailwind.
- Added `.craft-canvas` (a query container) so the `cqi`-based type scale measures
  the content column, matching the app's ~480px "single sheet" sizing.
- `--font-zen` / `--font-noto` are bound via next/font in the app; here they are
  defined directly and the fonts loaded via a Google Fonts `@import`.

## No `_ds_sync.json`
Omitted on purpose. There are no components to anchor/re-verify; the next sync
re-derives from the repo. This is the documented off-script choice, not an error.

## Re-running
On re-sync, if `app/globals.css` token/craft layers change, regenerate the four
files in `ds-bundle/` from the same source ranges and re-upload. `projectId` is
pinned in `config.json` → re-sync takes the atomic path into the same CLAFT project.
Re-validate `conventions.md` names against the rebuilt CSS; do not rewrite it.

## Project
- Name: **CLAFT**  ·  id `047ba1d2-411c-4385-b9ec-5290f53b41ba`
- URL: https://claude.ai/design/p/047ba1d2-411c-4385-b9ec-5290f53b41ba
