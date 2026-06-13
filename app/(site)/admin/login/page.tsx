import type { Metadata } from 'next';
import { signIn } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '運営ログイン | なんでも展示会',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#FFF8EC] px-5">
      <div className="w-full max-w-sm rounded-2xl border-2 border-[#1F1810] bg-white p-8 shadow-[6px_6px_0_0_#1F1810]">
        <h1 className="text-xl font-bold text-[#1F1810] mb-1">運営ログイン</h1>
        <p className="text-xs text-[#1F1810]/60 mb-6">なんでも展示会 管理画面</p>

        {searchParams.error && (
          <p className="mb-4 rounded-lg bg-[#E04E2C]/10 border border-[#E04E2C]/40 px-3 py-2 text-xs text-[#E04E2C]">
            ログインできませんでした。メールアドレスとパスワードを確認してください。
          </p>
        )}

        <form action={signIn} className="space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-[#1F1810]/70">メールアドレス</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#1F1810]/70">パスワード</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[#1F1810] py-2.5 text-sm font-bold text-[#FFF8EC] hover:bg-[#E04E2C] transition-colors"
          >
            ログイン
          </button>
        </form>
      </div>
    </main>
  );
}
