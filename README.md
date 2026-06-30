# CLAFT コーポレートサイト

探究・対話・実践を通じて「自分の軸」をつくるオンラインスクール **CLAFT** の公式ウェブサイトです。

---

## プロジェクト概要

キャッチコピー「**自分の手で創るキャリア**」のもと、子どもから大人まで自律的なキャリア形成を支援するスクールのコーポレートサイトです。

主な掲載内容:

- コース紹介（マイクラSDGs / PBL / Yononaka / ジブンクラフト / ミライクラフト / ロボプロ / English STEAM など）
- 学校・社会向けプログラム（STEAM キャンプ / PLAY CLAFT）
- ブログ（Notion 連携 / [slug] 個別ページ）
- 生徒ストーリー（[slug] による個別ページ）
- ニュース・月刊レポート（月号別 [issue] ページ）
- CLAFT HOPE（奨学・支援）
- Yononaka サブページ（授業レポ / AIロボット社会 / 教室）
- なんでも展示会・ゲーム展示会・なんでも発表会（Supabase 連携）
- Keepon Lab PWA（`/lab`）- メンバー専用アプリ
- お問い合わせ・資料ダウンロード

---

## 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 14 (App Router) |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS 3 + styled-jsx |
| データベース | [Supabase](https://supabase.com/)（展示会・Lab 機能） |
| CMS | [Notion API](https://developers.notion.com/)（ブログ） |
| AI | [Anthropic SDK](https://www.npmjs.com/package/@anthropic-ai/sdk) |
| PWA | next-pwa（Keepon Lab） |
| カレンダー | Google Calendar API（Lab 予約） |
| アイコン | lucide-react |
| フォント | Zen Maru Gothic / Noto Sans JP (Google Fonts) |
| Lint / Format | ESLint (eslint-config-next) / Prettier |

---

## ディレクトリ構成

```
claft-HP/
├── app/
│   ├── (site)/               # 公開サイト全体のルートグループ
│   │   ├── page.tsx          # トップページ
│   │   ├── about/            # CLAFTとは
│   │   ├── courses/          # コース・料金
│   │   ├── minecraft/        # マイクラSDGs
│   │   ├── pbl/              # PBL（課題解決型学習）
│   │   ├── yononaka/         # Yononaka（対話ワーク）
│   │   │   ├── jugyo-repo/   # 授業レポ
│   │   │   ├── ai-robot/     # AIロボット社会
│   │   │   └── kyoshitsu/    # Yononaka教室
│   │   ├── jibun-craft/      # ジブンクラフト
│   │   ├── futurecraft/      # ミライクラフト
│   │   │   ├── Exhibition/       # なんでも展示会
│   │   │   ├── Exhibition-game/  # ゲーム展示会
│   │   │   └── Presentation/     # なんでも発表会
│   │   ├── robopro/          # ロボプロ
│   │   ├── english-steam/    # English STEAM
│   │   ├── play-claft/       # PLAY CLAFT
│   │   ├── asia-steam-camp/  # STEAMキャンプ
│   │   ├── claft-hope/       # CLAFT HOPE
│   │   ├── blog/             # ブログ（Notion連携）
│   │   │   └── [slug]/       # 記事個別ページ
│   │   ├── news/             # ニュース
│   │   ├── monthly/          # 月刊レポート
│   │   │   └── [issue]/      # 号別ページ
│   │   ├── student-story/    # メンバーのストーリー一覧 & [slug]
│   │   ├── keepon-lab/       # Keepon Lab 紹介ページ
│   │   ├── author/[token]/   # 著者トークンページ
│   │   ├── admin/            # 管理者エリア（login / protected）
│   │   ├── contact/          # 無料体験 / お問い合わせ
│   │   └── (hidden)/         # 非公開ページ群 (career / school_society / workshop / roadmap)
│   ├── (lab)/                # Keepon Lab PWA ルートグループ
│   │   └── lab/              # メンバー専用アプリ
│   │       ├── page.tsx      # ホーム
│   │       ├── guide/        # 使い方ガイド
│   │       ├── idea/         # アイデアボード
│   │       ├── jobmap/       # 仕事マップ（カテゴリ別）
│   │       ├── meeting/      # ミーティング
│   │       ├── reserve/      # 予約（Google Calendar）
│   │       ├── roadmap/      # ロードマップ
│   │       ├── story/        # ストーリー
│   │       └── settings/     # 設定
│   ├── api/                  # API ルート
│   │   ├── exhibition/
│   │   │   ├── comments/     # 展示会コメント CRUD
│   │   │   └── reactions/    # 展示会リアクション
│   │   ├── author/reply/     # 著者返信
│   │   └── revalidate/       # ISR キャッシュ再検証
│   ├── layout.tsx            # ルートレイアウト（フォント・SiteGrid）
│   ├── globals.css           # グローバルスタイル
│   ├── sitemap.ts            # 自動生成サイトマップ
│   └── robots.ts             # robots.txt 設定
├── components/               # 共通 UI コンポーネント
│   ├── Header.tsx / Nav.tsx / Footer.tsx
│   ├── CourseGrid.tsx        # コースグリッドレイアウト
│   ├── Values.tsx            # CLAFTの価値観セクション
│   ├── Download.tsx          # 資料ダウンロード
│   ├── SiteGrid.tsx          # サイト全体のグリッドレイアウト
│   ├── OpeningAnimation.tsx  # オープニングアニメーション
│   ├── craft/                # Craft デザインシステム部品
│   ├── blog/                 # ブログ用コンポーネント
│   ├── courses/              # コース一覧ページ用
│   ├── exhibition/           # 展示会用コンポーネント
│   ├── keepon-lab/           # Keepon Lab 紹介ページ用
│   ├── lab/                  # Lab PWA 専用コンポーネント
│   ├── monthly/              # 月刊レポート用
│   ├── news/                 # ニュース用
│   ├── claft-hope/           # CLAFT HOPE 用
│   ├── asia-steam-camp/      # STEAMキャンプ用
│   ├── play-claft/           # PLAY CLAFT 用
│   ├── roadmap/              # ロードマップ用
│   └── student-story/        # 生徒ストーリー用
├── lib/
│   ├── nav.ts                # ナビゲーション定義
│   ├── seo.ts                # SEO メタデータユーティリティ
│   ├── notion.ts             # Notion API クライアント
│   ├── googleCalendar.ts     # Google Calendar 連携
│   ├── analytics.ts          # アクセス解析
│   ├── courses.ts            # コースデータ
│   ├── studentData.ts        # 生徒データ
│   ├── monthlyData.ts        # 月刊レポートデータ
│   ├── weeklyData.ts         # 週次データ
│   ├── faq.ts                # FAQ データ
│   ├── useReveal.ts          # スクロール表示フック
│   ├── exhibition/           # 展示会ロジック
│   └── lab/                  # Lab PWA ロジック
├── supabase/
│   └── seed_phase1.sql       # 展示会・Lab DB シード
├── ds-bundle/                # Craft デザインシステム同期バンドル
├── docs/                     # 戦略・設計ドキュメント
├── public/
│   └── assets/               # 画像・静的ファイル
├── scripts/
│   └── verify-phase1.mjs     # Phase1 DB 検証スクリプト
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## ローカル環境での起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（ポート 3002）
npm run dev
```

ブラウザで [http://localhost:3002](http://localhost:3002) を開いてください。

### その他のコマンド

```bash
npm run build          # 本番ビルド
npm run start          # 本番サーバー起動
npm run lint           # ESLint チェック
npm run verify:phase1  # Supabase Phase1 DB 検証
```

---

## 環境変数

`.env.example` を参考に `.env.local` を作成してください。

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名キー |
| `NOTION_API_KEY` | Notion API シークレット |
| `NOTION_BLOG_DATABASE_ID` | ブログ用 Notion DB ID |
| `ANTHROPIC_API_KEY` | Anthropic AI API キー |
| `GOOGLE_CALENDAR_*` | Google Calendar 連携キー |

---

## デザインコンセプト

**"Unfinished & Crafting"（未完成を、手づくりする）** をテーマに、紙のテクスチャ・手書き風の線・スクラップブック的なレイアウトで温かみのある質感を表現しています。ブランドカラーは `#34c6be`（ターコイズ）です。

デザイントークンは `ds-bundle/` に集約されており、Craft デザインシステム（`craft-*` クラス・コンテナクエリ `cqi` ベース）に従います。
