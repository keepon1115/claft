import withPWAInit from 'next-pwa';

// PWA はキープオンラボ（/lab）用。next-pwa を採用：Next 14 + webpack で実績があり、
// scope オプションで SW の支配範囲を /lab 配下に限定でき、HP側に影響しないため。
// 登録は components/lab/PWARegister.tsx で /lab 配下からのみ手動登録する。
const withPWA = withPWAInit({
  dest: 'public',
  scope: '/lab',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // App Router では app-build-manifest.json が配信されず、precache すると
  // SW の install が失敗して redundant になる（next-pwa@5 既知問題）ため除外。
  buildExcludes: [
    /app-build-manifest\.json$/,
    // next/font が日本語フォントを約1800個の woff2 サブセットに分割する。
    // 全precacheは過剰なので除外し、使った分だけ runtimeCaching（CacheFirst）に任せる。
    /static\/media\/.*\.woff2$/,
  ],
  // HP側の画像アセットまで precache すると初回が重すぎるので除外（ラボ外）。
  publicExcludes: ['!assets/**/*', '!*.pdf'],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/claft', // 削除: ローカル開発やルートドメインでの運用に合わせて削除
  images: { unoptimized: true },
  // SEO: 旧 vercel.app ホストへのアクセスを正規ドメインへ 301 集約する。
  // ※ 旧 github.io（静的Jekyll）は別ホストのため、そちら側で別途リダイレクトが必要。
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'claft-hp.vercel.app' }],
        destination: 'https://claft.keeponlearning.fun/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
