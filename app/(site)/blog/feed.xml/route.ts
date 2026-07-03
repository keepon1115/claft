import { getPublishedPosts } from '@/lib/notion';
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from '@/lib/seo';

export const revalidate = 3600;

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// RSS 2.0 フィード。RSSリーダー・AIクローラ・各種サービスに新着記事を届ける。
export async function GET() {
  const posts = await getPublishedPosts();

  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      const pub = p.publishedAt ? new Date(p.publishedAt).toUTCString() : '';
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pub ? `<pubDate>${pub}</pubDate>` : ''}
      ${p.category ? `<category>${esc(p.category)}</category>` : ''}
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE_NAME)} ブログ</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>ja</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
