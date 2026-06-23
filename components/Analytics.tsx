'use client';

import Script from 'next/script';

// GA4。NEXT_PUBLIC_GA_ID（例: G-XXXXXXXXXX）が設定されているときのみ読み込む。
// 未設定なら何も出力しないので、開発中やID未取得でも安全。
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
