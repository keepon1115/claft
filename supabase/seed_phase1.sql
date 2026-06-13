-- =============================================================================
-- 開発確認用シードデータ（展示会1件＋作品3件＋顔文字リアクション4種）
-- schema_phase1.sql 適用後に実行してください。
-- 実データ投入前に truncate して入れ替えられるよう、固定UUIDを使っています。
-- =============================================================================

-- 顔文字リアクション 4種
insert into reaction_kinds (id, emoji, label, is_active, sort_order) values
  ('a1000000-0000-4000-8000-000000000001', '(≧▽≦)',   'すごい！',     true, 1),
  ('a1000000-0000-4000-8000-000000000002', '(*´ω｀*)', 'ほっこり',     true, 2),
  ('a1000000-0000-4000-8000-000000000003', 'Σ(ﾟДﾟ)',   'びっくり！',   true, 3),
  ('a1000000-0000-4000-8000-000000000004', '(｀･ω･´)ゞ', 'がんばったね', true, 4)
on conflict (id) do nothing;

-- 展示会（公開済み）
insert into exhibitions (id, slug, title, description, is_published, starts_at) values
  ('e1000000-0000-4000-8000-000000000001',
   'nandemo-2026-07',
   'なんでも展示会 2026夏',
   '自分の好きなモノ、得意なこと、自由研究、おもしろい遊び、旅行の思い出 ── なんでも自由に伝えられるオンライン展示会です。',
   true,
   '2026-07-26T00:00:00+09:00')
on conflict (id) do nothing;

-- 作品3件
insert into works (id, exhibition_id, title, author_name, author_note, video_url, photos,
                   story_process, story_idea, story_struggle, story_learned, is_published, sort_order) values
  ('c1000000-0000-4000-8000-000000000001',
   'e1000000-0000-4000-8000-000000000001',
   'うちのウサギ、もちこの観察日記',
   'ゆうき', '小3',
   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   '["https://images.unsplash.com/photo-1535241749838-299277b6305f?w=1200&q=80"]'::jsonb,
   '毎日もちこの様子をノートに書いて、1か月分をまとめました。',
   '食べたものと機嫌の関係をグラフにしてみたところ。',
   '夜行性だから、観察する時間を合わせるのが大変でした。',
   'ウサギは耳で気持ちがわかること。',
   true, 1),
  ('c1000000-0000-4000-8000-000000000002',
   'e1000000-0000-4000-8000-000000000001',
   'マイクラでつくった空中都市',
   'はると', '小5',
   'https://youtu.be/jNQXAC9IVRw',
   '["https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=80","https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80"]'::jsonb,
   '設計図を紙に描いてから、3週間かけて建てました。',
   '水路で街全体をつないで、ボートで移動できるようにしたこと。',
   '高いところの建築で何回も落ちました。',
   '先に設計図を描くと、迷わずに作れること。',
   true, 2),
  ('c1000000-0000-4000-8000-000000000003',
   'e1000000-0000-4000-8000-000000000001',
   'はじめてのひとりバンド演奏',
   'みお', '中1',
   null,
   '["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80","https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80"]'::jsonb,
   'ギター、ピアノ、歌を別々に録音して、アプリで重ねました。',
   'サビだけ自分でハモリを入れたところ。',
   'リズムを合わせるのが難しくて、20回以上録り直しました。',
   '失敗しても録り直せばいい、と思えるようになったこと。',
   true, 3)
on conflict (id) do nothing;

-- 作者ページ限定URLトークン（開発用に固定値。本番では自動生成に任せる）
insert into author_tokens (work_id, token) values
  ('c1000000-0000-4000-8000-000000000001', 'dev-token-mochiko-0001'),
  ('c1000000-0000-4000-8000-000000000002', 'dev-token-midair-0002'),
  ('c1000000-0000-4000-8000-000000000003', 'dev-token-band-0003')
on conflict (work_id) do nothing;

-- 動作確認用コメント:
--   1件は承認済み（トリガーで pending 固定のため、INSERT後にUPDATEで承認する）
--   1件は pending のまま（anon から見えないことの確認用）
insert into comments (id, work_id, comment_type, body, display_name) values
  ('d1000000-0000-4000-8000-000000000001',
   'c1000000-0000-4000-8000-000000000001',
   'cheer', 'グラフにしたのがすごい！もちこのジャンプも見たいです。', 'たろう')
on conflict (id) do nothing;

update comments
set status = 'approved', approved_at = now(),
    moderation = '{"decision":"pass","reasons":[],"model":"seed"}'::jsonb
where id = 'd1000000-0000-4000-8000-000000000001';

insert into comments (id, work_id, comment_type, body, display_name) values
  ('d1000000-0000-4000-8000-000000000002',
   'c1000000-0000-4000-8000-000000000001',
   'question', '（これは承認待ちのまま残す確認用コメント）', null)
on conflict (id) do nothing;

-- 承認済みコメントへの作者返信
insert into author_replies (id, comment_id, body) values
  ('f1000000-0000-4000-8000-000000000001',
   'd1000000-0000-4000-8000-000000000001',
   'ありがとう！こんどジャンプの動画もとってみます。')
on conflict (id) do nothing;
