import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { JsonLd } from '@/components/JsonLd';
import { getPublishedPosts } from '@/lib/notion';
import { BLOG_CATEGORIES, getCategoryBySlug } from '@/lib/blogTaxonomy';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { SITE_URL, absoluteUrl } from '@/lib/seo';

export const revalidate = 60; // ISR

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: 'カテゴリが見つかりません' };
  return {
    title: `${cat.name}の記事一覧`,
    description: cat.description,
    alternates: { canonical: `/blog/category/${cat.slug}` },
  };
}

export default async function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const posts = await getPublishedPosts();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: cat.name, item: absoluteUrl(`/blog/category/${cat.slug}`) },
    ],
  };

  return (
    <MobileContainer>
      <JsonLd data={breadcrumbJsonLd} />
      <Section>
        <header className="blog-index-head">
          <nav className="blog-breadcrumb" aria-label="パンくず">
            <Link href="/blog">ブログ</Link> <span aria-hidden="true">/</span> {cat.name}
          </nav>
          <p className="craft-label">CATEGORY</p>
          <h1 className="blog-index-title">{cat.name}</h1>
          <p className="blog-index-lead">{cat.description}</p>
        </header>

        <BlogIndexClient posts={posts} activeCategory={cat.name} />
      </Section>
    </MobileContainer>
  );
}
