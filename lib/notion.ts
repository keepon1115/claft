// Notion を /blog のソースにする最小アダプタ（依存ライブラリ無し・fetchベース）。
// NOTION_TOKEN / NOTION_BLOG_DB_ID が未設定なら空で返し、ビルドは壊れない。
//
// セットアップ（オーナー作業）:
// 1. https://www.notion.so/my-integrations で内部インテグレーションを作成 → Secret を控える
// 2. 「CLAFT Blog（SEO/GEO記事）」DBの ••• → 接続 → そのインテグレーションを追加（共有）
// 3. env に NOTION_TOKEN（Secret）と NOTION_BLOG_DB_ID（DBのID）を設定
//    DB ID = e629305a-8b33-4cd7-931a-637edf5737d1

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_BLOG_DB_ID = process.env.NOTION_BLOG_DB_ID;
const NOTION_VERSION = '2022-06-28';
const API = 'https://api.notion.com/v1';
// ISR: 60秒ごとに再取得。Notionで公開/編集した記事が約1分で反映される。
// 即時反映したいときは /api/revalidate?secret=... を叩く。
const REVALIDATE = 60;

export const blogEnabled = Boolean(NOTION_TOKEN && NOTION_BLOG_DB_ID);

export type RichText = {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

export type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  // 各ブロックの type 名をキーに持つ生データ
  [key: string]: unknown;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string | null;
  pillar: boolean;
  excerpt: string;
  publishedAt: string | null;
  updatedAt: string;
  coverImage: string | null;
  tags: string[];
  author: string | null;
};

async function notionFetch(path: string, init?: RequestInit) {
  if (!blogEnabled) return null;
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) {
    console.error('[notion] request failed', path, res.status, await res.text());
    return null;
  }
  return res.json();
}

const plain = (rich: RichText[] | undefined) =>
  (rich ?? []).map((r) => r.plain_text).join('');

function mapPage(page: any): BlogPost | null {
  const p = page.properties ?? {};
  const slug = plain(p.Slug?.rich_text);
  const title = plain(p.Name?.title);
  if (!slug || !title) return null;
  const cover =
    p.CoverImage?.files?.[0]?.file?.url ??
    p.CoverImage?.files?.[0]?.external?.url ??
    page.cover?.file?.url ??
    page.cover?.external?.url ??
    null;
  return {
    id: page.id,
    title,
    slug,
    status: p.Status?.select?.name ?? '',
    category: p.Category?.select?.name ?? null,
    pillar: Boolean(p.Pillar?.checkbox),
    excerpt: plain(p.Excerpt?.rich_text),
    publishedAt: p.PublishedAt?.date?.start ?? null,
    updatedAt: page.last_edited_time ?? page.created_time ?? '',
    coverImage: cover,
    tags: (p.Tags?.multi_select ?? []).map((t: any) => t.name),
    author: plain(p.Author?.rich_text) || null,
  };
}

// 公開記事の一覧（新しい順）。
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const data = await notionFetch(`/databases/${NOTION_BLOG_DB_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: '公開' } },
      sorts: [{ property: 'PublishedAt', direction: 'descending' }],
      page_size: 100,
    }),
  });
  if (!data?.results) return [];
  return data.results.map(mapPage).filter(Boolean) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await notionFetch(`/databases/${NOTION_BLOG_DB_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: '公開' } },
        ],
      },
      page_size: 1,
    }),
  });
  const page = data?.results?.[0];
  return page ? mapPage(page) : null;
}

// ブロックを子も含めて再帰取得（リスト/トグル等のネスト対応）。深さは安全のため4まで。
export async function getBlocks(blockId: string, depth = 0): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const qs = cursor ? `?start_cursor=${cursor}&page_size=100` : '?page_size=100';
    const data = await notionFetch(`/blocks/${blockId}/children${qs}`);
    if (!data?.results) break;
    for (const b of data.results as NotionBlock[]) {
      if (b.has_children && depth < 4) {
        b.children = await getBlocks(b.id, depth + 1);
      }
      blocks.push(b);
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return blocks;
}
