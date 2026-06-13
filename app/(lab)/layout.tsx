import type { Metadata, Viewport } from 'next';
import { PWARegister } from '@/components/lab/PWARegister';
import './lab.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#213a5a',
};

export const metadata: Metadata = {
  title: 'キープオンラボ — 0→1 コミュニティ',
  description:
    'キープオンラボのスクール生・保護者のためのアプリ。お知らせ・活動報告・予約・アイデア箱がここに。',
  robots: { index: false, follow: false }, // ローカル完成まで非公開扱い
  manifest: '/lab-manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Keeponラボ',
  },
  // apple-touch-icon は app/(lab)/lab/apple-icon.png（ファイル規約）で出力。
  // metadata.icons はルートの app/icon.png（ファイル規約）に上書きされるため使えない。
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lab-app">
      <PWARegister />
      {children}
    </div>
  );
}
