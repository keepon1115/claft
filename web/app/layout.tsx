import type { Metadata } from 'next';
import './globals.css';
import { Zen_Maru_Gothic } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CLAFT — 自分の手で創るキャリア',
  description: '探究×対話×実践で“自分の軸”をつくるオンラインスクール。'
};

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400','500','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zenmaru'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={zenMaruGothic.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
