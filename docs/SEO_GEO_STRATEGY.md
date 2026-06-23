# CLAFT SEO / GEO 実装方針

最終更新: 2026-06-20

## 確定した前提

| 項目 | 内容 |
|---|---|
| 正規ドメイン | `https://claft.keeponlearning.fun` に統一 |
| 商品形態 | ハイブリッド（八尾の対面教室 + 全国向けオンライン） |
| CVゴール | 無料体験 / 個別相談の予約 |
| コンテンツ制作 | AIで量産（人の事実確認・一次情報の混入を必須ガードとする） |
| 主ペルソナ | 小5〜中3の子を持つ**保護者** |
| 主競合 | 学習塾（探究・キャリア教育で差別化） |
| 計測ツール | GSC / GA4 は未導入 → ゼロから構築 |

## 大方針

従来SEO（Google上位表示）と **GEO/AEO**（ChatGPT・Gemini・Perplexity・Google AI Overviews に
引用・推薦される）の二本柱。AIチャットは会話文の長文質問で来るため、施策の重心を
「キーワード詰め込み」から「**質問への明快な答えを、引用しやすい構造で置く**」に移す。

差別化メッセージ（全ページ・SNSで一字一句揃える）:
> CLAFTは、学習塾では扱わない「探究 × 対話 × 実践」で “自分の軸” をつくる、
> 八尾の対面教室と全国どこからでも学べるオンラインのハイブリッドスクール。

---

## Phase 1: テクニカル土台（最優先 / 本コミットで着手）

崩れていると上位施策が全て無効になるため最初に潰す。

1. **ドメイン統一** — `NEXT_PUBLIC_SITE_URL=https://claft.keeponlearning.fun` を単一の真実として
   `lib/seo.ts` に集約。sitemap / robots / metadata の旧ドメイン混在（github.io・vercel.app）を解消。
2. **301リダイレクト** — `claft-hp.vercel.app` へのアクセスを正規ドメインへ恒久リダイレクト
   （`next.config.mjs` の host 条件付き redirect）。※ 旧 github.io（静的Jekyll）は別ホストのため
   そちら側でのリダイレクト設定が別途必要。
3. **metadataBase** をルートに設定 → OGP / canonical の相対URLが正しく絶対化される。
4. **canonical** をルート既定で付与。各ページは必要に応じ上書き。
5. **sitemap.ts を自動生成化** — 公開ルートを配列管理し、`monthly` 各号・`student-story` 各人を
   データから動的展開。`(hidden)` / `admin` / `author` / `api` は除外。
6. **OGP / Twitterカード** をルートで既定化（既定OG画像・サイト名）。各ページで上書き。
7. **robots** — `/admin/` `/author/` `/api/` を disallow。AIクローラ（GPTBot, ClaudeBot,
   PerplexityBot, Google-Extended 等）は明示的に allow し引用対象に入れる。
8. **Organization / WebSite JSON-LD** をルートに常設（AIが「CLAFTとは何者か」を確定できる）。

## Phase 2: 構造化データ拡充 ✅ 実装済み（2026-06-20）

実装済み:
- **Organization / WebSite / LocalBusiness** … `app/layout.tsx` の `<head>` で全ページに出力。
  単一ソースは `lib/seo.ts`。
- **Course / CourseInstance**（`courseMode` で online/blended、料金、provider）… `lib/courses.ts` に
  コースを一元化し、`/courses` で ItemList JSON-LD を出力。表示カードも同データを参照（重複排除）。
- **FAQPage** … `lib/faq.ts` に集約。表示（`components/FAQ.tsx`）と JSON-LD の単一ソース。
  トップでのみ JSON-LD を出力（複数ページ重複を回避）。
- `/courses` に per-page metadata（title/description/canonical）を付与。

未実装（次フェーズ）:
- BreadcrumbList（全階層）/ Article（news・student-story・monthly: 著者・公開日でE-E-A-T）

### ★重要な技術的注意（構造化データの出力場所）
`(site)` グループのページ本文は **client component `SiteGrid`（useSearchParams 使用）** を
children として通過する。React はこの client サブツリー内の `<script>` を RSC ペイロードへ退避するため、
**ページ本文に置いた JSON-LD は静的HTMLに残らず、JS実行後にのみ現れる**（既存の minecraft 等も同様だった）。
- Google は JS を実行するため問題なし。
- **非JSのAIクローラ（GPTBot等）は生HTMLしか読まない** → サイト全体に効く
  Organization / WebSite / LocalBusiness は **root layout の `<head>`** に置いてクリーン出力している。
- ページ固有の Course / FAQPage は現状ページ本文（=JS描画）。可視テキスト（料金・FAQ本文）は
  静的HTMLにあるため GEO 上の情報欠落はない。
- 将来、Course/FAQ も非JSクローラへ届けたい場合は、`SiteGrid` を「navのみ client・children は server 境界」に
  分割するか、middleware でルートを `<head>` に渡す方式へ。次フェーズ候補。

★要記入（`lib/seo.ts` の `BUSINESS`）: streetAddress / postalCode / telephone / geo / openingHours。
LocalBusiness のローカル露出を最大化するため、判明し次第ここへ。

## Phase 3: CV導線 + 計測 ✅ 実装済み（2026-06-20）

実装済み:
- **常駐CTA** … `components/ReserveCTA.tsx` をサイト全体に表示（`/contact?type=taiken` へ誘導）。
  `/contact`・`/admin`・`/author` では非表示。クリックで GA4 `reserve_cta_click` を送信。
- **予約フォーム＝既存 /contact を活用**（新規LPは作らず重複回避）。`?type=taiken` で
  「無料体験のお申し込み」が初期選択。`app/(site)/contact/layout.tsx`（server）で
  予約ページ用の metadata（title/description/canonical）を付与。
- **GA4** … `components/Analytics.tsx`（`NEXT_PUBLIC_GA_ID` 設定時のみ出力）。
  予約フォーム送信完了で `reservation_submit`（`lib/analytics.ts`）を送信＝CVイベント。
- **GSC 所有権確認** … `GOOGLE_SITE_VERIFICATION` を入れると `<meta>` 自動出力（`lib/seo.ts`）。
- **LocalBusiness の NAP 確定** … キープオン（エジソンアカデミー本校）の住所・電話・営業時間を
  `lib/seo.ts` の `BUSINESS` に記入済み（geo=緯度経度のみ未記入）。

### 計測の有効化手順（オーナー作業）
1. **GA4**: GA管理画面で測定ID（`G-XXXXXXXXXX`）を取得 → Vercel/`.env.local` の
   `NEXT_PUBLIC_GA_ID` に設定 → 再デプロイ。GA4「管理 → イベント」で `reservation_submit` を
   **キーイベント（コンバージョン）** に設定。
2. **GSC**: search.google.com/search-console でプロパティ追加 → 「HTMLタグ」確認の content 値を
   `GOOGLE_SITE_VERIFICATION` に設定 → 再デプロイ → 確認ボタン。完了後 `sitemap.xml` を送信。
   （ドメインプロパティにする場合はDNS TXTでも可。旧 github.io/vercel.app は登録不要。）
3. **AI流入セグメント**: GA4「探索」で、セッションの参照元に `chatgpt.com` / `perplexity.ai` /
   `gemini.google.com` / `copilot` を含むセグメントを作成し、`reservation_submit` への寄与を追跡。

未実装（次フェーズ候補）:
- 予約手順そのものを構造化データ化（`ReserveAction`）／体験までの導線をLP化する場合の拡張。

## Phase 4: GEO コンテンツエンジン（AI量産）✅ 基盤実装済み（2026-06-20）

**入れ物 = 新規 `/blog`（Notion をソースに）**。`/news`（活動報告）とは分離。

実装済み:
- `lib/notion.ts` … 依存ライブラリ無しの fetch アダプタ。`Status=公開` のみ配信。ISR 1時間。
  `NOTION_TOKEN`/`NOTION_BLOG_DB_ID` 未設定なら空（`/blog` は「準備中」表示）でビルドは壊れない。
- `components/blog/NotionBlocks.tsx` … 見出し/段落/箇条書き/番号/引用/コールアウト/コード/画像/
  区切り/ToDo/テーブルを描画する軽量レンダラ。
- `app/(site)/blog/page.tsx`（一覧・ISR）/ `app/(site)/blog/[slug]/page.tsx`（記事・ISR・
  `generateStaticParams`・`generateMetadata`・**Article + BreadcrumbList JSON-LD**・記事末CTA）。
- `app/sitemap.ts` … 公開記事を自動追加（ピラーは priority 高め）。
- `lib/nav.ts` … 「お知らせ・活動報告 > ブログ」を追加（内部リンク/回遊）。
- Notion DB **「CLAFT Blog（SEO/GEO記事）」** を作成済み（CLAFTページ配下）。
  DB ID = `e629305a-8b33-4cd7-931a-637edf5737d1`。
- 下書きテンプレート記事「学習塾と探究スクールの違いは？」を投入済み（Status=下書き）。

### Notion 連携の有効化（オーナー作業）
1. https://www.notion.so/my-integrations で内部インテグレーション作成 → Secret を控える。
2. 「CLAFT Blog（SEO/GEO記事）」DB の ••• → 接続 → そのインテグレーションを追加（共有）。
3. env（Vercel + `.env.local`）に `NOTION_TOKEN`=Secret、`NOTION_BLOG_DB_ID`=上記ID を設定 → 再デプロイ。
4. テンプレ記事を編集し `Status=公開` に → `/blog` に表示される。

注意:
- Notion画像のURLは約1時間で失効。ISR再取得で更新されるが、確実性を上げるなら将来は画像プロキシ化。
- 記事の Article JSON-LD はページ本文（=JS描画）。可視テキストは静的HTMLにあり GEO 上は問題なし
  （Phase 2 の SiteGrid 注記と同じ理由）。

### 運用フロー（AI量産 + 品質ガード）
AIで下書き → Notionに貼る → 人が一次情報（CLAFT独自の実例・数値）を1つ以上足し事実確認 →
`Status=公開`。`Category` でクラスター、`Pillar` で中核記事、`Tags` で内部リンクを設計。

### 初期に書くべき記事（保護者 × 小5〜中3 × 対 学習塾）
- ピラー:「学習塾と探究スクールの違い」(投入済テンプレ) /「子どものキャリア教育とは」
- クラスター:「塾以外で考える力を伸ばす習い事は？」「不登校でも続くオンライン習い事」
  「Minecraftで学べることは？習い事として意味ある？」「中学生が自分で考えられない時の親の関わり方」

### GEO ライティングの型（再掲・記事作成時の必須ルール）

トピッククラスター構成（薄い記事乱造を避ける）:
- ピラー: 「オンライン探究スクールとは」「子どものキャリア教育とは」
- クラスター（1記事1問）例:
  - 「学習塾と探究スクールの違いは？」
  - 「不登校でも続けられるオンライン習い事は？」
  - 「Minecraftで学べることは？習い事として意味ある？」
- FAQハブ（料金・対象年齢・オンライン受講環境・退会・体験の流れ）

GEOライティングの型: 結論先出し / 1段落1問1答（前後文脈なしで成立）/ 比較表 /
固有の一次情報（受講生の実例・数値）を必ず混ぜる。

量産の品質ガード: ①一次情報を1つ以上 ②公開前に人が事実確認 ③薄い重複は統合。

## Phase 5: オフサイト・継続改善

プレスリリース・教育メディア寄稿で被引用を増やす。主要クエリ順位・被引用を月次レビュー。

---

## ペルソナ / キーワード方針（保護者 × 小5〜中3 × 対 学習塾）

検索意図は「塾に通わせているが “これでいいのか” という漠然とした不安」。
差別化の軸 = **塾＝点数/受験、CLAFT＝自分で考え選ぶ力（探究・キャリア）**。

狙うクエリ群（例）:
- 「学習塾 以外 習い事 中学生」「子ども 考える力 つけ方」
- 「探究学習 オンライン 小学生」「キャリア教育 子ども 習い事」
- 「塾 意味ない 不安」「中学生 自分で考えられない」

AIチャット想定質問（GEOで答えを置く）:
- 「塾以外で子どもの考える力を伸ばせるオンラインの習い事は？」
- 「探究系のスクールと普通の学習塾は何が違う？」
