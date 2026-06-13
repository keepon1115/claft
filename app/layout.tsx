import type { Metadata, Viewport } from 'next';
import { Zen_Maru_Gothic, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const zenMaru = Zen_Maru_Gothic({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen',
});

const notoSans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'トップ | CLAFT — 自分の手で創るキャリア',
  description: '探究×対話×実践で"自分の軸"をつくるオンラインスクール。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${notoSans.variable}`}>
      <body className={zenMaru.className} style={{ margin: 0, minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
