# なんでも展示会プラットフォーム Phase 1 — ビルドログ

実装日: 2026-06-12 / 実装: Claude (Fable 5)

## 0. 最重要の注記: schema_phase1.sql について

ブリーフに「添付: schema_phase1.sql（DBの正）」とあったが、**リポジトリ内・c:\dev 配下のどこにもファイルが存在しなかった**。
そのため、ブリーフ本文に明記された制約から [supabase/schema_phase1.sql](../supabase/schema_phase1.sql) を起こした:

- `comment_type` = cheer / review / question（厳守）
- `status` = pending / approved / rejected（厳守）
- INSERT トリガーで pending 固定（approved での INSERT は構造的に不可能）
- RPC `reaction_counts(p_work_id)` による集計

**正となるファイルが見つかったら、テーブル/カラム名の差分を必ず照合すること。**
（自分で決めた名前: `works.story_process / story_idea / story_struggle / story_learned`、
`author_tokens` テーブル分離、`reactions.visitor_hash`、`author_replies` など）

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

1. Supabase プロジェクト作成 → SQL Editor で `supabase/schema_phase1.sql` → `supabase/seed_phase1.sql` を実行
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

## 5. 検証結果（2026-06-12 実施）

### 実施できた検証 ✅
- `npx tsc --noEmit` … エラー 0
- `npm run build` … 成功（exit 0）。新ルートはすべて Dynamic(ƒ) として登録:
  `/futurecraft/Exhibition/[slug]`, `…/works/[workId]`, `/author/[token]`,
  `/admin` 一式, `/api/exhibition/comments`, `/api/exhibition/reactions`, `/api/author/reply`
- 本番サーバー（`next start`）+ Playwright（実ブラウザ）で確認:
  - LP の CTA「オンライン展示をみる」が描画され visible、href は
    `/futurecraft/Exhibition/nandemo-2026-07`（DOM アサーションで count=1 / visible=true）
  - robots.txt に `Disallow: /author/` と `Disallow: /admin/` が出力される
  - 既存LP・既存ページのビルドは無傷（全ルートがビルド成功）
- 補足: このサイトは SiteGrid が useSearchParams を使うため、静的ページも初期HTMLは
  シェルのみでボディはクライアント描画（既存からの挙動。今回の変更とは無関係）。

### 未実施（環境がないため不可能だった検証）⚠️
**Supabase プロジェクトが未作成（資格情報なし・Docker なしでローカルSupabaseも不可）のため、
実DBに対する以下は未検証。** 「やったつもり」報告を避けるため明記する:
- 承認前コメントが anon から見えないこと（RLS実証）
- pending固定トリガー、リアクションの1人1回、AI自動承認の実走

その代わり、資格情報を `.env.local` に入れた直後に
**`npm run verify:phase1` の1コマンドで上記すべてを自動実証できるスクリプト**
（[scripts/verify-phase1.mjs](../scripts/verify-phase1.mjs)）を用意した。
セットアップ手順（§3）の4番で必ず全OKを確認してから公開すること。
