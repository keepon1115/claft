import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/exhibition/adminAuth';
import { signOut } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '管理画面 | なんでも展示会',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-[#FFF8EC]">
      <header className="border-b-2 border-[#1F1810] bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4">
          <span className="font-bold text-[#1F1810]">なんでも展示会 管理</span>
          <nav className="flex flex-wrap gap-4 text-sm">
            <Link href="/admin" className="text-[#1F1810]/70 hover:text-[#E04E2C]">
              承認キュー
            </Link>
            <Link href="/admin/exhibitions" className="text-[#1F1810]/70 hover:text-[#E04E2C]">
              展示会・作品
            </Link>
            <Link href="/admin/reactions" className="text-[#1F1810]/70 hover:text-[#E04E2C]">
              リアクション種類
            </Link>
          </nav>
          <form action={signOut} className="ml-auto">
            <button type="submit" className="text-xs text-[#1F1810]/50 underline hover:text-[#E04E2C]">
              ログアウト（{user.email}）
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </div>
  );
}
