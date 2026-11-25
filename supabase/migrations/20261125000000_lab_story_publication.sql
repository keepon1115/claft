create table public.lab_story_publication (
  id integer primary key check (id = 1),
  revision integer not null default 0 check (revision >= 0),
  categories jsonb check (categories is null or jsonb_typeof(categories) = 'array')
);

insert into public.lab_story_publication (id) values (1);

alter table public.lab_story_publication enable row level security;
revoke all on public.lab_story_publication from public, anon, authenticated;
grant select on public.lab_story_publication to anon, authenticated;
grant select, update on public.lab_story_publication to service_role;
create policy "Read published lab stories" on public.lab_story_publication
  for select to anon, authenticated using (true);

create table public.lab_story_editors (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.lab_story_editors enable row level security;
revoke all on public.lab_story_editors from public, anon, authenticated;
grant select on public.lab_story_editors to authenticated;
create policy "Read own lab editor access" on public.lab_story_editors
  for select to authenticated using ((select auth.uid()) = user_id);
