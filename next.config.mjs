/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/claft', // 削除: ローカル開発やルートドメインでの運用に合わせて削除
  images: { unoptimized: true },
  // redirects も削除
};

export default nextConfig;
