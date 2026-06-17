import Link from 'next/link';
import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { Exhibition, ExhibitionStatus } from '@/lib/exhibition/types';
import { createExhibition, setExhibitionStatus } from '../../actions';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<ExhibitionStatus, string> = {
  draft: '下書き（非公開）',
  open: '公開中',
  closed: '終了（閲覧のみ）',
};

// 次の状態への遷移ボタン定義
const NEXT_ACTIONS: { status: ExhibitionStatus; label: string; color: string }[] = [
  { status: 'open', label: '公開する', color: '#E04E2C' },
  { status: 'closed', label: '終了にする', color: '#2E7D7D' },
  { status: 'draft', label: '下書きに戻す', color: '#1F1810' },
];

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
        <p className="mb-4 text-xs text-[#1F1810]/60">
          公開中(open)・終了(closed)の展示会だけが閲覧者に見えます。作品の公開可否はこの状態で一括制御されます。
        </p>
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
                  /futurecraft/Exhibition/{e.slug} ・ {STATUS_LABEL[e.status]}
                </p>
              </div>
              <Link
                href={`/admin/exhibitions/${e.id}`}
                className="rounded-full border border-[#2E7D7D] px-4 py-1.5 text-xs font-bold text-[#2E7D7D] hover:bg-[#2E7D7D] hover:text-white transition-colors"
              >
                作品を管理
              </Link>
              {NEXT_ACTIONS.filter((a) => a.status !== e.status).map((a) => (
                <form key={a.status} action={setExhibitionStatus.bind(null, e.id, a.status)}>
                  <button
                    type="submit"
                    className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-85"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.label}
                  </button>
                </form>
              ))}
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
            テーマ・説明（任意）
            <textarea
              name="theme"
              rows={2}
              className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#1F1810] px-6 py-2 text-sm font-bold text-[#FFF8EC] hover:bg-[#E04E2C] transition-colors"
            >
              作成（下書きで作られます）
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
