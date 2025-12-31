# CLAFT — 自分の手で創るキャリア / 公式サイトリポジトリ

CLAFT は、探究 × 対話 × 実践を通して「自分の軸」をつくる学びのプログラムです。このリポジトリは、その公式サイト（プロジェクトサイト）を管理します。コードやビジュアルを見なくても、CLAFT の構造・目的・技術スタック・世界観が伝わるように説明します。

---

## このプロジェクトで実現したいこと（Purpose）

- **だれに**: 小・中・高校生と、その保護者、教育関係者、支援者
- **なにを**: 学びの全体像、参加方法、実践事例、成果、最新情報を一貫した体験で届ける
- **なぜ**: 子どもたちが自分の興味から社会とつながり、試行錯誤しながら「自分の手で創るキャリア」を育てるため

本サイトは「相談 → 体験 → 入会」の導線をわかりやすく示しつつ、各コース（キャリア／マイクラSDGs／Yononaka／Futurecraft）を横断して“学びの循環”を伝えます。

---

## 世界観（Narrative & Tone）

- **キーワード**: 探究、対話、実践、共創、手ざわり、安心して試す
- **語り口**: 事実に丁寧、過度に煽らない。子どもから保護者、教育関係者までに自然に届く明るいトーン
- **体験原則**: 迷わない導線、読みやすい情報構造、更新しやすい運用。モバイル優先、必要十分な装飾

---

## サイトの情報構造（IA）

- トップ（`index.html`）: 全体像、主要導線（相談・体験・入会）、最近の活動
- 取組紹介（`about.html` / `about/`）: 理念、学び方、価値観
- 各コース:
  - `career.html`: キャリア探究と成果
  - `minecraft.html`: マインクラフト × SDGs の実践
  - `yononaka.html`: 対話（Yononaka）の活動
  - `futurecraft.html`: Futurecraft（つくる・発表する）
- プロジェクト／イベント: `play-claft.html`, `workshop.html`, `robopro.html`
- 実装サンプル・成果: ページ内カードやギャラリーで一覧化
- 連絡: `contact.html`（外部フォームや LINE、メール）

ナビゲーションは `_data/nav.yml` でデータ化し、左サイドバー（PC）とモバイルドロワーに反映します。

---

## 技術スタック（Tech Stack）

### 現在の状況（Next.js 移行中）

- **メインサイト**: Next.js 14 + TypeScript + Tailwind CSS
  - ディレクトリ: `web/`
  - フレームワーク: Next.js 14.2.5（App Router）
  - スタイリング: Tailwind CSS 3.4.7 + CSS変数
  - フォント: next/font/google（Zen Maru Gothic）
  - 出力: 静的サイト生成（SSG）
- **レガシー**: Jekyll（GitHub Pages 互換）
  - プラグイン: `jekyll-seo-tag`, `jekyll-sitemap`
  - 出力先: `_site/`（生成物。手動編集しない）
- **共通アセット**: `assets/`（画像・CSS・JS・ドキュメント）
- **ビルド/実行**: 
  - Next.js: Node.js + npm/pnpm
  - Jekyll: Ruby + Bundler（Windows対応: `tzinfo-data`）
- **ホスティング**: 移行予定（GitHub Pages → Vercel/Netlify等）

---

## ディレクトリの見取り図（役割と編集ポイント）

### Next.js サイト（`web/`）
- `web/app/`: App Router ベースのページ構造
  - `layout.tsx`: ルートレイアウト（フォント設定、共通構造）
  - `globals.css`: グローバルスタイル（Tailwind + CSS変数）
  - `(site)/`: 各ページディレクトリ（about, career, minecraft等）
- `web/components/`: 再利用可能なReactコンポーネント
  - `Header.tsx`, `Footer.tsx`, `Hero.tsx`等
- `web/lib/`: ユーティリティ・設定ファイル
  - `nav.ts`: ナビゲーション構造（`_data/nav.yml`から移行予定）
- `web/tailwind.config.ts`: Tailwind CSS設定
- `web/package.json`: Node.js依存関係管理

### Jekyll サイト（レガシー）
- ルート直下の HTML（例: `index.html`, `about.html`）: 各ページの本体。既定レイアウトは `page`。
- `_layouts/`: ページ骨組み（ヘッダー、フッター、三カラムなど）。標準は `page.html`。
- `_includes/`: `header.html`, `footer.html`, `meta.html`, `sidebar.html`, `right-rail.html` などの共通断片。
- `_data/`: `nav.yml` にグローバルナビの構造（ラベル、URL、階層、外部リンク、装飾）。
- `_pages/`: 必要に応じた固定ページ置き場。
- `_site/`: ビルド成果物（編集しない）。
- `Gemfile`, `Gemfile.lock`: ビルド環境管理。

### 共通
- `assets/`: 画像、CSS、JS、PDF。カテゴリ別に整理。

---

## 対象読者別の読み方ガイド

- **開発者（Next.js移行中）**
  - Next.js: `web/app/` 内の `page.tsx` や `web/components/` のReactコンポーネントを編集
  - Jekyll: 該当 `*.html` / `_includes/` / `_data/nav.yml` を編集（レガシー保守）
  - 画像や PDF は `assets/` の該当カテゴリへ追加（両環境で共通）
  - スタイリング: `web/app/globals.css` + Tailwind クラス
- **教育関係者 / 運営**
  - 文章・画像差し替えは該当ページを直接編集（メタ情報も合わせて）
  - ナビの更新: Next.js は `web/lib/nav.ts`、Jekyll は `_data/nav.yml`
  - 公開前にトップと当該ページの導線を確認
- **AI モデル / 自動エージェント**
  - Next.js: `web/lib/nav.ts` と各 `page.tsx` で構造を読み取り、安全に書き戻す
  - Jekyll: `_config.yml` と `nav.yml` で構造を読み取り、該当ページに安全に書き戻す
  - `_site/` と `web/.next/` は出力物のため編集禁止

---

## 開発フロー（ローカル）

### Next.js サイト（推奨）

1. Node.js（18+）を準備
2. 依存関係を取得
3. 開発サーバーを起動

```bash
cd web
npm install
npm run dev
# ページ: http://localhost:3000
```

### Jekyll サイト（レガシー保守）

1. Ruby と Bundler を準備
2. 依存関係を取得
3. ローカルサーバーを起動
4. ブラウザで確認（`/_site` は編集不可）

```bash
bundle install
bundle exec jekyll serve --livereload
# ページ: http://127.0.0.1:4000/claft/
```

Windows 環境では PowerShell から同様に実行可能です。

---

## 更新ルール（コンテンツ運用）

- ファイル・ディレクトリ名は英小文字とハイフン
- 画像はページ/カテゴリごとに整理、代替テキストは内容が伝わる文
- 大容量画像は圧縮し、利用サイズに最適化
- 見出し階層・リンクテキスト・ボタン文言の一貫性を重視
- 主要導線（相談・体験・入会）は各ページから到達可能に
- タイトル/ディスクリプション/OG 画像を適切に設定

---

## デザインの原則（UI/UX）

- モバイル優先。PC は左: ナビ、中央: 本文、右: ショートカットの三カラム
- スクロール追従は上 16px を基準。はみ出しは内部スクロール
- カード/ボタン/タグの角丸・影を一貫。画像の標準比率は 16:9
- 余白を一定にし、読みのリズムを整える
- カラーはティール系を基調に、ピンク/クリーム/グリーンを補助色

---

## 品質保証（QA チェックリスト）

- 表示崩れがない（モバイル/PC）
- リンク切れがない（内部/外部）
- 主要導線が見つけやすい（相談・体験・入会）
- 画像の代替テキストが適切
- ページタイトルと説明が内容に一致

---

## よくある変更と手順例

### Next.js サイト
- 新規ページを追加する
  1. `web/app/(site)/` に新しいディレクトリと `page.tsx` を作成
  2. `web/lib/nav.ts` にナビゲーション項目を追記
  3. `npm run dev` でローカル確認
- コンポーネントを修正する
  1. `web/components/` の該当ファイルを編集
  2. TypeScript エラーがないか確認
  3. ブラウザで表示を確認

### Jekyll サイト（レガシー）
- ナビに新規ページを追加する
  1. ルート直下や `_pages/` に `*.html` を作成
  2. `_data/nav.yml` に追記
  3. ローカルで表示を確認

### 共通
- 画像を差し替える
  1. `assets/` の該当カテゴリに保存
  2. 参照パスを更新
  3. サイズ/比率/代替テキストを確認

---

## 将来拡張

### Next.js 移行完了後
- Jekyll サイトの完全廃止
- Vercel/Netlify等への本格デプロイ
- ISR（Incremental Static Regeneration）によるコンテンツ更新最適化
- 画像最適化（next/image）・キャッシュ・測定基盤（パフォーマンス/SEO）

### 機能拡張
- ナビやメタ情報のさらなるデータ化（更新の属人性削減）
- 多言語対応、新コース追加に耐える命名と分割
- CMS連携（Headless CMS）による非技術者向けコンテンツ管理

---

本ドキュメントは、メンバー、教育関係者、AI ツールが文脈を素早く共有し、安全に更新できることを目的に保守します。迷ったときは「読み手にとって分かりやすいか」「次の更新者が作業しやすいか」を基準にしてください。
