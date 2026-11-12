import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { CommentType } from '@/lib/exhibition/types';
import { COMMENT_TYPE_META } from '@/lib/exhibition/types';
import { approveComment, rejectComment } from '../actions';

export const dynamic = 'force-dynamic';

interface PendingComment {
  id: string;
  comment_type: CommentType;
  body: string;
  viewer_nickname: string | null;
  created_at: string;
  ai_flag: { decision?: string; reasons?: string[] } | null;
  status: 'pending' | 'approved' | 'rejected';
  works: { title: string; author_nickname: string; exhibitions: { title: string } | null } | null;
}

const STATUS_LABELS = { pending: '承認待ち', approved: '承認済み', rejected: '却下済み' };
const PAGE_SIZE = 50;

export default async function ModerationQueuePage({
  searchParams,
}: {
  searchParams: { exhibition?: string; status?: string; page?: string };
}) {
  const supabase = getAdminClient();
  const { data: exhibitions, error: exhibitionsError } = await supabase
    .from('exhibitions')
    .select('id, title')
    .order('created_at', { ascending: false });
  const exhibition = exhibitions?.find((e) => e.id === searchParams.exhibition)?.id ?? '';
  const status = searchParams.status && ['all', ...Object.keys(STATUS_LABELS)].includes(searchParams.status)
    ? searchParams.status
    : 'pending';
  const requestedPage = Number(searchParams.page ?? 1);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  let query = supabase
    .from('comments')
    .select('id, comment_type, body, viewer_nickname, created_at, ai_flag, status, works!inner(title, author_nickname, exhibition_id, exhibitions(title))', { count: 'exact' });
  if (exhibition) query = query.eq('works.exhibition_id', exhibition);
  if (status !== 'all') query = query.eq('status', status);
  const { data, error: commentsError, count } = await query
    .order('created_at', { ascending: status === 'pending' })
    .order('id', { ascending: true })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  const error = exhibitionsError ?? commentsError;
  const pageHref = (next: number) => `/admin?${new URLSearchParams({ exhibition, status, page: String(next) })}`;

  const pending = (data ?? []) as unknown as PendingComment[];

  return (
    <div>
      <h1 className="mb-1 text-lg font-bold text-[#1F1810]">コメント管理</h1>
      <p className="mb-6 text-xs text-[#1F1810]/60">
        展示会ごとにコメントを確認できます。「承認待ち」はAIが要確認と判定した、または自動承認をスキップしたコメントです。
      </p>

      <form action="/admin" method="get" className="mb-6 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">
          展示会
          <select name="exhibition" defaultValue={exhibition} className="max-w-full rounded-lg border border-[#1F1810]/25 bg-white p-2">
            <option value="">すべての展示会</option>
            {exhibitions?.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          承認状況
          <select name="status" defaultValue={status} className="rounded-lg border border-[#1F1810]/25 bg-white p-2">
            <option value="all">すべて</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <button type="submit" className="rounded-full bg-[#2E7D7D] px-5 py-2 text-sm font-bold text-white">表示する</button>
      </form>
      {!error && <p className="mb-4 text-sm text-[#1F1810]/60">{count ?? 0}件（{page}ページ目）</p>}

      {error && (
        <p className="rounded-lg bg-[#E04E2C]/10 px-4 py-3 text-sm text-[#E04E2C]">
          読み込みに失敗しました: {error.message}
        </p>
      )}

      {!error && pending.length === 0 && (
        <p className="rounded-xl border-2 border-dashed border-[#1F1810]/20 p-10 text-center text-sm text-[#1F1810]/50">
          この条件に一致するコメントはありません。
        </p>
      )}

      <div className="space-y-4">
        {pending.map((c) => (
          <article key={c.id} className="rounded-xl border border-[#1F1810]/15 bg-white p-5">
            <header className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[#1F1810]/60">
              <span>{c.works?.exhibitions?.title ?? '展示会不明'}</span>
              <span>{STATUS_LABELS[c.status]}</span>
              <span className="rounded-full bg-[#2E7D7D]/10 px-2 py-0.5 font-medium text-[#2E7D7D]">
                {COMMENT_TYPE_META[c.comment_type].label}
              </span>
              <span>宛先: {c.works ? `${c.works.title}（${c.works.author_nickname}）` : '不明な作品'}</span>
              <span>投稿者: {c.viewer_nickname || 'ななし'}</span>
              <time>{new Date(c.created_at).toLocaleString('ja-JP')}</time>
            </header>

            <p className="whitespace-pre-wrap rounded-lg bg-[#FFF8EC] p-4 text-sm leading-relaxed text-[#1F1810]">
              {c.body}
            </p>

            {c.ai_flag?.reasons && c.ai_flag.reasons.length > 0 && (
              <p className="mt-2 text-xs text-[#E04E2C]">
                AI判定理由: {c.ai_flag.reasons.join(' / ')}
              </p>
            )}

            <div className="mt-4 flex gap-3">
              {c.status !== 'approved' && <form action={approveComment.bind(null, c.id)}>
                <button
                  type="submit"
                  className="rounded-full bg-[#2E7D7D] px-5 py-1.5 text-sm font-bold text-white hover:bg-[#1F1810] transition-colors"
                >
                  承認して公開
                </button>
              </form>}
              {c.status !== 'rejected' && <form action={rejectComment.bind(null, c.id)}>
                <button
                  type="submit"
                  className="rounded-full border border-[#E04E2C] px-5 py-1.5 text-sm font-bold text-[#E04E2C] hover:bg-[#E04E2C] hover:text-white transition-colors"
                >
                  却下
                </button>
              </form>}
            </div>
          </article>
        ))}
      </div>
      <nav aria-label="コメントのページ" className="mt-6 flex gap-5 text-sm">
        {page > 1 && <a href={pageHref(page - 1)} className="underline">前のページ</a>}
        {page * PAGE_SIZE < (count ?? 0) && <a href={pageHref(page + 1)} className="underline">次のページ</a>}
      </nav>
    </div>
  );
}
