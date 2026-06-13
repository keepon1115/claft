import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { ReactionKind } from '@/lib/exhibition/types';
import { createReactionKind, setReactionKindActive } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function AdminReactionsPage() {
  const supabase = getAdminClient();
  const { data } = await supabase
    .from('reaction_kinds')
    .select('*')
    .order('sort_order', { ascending: true });
  const kinds = (data ?? []) as ReactionKind[];

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-1 text-lg font-bold text-[#1F1810]">顔文字リアクションの種類</h1>
        <p className="mb-4 text-xs text-[#1F1810]/60">
          無効にすると公開ページから消えます（押された記録は残ります）。
        </p>
        <div className="space-y-2">
          {kinds.map((k) => (
            <div
              key={k.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-[#1F1810]/15 bg-white px-4 py-3"
            >
              <span className="text-lg">{k.emoji}</span>
              <span className="text-sm text-[#1F1810]/70">{k.label}</span>
              <span className="text-xs text-[#1F1810]/40">順: {k.sort_order}</span>
              {!k.is_active && <span className="text-xs text-[#E04E2C]">無効</span>}
              <form action={setReactionKindActive.bind(null, k.id, !k.is_active)} className="ml-auto">
                <button
                  type="submit"
                  className="rounded-full border border-[#1F1810]/30 px-3 py-1 text-xs text-[#1F1810]/60 hover:bg-[#1F1810]/10"
                >
                  {k.is_active ? '無効にする' : '有効にする'}
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#1F1810]/15 bg-white p-5">
        <h2 className="mb-4 text-sm font-bold text-[#1F1810]">新しい顔文字を追加</h2>
        <form action={createReactionKind} className="flex flex-wrap items-end gap-3">
          <label className="block text-xs text-[#1F1810]/70">
            顔文字（例: (≧▽≦)）
            <input name="emoji" required className="mt-1 w-40 rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            意味（例: すごい！）
            <input name="label" required className="mt-1 w-40 rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            表示順
            <input name="sort_order" type="number" defaultValue={0} className="mt-1 w-24 rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <button type="submit" className="rounded-full bg-[#1F1810] px-6 py-2 text-sm font-bold text-[#FFF8EC] hover:bg-[#E04E2C] transition-colors">
            追加
          </button>
        </form>
      </section>
    </div>
  );
}
