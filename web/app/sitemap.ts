import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const host = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keepon1115.github.io').replace(/\/$/, '');
  const base = `${host}/claft`;
  const paths = [
    '',
    '/about',
    '/career',
    '/futurecraft',
    '/minecraft',
    '/play-claft',
    '/school_society',
    '/yononaka',
    '/workshop',
    '/robopro',
    '/contact'
  ];
  return paths.map(p => ({ url: `${base}${p || '/'}` }));
}
