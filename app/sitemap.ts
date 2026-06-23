import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { issues } from '@/lib/monthlyData';
import { getAllStudentSlugs } from '@/lib/studentData';
import { getPublishedPosts } from '@/lib/notion';

// 公開している静的ルート。
// (hidden) / admin / author / api は意図的に除外（robots でも disallow）。
const STATIC_PATHS = [
  '/',
  '/about',
  '/courses',
  '/contact',
  '/blog',
  '/news',
  '/monthly',
  '/student-story',
  '/claft-hope',
  '/pbl',
  '/jibun-craft',
  '/minecraft',
  '/robopro',
  '/english-steam',
  '/keepon-lab',
  '/play-claft',
  '/asia-steam-camp',
  '/futurecraft',
  '/futurecraft/Exhibition',
  '/futurecraft/Exhibition-game',
  '/futurecraft/Presentation',
  '/yononaka',
  '/yononaka/jugyo-repo',
  '/yononaka/ai-robot',
  '/yononaka/kyoshitsu',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));

  const monthlyUrls: MetadataRoute.Sitemap = issues.map((i) => ({
    url: absoluteUrl(`/monthly/${i.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const storyUrls: MetadataRoute.Sitemap = getAllStudentSlugs().map((slug) => ({
    url: absoluteUrl(`/student-story/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // ブログ記事（Notion未接続なら空配列）。
  const posts = await getPublishedPosts();
  const blogUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: p.pillar ? 0.8 : 0.7,
  }));

  return [...staticUrls, ...monthlyUrls, ...storyUrls, ...blogUrls];
}
