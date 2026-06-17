# なんでも展示会プラットフォーム Phase 1 — ビルドログ

実装日: 2026-06-12 / 実装: Claude (Fable 5)

## 0. 最重要の経緯: schema_phase1.sql の正本化（2026-06-13 更新）

当初ブリーフ添付の schema_phase1.sql が見つからず、制約から自作スキーマを起こして全実装した。
その後ユーザーが**正本** `app/(site)/futurecraft/Exhibition/schema_phase1.sql` を提示。
正本に厳密準拠する方針が確定し、**自作スキーマは破棄、全アプリコードを正本のテーブル/カラム名に移行した。**

正本と自作の主な差分（移行で吸収済み）:
| 項目 | 正本（採用） | 自作（破棄） |
|---|---|---|
| enum | text + CHECK | create type enum |
| 展示会公開 | `status` draft/open/closed | is_published bool |
| リアクション種類 | `reaction_types`（**展示会ごと**） | reaction_kinds（グローバル） |
| 写真 | `work_images` 別テーブル | works.photos jsonb |
| 作者名 | `author_nickname` | author_name |
| 動画 | `youtube_url` | video_url |
| トークン | `work_access_tokens` | author_tokens |
| リアクション本体 | `reaction_type_id` / `viewer_fingerprint` | kind_id / visitor_hash |
| コメント | `viewer_nickname` / `ai_flag` / `reviewed_at` | display_name / moderation / approved_at |
| 集計RPC返り値 | `(reaction_type_id, cnt)` | (kind_id, emoji, label, count) |
| 作者返信 | `status` あり | なし |

正本の MCP 適用は `apply_migration`（migration名: `exhibition_phase1_schema`）で実施。
シードは [supabase/seed_phase1.sql](../supabase/seed_phase1.sql)（正本準拠に書き直し済み）。

### 正本で「やらない」と確定した機能（ユーザー判断: 正本に厳密準拠）
- **作品個別の公開/非公開フラグはなし**。作品の公開可否は展示会 `status` で一括制御。
- リアクション種類は**展示会ごと**管理（管理画面もそれに合わせた）。

### 正本ならではの設計（自作と異なる重要点）
- **anon の直接 INSERT を許可**（comments は `with check(status='pending')`、reactions は許可）。
  だが本実装はコメント/リアクションとも**APIルート（service role）経由**を使う
  （AIモデレーション・fingerprint秘匿のため）。RLSの anon INSERT は最後の保険として残る。
- BEFORE トリガー `force_pending_comment` が status を pending に矯正 → その後 RLS WITH CHECK 評価。
  この順序のため、anon が `status='approved'` を指定して投稿しても**pendingとして入る**（=安全）。
  検証スクリプトはこの挙動を踏まえた内容に修正済み（§5）。

## 1. アーキテクチャ判断

### 限定URLトークンを別テーブル `author_tokens` に分離した理由
Postgres の RLS は行単位でカラム単位ではない。`works` にトークン列を持たせると
anon の SELECT ポリシーでトークンまで見えてしまう。別テーブルにして anon ポリシーを
一切張らないことで「トークンはサーバー（service role）でしか解決できない」を構造で保証した。

### 書き込みはすべて API ルート（service role）経由
- コメント INSERT: anon に INSERT ポリシーを張らず、`/api/exhibition/comments` で
  service role により挿入 → AIモデレーション → pass なら approved に UPDATE。
  トリガー（pending 固定）は service role にも効くため、多層防御になっている。
- リアクション: httpOnly クッキーの匿名UUID → SHA-256 ハッシュだけを DB に保存。
  「1人1回」は unique 制約 `(work_id, kind_id, visitor_hash)`。連打してもDBレベルで1回に収束。
  もう一度押すと取り消し（トグル）。集計は RPC のみで、個別行・ハッシュは anon に出ない。

### 運営の認可モデル（Phase 1 の割り切り）
「authenticated = 運営」とした。Supabase Auth でアカウントを作るのは運営だけという前提。
**Supabase ダッシュボードで Sign-up を無効化（Authentication → Providers → Email → Disable signup）すること。**
将来一般ユーザーのログインが必要になったら、roles テーブル＋ポリシー変更が必要。

### 作者ページに pending コメントを出さない
作者ページ（/author/[token]）には approved コメントだけを表示する。
理由: pending はモデレーション前であり、見せると「コメントが子どもに直接届く前に検査する」
という安全設計が崩れるため。「子どもが安心して挑戦を出せるか」を判断基準にした。

### AIモデレーション
- モデル: `claude-haiku-4-5`（ブリーフ指定の「速くて安いHaiku系」。claude-apiスキルの
  最新モデル表で文字列を確認済み。日付サフィックスは付けない）
- 保守的設計: APIキー未設定・通信エラー・JSONパース失敗・decision不正 → すべて flag
  （= pending のまま運営承認待ち）。「迷ったら flag」をコードレベルでも徹底。
- 判定ログは `comments.moderation` (jsonb) に保存し、管理画面で理由を表示。

### 認証まわり（@supabase/ssr）
middleware は導入せず、RSC では cookie 読み取りのみ・書き込みはサーバーアクション内で行う。
セッション期限切れ時は `getUser()` が null → /admin/login へリダイレクト（再ログイン）。
Phase 1 の運営人数なら十分。頻繁に切れて困るようなら middleware でのトークンリフレッシュを追加する。

### デザインの切り出し
既存LP `NandemoTenjikaiContent.tsx` の styled-jsx から、共通部分
（フォント・paper-grain・reveal・付箋・リボン等）を
[components/exhibition/ExhibitionShell.tsx](../components/exhibition/ExhibitionShell.tsx) に切り出した。
**LP自体は CTA ボタン追加以外いじっていない**（壊さないことを優先し、LPのスタイルは重複のまま）。
LPを後でシェルに乗せ替えるのは任意。

### 動画・画像の軽量化
- 動画: `LiteYouTube` — 初期表示は `i.ytimg.com` のサムネ画像のみ。クリックで初めて
  iframe（youtube-nocookie.com）を生成。
- 写真: `loading="lazy"`。next/image は `images.unoptimized` 構成のため素の img を使用
  （既存コードベースの流儀にも一致）。

## 2. ルーティング（ブリーフ提案どおり）

| パス | 内容 |
|---|---|
| `/futurecraft/Exhibition` | 既存LP（CTAから一覧へ） |
| `/futurecraft/Exhibition/[slug]` | 作品一覧（例: nandemo-2026-07） |
| `/futurecraft/Exhibition/[slug]/works/[workId]` | 作品詳細 |
| `/author/[token]` | 作者ページ（noindex + robots.txt disallow） |
| `/admin/login`, `/admin`, `/admin/exhibitions`, `/admin/exhibitions/[id]`, `/admin/reactions` | 運営 |
| `/api/exhibition/comments` `/api/exhibition/reactions` `/api/author/reply` | API |

## 3. セットアップ手順（運用者向け）

1. スキーマ＝正本 `app/(site)/futurecraft/Exhibition/schema_phase1.sql`。
   （本プロジェクトは MCP の `apply_migration` で適用済み。別環境では SQL Editor で正本→`supabase/seed_phase1.sql`）
2. Authentication → Providers → Email: **Disable signup** にし、運営アカウントは
   ダッシュボードの「Add user」で作成
3. `.env.local` に4変数を設定（`.env.example` 参照）
4. `node scripts/verify-phase1.mjs` で RLS/トリガーの安全検証（全OKを確認してから公開）
5. `npm run dev` → http://localhost:3002/futurecraft/Exhibition/nandemo-2026-07
6. 作者ページ動作確認: `/author/dev-token-mochiko-0001`（シードの固定トークン）

⚠️ デプロイ先は Node サーバー必須（Vercel等）。GitHub Pages 等の静的ホスティングでは
API ルート・サーバーアクションが動かない。

## 4. つまずき・教訓

- **添付ファイル欠落**: schema_phase1.sql が無かった。推測でブリーフ制約から起こし、
  この注記を最上部に置いた。「正がない場合は、制約を満たす最小設計＋差分照合の導線」で前進。
- **Docker なし**: ローカル Supabase が立てられず、実DBでの anon 検証は
  `scripts/verify-phase1.mjs` として「資格情報を入れたら1コマンドで実証できる」形に倒した。
- **'use client' からの関数 re-export**: `extractYouTubeId` を LiteYouTube（client）に置くと
  RSC から import できないため、`lib/exhibition/youtube.ts` に分離。
- **RLS はカラム単位でない** → author_tokens テーブル分離（上述）。

## 5. 検証結果（2026-06-13 実DBで実施）

MCP経由で Supabase（project ref: vfxvcmympnugluqfqgks）に正本スキーマ＋シードを適用し、
**実DBに対して**検証した。

### 実施できた検証 ✅
- `npx tsc --noEmit` … エラー 0
- `npm run build` … 成功（exit 0）。新ルートはすべて Dynamic(ƒ) として登録。既存ページ無傷。
- **`node scripts/verify-phase1.mjs`（anon実キーで実DB）… 全項目合格**:
  - A: anon には approved コメントだけが見える（pending非表示）
  - A2: シードの pending コメントは ID 直撃でも見えない
  - B: anon から work_access_tokens（限定URLトークン）は読めない
  - C: anon から reactions の生データ（viewer_fingerprint）は読めない
  - D: reaction_counts RPC は anon で使え、返り値は reaction_type_id/cnt のみ（PIIなし）
  - E1: anon が status=approved を指定しても公開コメントは増えない（pendingに矯正）
  - E2: anon が投稿したコメントは anon から一切見えない
  - E3: anon は pending コメントを approved に書き換えられない
  - F（トリガー）は service_role キー未投入のため SKIP（キー投入後に自動実行される）
- 本番サーバー（`next start`）+ Playwright（実ブラウザ・実DBデータ）で確認:
  - 作品一覧に実DBの3作品が描画、作品カードリンク3つ
  - 作品詳細: 制作ストーリー／リアクション4種／承認済みコメント本文／作者返信が描画され、
    **pendingコメントはページに出ない**
  - LP の CTA「オンライン展示をみる」は前回確認済み（href=nandemo-2026-07, visible）
  - robots.txt に `/author/` `/admin/` の Disallow

### Supabase security advisor の指摘（いずれも正本設計どおり・対応方針）
- `work_access_tokens` RLSポリシーなし → **意図どおり**（anon全拒否）。INFO。
- `reactions` の anon INSERT が `with_check(true)` → 正本の設計（anon直投稿許可）。本実装はAPI経由。
- `reaction_counts` が SECURITY DEFINER で anon 実行可 → **意図どおり**（集計公開・fingerprint秘匿）。
- `force_pending_comment` の search_path 未設定 → WARN。正本厳守のため未変更（無害な強化は将来任意）。

### キー投入後に動く（現状 service_role 未投入のため未確認）⚠️
service_role / ANTHROPIC_API_KEY は MCP で取得できない秘匿値のため `.env.local` 空欄。
これらは**運用者が手動投入**する。投入後に動く＝現時点で実ブラウザ未確認なのは:
- 作者ページ `/author/[token]`（service roleでトークン解決するため、未投入だとエラー）
- 管理画面の表示・操作（承認/却下/展示会・作品・リアクション管理）
- コメント投稿→AIモデレーション、リアクション書き込み、作者返信（書き込み系API全般）

→ service_role と ANTHROPIC_API_KEY を入れて `npm run verify:phase1` を再実行（F含め全OK）、
   その後 `/admin` ログイン・作者ページ・コメント投稿を一通り通せば全機能の実証完了。
