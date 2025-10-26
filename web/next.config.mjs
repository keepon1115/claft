/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/claft',
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/', destination: '/claft', permanent: false, basePath: false }
    ];
  }
};

export default nextConfig;
