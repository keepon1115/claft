import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const host = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keepon1115.github.io').replace(/\/$/, '');
  const sitemap = `${host}/claft/sitemap.xml`;
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [sitemap]
  };
}
