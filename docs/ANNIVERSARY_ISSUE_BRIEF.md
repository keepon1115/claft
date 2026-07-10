# 指示書: CLAFT 1周年特別号（KEEPON JOURNAL）実装ブリーフ

作成: 2026-07-09（Fable）／実装担当: Sonnet
レビュー: オーナー（keepon1115）

## 0. これは何か

CLAFT 1周年振り返り動画（約40分）を、ウェブマガジン記事として `/monthly` 配下に
**特別号**として実装する案件。原稿・デザイン方向性は決定済み。この指示書だけで
実装が完結するように書いてある。

- **原稿（本文の唯一のソース）**: `docs/1周年振り返り記事_原稿.md`
  - 本文はここから一字一句を尊重して流し込む。**文言の改変・省略・追加は禁止**
    （オーナー規約: 既存文言は不可侵）。
  - 原稿内の `📷【スライド候補①〜⑩】` = スライド画像の挿入位置（計10箇所）。
  - 原稿内の `【要確認】` マークはオーナー回答待ち。**ページには【要確認】の文字を
    出さず、原稿の現状表記のまま**流し込む（回答が来たら原稿とページを両方直す）。
  - 原稿末尾の「編集メモ」セクションはページに載せない。
- **決定事項**: 特別号として/monthly配下／スライドはオーナーがCanvaから書き出して
  後日提供（それまでプレースホルダー）／文体は語りおろし（原稿の通り）／YouTube動画は
  **記事の最後**に埋め込み（URLは未定＝プレースホルダー）。

## 1. 作る・変えるファイル

| ファイル | 作業 |
|---|---|
| `app/(site)/monthly/1st-anniversary/page.tsx` | **新規**。特別号ページ本体（サーバーコンポーネント） |
| `app/(site)/monthly/page.tsx` | 変更。バックナンバー一覧の**先頭**に特別号カードを追加 |
| `app/sitemap.ts` | 変更。`STATIC_PATHS` に `'/monthly/1st-anniversary'` を1行追加 |
| `public/assets/images/journal/1st-anniversary/` | **新規ディレクトリ**（`.gitkeep` を置く）。スライド画像の置き場。命名は `slide-01.jpg` 〜 `slide-10.jpg` 想定 |

- Next.js App Router では静的ルート `1st-anniversary` が動的 `[issue]` より優先される
  ので共存できる。`lib/monthlyData.ts` の `Issue` 型（recap/news/info固定）には
  **載せない**。特別号はページ内に自前でデータを持つ。
- ナビ（`lib/nav.ts`）は触らない。導線は /monthly 一覧カードのみ。

## 2. 従う流儀（重要）

- **monthlyの誌面文法に倣う**: `MobileContainer`（max-w 480pxの縦長カラム）＋
  `Section`、インラインstyle中心、`ScrollAnimInit` + `.scroll-animate`→`.animate-in`
  のスクロールリビール。参考実装: `app/(site)/monthly/[issue]/page.tsx` と
  `components/monthly/` 一式。**まずこの2つを読むこと。**
- **`docs/RESPONSIVE_DESIGN_KNOWLEDGE.md` を必読・厳守**。特に:
  - 本文カラムに絶対配置の飾りを重ねない（飾りはカード枠・図の内部だけ）
  - 文章が乗る要素の回転は ±1deg 以内（テープ・スタンプ・写真は超えてよい）
  - 情報テキストの不透明度は最低 /70
  - vw の clamp を新規に書かない（480pxカラム内は固定pxでよい。既存monthlyと同じ）
  - `href="#"` を残さない
- **フォント・ブランド色は不可侵**: 見出しは `var(--font-zen)`（Zen Maru Gothic）、
  ブランドティール `#34c6be` は改変しない。
- 絵文字は装飾に多用しない（意味のある箇所に絞る）。

## 3. デザイン仕様（決定案A「4色でめぐる、学びの循環号」）

### 3-1. カラーシステム（章ごとのアクセント色）

ブランドの「色の家族体系」（探究=水色/対話=橙/実践=紫/自己理解=緑、親=ティール）を
誌面の骨格にする。ページ内に定数で持つ:

```ts
const C = {
  teal:    '#34c6be', // 親（表紙・第1,2,8章・共通UI）
  tealInk: '#2a9d96', // ティール文字用（白背景で読める濃さ）
  inquiry: '#4fbfd6', // 水色 — 第3章 探究/PBL
  amber:   '#e09e16', // 深アンバー — 第4章 時代背景コラム（家族外の挿話章）
  dialogue:'#f5a623', // 橙 — 第5章 対話/Yononaka
  practice:'#9b87f5', // 紫 — 第6章 実践/ミライクラフト（globals --violet と同値）
  self:    '#58c3a2', // 緑 — 第7章 自己理解/ジブンクラフト（globals --green と同値）
} as const;
```

濃い色を白文字の地に使うのは badge/テープのみ。本文文字色は `var(--ink-700)`〜`900`。

### 3-2. ページ構成（上から順に）

1. **表紙（AnniversaryCover）** — `JournalCover` は流用せず専用に書く（構造が違う）。
   - 白ベースのカードに `linear-gradient(135deg, #e0f4f3 0%, #fff 60%)`（ティール淡）。
   - カード上辺に**4色のマスキングテープ**（inquiry/dialogue/practice/self、各 rotate
     -2〜2deg、半透明 `${color}40`）を横に並べて貼る。
   - テープラベル「KEEPON JOURNAL 特別号」（通常号の「◯年◯月号」テープと同じ作り）。
   - h1: **「CLAFT、1歳になりました。」**＋手書き風下線SVG（teal）。
     下線SVGは `JournalCover.tsx` の path をそのまま流用してよい。
   - **記念スタンプ**: 円形・二重破線ボーダー・teal、中に「1st ANNIVERSARY」
     「2025.6 → 2026.7」。rotate(-8deg)。position はカード内の flex/grid で置く
     （%座標ピン留め禁止。右上に置くなら flex の行内で margin-left:auto）。
   - リード文（原稿の *（リード文・編集部の声）* の段落）。
   - バッジ行: 「読了 約10分」＋「🎬 動画は記事の最後に」（`#video` へのアンカー）。
2. **目次（4色インデックス）** — 8章のアンカーリンク一覧。各行 = 色丸＋章番号＋
   タイトル。第3/5/6/7章はそれぞれの家族色、1/2/8章はteal、4章はamber。
   `JournalToc.tsx` を参考に、専用に書く（章数と色が違うため流用不可）。
3. **区切り** — 通常号と同じ `✦ ✦ ✦`。
4. **第1〜8章** — 原稿の章立て通り。各章 `<Section id="ch1">`〜`id="ch8"`。
5. **🎬 動画セクション**（`id="video"`）— §3-4参照。
6. **バックナンバーへ戻るボタン** — `[issue]/page.tsx` 末尾と同じ作り（teal）。

### 3-3. 章内の部品（ページ内ローカルコンポーネントとして実装）

- **ChapterHead({ num, tag, title, color })**
  - マスキングテープ風ラベル（`${color}28` 地、rotate(-1deg)）に「第◯章 ◯◯」
    （tag例:「探究」「対話」）。
  - h2（fontWeight 900, `var(--font-zen)`, 22px, ink-900）＋手書き風下線SVG（color）。
- **P** — 本文段落。`fontSize:15px, lineHeight:2, color:'var(--ink-800)', margin:'0 0 16px'`。
  章をまたいで同一。**ブレークポイントで変えない。**
- **Mark({ color, children })** — 蛍光マーカー風強調。原稿の **太字** はこれで表現:
  `background: linear-gradient(transparent 62%, ${color}4d 62%)`、fontWeight 700。
  1段落に多くても1〜2箇所。
- **SlideFigure({ n, color, caption, src? })** — スライド画像のポラロイド枠。
  - 白カード（padding 10px 10px 14px、`box-shadow: 0 6px 20px rgba(0,0,0,.12)`、
    rotate は -1.5〜1.5deg の範囲で番号ごとに交互）。
  - 上辺中央に章色のテープ（`${color}59`、幅80px、rotate(-2deg)）。
  - 中身は `components/monthly/ImagePlaceholder.tsx` を利用。src 未指定なら
    「画像を差し込み（推奨 1600×900）」の点線枠が出る（既存挙動）。全スライド
    16:9（width 1600, height 900）で統一。
  - `src` は `/assets/images/journal/1st-anniversary/slide-0${n}.jpg` を渡す…のでは
    なく、**ページ先頭の `SLIDES` 配列（src: undefined で初期化）から取る**。
    画像が届いたら配列に src を書くだけで全箇所反映される形にする。
  - caption は原稿のスライド候補の説明文をそのまま使う。
- **PullQuote({ color, children })** — 大きめ引用句。章の合間に将一郎さんの決め
  フレーズを立たせる。`fontSize:19px, fontWeight:800, var(--font-zen), 色付き引用
  マーク「"」, 左ボーダー4px ${color}`。回転させない。
  使う箇所（原稿からそのまま抜粋、改変禁止）:
  - 第3章「みんな、書くよりも話す方が思っていることを言葉にしやすいんですよね。」(inquiry)
  - 第4章「『何を学んだか』よりも『学んだことで何ができるか』」(amber)
  - 第5章「違いが、間違いや場違いにならない。」(dialogue)
  - 第6章「遊ぶ人から、遊びを作る人になろう」(practice)
  - 第7章「登りたい山をイメージしたら、どういうルートで登るのか。」(self)
  - 第8章「どんな状況でも面白がれるのが人間だと僕は思うんですね。」(teal)
- **CaseCard({ color, tag, children })** — 第3章のPBL事例4つ（吃音・ソニー・卓球・
  マイクラ）を1事例=1カードに。`background:#fff, border:1.5px solid ${color}40,
  borderRadius:14px, padding:16px 18px`、左上に小さな色タグ（「事例01」〜「04」）。
  カード化するのは第3章の事例だけ。他の章は素直に段落で流す。
- **第4章だけ紙色を変える** — 時代背景のコラム章として、章全体を
  `background:#fdf6e7`（クリーム紙）のカードで包み、amberのテープに「コラム」と
  入れる。新聞の挟み込みのような挿話感を出す。
- **LoopDiagram（第8章冒頭）** — 4色の循環図。**フロー配置で作る**（%座標禁止）:
  1. flexRow（wrap, gap 6px, 中央寄せ）に 4つの色付きpillバッジ
     「探究」「対話」「実践」「自己理解」を「→」区切りで並べる。
  2. その下に全幅SVG（height 28px 程度）で、右端から左端へ戻る破線の曲線矢印（teal）。
  3. 下に小さく「ぐるぐる循環して、また次の探究へ」（ink-500, 12px, 中央）。
  これが📷スライド候補⑩（循環図）の代替を兼ねる。**ただし SlideFigure ⑩ も
  すぐ下に置く**（オーナーのスライド版が来たら並存 or 差し替えはオーナー判断）。

### 3-4. 動画セクション（記事末・id="video"）

```ts
const VIDEO_ID = 'SFguIhDWyeA'; // https://youtu.be/SFguIhDWyeA（確定済み）
```

- 見出し「🎬 40分ぜんぶ聞きたい方はこちら」＋原稿の説明文。
- `<iframe>` 埋め込み（`src="https://www.youtube.com/embed/${VIDEO_ID}"`,
  `aspectRatio:'16/9'`, width 100%, allowfullscreen, `loading="lazy"`, title
  「CLAFT 1周年振り返り動画」）。

### 3-5. アニメーション

- 全セクションに `.scroll-animate`（通常号と同じ opacity+translateY(24px) → 0.7s）。
- ページ内 `<style>` に**必ず**これを足す（通常号には無いが本ページでは必須）:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .scroll-animate { opacity: 1 !important; transform: none !important; transition: none !important; }
  }
  ```
- 追加の遊び（任意・過剰にしない）: 記念スタンプに `animate-in` 連動の一拍遅れ
  フェード、PullQuote の下線がスッと伸びる等。CSS transitionのみ・JS追加禁止。
  `ScrollAnimInit` は既存をそのまま import。

### 3-6. metadata

```ts
export const metadata: Metadata = {
  title: 'CLAFT 1周年特別号「CLAFT、1歳になりました。」 | KEEPON JOURNAL',
  description: 'CLAFTコース開始から1年。代表・将一郎が40分語った振り返りを、まるごと1本の読み物にした特別号。探究PBL・対話Yononaka・実践ミライクラフト・ジブンクラフトの1年を4色でめぐります。',
};
```

## 4. /monthly 一覧への特別号カード

`app/(site)/monthly/page.tsx` の `sorted.map(...)` の**手前**に、ハードコードの
特別号カードを1枚追加する。既存 `issue-card` と同じカード骨格で:

- ヘッダー帯はティール淡グラデ＋上辺に4色テープの細帯（4色を25%ずつ並べた
  `linear-gradient(90deg, ...)` の 4px バーで簡易表現してよい）。
- バッジ「特別号」（teal地・白文字。Vol.バッジと同じ形）＋「1周年記念」。
- タイトル「CLAFT、1歳になりました。」、サブに「40分の振り返り動画を、まるごと
  1本の読み物に。」
- リンク先 `/monthly/1st-anniversary`。「読む →」ボタンは既存と同じ。

## 5. 内部リンク（本文中・2箇所だけ）

- 第5章「AIロボット社会、僕たちはどう生きるか」の段落 → `/yononaka/ai-robot` へ
  `<Link>`（文言は原稿のまま、シリーズ名部分をリンク化）。
- 第3章「なんでも発表会」の初出 → `/futurecraft/Presentation` へ `<Link>`。
- それ以外は張らない。

## 6. 検証チェックリスト（実装後に必ず）

- [ ] `npm run build` が通る（SSG。ポート3002は `npm run dev`）
- [ ] 320 / 375 / 768 / 1280px の4幅で崩れなし・横スクロールなし
- [ ] PCウィンドウを640px前後に狭めた表示と375px実機相当で本文が実質同じ見た目
- [ ] `prefers-reduced-motion` でリビールが無効化され、全文が最初から見える
- [ ] 目次アンカー（#ch1〜#ch8, #video）が全部飛ぶ／`href="#"` が残っていない
- [ ] `/monthly` → 特別号 → 記事末 → 「バックナンバー一覧」の導線が機能
- [ ] スライド10枠すべてにプレースホルダーが表示される
- [ ] 原稿とページ本文の突き合わせ（文言の欠落・改変がないこと）

## 7. 未確定事項（実装をブロックしない。オーナー回答待ち）

原稿・動画URLは確定済み（2026-07-09）。残るはスライド画像10枚のみ。
届いたら `public/assets/images/journal/1st-anniversary/slide-01.jpg` 〜
`slide-10.jpg`（1600×900・jpg）としてこのディレクトリに置くだけで、
`SLIDES` 配列経由で全箇所に反映される（コード変更不要）。
