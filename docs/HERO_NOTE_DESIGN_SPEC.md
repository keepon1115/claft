# TOPヒーロー デザイン改修指示書 — 案B「ノートのページ」

作成: 2026-07-10（設計: Fable ／ 実装担当: Sonnet）
対象: `components/Hero.tsx`・`app/globals.css` の hp-hero レイヤーのみ。**他ファイルには触れない。**

## 0. 背景とコンセプト

現ヒーローはオーナーから「うるさい・がたがた」の評価。原因は
①紙片4枚が別角度で縦積み ②テープ5・浮遊ドゥードル4・端の紙きれ2・網点背景が同時に存在
③「人生に出る。」のクリーム色text-shadowが滲みに見える、の3点。

採用された方向は**「ノートのページ」**：紙片・テープを全廃し、クラフト紙の地に薄い横罫
（ノートの罫線）を敷いて、**文字を直接インクで書く**。階層はタイポグラフィのジャンプ率だけで
つくり、手の温度は「赤鉛筆の下線（描画アニメ）」と「scroll誘導の手描き矢印」の2点のみに集約する。

**文言は現在の Hero.tsx にある通りが最終稿（オーナー自身が調整済み）。一字も変えないこと。**

## 1. Hero.tsx の変更

### 1-1. 装飾ブロックを全削除
- 冒頭の `{/* 机に散らばる道具（装飾） */}` の `<div aria-hidden="true">` ブロックごと削除
  （SparkleDoodle×2・CrossDoodle・SquiggleDoodle・`.hp-scrap`×2 すべて）。
- import から `CrossDoodle` / `SparkleDoodle` / `SquiggleDoodle` を除去。
  **`ArrowDownDoodle`（scroll誘導）と `Underline`（赤鉛筆下線）は残す。**

### 1-2. ① 荷札 → インクのキッカーに
```tsx
{/* ① キッカー：地に直接書く小さな前置き */}
<p className="hp-hero-kicker">テストには、出ないけれど。</p>
```
- `craft-label`・`hp-hero-eyebrow--parent` は使わない（紙をやめるため）。

### 1-3. ② H1 → 紙片・テープなしの2行タイポ
```tsx
<h1 className="hp-hero-title">
  <span className="hp-hero-title-sub">テストに出ないことほど、</span>
  <span className="hp-hero-title-main">
    人生に出る。
    <Underline variant={2} className="hp-hero-title-underline craft-draw craft-draw--auto" />
  </span>
</h1>
```
- `craft-tape` 2つと `.hp-hero-line` 系の紙スタイルは廃止。

### 1-4. ④ 動画ポラロイド
- `craft-photo` は維持（白フチ＋影で「貼った写真」感は残る）。
- 内側の `craft-tape` 2つを削除し、回転もやめる（CSS側 1-9 参照）。

### 1-5. その他
- ③ hp-hero-answer・⑤ hp-hero-copy・⑥ チップ・⑦ CtaPair・⑧ hope-link・scroll誘導は
  **構造・文言とも変更なし**（CtaPair は直近でオーナーがLINE一本に編集済み。触れない）。
- コメント（①〜⑧）は新構造に合わせて文面だけ整える。

## 2. globals.css（hp-hero レイヤー）の変更

`hp-scrap` / `hp-doodle` / `hp-hero-line` 系は **Hero.tsx と globals.css 以外に参照なし**
（grep確認済み）なので、安心して削除・改名してよい。

### 2-1. セクション背景をノートの罫線に
```css
.hp-hero {
  position: relative;
  padding: 64px 20px 72px;
  /* 大学ノートの薄い横罫。線色はブランドの10%で、文字と喧嘩しない薄さを最優先 */
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 35px,
    rgb(var(--brand-rgb) / 0.10) 35px,
    rgb(var(--brand-rgb) / 0.10) 36px
  );
}
```
- 既存の `--tex-dots`（網点）指定と `background-size/position` は削除。
- `.hp-hero::before`（ラジアルグラデ2つ）は**ブロックごと削除**。

### 2-2. 削除するクラス
`.hp-doodle` / `.hp-scrap`（および同ブロックの関連宣言）/
`.hp-hero-line` / `.hp-hero-line--1` / `.hp-hero-line--2` / `.hp-hero-line-text` /
`.hp-hero-line-underline` / `.hp-hero-eyebrow` / `.hp-hero-eyebrow--parent`

### 2-3. 新規クラス
```css
/* インクで書いた小さな前置き */
.hp-hero-kicker {
  margin-bottom: 14px;
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  letter-spacing: 0.08em;
  color: var(--ink-500);
}

.hp-hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 24px;
  line-height: 1.2;
}

/* 前フリ（小）：黒インク */
.hp-hero-title-sub {
  font-size: clamp(1.3rem, 6.4cqi, 1.75rem);
  font-weight: var(--font-bold);
  color: var(--ink-800);
}

/* オチ（特大）：ブランド色。影・縁取りは一切つけない */
.hp-hero-title-main {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6px;
  font-size: clamp(2.5rem, 13.5cqi, 3.4rem);
  font-weight: var(--font-black);
  color: var(--brand-deep);
}

/* 赤鉛筆の下線（唯一の装飾） */
.hp-hero-title-underline {
  width: 92%;
  margin-top: 4px;
  color: var(--pink);
}
```

### 2-4. 既存クラスの調整
- `.hp-hero-answer` … `font-size: var(--text-base)` に上げ、`margin: 0 0 34px` に。
  （紙の枠が消えた分、受けの一文を読み物として立たせる）
- `.hp-hero-photo` … `transform: rotate(-1.1deg)` を削除（回転なし）。
- `.hp-hero-copy`・`.hp-hero-chips`・`.hp-hero-chip`・`.hp-hero-cta`・`.hp-hero-hope-link`・
  `.hp-hero-scroll` … 変更なし。

## 3. デザイン原則（迷ったらこちらに従う）

1. **回転している要素をゼロにする。** 「がたがた」の根絶が最優先。
2. **手の温度は2点だけ**：赤鉛筆下線（craft-draw--autoの描画アニメ）と scroll の手描き矢印。
   これ以外の手描き装飾・テープ・紙片を追加しない。
3. 罫線は「あるかないか分からない」くらい薄く。実機で文字と干渉して見えたら
   透明度を 0.10 → 0.07 に下げる方向で調整（濃くしない）。
4. text-shadow・縁取り・グラデは使わない。色はインク（ink系）とブランド2色（brand-deep / pink）のみ。

## 4. 検収チェックリスト

- [ ] ヒーロー内に紙片0枚・テープ0個・浮遊ドゥードル0個（scroll矢印のみ可）
- [ ] 回転（rotate）している要素が0
- [ ] text-shadow が0
- [ ] 「テストに出ないことほど、」が390px幅で1行に収まる（折り返し禁止）
- [ ] 「人生に出る。」の赤鉛筆下線が描画アニメで引かれる
- [ ] 文言が1文字も変わっていない（git diff で Hero.tsx のテキストノード確認）
- [ ] `npm run build` 通過
- [ ] 390px / 1280px でスクリーンショット確認
  - devサーバーは `npm run dev`（**port 3002**）。古いプロセスが残って `.next` キャッシュ破損
    （`Cannot find module './xxxx.js'`）を起こすことがあるので、様子がおかしければ
    `netstat -ano | grep 3002` でPIDを特定してkill→再起動。
  - この環境にPythonはない。Playwrightは `npx playwright` ＋ Node ESMスクリプトで
    （前例: scratchpad の hero_check.mjs）。
