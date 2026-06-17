import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { Exhibition, ReactionType } from '@/lib/exhibition/types';
import { createReactionType, deleteReactionType } from '../../actions';

export const dynamic = 'force-dynamic';

interface ExhibitionWithReactions extends Exhibition {
  reaction_types: ReactionType[] | null;
}

export default async function AdminReactionsPage() {
  const supabase = getAdminClient();
  const { data } = await supabase
    .from('exhibitions')
    .select('*, reaction_types(*)')
    .order('created_at', { ascending: false });
  const exhibitions = (data ?? []) as unknown as ExhibitionWithReactions[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-1 text-lg font-bold text-[#1F1810]">顔文字リアクションの種類</h1>
        <p className="text-xs text-[#1F1810]/60">
          リアクションは展示会ごとに設定します。意味（ラベル）は空でもOK（解釈を見る側に委ねられます）。
        </p>
      </div>

      {exhibitions.length === 0 && (
        <p className="text-sm text-[#1F1810]/50">先に展示会を作成してください。</p>
      )}

      {exhibitions.map((e) => {
        const kinds = (e.reaction_types ?? []).sort((a, b) => a.sort_order - b.sort_order);
        return (
          <section key={e.id} className="rounded-xl border border-[#1F1810]/15 bg-white p-5">
            <h2 className="mb-3 text-sm font-bold text-[#1F1810]">
              {e.title}
              <span className="ml-2 text-xs font-normal text-[#1F1810]/40">/{e.slug}</span>
            </h2>

            <div className="mb-4 space-y-2">
              {kinds.length === 0 && (
                <p className="text-xs text-[#1F1810]/50">まだリアクションがありません。</p>
              )}
              {kinds.map((k) => (
                <div
                  key={k.id}
                  className="flex flex-wrap items-center gap-3 rounded-lg bg-[#FFF8EC] px-3 py-2"
                >
                  <span className="text-lg">{k.emoji}</span>
                  <span className="text-sm text-[#1F1810]/70">{k.label || '（ラベルなし）'}</span>
                  <span className="text-xs text-[#1F1810]/40">順: {k.sort_order}</span>
                  <form action={deleteReactionType.bind(null, k.id)} className="ml-auto">
                    <button
                      type="submit"
                      className="rounded-full border border-[#E04E2C]/50 px-3 py-1 text-xs text-[#E04E2C] hover:bg-[#E04E2C] hover:text-white"
                    >
                      削除
                    </button>
                  </form>
                </div>
              ))}
            </div>

            <form
              action={createReactionType.bind(null, e.id)}
              className="flex flex-wrap items-end gap-3 border-t border-[#1F1810]/10 pt-4"
            >
              <label className="block text-xs text-[#1F1810]/70">
                顔文字
                <input name="emoji" required className="mt-1 w-36 rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
              </label>
              <label className="block text-xs text-[#1F1810]/70">
                意味（任意）
                <input name="label" className="mt-1 w-36 rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
              </label>
              <label className="block text-xs text-[#1F1810]/70">
                表示順
                <input name="sort_order" type="number" defaultValue={kinds.length} className="mt-1 w-20 rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
              </label>
              <button type="submit" className="rounded-full bg-[#1F1810] px-5 py-2 text-sm font-bold text-[#FFF8EC] hover:bg-[#E04E2C] transition-colors">
                追加
              </button>
            </form>
          </section>
        );
      })}
    </div>
  );
}
