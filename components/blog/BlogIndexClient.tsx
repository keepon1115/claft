'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/notion';
import { BLOG_CATEGORIES, getCategoryByName, monthOf, monthLabel } from '@/lib/blogTaxonomy';

function formatDate(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function BlogCard({ post }: { post: BlogPost }) {
  const cat = getCategoryByName(post.category);
  return (
    <div className="blog-card craft-paper craft-lift">
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="blog-card-cover" src={post.coverImage} alt="" loading="lazy" />
        )}
      </Link>
      <div className="blog-card-body">
        {post.category &&
          (cat ? (
            <Link href={`/blog/category/${cat.slug}`} className="blog-card-cat">
              {post.category}
            </Link>
          ) : (
            <span className="blog-card-cat">{post.category}</span>
          ))}
        <Link href={`/blog/${post.slug}`} className="blog-card-link">
          <h2 className="blog-card-title">{post.title}</h2>
          {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
          <time className="blog-card-date">{formatDate(post.publishedAt)}</time>
        </Link>
      </div>
    </div>
  );
}

// 一覧＋ナビ（検索 / カテゴリ / 月別アーカイブ）。
// activeCategory / activeMonth はカテゴリ・アーカイブページから渡され、見出しとナビの強調に使う。
export function BlogIndexClient({
  posts,
  activeCategory,
  activeMonth,
}: {
  posts: BlogPost[];
  activeCategory?: string; // カテゴリ名
  activeMonth?: string; // '2026-07'
}) {
  const [query, setQuery] = useState('');

  // カテゴリ別件数・月別件数（ナビ表示用）
  const catCounts = useMemo(() => {
    const m = new Map<string, number>();
    posts.forEach((p) => p.category && m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [posts]);

  const months = useMemo(() => {
    const m = new Map<string, number>();
    posts.forEach((p) => {
      const key = monthOf(p.publishedAt);
      if (key) m.set(key, (m.get(key) ?? 0) + 1);
    });
    return [...m.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [posts]);

  // 表示対象：カテゴリ/月で絞ったうえで、検索語でさらに絞る
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeMonth && monthOf(p.publishedAt) !== activeMonth) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.excerpt} ${p.category ?? ''} ${p.tags.join(' ')}`.toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [posts, query, activeCategory, activeMonth]);

  return (
    <div className="blog-layout">
      {/* ナビ（検索・カテゴリ・月別） */}
      <aside className="blog-nav">
        <div className="blog-nav-box">
          <label className="blog-nav-label" htmlFor="blog-search">
            記事をさがす
          </label>
          <input
            id="blog-search"
            type="search"
            className="blog-search"
            placeholder="キーワードで検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="blog-nav-box">
          <p className="blog-nav-label">カテゴリ</p>
          <ul className="blog-nav-list">
            <li>
              <Link href="/blog" className={!activeCategory && !activeMonth ? 'is-active' : ''}>
                すべて（{posts.length}）
              </Link>
            </li>
            {BLOG_CATEGORIES.map((c) => {
              const n = catCounts.get(c.name) ?? 0;
              if (n === 0) return null;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/blog/category/${c.slug}`}
                    className={activeCategory === c.name ? 'is-active' : ''}
                  >
                    {c.name}（{n}）
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="blog-nav-box">
          <p className="blog-nav-label">月別</p>
          <ul className="blog-nav-list">
            {months.map(([m, n]) => (
              <li key={m}>
                <Link
                  href={`/blog/archive/${m}`}
                  className={activeMonth === m ? 'is-active' : ''}
                >
                  {monthLabel(m)}（{n}）
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 記事一覧 */}
      <div className="blog-main">
        {visible.length === 0 ? (
          <p className="blog-empty">
            {query ? `「${query}」に一致する記事が見つかりませんでした。` : '記事を準備中です。もうしばらくお待ちください。'}
          </p>
        ) : (
          <div className="blog-grid">
            {visible.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
