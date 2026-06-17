-- =============================================================
-- CLAFTオンライン展示会プラットフォーム
-- Phase 1 データベーススキーマ（Supabase / PostgreSQL）
--
-- 安全設計の原則：
--   閲覧者(anon)にできるのは
--     ・公開中/終了済みの展示会・作品・承認済みコメントの「閲覧」
--     ・コメント投稿（pending固定）・リアクション投稿
--   だけ。
--   承認・作者返信・限定URLトークン解決・AI一次審査は
--   すべてサーバー側(service role)で行う。
-- =============================================================

create extension if not exists pgcrypto;  -- gen_random_uuid() 用

-- =========================================================
-- 1. 展示会（継続プラットフォーム：複数回まわせる）
-- =========================================================
create table exhibitions (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  slug       text not null unique,
  theme      text,
  status     text not null default 'draft'
             check (status in ('draft','open','closed')),
  opens_at   timestamptz,
  closes_at  timestamptz,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 2. リアクションの種類（展示会ごとに変えられる・顔文字ベース）
--    label は任意。あえて null にして「解釈の余白」を残せる。
-- =========================================================
create table reaction_types (
  id            uuid primary key default gen_random_uuid(),
  exhibition_id uuid not null references exhibitions(id) on delete cascade,
  emoji         text not null,   -- 例: (^^)  (≧▽≦)  (・o・)  (๑˃̵ᴗ˂̵)
  label         text,            -- 任意。null なら意味を見る側に委ねる
  sort_order    int  not null default 0
);
create index on reaction_types (exhibition_id);

-- =========================================================
-- 3. 作品（※ 限定URLトークンはここに置かない＝漏洩防止）
-- =========================================================
create table works (
  id              uuid primary key default gen_random_uuid(),
  exhibition_id   uuid not null references exhibitions(id) on delete cascade,
  title           text not null,
  author_nickname text not null,
  genre           text,
  thumbnail_url   text,
  youtube_url     text,
  author_intro    text,
  story_made      text,   -- 制作ストーリー
  story_devised   text,   -- 工夫したこと
  story_struggled text,   -- 苦労したこと
  story_learned   text,   -- 学んだこと
  created_at      timestamptz not null default now()
);
create index on works (exhibition_id);

-- =========================================================
-- 4. 限定URLトークン（anonは一切アクセス不可）
--    作者ページ /author/[token] の解決はサーバー側のみ
-- =========================================================
create table work_access_tokens (
  work_id uuid primary key references works(id) on delete cascade,
  token   text not null unique
);

-- =========================================================
-- 5. 作品写真
-- =========================================================
create table work_images (
  id         uuid primary key default gen_random_uuid(),
  work_id    uuid not null references works(id) on delete cascade,
  url        text not null,
  sort_order int  not null default 0
);
create index on work_images (work_id);

-- =========================================================
-- 6. リアクション（タップ式・顔文字）
-- =========================================================
create table reactions (
  id                 uuid primary key default gen_random_uuid(),
  work_id            uuid not null references works(id) on delete cascade,
  reaction_type_id   uuid not null references reaction_types(id) on delete cascade,
  viewer_fingerprint text not null,
  created_at         timestamptz not null default now(),
  unique (work_id, reaction_type_id, viewer_fingerprint)  -- 連打防止
);
create index on reactions (work_id);

-- =========================================================
-- 7. コメント（公開前承認）
-- =========================================================
create table comments (
  id              uuid primary key default gen_random_uuid(),
  work_id         uuid not null references works(id) on delete cascade,
  comment_type    text not null
                  check (comment_type in ('cheer','review','question')), -- 応援/感想/質問
  body            text not null,
  viewer_nickname text,
  status          text not null default 'pending'
                  check (status in ('pending','approved','rejected')),
  ai_flag         jsonb,   -- AI一次審査の検出理由（暴言/個人情報/不適切表現など）
  created_at      timestamptz not null default now(),
  reviewed_at     timestamptz
);
create index on comments (work_id, status);

-- 投稿時に status を強制（anonが「承認済み」で割り込めないように）
create or replace function force_pending_comment()
returns trigger language plpgsql as $$
begin
  new.status      := 'pending';
  new.ai_flag     := null;
  new.reviewed_at := null;
  return new;
end;
$$;
create trigger trg_force_pending
  before insert on comments
  for each row execute function force_pending_comment();

-- =========================================================
-- 8. 作者の返信（投稿はサーバー側 service role で行う）
-- =========================================================
create table author_replies (
  id         uuid primary key default gen_random_uuid(),
  comment_id uuid not null references comments(id) on delete cascade,
  body       text not null,
  status     text not null default 'approved'
             check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
create index on author_replies (comment_id);

-- =========================================================
-- 9. AIによる質問整理（Phase 2 で使用）
-- =========================================================
create table ai_summaries (
  id           uuid primary key default gen_random_uuid(),
  work_id      uuid not null references works(id) on delete cascade,
  summary_json jsonb not null,
  generated_at timestamptz not null default now()
);
create index on ai_summaries (work_id);

-- =============================================================
-- RLS（行レベルセキュリティ）
--   service role はRLSをバイパスする＝承認・返信・トークン解決・
--   AI審査はサーバー側で安全に行える。ここでは anon の最小権限だけ定義。
-- =============================================================
alter table exhibitions        enable row level security;
alter table reaction_types     enable row level security;
alter table works              enable row level security;
alter table work_access_tokens enable row level security;
alter table work_images        enable row level security;
alter table reactions          enable row level security;
alter table comments           enable row level security;
alter table author_replies     enable row level security;
alter table ai_summaries       enable row level security;

-- 展示会：公開中・終了済みのみ閲覧可
create policy "anon read visible exhibitions"
  on exhibitions for select to anon
  using (status in ('open','closed'));

-- リアクション種類：公開中・終了済み展示会のもののみ閲覧可
create policy "anon read reaction_types"
  on reaction_types for select to anon
  using (exists (
    select 1 from exhibitions e
    where e.id = reaction_types.exhibition_id
      and e.status in ('open','closed')
  ));

-- 作品：公開中・終了済み展示会の作品のみ閲覧可
create policy "anon read works"
  on works for select to anon
  using (exists (
    select 1 from exhibitions e
    where e.id = works.exhibition_id
      and e.status in ('open','closed')
  ));

-- 作品写真：閲覧可能な作品に紐づくもののみ
create policy "anon read work_images"
  on work_images for select to anon
  using (exists (
    select 1 from works w
    join exhibitions e on e.id = w.exhibition_id
    where w.id = work_images.work_id
      and e.status in ('open','closed')
  ));

-- 限定URLトークン：anon向けポリシーを作らない＝全拒否。
--   → サーバー側 service role のみが参照する。

-- リアクション：投稿のみ許可（素データは読ませない。集計は下の関数で）
create policy "anon insert reactions"
  on reactions for insert to anon with check (true);

-- コメント：承認済みのみ閲覧可／投稿は pending 強制（トリガーと二重に担保）
create policy "anon read approved comments"
  on comments for select to anon
  using (status = 'approved');
create policy "anon insert pending comments"
  on comments for insert to anon
  with check (status = 'pending');

-- 作者の返信：承認済みのみ閲覧可
create policy "anon read approved replies"
  on author_replies for select to anon
  using (status = 'approved');

-- AI要約：閲覧可（作品ページで表示）。書き込みはサーバー側のみ
create policy "anon read ai_summaries"
  on ai_summaries for select to anon using (true);

-- =========================================================
-- リアクション集計（fingerprintを公開せず、件数だけ返す）
--   クライアントは自分のfingerprintを知っているので
--   重複投稿は unique 制約で弾く（onConflict は無視でOK）。
-- =========================================================
create or replace function reaction_counts(p_work_id uuid)
returns table (reaction_type_id uuid, cnt bigint)
language sql stable security definer set search_path = public as $$
  select reaction_type_id, count(*)::bigint
  from reactions
  where work_id = p_work_id
  group by reaction_type_id;
$$;
grant execute on function reaction_counts(uuid) to anon;
