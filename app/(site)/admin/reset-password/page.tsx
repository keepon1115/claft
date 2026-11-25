import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ResetForm } from './reset-form';

export const metadata: Metadata = {
  title: '運営パスワードの再設定',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FFF8EC] px-5 py-12 text-[#1F1810]">
      <div className="w-full max-w-sm rounded-2xl border-2 border-[#1F1810] bg-white p-6 shadow-[6px_6px_0_0_#1F1810] sm:p-8">
        <h1 className="mb-5 text-xl font-bold">パスワードの再設定</h1>
        <ResetForm ready={cookieStore.has('claft-recovery') && !params.error} invalidLink={params.error === 'link'} />
        <Link href="/admin/login" className="mt-5 inline-block text-sm font-medium underline underline-offset-4">運営ログインに戻る</Link>
      </div>
    </main>
  );
}
