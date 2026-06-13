# LESSONS.md — キープオンラボ PWA 構築の教訓メモ

仕様書（`app/(lab)/KEEPON_LAB_SPEC.md`）の指示に基づき、詰まった点・解決・以後の方針をここに書き溜める。

## 2026-06-12 ①骨格フェーズ

### リポ構成の決定（相乗り + /lab パス）
- **決定**: 仕様どおり claft-HP 相乗りの `app/(lab)/` ルートグループ。ただしページは `app/(lab)/lab/` 配下に置き、URLは `/lab` 始まりにした。
- **理由**: ルートグループはURLに現れないため、仕様の `app/(lab)/page.tsx` は既存トップ `app/(site)/page.tsx` と `/` で衝突し、Next.js のビルドエラーになる（parallel pages が同一パスを解決できない）。
- **以後の方針**: 仕様中のパス表記は `/lab` プレフィックス付きで読み替える（`/lab/story/[category]`, `/lab/reserve`, `/lab/meeting`, `/lab/idea`, `/lab/guide`, `/lab/settings`）。PWA manifest の `scope`/`start_url` も `/lab` にする。

### ルートレイアウトの分離
- **詰まった点**: 旧 `app/layout.tsx` が全ページを `SiteGrid`（HPの左ナビ・ヘッダー・フッター・LINE FAB）で包んでいて、ラボを全画面アプリにできない。
- **解決**: `SiteGrid` ラッパーを新設の `app/(site)/layout.tsx` に移動。ルートレイアウトは html/body/フォント/globals.css だけの共通殻にした。HP側のDOM出力は移動前と同一なので公開ページは壊れない（トップのスクショで回帰確認済み）。

### CSS変数の衝突
- **詰まった点**: ラボのデザイントークン（`--green` `--paper` `--card`）が `app/globals.css` の `:root` に**別の値で既存定義**されている（HPのブランド色）。
- **解決**: ラボのトークンはすべて `.lab-app` セレクタ配下にスコープ（`app/(lab)/lab.css`）。クラス名も `lab-` プレフィックスで統一し、4500行あるHP側CSSとの干渉を断つ。
- **以後の方針**: ラボのスタイルに `:root` やグローバルセレクタを書かない。

### データ取得の集約
- 仕様の指示どおり、コンテンツは `lib/lab/content.ts` の `getLabContent()` 1関数に集約。段階2（HP記事・Googleカレンダー連携）ではこの関数の中身だけ差し替える。

### 環境メモ
- `npm run dev` はポート **3002**（HPと共通）。
- この環境に `python` コマンドはない。ブラウザ確認は `npx playwright screenshot`（要 `npx playwright install chromium`）を使う。
- 起動時に browserslist / baseline-browser-mapping の「データが古い」警告が出る。**今回の変更とは無関係の既存警告**。「無警告で起動」の受け入れ条件に関わるため、PWA化フェーズで `npx update-browserslist-db@latest` の実行を検討（依存更新なので実行前に報告する）。

## 2026-06-12 ③各機能ページフェーズ

### フォームの「送信」の扱い
- **方針**: 面談・アイデア箱とも送信先が未定のため、submit はクライアント内で完了画面を表示するまで。実送信箇所は `// TODO: 送信先が未定` でコードを止めた（`components/lab/MeetingForm.tsx` / `IdeaForm.tsx`）。
- 利用者に誤解させないよう、完了画面に「※送信の接続は設定中です」の注記を入れた。送信先確定後に注記ごと外す。

### ストーリービューアの暫定対応
- トップのストーリー円からの遷移が404になるのを避けるため、`/lab/story/[category]` に**暫定の1枚ページ**（カテゴリ紹介＋「詳細ページを見る →」＋閉じる）を先行実装。フェーズ④で全画面スワイプ＋進行ドットのビューアに置き換える。

### 通知トグルのガラ
- 設定値は `localStorage`（キー `lab-notify-settings`）に保持。Web Push 購読（VAPID鍵必要）は `NotificationSettings.tsx` の TODO コメントに実装手順を書き残した。

### 検証環境の整備
- `npx playwright screenshot` は静的撮影のみで操作検証ができない。Temp に `playwright-core` を入れた使い捨てNodeプロジェクト（`%TEMP%\claude\labtest`）を作り、遷移・フォーム送信・トグル永続化の12項目を自動チェックする形にした。リポジトリ本体の依存は汚していない。

## 2026-06-12 ④ストーリービューアフェーズ

### Instagram挙動の実装方針
- カードデータは `StoryCategory.cards` として `lib/lab/content.ts` に追加（取得は引き続き `getLabContent()` 1関数）。
- 操作系：右2/3タップ＝進む / 左1/3タップ＝戻る / 横スワイプ / ←→キー / Esc＝閉じる / 6秒自動送り。最後のカードを送ると**次カテゴリへ**、最終カテゴリならトップへ戻る。
- `prefers-reduced-motion` では自動送りを止めて手動のみ（進行バーのアニメも全体ルールで止まる）。

### 詰まりやすいポイント：タップゾーンとCTAの重なり
- 透明のタップ送りゾーン（z-10）が全面にあるため、カード本文（z-20）は `pointer-events: none` で透過させ、**リンク（.s-cta）だけ `pointer-events: auto` で復活**させる構成にした。本文にリンクを足すときは同じ扱いが必要。

## 2026-06-12 ⑤PWA化フェーズ

### ライブラリ選定
- **next-pwa@5.6.0 を採用**：Next 14 + webpack で実績があり、`scope` で SW の支配範囲を /lab に限定でき、HP側に影響しないため（Serwist はビルド不調時の代替として温存）。
- 自動登録は使わず `register: false` ＋ `components/lab/PWARegister.tsx` で **/lab 配下からのみ** `scope:'/lab'` 指定で手動登録。HPのページはSW非制御（検証済み）。

### 詰まった点と解決（3連発）
1. **SWが install→redundant で死ぬ**：next-pwa@5 が App Router の `app-build-manifest.json` を precache に入れるが、このファイルは配信されず404→install失敗。`buildExcludes: [/app-build-manifest\.json$/]` で解決（既知問題）。
2. **precacheが2031件**：うち1833件は next/font が日本語フォントを分割した woff2 サブセット。全precacheは過剰なので `buildExcludes` で除外し、使った分だけ runtimeCaching（CacheFirst）に任せる。最終83件。
3. **「停止した」はずの本番サーバーが生き残る（Windows）**：タスク停止してもnode子プロセスがポート3000を握り続け、**古いビルドを配信**。新しい sw.js とチャンクのハッシュが食い違い404→install失敗。`netstat -ano | grep :3000` で実プロセスを確認してから kill すること。ビルド中に旧サーバーが動いているのもNG。

### その他のハマりどころ
- **ルートに `app/icon.png`（ファイル規約）があると `metadata.icons` は無視される**。apple-touch-icon は `app/(lab)/lab/apple-icon.png`（セグメントのファイル規約）で出力した。
- **Lighthouse 12以降はPWAカテゴリ自体が廃止**。受け入れ条件の「Lighthouse PWA項目」は最終対応版の **lighthouse@11.7.1 で計測し、スコア1.0（全項目PASS）**。installability の実体検証（manifest/アイコン/SW制御/オフライン）はPlaywrightでも別途確認済み。
- アイコンは `app/(lab)/rogo.png`（公式ロゴ）から Playwright スクショで生成（sharp等の依存追加を回避）。maskable はセーフゾーン内62%でロゴ配置。

## 2026-06-13 ⑥通知UI・総仕上げフェーズ

### 通知ガラの構成
- SW側：`worker/index.js` に push / notificationclick ハンドラを実装（next-pwa のカスタムワーカー規約で sw.js に自動同梱）。VAPID鍵が来れば配信側を足すだけで動く。
- クライアント側：`components/lab/usePushNotifications.ts` に許可フロー＋購読ガラ（VAPID鍵と保存先がTODO）。`urlBase64ToUint8Array` も準備済み。
- 設定画面：ONにする時に `Notification.requestPermission()`。許可が取れなければONにせず、状態（許可/ブロック/未対応）を文言で案内。

### 検証環境の教訓
- **Playwright の headless_shell は通知許可を grant しても `Notification.permission` が常に denied**。許可ありの経路は `channel: 'chrome'`（実Chrome）で検証すること。
- HP側 globals.css のリストリセットで `ol` の番号が消える。`.lab-card ol { list-style: decimal }` のような打ち消しが必要（今後もリスト系は要注意）。

### dev起動の警告解消
- browserslist / baseline-browser-mapping の「データが古い」警告は `npx update-browserslist-db` ＋ `npm update baseline-browser-mapping` で解消。`npm run dev` は無警告起動になった（`[PWA] PWA support is disabled` は開発モードの正常な情報ログ）。

## 受け入れ条件の達成状況（2026-06-13 時点・全て証拠ベースで確認済み）
- [x] `npm run dev` 無警告起動・トップ表示
- [x] トップ4ブロック（ヘッダー/ストーリーズ/フィード/固定バー）
- [x] 6カテゴリ・7画面（トップ/ストーリー/予約/面談/アイデア箱/歩き方/設定）遷移
- [x] 受講予約・イベント予約の外部リンク（URL一致をテストで担保）
- [x] PWAインストール可能（manifest+SW有効、lighthouse@11 PWAスコア1.0）
- [x] 375px崩れなし（全7ルートでscrollWidth=375）・フォーカス可視（3px outline）・reduced-motion尊重（自動送り停止）

## 未決事項（オーナー確認待ち）
- 面談申込フォームの送信先（TODO で止める）
- アイデア箱の送信先（TODO で止める）
- Web Push の VAPID キー発行（ガラのみ実装、TODO で止める）
