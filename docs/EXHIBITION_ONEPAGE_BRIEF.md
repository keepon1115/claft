# なんでも展示会 オンラインギャラリー「1ページ化」改修 指示書

作成日: 2026-07-07 ／ 発注者: オーナー（キープオン） ／ 状態: **実装待ち**

## 0. 背景と目的

現在のオンラインギャラリーは「作品一覧（カード）→ クリックで作品個別ページ」の2段構成。
オーナーの実感として **「一覧→個別と見ていくハードルが高い」**。参考として「なんでも発表会」ページ
（縦スクロール1ページに全発表が並ぶ構成）の体験が良かったため、展示会も同じ構成に作り変える。

**ゴール: 展示会の全作品を、スクロールするだけで1ページで見られるようにする。**

## 1. 対象と現状

- 公開一覧: `app/(site)/futurecraft/Exhibition/[slug]/page.tsx`（ポラロイドカードのグリッド）
- 作品個別: `app/(site)/futurecraft/Exhibition/[slug]/works/[workId]/page.tsx`（動画・写真・制作ストーリー4付箋・リアクション・コメント一覧＋投稿）
- 共通シェル: `components/exhibition/ExhibitionShell.tsx`（クリーム背景・紙グレイン・フォント・`.reveal` フェードイン。**継続使用する**）
- 部品: `components/exhibition/ReactionBar.tsx` / `CommentSection.tsx` / `LiteYouTube.tsx`
- データ取得: `lib/exhibition/queries.ts`（anonクライアント。`fetchWorks` は `work_images` 同梱済み）
- API: `app/api/exhibition/reactions/route.ts` / `app/api/exhibition/comments/route.ts`（**変更不要**。コメントAPIは `commentType` を要求する点に注意）
- 管理画面: `app/(site)/admin/(protected)/exhibitions/[id]/page.tsx` ＋ `app/(site)/admin/actions.ts`

### 1.1 作業ツリーに未コミットの先行変更あり（この上に実装すること）

- `lib/exhibition/date.ts` … `formatWorkDate(iso)`（JSTで「7/26」形式）新規
- 一覧・個別ページに日付バッジ（Calendarアイコン＋ `formatWorkDate(work.created_at)`）追加済み
- `createWork` に `event_date`（表示日）入力を追加済み（未指定なら登録日時）
- ⚠️ `docs/` 配下の他の未コミットファイル（文章執筆くん・ワークシート作成くん・PARENT_CV_REDESIGN_BRIEF）は**本件と無関係。ステージ・コミットに含めないこと**

### 1.2 データベース（Supabase）

- プロジェクト名 **CLAFT-HP**（project ref: `vfxvcmympnugluqfqgks`）。スキーマ正本は
  `app/(site)/futurecraft/Exhibition/schema_phase1.sql`。**スキーマ変更は不要**（既存カラムだけで実現できる）。
- 現在 `nandemo-2026-07`（status: open）に開発用ダミー作品3件（ウサギ/マイクラ/バンド、created_at=7/26）が入っている。§6参照。

## 2. 変更仕様

### 2.1 一覧ページを「1ページ縦スクロール型」に全面改修

`app/(site)/futurecraft/Exhibition/[slug]/page.tsx` を以下の構成に書き換える。

```
[リボン ✦ Online Gallery ✦]（現状維持）
[戻るリンク・展示会タイトル・テーマ]（現状維持）
[目次]（新規 → §2.5）
[作品セクション × N]（作品ごとに以下を縦に並べる）
  ├ タイトル（font-display・アンカー id="work-{work.id}"）
  ├ 作者ニックネーム・ジャンル・日付バッジ（7/26形式）
  ├ メディア: youtube_url があれば LiteYouTube（クリック再生・現行方式のまま）、
  │          work_images があれば写真（現行の紙もの・テープ風スタイルを流用）
  ├ 発表者のコメント（1ブロック → §2.2）
  ├ リアクションバー（コンパクト版 → §2.3）
  └ コメント送信ミニフォーム（→ §2.4）
[フッター的な締め（任意・軽く）]
```

- 作品間は罫線や余白で区切る（参考画像の「なんでも発表会」ページの雰囲気。1作品1スクリーン弱を目安に**コンパクトに**）。
- 作品0件時の「作品はこれから並びます」表示は現状維持。
- ページは `force-dynamic` のまま。データ取得はサーバーコンポーネントで
  `fetchWorks` ＋ `fetchReactionTypes` ＋ 各作品の `fetchReactionTally` を行い、
  クライアント部品には初期値として渡す（現行の作品個別ページと同じパターン）。
  作品数×RPCのN+1が気になる場合も **Phase 1 は許容**（作品は数十件想定）。

### 2.2 「発表者のコメント」を1ブロックに集約

- 現在の4付箋（story_made / story_devised / story_struggled / story_learned）はやめる。
- 表示: `author_intro` → `story_made` → `story_devised` → `story_struggled` → `story_learned` の順に、
  **値があるものだけを段落として連結**し、1つの吹き出し/カード（例: 参考画像の「コハルさんのコメント」風、
  クリーム地または白地の角丸カード）に表示する。見出しは「◯◯さんより」など作者名を使う。
- 管理画面フォーム: 4つのstory欄＋author_introを **「発表者コメント（自由記述・1欄）」に置き換え**、
  保存先は `story_made` とする（他カラムは送らない）。既存データは上記の連結表示でそのまま生きる。
  `actions.ts` の `createWork` から不要フィールドの読み取りを削る。

### 2.3 リアクションバーのコンパクト化＋タップ演出（提案B採用）

`components/exhibition/ReactionBar.tsx` を改修:

- ボタンを小型化: `px-4 py-2.5` → `px-3 py-1.5` 程度、絵文字＋カウントのみ表示し、
  `label`（すごい！等）は `title` 属性 or 極小テキストに格下げ。1行に収まる密度にする。
- タップ時に顔文字が「ポンと跳ねる」マイクロアニメーションを追加
  （例: activeになった瞬間 `scale(1.4)` → spring で戻る CSS keyframes。`prefers-reduced-motion` では無効化）。
- ロジック（楽観的更新・トグルAPI・1人1回）は**変更しない**。

### 2.4 コメントを「送信専用ミニフォーム」に（他人のコメント非表示）

`components/exhibition/CommentSection.tsx` を送信専用に改修（or `CommentForm.tsx` として作り直し）:

- **削除するもの**: 公開済みコメント一覧・作者返信の表示・「おうえん/かんそう/しつもん」種別タブ・問いの表示。
- **残すもの**: textarea（500字）＋ニックネーム（任意）＋送信ボタン＋送信完了表示。全体を1カードに収め、
  現行より明確に小さく（目安: 現在の半分以下の高さ。角丸カード＋テープ風は維持してよい）。
- **定型チップ（提案C採用）**: 入力欄の上に「すごい！」「まねしたい」「もっと見たい」の3チップを置き、
  タップで textarea に文言を挿入（追記）する。低学年の入力ハードルを下げる目的。
- API送信は現行 `/api/exhibition/comments` のまま。`commentType` は **`'cheer'` 固定**で送る。
- 文言変更: 「コメントは確認後に公開されます」→ **「コメントは作者さんにだけ届きます」**。
  注意書きの「コメントは確認のうえで公開されます」も同趣旨に変更。
- サーバー側は無変更（保存・AIモデレーション・作者ページ/管理画面での閲覧は現状のまま生きる）。
- `lib/exhibition/queries.ts` の `fetchApprovedComments` は公開ページから呼ばなくなる。
  他に参照が無ければ関数ごと削除してよい（作者ページ `/author/[token]` は別クエリなので影響なし。**要grep確認**）。

### 2.5 目次（提案A採用）

- ページ上部（タイトル直下）に「出展作品」として `作品タイトル ＋ 作者名` のリストを置き、
  各行タップで `#work-{id}` へスムーススクロール（`scroll-behavior: smooth` ＋ `scroll-margin-top`）。
- 発表会ページの「タイムテーブル」のような、行が並ぶ軽い表現でよい。作品3件でも成立するデザインにする。

### 2.6 作品個別ページの廃止

- `app/(site)/futurecraft/Exhibition/[slug]/works/[workId]/page.tsx` は、
  `redirect(`/futurecraft/Exhibition/${slug}#work-${workId}`)` を返すだけの実装に置き換える
  （既存の共有URL・管理画面の「公開ページ」リンクを壊さないため。ファイル削除はしない）。
- 管理画面の「公開ページ」リンクはそのままでよい（リダイレクトで到達する）。

## 3. デザイン上の制約（厳守）

- **ExhibitionShell を引き続き使う**。フォント（Kaisei Decol / Zen Kaku Gothic New / Yusei Magic）、
  配色（クリーム #FFF8EC・墨 #1F1810・朱 #E04E2C・黄 #F2B544・青緑 #2E7D7D・桃 #E89BB0）、
  紙もの・マスキングテープ・付箋のモチーフ、`.reveal` フェードインは既存の書き味を踏襲する。
- オーナー確定文言・ブランド色・フォントは変更不可。新規文言はひらがな多めの子ども向けトーンで。
- スマホファースト（閲覧の大半はスマホ想定）。`prefers-reduced-motion` 対応を維持。

## 4. 触ってよいファイル / 触ってはいけないファイル

| 区分 | ファイル |
|---|---|
| 改修 | `app/(site)/futurecraft/Exhibition/[slug]/page.tsx`、同 `works/[workId]/page.tsx`（リダイレクト化）、`components/exhibition/ReactionBar.tsx`、`components/exhibition/CommentSection.tsx`、`app/(site)/admin/(protected)/exhibitions/[id]/page.tsx`、`app/(site)/admin/actions.ts`、`lib/exhibition/queries.ts` |
| 変更禁止 | `app/api/exhibition/**`（API）、`schema_phase1.sql`（スキーマ）、`NandemoTenjikaiContent.tsx`（紹介LP）、`/author/[token]` 作者ページ、`docs/` の本件無関係ファイル |

## 5. 検証手順（実装後に必ず実施）

1. `npm run dev`（ポート3002）→ `/futurecraft/Exhibition/nandemo-2026-07` を開く
2. ダミー3作品が1ページに縦に並ぶ／目次から各作品へ飛べる／日付「7/26」が出る
3. リアクションをタップ → カウント増・跳ねる演出・再タップで取り消し（`/api/exhibition/reactions` が200）
4. コメント送信 → 「作者さんにだけ届きます」の完了表示。**ページ上に他人のコメントが一切出ない**こと
5. 送ったコメントが管理画面 `/admin/exhibitions` 側で見えること（DB保存の確認）
6. 旧URL `/futurecraft/Exhibition/nandemo-2026-07/works/c1000000-0000-4000-8000-000000000001` が一覧の該当作品位置へリダイレクトされること
7. `npm run build` が通ること

## 6. 実装後のクリーンアップとデプロイ（オーナー承認済みの手順)

1. オーナーが新デザインをローカルで確認 → OKが出たら:
2. ダミー3作品を削除（管理画面の削除ボタン、またはSupabaseで
   `delete from works where id in ('c1000000-...0001','c1000000-...0002','c1000000-...0003');`
   ※ work_images / tokens / reactions / comments はFKカスケードで消える）
3. **展示会関連ファイルのみ**をステージしてコミット（§1.1の無関係docsを含めない）
4. push（mainブランチ・自動デプロイ）

## 7. スコープ外（今回はやらない）

- スキーマ変更・新テーブル
- 作品の並び替えUI、ページネーション
- 作者ページ `/author/[token]` の改修
- コメントの公開表示機能の復活（意図的に廃止する）
