import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/lib/seo';

// 引用対象に入れたい AI クローラは明示的に許可する（GEO 対策）。
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/admin/', '/author/', '/api/'];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
