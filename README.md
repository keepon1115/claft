# CLAFT コーポレートサイト

探究・対話・実践を通じて「自分の軸」をつくるオンラインスクール **CLAFT** の公式ウェブサイトです。

---

## プロジェクト概要

キャッチコピー「**自分の手で創るキャリア**」のもと、子どもから大人まで自律的なキャリア形成を支援するスクールのコーポレートサイトです。

主な掲載内容:

- コース紹介（ロボットプロ / Minecraft / PBL / 世の中探究 / じぶんクラフト / FutureCraft など）
- 学校・社会向けプログラム（STEAM キャンプ / 学校連携）
- 生徒ストーリー（[slug] による個別ページ）
- CLAFT HOPE（奨学・支援）
- お問い合わせ・資料ダウンロード

---

## 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 14 (App Router) |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS 3 + styled-jsx |
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
│   │   ├── courses/          # コース一覧
│   │   ├── robopro/          # ロボットプロ
│   │   ├── minecraft/        # Minecraft コース
│   │   ├── pbl/              # PBL
│   │   ├── yononaka/         # 世の中探究
│   │   ├── jibun-craft/      # じぶんクラフト
│   │   ├── futurecraft/      # FutureCraft
│   │   ├── asia-steam-camp/  # STEAM キャンプ
│   │   ├── claft-hope/       # CLAFT HOPE
│   │   ├── student-story/    # 生徒ストーリー一覧 & [slug]
│   │   ├── keepon-lab/       # Keepon Lab ページ
│   │   ├── contact/          # お問い合わせ
│   │   └── (hidden)/         # 非公開ページ群 (career / school_society / workshop)
│   ├── (keepon-lab)/         # Keepon Lab 専用レイアウトグループ
│   ├── layout.tsx            # ルートレイアウト（フォント・SiteGrid）
│   ├── globals.css           # グローバルスタイル
│   ├── sitemap.ts            # 自動生成サイトマップ
│   └── robots.ts             # robots.txt 設定
├── components/               # 共通 UI コンポーネント
│   ├── Header.tsx / Nav.tsx / Footer.tsx
│   ├── Hero.tsx              # トップ Hero セクション
│   ├── ProgramsScrapbook.tsx # コース一覧（スクラップブック風）
│   ├── OpeningAnimation.tsx  # オープニングアニメーション
│   ├── SiteGrid.tsx          # サイト全体のグリッドレイアウト
│   ├── courses/              # コース一覧ページ用クライアントコンポーネント
│   ├── keepon-lab/           # Keepon Lab 専用コンポーネント
│   └── ...                   # その他セクションコンポーネント
├── lib/
│   ├── nav.ts                # ナビゲーション定義
│   ├── studentData.ts        # 生徒データ
│   └── useReveal.ts          # スクロール表示フック
├── public/
│   └── assets/               # 画像・静的ファイル
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
npm run build   # 本番ビルド
npm run start   # 本番サーバー起動
npm run lint    # ESLint チェック
```

---

## デザインコンセプト

**"Unfinished & Crafting"（未完成を、手づくりする）** をテーマに、紙のテクスチャ・手書き風の線・スクラップブック的なレイアウトで温かみのある質感を表現しています。ブランドカラーは `#34c6be`（ターコイズ）です。
