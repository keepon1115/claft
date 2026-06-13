import type { FeedPost } from '@/lib/lab/content';

// フィードのカード1枚：サムネ＋カテゴリチップ＋タイトル＋日付＋導線。
export function FeedCard({ post }: { post: FeedPost }) {
  return (
    <a className="lab-post" href={post.href} target="_blank" rel="noopener noreferrer">
      <div className={`lab-post-thumb t-${post.thumbTheme}`}>
        <span className="emoji" aria-hidden="true">{post.emoji}</span>
        <span className="lab-chip">{post.categoryLabel}</span>
      </div>
      <div className="lab-post-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="lab-post-meta">
          <time className="lab-post-date">{post.date}</time>
          <span className="lab-post-link">くわしく見る →</span>
        </div>
      </div>
    </a>
  );
}
