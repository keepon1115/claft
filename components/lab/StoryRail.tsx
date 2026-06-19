import Link from 'next/link';
import type { StoryCategory } from '@/lib/lab/content';

// microCMSのCDN画像なら円形サムネ用に正方形トリミング・軽量化（クエリ無しのみ付与）。
function optimizedThumb(url: string): string {
  if (url.includes('microcms-assets.io') && !url.includes('?')) {
    return `${url}?fm=webp&fit=crop&w=160&h=160&q=80`;
  }
  return url;
}

// ストーリーズ：円形ボタンの横スクロール。タップで全画面ビューアへ。
export function StoryRail({ stories }: { stories: StoryCategory[] }) {
  return (
    <nav className="lab-stories" aria-label="ストーリー" data-tour="stories">
      {stories.map((story) => (
        <Link key={story.slug} href={`/lab/story/${story.slug}`} className="lab-story">
          <span className={`lab-ring ${story.ring === 'default' ? '' : story.ring}`}>
            {story.ringImageUrl ? (
              <img className="lab-ring-img" src={optimizedThumb(story.ringImageUrl)} alt="" loading="lazy" decoding="async" />
            ) : (
              <i aria-hidden="true">{story.emoji}</i>
            )}
          </span>
          <span>
            {story.label.split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </span>
        </Link>
      ))}
    </nav>
  );
}
