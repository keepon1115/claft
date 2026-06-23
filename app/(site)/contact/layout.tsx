import type { Metadata } from 'next';

// contact/page.tsx は 'use client' のため metadata を持てない。
// 予約フォームのメタ情報（CVページ）はこの server layout で付与する。
export const metadata: Metadata = {
  title: '無料体験・個別相談のご予約',
  description:
    'CLAFTの無料体験・個別相談はこちらから。八尾の対面教室と全国どこからでも学べるオンラインの両方に対応。小5〜中3のお子さま向けに、探究×対話×実践の学びを1ヶ月間無料で体験できます。',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
