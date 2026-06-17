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
  works: { title: string; author_nickname: string } | null;
}

export default async function ModerationQueuePage() {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('comments')
    .select('id, comment_type, body, viewer_nickname, created_at, ai_flag, works(title, author_nickname)')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  const pending = (data ?? []) as unknown as PendingComment[];

  return (
    <div>
      <h1 className="mb-1 text-lg font-bold text-[#1F1810]">コメント承認キュー</h1>
      <p className="mb-6 text-xs text-[#1F1810]/60">
        AIが「要確認」と判定した、または自動承認をスキップしたコメントです。承認すると公開され、作者にも届きます。
      </p>

      {error && (
        <p className="rounded-lg bg-[#E04E2C]/10 px-4 py-3 text-sm text-[#E04E2C]">
          読み込みに失敗しました: {error.message}
        </p>
      )}

      {!error && pending.length === 0 && (
        <p className="rounded-xl border-2 border-dashed border-[#1F1810]/20 p-10 text-center text-sm text-[#1F1810]/50">
          承認待ちのコメントはありません 🎉
        </p>
      )}

      <div className="space-y-4">
        {pending.map((c) => (
          <article key={c.id} className="rounded-xl border border-[#1F1810]/15 bg-white p-5">
            <header className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[#1F1810]/60">
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
              <form action={approveComment.bind(null, c.id)}>
                <button
                  type="submit"
                  className="rounded-full bg-[#2E7D7D] px-5 py-1.5 text-sm font-bold text-white hover:bg-[#1F1810] transition-colors"
                >
                  承認して公開
                </button>
              </form>
              <form action={rejectComment.bind(null, c.id)}>
                <button
                  type="submit"
                  className="rounded-full border border-[#E04E2C] px-5 py-1.5 text-sm font-bold text-[#E04E2C] hover:bg-[#E04E2C] hover:text-white transition-colors"
                >
                  却下
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
