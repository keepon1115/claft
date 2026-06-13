import Link from 'next/link';
import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { Exhibition } from '@/lib/exhibition/types';
import { createExhibition, setExhibitionPublished } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function AdminExhibitionsPage() {
  const supabase = getAdminClient();
  const { data } = await supabase
    .from('exhibitions')
    .select('*')
    .order('created_at', { ascending: false });
  const exhibitions = (data ?? []) as Exhibition[];

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-4 text-lg font-bold text-[#1F1810]">展示会（開催回）</h1>
        <div className="space-y-3">
          {exhibitions.length === 0 && (
            <p className="text-sm text-[#1F1810]/50">まだ展示会がありません。下のフォームから作成してください。</p>
          )}
          {exhibitions.map((e) => (
            <div
              key={e.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-[#1F1810]/15 bg-white p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#1F1810]">{e.title}</p>
                <p className="text-xs text-[#1F1810]/50">
                  /futurecraft/Exhibition/{e.slug}
                  {e.is_published ? '（公開中）' : '（非公開）'}
                </p>
              </div>
              <Link
                href={`/admin/exhibitions/${e.id}`}
                className="rounded-full border border-[#2E7D7D] px-4 py-1.5 text-xs font-bold text-[#2E7D7D] hover:bg-[#2E7D7D] hover:text-white transition-colors"
              >
                作品を管理
              </Link>
              <form action={setExhibitionPublished.bind(null, e.id, !e.is_published)}>
                <button
                  type="submit"
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                    e.is_published
                      ? 'border border-[#1F1810]/30 text-[#1F1810]/60 hover:bg-[#1F1810]/10'
                      : 'bg-[#E04E2C] text-white hover:bg-[#1F1810]'
                  }`}
                >
                  {e.is_published ? '非公開にする' : '公開する'}
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#1F1810]/15 bg-white p-5">
        <h2 className="mb-4 text-sm font-bold text-[#1F1810]">新しい展示会をつくる</h2>
        <form action={createExhibition} className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-[#1F1810]/70">
            スラッグ（URL用 例: nandemo-2026-07）
            <input
              name="slug"
              required
              pattern="[a-z0-9-]+"
              className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none"
            />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            タイトル
            <input
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none"
            />
          </label>
          <label className="block text-xs text-[#1F1810]/70 sm:col-span-2">
            説明（任意）
            <textarea
              name="description"
              rows={2}
              className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#1F1810] px-6 py-2 text-sm font-bold text-[#FFF8EC] hover:bg-[#E04E2C] transition-colors"
            >
              作成（非公開で作られます）
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
