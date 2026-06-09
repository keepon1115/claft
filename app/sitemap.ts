import type { MetadataRoute } from 'next';
import { issues } from '@/lib/monthlyData';

export default function sitemap(): MetadataRoute.Sitemap {
  const host = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keepon1115.github.io').replace(/\/$/, '');
  const base = `${host}/claft`;
  const paths = [
    '',
    '/about',
    '/career',
    '/futurecraft',
    '/minecraft',
    '/news',
    '/monthly',
    '/play-claft',
    '/school_society',
    '/yononaka',
    '/workshop',
    '/robopro',
    '/contact'
  ];
  const staticUrls = paths.map(p => ({ url: `${base}${p || '/'}` }));
  const issueUrls = issues.map(i => ({ url: `${base}/monthly/${i.slug}` }));
  return [...staticUrls, ...issueUrls];
}
