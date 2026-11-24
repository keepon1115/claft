import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { getPublishedPosts } from '@/lib/notion';
import { monthLabel, monthOf } from '@/lib/blogTaxonomy';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const revalidate = 60; // ISR

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  const months = [...new Set(posts.map((p) => monthOf(p.publishedAt)).filter(Boolean))];
  return months.map((month) => ({ month }));
}

export async function generateMetadata(props: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const params = await props.params;
  if (!MONTH_RE.test(params.month)) return { title: 'アーカイブが見つかりません' };
  const label = monthLabel(params.month);
  return {
    title: `${label}の記事一覧`,
    description: `CLAFTブログ ${label}に公開した記事の一覧です。`,
    alternates: { canonical: `/blog/archive/${params.month}` },
  };
}

export default async function BlogArchivePage(props: { params: Promise<{ month: string }> }) {
  const params = await props.params;
  if (!MONTH_RE.test(params.month)) notFound();

  const posts = await getPublishedPosts();
  if (!posts.some((p) => monthOf(p.publishedAt) === params.month)) notFound();

  return (
    <>
      <BreadcrumbJsonLd trail={[['ブログ', '/blog'], [monthLabel(params.month), `/blog/archive/${params.month}`]]} />
    <MobileContainer>
      <Section>
        <header className="blog-index-head">
          <nav className="blog-breadcrumb" aria-label="パンくず">
            <Link href="/blog">ブログ</Link> <span aria-hidden="true">/</span>{' '}
            {monthLabel(params.month)}
          </nav>
          <p className="craft-label">ARCHIVE</p>
          <h1 className="blog-index-title">{monthLabel(params.month)}の記事</h1>
        </header>

        <BlogIndexClient posts={posts} activeMonth={params.month} />
      </Section>
    </MobileContainer>
    </>
  );
}
