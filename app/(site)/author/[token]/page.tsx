import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MailOpen, Sparkles } from 'lucide-react';
import ExhibitionShell from '@/components/exhibition/ExhibitionShell';
import { getServiceClient } from '@/lib/exhibition/supabaseServer';
import type {
  Comment,
  CommentType,
  ReactionCountRow,
  ReactionType,
  Work,
} from '@/lib/exhibition/types';
import { COMMENT_TYPE_META } from '@/lib/exhibition/types';
import ReplyForm from './ReplyForm';

export const dynamic = 'force-dynamic';

// 限定URL: 検索エンジンにインデックスさせない
export const metadata: Metadata = {
  title: '作者ページ | なんでも展示会',
  robots: { index: false, follow: false },
};

const TYPE_COLORS: Record<CommentType, string> = {
  cheer: '#E04E2C',
  review: '#2E7D7D',
  question: '#F2B544',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/**
 * 作者専用ページ（限定URL・ログインなし）。
 * トークンの解決はこのサーバーコンポーネント内でのみ行い、
 * 作者には「承認済み（approved）のコメント」だけを見せる。
 * （承認前のコメントを見せると、モデレーション前の文章が子どもに届いてしまうため）
 */
export default async function AuthorPage({ params }: { params: { token: string } }) {
  const service = getServiceClient();

  const { data: tokenRow } = await service
    .from('work_access_tokens')
    .select('work_id')
    .eq('token', params.token)
    .maybeSingle();
  if (!tokenRow) notFound();

  const { data: workRow } = await service
    .from('works')
    .select('*')
    .eq('id', tokenRow.work_id)
    .maybeSingle();
  if (!workRow) notFound();
  const work = workRow as Work;

  const [{ data: commentRows }, { data: typeRows }, { data: countRows }] = await Promise.all([
    service
      .from('comments')
      .select(
        'id, work_id, comment_type, body, viewer_nickname, status, created_at, reviewed_at, author_replies(id, comment_id, body, status, created_at)',
      )
      .eq('work_id', work.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false }),
    service.from('reaction_types').select('*').eq('exhibition_id', work.exhibition_id).order('sort_order'),
    service.rpc('reaction_counts', { p_work_id: work.id }),
  ]);

  const comments = (commentRows ?? []) as unknown as Comment[];
  for (const c of comments) {
    c.author_replies = (c.author_replies ?? []).filter((r) => r.status === 'approved');
  }

  const countMap = new Map<string, number>();
  for (const row of (countRows ?? []) as ReactionCountRow[]) {
    countMap.set(row.reaction_type_id, Number(row.cnt));
  }
  const tally = ((typeRows ?? []) as ReactionType[]).map((rt) => ({
    emoji: rt.emoji,
    label: rt.label,
    count: countMap.get(rt.id) ?? 0,
  }));
  const totalReactions = tally.reduce((sum, c) => sum + c.count, 0);

  return (
    <ExhibitionShell>
      <div className="px-5 sm:px-10 pt-10 pb-24 max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="ribbon font-display text-[10px] tracking-[0.4em] text-[#FFF8EC] bg-[#2E7D7D] px-6 py-1.5 shadow-md uppercase">
            ✦ Author Room ✦
          </div>
        </div>

        <header className="text-center mb-12">
          <p className="font-handwritten text-[#2E7D7D] mb-3">
            {work.author_nickname} さんの作者ページ
          </p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight">{work.title}</h1>
          <p className="font-body text-xs text-[#1F1810]/50 mt-4 leading-relaxed">
            このページはあなた専用です。URLはほかの人に教えないでね。
          </p>
        </header>

        {/* リアクション集計 */}
        <section className="mb-12 rounded-[28px] border-2 border-[#1F1810] bg-white p-6 sm:p-8 shadow-[6px_6px_0_0_#1F1810]">
          <h2 className="font-display text-lg sm:text-xl mb-5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F2B544]" />
            届いたリアクション（ぜんぶで {totalReactions} 回）
          </h2>
          <div className="flex flex-wrap gap-3">
            {tally.map((c) => (
              <div
                key={c.emoji}
                className="flex items-center gap-2 rounded-full bg-[#FFF8EC] border border-[#1F1810]/15 px-4 py-2"
              >
                <span className="font-body text-base">{c.emoji}</span>
                {c.label && <span className="font-handwritten text-xs text-[#1F1810]/60">{c.label}</span>}
                <span className="font-display text-sm text-[#E04E2C]">{c.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* コメントと返信 */}
        <section>
          <h2 className="font-display text-lg sm:text-xl mb-6 flex items-center gap-2">
            <MailOpen className="w-5 h-5 text-[#E04E2C]" />
            届いたことば（{comments.length}件）
          </h2>

          {comments.length === 0 && (
            <p className="font-body rounded-2xl border-2 border-dashed border-[#1F1810]/20 p-8 text-center text-sm text-[#1F1810]/50">
              公開されたコメントはまだありません。届いたらここに並びます。
            </p>
          )}

          <div className="space-y-5">
            {comments.map((c) => (
              <article
                key={c.id}
                className="rounded-[20px] bg-white p-5 sm:p-6 shadow-[0_12px_30px_-18px_rgba(31,24,16,0.4)]"
              >
                <header className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="font-display rounded-full px-3 py-0.5 text-[11px] text-[#FFF8EC]"
                    style={{ backgroundColor: TYPE_COLORS[c.comment_type] }}
                  >
                    {COMMENT_TYPE_META[c.comment_type].label}
                  </span>
                  <span className="font-handwritten text-sm text-[#1F1810]/70">
                    {c.viewer_nickname || 'ななしさん'}
                  </span>
                  <time className="font-body text-xs text-[#1F1810]/40">
                    {formatDate(c.created_at)}
                  </time>
                </header>
                <p className="font-body whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-[#1F1810]/85">
                  {c.body}
                </p>

                {(c.author_replies ?? []).map((r) => (
                  <div
                    key={r.id}
                    className="mt-4 ml-4 sm:ml-8 rounded-[16px] border-l-4 border-[#2E7D7D] p-4"
                    style={{ backgroundColor: 'rgba(46,125,125,0.08)' }}
                  >
                    <p className="font-handwritten mb-1 text-xs text-[#2E7D7D]">あなたの返信</p>
                    <p className="font-body whitespace-pre-wrap text-sm leading-relaxed text-[#1F1810]/85">
                      {r.body}
                    </p>
                  </div>
                ))}

                <ReplyForm token={params.token} commentId={c.id} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </ExhibitionShell>
  );
}
