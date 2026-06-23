import type { Metadata } from 'next';
import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { getPublishedPosts } from '@/lib/notion';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export const metadata: Metadata = {
  title: 'ブログ｜探究・キャリア教育・オンライン学習',
  description:
    '学習塾とは違う「探究 × 対話 × 実践」の学び方、子どものキャリア教育、オンラインでの学び方について、CLAFTが保護者向けにわかりやすく解説します。',
  alternates: { canonical: '/blog' },
};

function formatDate(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <MobileContainer>
      <Section>
        <header className="blog-index-head">
          <p className="craft-label">CLAFT BLOG</p>
          <h1 className="blog-index-title">学びのヒント</h1>
          <p className="blog-index-lead">
            学習塾では扱わない「自分で考え、選ぶ力」の育て方を、保護者の方へ。
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-empty">記事を準備中です。もうしばらくお待ちください。</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card craft-paper craft-lift">
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="blog-card-cover" src={post.coverImage} alt="" loading="lazy" />
                )}
                <div className="blog-card-body">
                  {post.category && <span className="blog-card-cat">{post.category}</span>}
                  <h2 className="blog-card-title">{post.title}</h2>
                  {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                  <time className="blog-card-date">{formatDate(post.publishedAt)}</time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </MobileContainer>
  );
}
