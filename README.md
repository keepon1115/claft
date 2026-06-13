# CLAFT コーポレートサイト

探究・対話・実践を通じて「自分の軸」をつくるオンラインスクール **CLAFT** の公式ウェブサイトです。

---

## プロジェクト概要

キャッチコピー「**自分の手で創るキャリア**」のもと、子どもから大人まで自律的なキャリア形成を支援するスクールのコーポレートサイトです。

主な掲載内容:

- コース紹介（マイクラSDGs / PBL / Yononaka / ジブンクラフト / ミライクラフト / ロボプロ / English STEAM など）
- 学校・社会向けプログラム（STEAM キャンプ / PLAY CLAFT）
- 生徒ストーリー（[slug] による個別ページ）
- ニュース・月刊レポート（月号別 [issue] ページ）
- CLAFT HOPE（奨学・支援）
- Yononaka サブページ（授業レポ / AIロボット社会 / 教室）
- お問い合わせ・資料ダウンロード

---

## 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 14 (App Router) |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS 3 + styled-jsx |
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
│   │   ├── news/             # ニュース
│   │   ├── monthly/          # 月刊レポート
│   │   │   └── [issue]/      # 号別ページ
│   │   ├── student-story/    # メンバーのストーリー一覧 & [slug]
│   │   ├── keepon-lab/       # Keepon Lab ページ
│   │   ├── contact/          # 無料体験 / お問い合わせ
│   │   └── (hidden)/         # 非公開ページ群 (career / school_society / workshop / roadmap)
│   ├── layout.tsx            # ルートレイアウト（フォント・SiteGrid）
│   ├── globals.css           # グローバルスタイル
│   ├── sitemap.ts            # 自動生成サイトマップ
│   └── robots.ts             # robots.txt 設定
├── components/               # 共通 UI コンポーネント
│   ├── Header.tsx / Nav.tsx / Footer.tsx
│   ├── CourseGrid.tsx        # コースグリッドレイアウト
│   ├── Values.tsx            # CLAFTの価値観セクション
│   ├── Download.tsx          # 資料ダウンロード
│   ├── MobileContainer.tsx   # モバイルラッパー
│   ├── RightRail.tsx         # サイドレール
│   ├── NavigatorAbout.tsx    # ページ内ナビゲーション
│   ├── OpeningAnimation.tsx  # オープニングアニメーション
│   ├── SiteGrid.tsx          # サイト全体のグリッドレイアウト
│   ├── courses/              # コース一覧ページ用クライアントコンポーネント
│   ├── roadmap/              # ロードマップ用クライアントコンポーネント
│   ├── keepon-lab/           # Keepon Lab 専用コンポーネント
│   ├── asia-steam-camp/      # STEAMキャンプ用コンポーネント
│   ├── play-claft/           # PLAY CLAFT用コンポーネント
│   └── student-story/        # 生徒ストーリー用コンポーネント
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
