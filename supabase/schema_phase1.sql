-- =============================================================================
-- なんでも展示会プラットフォーム Phase 1 スキーマ
-- =============================================================================
-- 注意: ブリーフ添付の schema_phase1.sql がリポジトリに見つからなかったため、
-- ブリーフ本文に明記された制約（enum値 / pending固定トリガー / RPC reaction_counts）
-- から起こしたものです。正となるファイルが見つかった場合は差分を確認してください。
--
-- 設計原則:
--   1. コメントは必ず pending で生まれる（トリガーで強制）
--   2. 限定URLトークンは専用テーブルに分離し、anon からは一切読めない
--   3. リアクション集計は RPC 経由のみ。個人を識別する情報は返さない
--   4. anon に見えるのは「公開済み展示会 / 公開済み作品 / approved コメント」だけ
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- enum
-- ---------------------------------------------------------------------------
do $$ begin
  create type comment_type as enum ('cheer', 'review', 'question');
exception when duplicate_object then null; end $$;

do $$ begin
  create type content_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- exhibitions: 開催回（「なんでも展示会」は継続プラットフォーム上の1開催回）
-- ---------------------------------------------------------------------------
create table if not exists exhibitions (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  description  text,
  is_published boolean not null default false,
  starts_at    timestamptz,
  ends_at      timestamptz,
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- works: 作品
-- ---------------------------------------------------------------------------
create table if not exists works (
  id             uuid primary key default gen_random_uuid(),
  exhibition_id  uuid not null references exhibitions(id) on delete cascade,
  title          text not null,
  author_name    text not null,            -- ニックネーム（本名は入れない運用）
  author_note    text,                     -- 学年など任意の補足（例: 小3）
  video_url      text,                     -- YouTube URL
  photos         jsonb not null default '[]'::jsonb,  -- 画像URLの配列
  story_process  text,                     -- どうやって作ったか
  story_idea     text,                     -- 工夫したところ
  story_struggle text,                     -- 苦労したところ
  story_learned  text,                     -- 学んだこと・気づき
  is_published   boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

create index if not exists works_exhibition_idx on works (exhibition_id, sort_order);

-- ---------------------------------------------------------------------------
-- author_tokens: 作者ページの限定URLトークン（anon から読めない専用テーブル）
-- ---------------------------------------------------------------------------
create table if not exists author_tokens (
  work_id    uuid primary key references works(id) on delete cascade,
  token      text not null unique default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- reaction_kinds: 顔文字リアクションの種類（運営が管理）
-- ---------------------------------------------------------------------------
create table if not exists reaction_kinds (
  id         uuid primary key default gen_random_uuid(),
  emoji      text not null,                -- 顔文字そのもの 例: (≧▽≦)
  label      text not null,                -- 意味 例: すごい！
  is_active  boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- reactions: リアクション実体（visitor_hash はランダムIDのハッシュ。PIIなし）
-- ---------------------------------------------------------------------------
create table if not exists reactions (
  id           uuid primary key default gen_random_uuid(),
  work_id      uuid not null references works(id) on delete cascade,
  kind_id      uuid not null references reaction_kinds(id) on delete cascade,
  visitor_hash text not null,
  created_at   timestamptz not null default now(),
  unique (work_id, kind_id, visitor_hash)  -- 同じ顔文字は1人1回
);

create index if not exists reactions_work_idx on reactions (work_id);

-- ---------------------------------------------------------------------------
-- comments: コメント（必ず pending で生まれる）
-- ---------------------------------------------------------------------------
create table if not exists comments (
  id           uuid primary key default gen_random_uuid(),
  work_id      uuid not null references works(id) on delete cascade,
  comment_type comment_type not null,
  body         text not null check (char_length(body) between 1 and 1000),
  display_name text check (char_length(display_name) <= 30),
  status       content_status not null default 'pending',
  moderation   jsonb,                      -- {decision, reasons, model, at} AI判定ログ
  created_at   timestamptz not null default now(),
  approved_at  timestamptz
);

create index if not exists comments_work_status_idx on comments (work_id, status);
create index if not exists comments_status_idx on comments (status, created_at);

-- INSERT時に status を pending に強制（approved での直接INSERTを構造的に不可能にする）
create or replace function force_comment_pending()
returns trigger
language plpgsql
as $$
begin
  new.status := 'pending';
  new.approved_at := null;
  return new;
end;
$$;

drop trigger if exists comments_force_pending on comments;
create trigger comments_force_pending
  before insert on comments
  for each row execute function force_comment_pending();

-- ---------------------------------------------------------------------------
-- author_replies: 作者の返信（公開済みコメントへのみ表示される）
-- ---------------------------------------------------------------------------
create table if not exists author_replies (
  id         uuid primary key default gen_random_uuid(),
  comment_id uuid not null references comments(id) on delete cascade,
  body       text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists author_replies_comment_idx on author_replies (comment_id);

-- ---------------------------------------------------------------------------
-- RPC: リアクション集計（個人識別情報を一切返さない）
-- ---------------------------------------------------------------------------
create or replace function reaction_counts(p_work_id uuid)
returns table (kind_id uuid, emoji text, label text, count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select rk.id, rk.emoji, rk.label, count(r.id)::bigint
  from reaction_kinds rk
  left join reactions r
    on r.kind_id = rk.id and r.work_id = p_work_id
  where rk.is_active
  group by rk.id, rk.emoji, rk.label, rk.sort_order
  order by rk.sort_order;
$$;

grant execute on function reaction_counts(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table exhibitions    enable row level security;
alter table works          enable row level security;
alter table author_tokens  enable row level security;
alter table reaction_kinds enable row level security;
alter table reactions      enable row level security;
alter table comments       enable row level security;
alter table author_replies enable row level security;

-- 公開読み取り（anon）
drop policy if exists exhibitions_public_read on exhibitions;
create policy exhibitions_public_read on exhibitions
  for select to anon using (is_published);

drop policy if exists works_public_read on works;
create policy works_public_read on works
  for select to anon using (
    is_published
    and exists (
      select 1 from exhibitions e
      where e.id = works.exhibition_id and e.is_published
    )
  );

drop policy if exists reaction_kinds_public_read on reaction_kinds;
create policy reaction_kinds_public_read on reaction_kinds
  for select to anon using (is_active);

-- コメントは approved だけが見える
drop policy if exists comments_public_read on comments;
create policy comments_public_read on comments
  for select to anon using (
    status = 'approved'
    and exists (
      select 1 from works w
      join exhibitions e on e.id = w.exhibition_id
      where w.id = comments.work_id and w.is_published and e.is_published
    )
  );

-- 作者返信は親コメントが approved のときだけ見える
drop policy if exists author_replies_public_read on author_replies;
create policy author_replies_public_read on author_replies
  for select to anon using (
    exists (
      select 1 from comments c
      where c.id = author_replies.comment_id and c.status = 'approved'
    )
  );

-- author_tokens / reactions には anon ポリシーなし＝anon からは一切見えない。
-- 書き込みはすべてサーバー（service role）経由。anon にINSERT/UPDATE/DELETEポリシーは付与しない。

-- 運営（authenticated = Supabase Authでログインした運営アカウント）は全テーブル操作可
drop policy if exists exhibitions_admin_all on exhibitions;
create policy exhibitions_admin_all on exhibitions
  for all to authenticated using (true) with check (true);

drop policy if exists works_admin_all on works;
create policy works_admin_all on works
  for all to authenticated using (true) with check (true);

drop policy if exists author_tokens_admin_all on author_tokens;
create policy author_tokens_admin_all on author_tokens
  for all to authenticated using (true) with check (true);

drop policy if exists reaction_kinds_admin_all on reaction_kinds;
create policy reaction_kinds_admin_all on reaction_kinds
  for all to authenticated using (true) with check (true);

drop policy if exists reactions_admin_read on reactions;
create policy reactions_admin_read on reactions
  for select to authenticated using (true);

drop policy if exists comments_admin_all on comments;
create policy comments_admin_all on comments
  for all to authenticated using (true) with check (true);

drop policy if exists author_replies_admin_all on author_replies;
create policy author_replies_admin_all on author_replies
  for all to authenticated using (true) with check (true);
