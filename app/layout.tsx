import type { Viewport } from 'next';
import { Zen_Maru_Gothic, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { defaultMetadata, organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from '@/lib/seo';
import { Analytics } from '@/components/Analytics';

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

// 既定メタデータは lib/seo.ts に集約（正規ドメイン・OGP・canonical・robots を一元管理）。
export const metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${notoSans.variable}`}>
      <head>
        {/* Google Search Console 所有権確認。env を render 時に読み、確実に <head> に出力する。
            GOOGLE_SITE_VERIFICATION には「トークン文字列のみ」を入れる（<meta>タグ全体ではない）。 */}
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_SITE_VERIFICATION}
          />
        )}
        {/* サイト全体の一次情報。AI/検索が「CLAFTとは何者か」を確定するための JSON-LD。
            ※ root layout の <head> は server 描画され、静的HTMLにクリーン出力される
            （非JSのAIクローラも読める）。一方 (site) グループの本文に置いた <script> は
            クライアント component SiteGrid を経由するため RSC へ退避され、静的HTMLに残らない。
            よってサイト全体に効く Organization / WebSite / LocalBusiness はここで出力する。 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={zenMaru.className} style={{ margin: 0, minHeight: '100vh' }}>
        {children}
        {/* GA4（NEXT_PUBLIC_GA_ID 設定時のみ有効） */}
        <Analytics />
      </body>
    </html>
  );
}
