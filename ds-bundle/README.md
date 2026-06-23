# CLAFT — Craft Design System (tokens + styling)

CLAFT is a Japanese online school. Its visual language is **クラフト / craft**: a
kraft-paper desk with sheets of paper taped, stickered, and hand-drawn onto it.
Everything reads as physical paper — uneven hand-cut corners, masking tape,
fluorescent marker, slightly-off-register printing. Keep designs warm, tactile,
and playful; keep Japanese text discipline (balanced heading wraps, `palt`).

This is a **tokens + styling** import. There are no React components here — you
compose your own markup and style it with these CSS variables and classes. In
the source app these same tokens are also exposed through Tailwind, but the
portable contract is the CSS below.

## Setup

Load **`styles.css`** — it `@import`s the fonts, tokens, and craft vocabulary
(its full `@import` closure is everything you can use). Then:

- The page background is the **desk**: `body` already gets `background: var(--desk)` +
  the paper grain texture and `font-family: var(--font-zen)`. Build _on_ that desk.
- Put content on **paper**, not directly on the desk — wrap blocks in `.craft-paper`
  (a stuck-down sheet) so they sit on a `--paper` surface with a contact shadow.
- To reproduce the app's "single sheet" type sizing, wrap your main column in
  `.craft-canvas` (it's a query container, so the `cqi`-based type scale measures
  the column, not the viewport). The app's real column is ~480px wide.

## The styling idiom

Three layers, all plain CSS — **no utility framework is required at render time**:

1. **Design tokens** — `var(--*)` custom properties for every color, surface,
   shadow, texture, radius, and type size. Always reach for a token before a raw value.
2. **Type & button utilities** — a small set of semantic classes (`heading-lg`,
   `body-base`, `.btn`).
3. **Craft component classes** — the `craft-*` family that carries the paper look.

### Tokens (use via `var(--name)`)

**Brand colors** (brand teal is immutable — never restyle it):
`--brand` `#34c6be`, `--brand-deep`, `--pink`, `--cream`, `--green`, `--violet`.
Each also has an RGB-triplet twin for alpha, e.g. `rgb(var(--brand-rgb) / 0.12)`
(`--brand-rgb`, `--pink-rgb`, `--cream-rgb`, `--green-rgb`, `--violet-rgb`).

**Ink (text) ramp:** `--ink-900` `--ink-800` `--ink-700` `--ink-600` `--ink-500`
(900 = headings, 700 = body, 500 = muted). Triplets `--ink-900-rgb` … `--ink-500-rgb`.

**Surfaces:** `--desk` / `--desk-deep` (the work surface), `--paper` / `--paper-warm`
(sheets), `--paper-edge` (1px paper border), `--paper-line` (notebook ruling), `--card`.

**Shadows:** `--shadow-paper` (resting sheet), `--shadow-paper-lift` (hover/raised),
`--shadow-sticker` (sticker), `--shadow` (legacy soft).

**Texture:** `--tex-grain` (paper fibre — set as `background-image`), `--tex-dots`
(cutting-mat dots). **Radius:** `--radius`, `--radius-lg`, and `--radius-paper`
(the deliberately-uneven hand-cut corner — use it for paper pieces).

**Type scale** (clamped, container-relative): `--text-xs` → `--text-6xl`.
**Leading:** `--leading-tight|snug|normal|relaxed|loose`.
**Weights:** `--font-medium` 500, `--font-bold` 700, `--font-extrabold` 800, `--font-black` 900.

**Fonts:** `--font-zen` (Zen Maru Gothic — rounded gothic, default body/UI) and
`--font-noto` (Noto Sans JP — for longer text).

### Type & button utilities

- Headings: `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`.
- Body: `body-xl`, `body-lg`, `body-base`, `body-sm`; plus `lead`, `subtitle`,
  `emphasis`.
- Buttons: `.btn` + `.btn-primary` (brand fill) or `.btn-ghost` (white). For the
  headline call-to-action prefer the craft pill `.craft-sticker` below.
- `.reveal` → add `.in` when it enters the viewport for a fade-up.

### Craft component classes (the paper look)

- **`.craft-paper`** — a sheet: grain, uneven corners, contact shadow. Modifiers
  `--white`, `--warm`, `--ruled` (notebook lines). This is the default container.
- **`.craft-tape`** — a strip of masking tape (position it over a paper edge).
  Colors `--pink` `--cream` `--green` `--violet`; corners `--tl` `--tr`.
- **`.craft-sticker`** — the pill button/CTA (white border, contact shadow, lifts
  on hover). Variants `--ghost` `--cream` `--pink` `--line` (LINE green).
- **`.craft-label`** — a punched paper shipping tag.
- **`.craft-photo`** — a polaroid frame (white border, wider bottom).
- **`.craft-highlight`** (+ `--brand`) — fluorescent marker behind text.
- **`.craft-misprint`** (+ `--cream`) — off-register two-color heading shadow.
- **`.craft-title`** / `.craft-title-eyebrow` / `.craft-title-h` / `.craft-title-line` —
  centered section heading (eyebrow + big title + an underline SVG you supply).
- Motion/posture: **`.craft-tilt`** (rotate by `--rot`), **`.craft-lift`** (hover
  lift + straighten), **`.craft-float`** (+ `--slow`) gentle drift.

Tip: give paper pieces a small `style="--rot:-2deg"` and `.craft-tilt .craft-lift`
so they look hand-placed and straighten when hovered.

## A minimal on-brand block

```html
<section class="craft-canvas" style="padding:24px">
  <div class="craft-title">
    <span class="craft-label craft-title-eyebrow">CLAFTの学び</span>
    <h2 class="craft-title-h craft-misprint">自分の手で創る</h2>
  </div>

  <article class="craft-paper craft-tilt craft-lift" style="--rot:-1.5deg; padding:28px; margin-top:28px">
    <span class="craft-tape craft-tape--cream"></span>
    <h3 class="heading-md">探究 × 対話 × 実践</h3>
    <p class="body-base">毎月のテーマで、<span class="craft-highlight">手を動かしながら</span>
       自分の軸をつくる。</p>
    <a class="craft-sticker" href="#">はじめる</a>
  </article>
</section>
```

## Where the truth lives

Read these before styling: **`styles.css`** (entry), **`tokens/tokens.css`**
(tokens + type/button utilities), **`tokens/craft.css`** (the `craft-*` vocabulary),
**`fonts/fonts.css`** (font wiring). The tokens file is the single source for any
value — never hard-code a brand color or shadow that a `var(--*)` already names.
