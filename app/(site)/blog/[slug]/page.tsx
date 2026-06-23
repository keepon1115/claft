import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { JsonLd } from '@/components/JsonLd';
import { NotionBlocks } from '@/components/blog/NotionBlocks';
import { getPublishedPosts, getPostBySlug, getBlocks } from '@/lib/notion';
import { SITE_NAME, SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/seo';

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: '記事が見つかりません' };
  const url = `/blog/${post.slug}`;
  const ogImage = post.coverImage ?? DEFAULT_OG_IMAGE;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      images: [{ url: ogImage }],
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const blocks = await getBlocks(post.id);
  const url = absoluteUrl(`/blog/${post.slug}`);

  // Article 構造化データ（E-E-A-T: 著者・公開日・更新日）。
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: { '@type': post.author ? 'Person' : 'Organization', name: post.author ?? SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/images/common/logo.png') },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'ja',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <MobileContainer>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Section>
        <article className="blog-article">
          <nav className="blog-breadcrumb" aria-label="パンくず">
            <Link href="/">ホーム</Link> <span aria-hidden="true">/</span>{' '}
            <Link href="/blog">ブログ</Link>
          </nav>

          <header className="blog-article-head">
            {post.category && <span className="blog-card-cat">{post.category}</span>}
            <h1 className="blog-article-title">{post.title}</h1>
            <div className="blog-article-meta">
              {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
              {post.author && <span>文：{post.author}</span>}
            </div>
            {post.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="blog-article-cover" src={post.coverImage} alt="" />
            )}
          </header>

          <div className="blog-prose">
            <NotionBlocks blocks={blocks} />
          </div>

          <footer className="blog-article-foot">
            <Link href="/contact?type=taiken" className="craft-sticker blog-cta">
              🎒 無料体験・個別相談を予約する
            </Link>
            <p className="blog-back"><Link href="/blog">← ブログ一覧へ</Link></p>
          </footer>
        </article>
      </Section>
    </MobileContainer>
  );
}
