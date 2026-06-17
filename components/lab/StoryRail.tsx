import Link from 'next/link';
import type { StoryCategory } from '@/lib/lab/content';

// ストーリーズ：円形ボタンの横スクロール。タップで全画面ビューアへ。
export function StoryRail({ stories }: { stories: StoryCategory[] }) {
  return (
    <nav className="lab-stories" aria-label="ストーリー" data-tour="stories">
      {stories.map((story) => (
        <Link key={story.slug} href={`/lab/story/${story.slug}`} className="lab-story">
          <span className={`lab-ring ${story.ring === 'default' ? '' : story.ring}`}>
            <i aria-hidden="true">{story.emoji}</i>
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
