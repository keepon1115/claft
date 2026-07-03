'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { STORY_NEW_BADGE_DAYS, type StoryCategory } from '@/lib/lab/content';

// 既読管理：カテゴリごとに「最後に開いたときの updatedAt」を保存。
// 値が現行の updatedAt と一致すれば、そのカードは既読＝Newバッジを出さない。
const SEEN_KEY_PREFIX = 'lab_story_seen_';

// microCMSのCDN画像なら円形サムネ用に正方形トリミング・軽量化（クエリ無しのみ付与）。
function optimizedThumb(url: string): string {
  if (url.includes('microcms-assets.io') && !url.includes('?')) {
    return `${url}?fm=webp&fit=crop&w=160&h=160&q=80`;
  }
  return url;
}

// JST基準でupdatedAtからの経過日数を返す。不正・未指定は null。
function daysSince(updatedAt: string | undefined): number | null {
  if (!updatedAt) return null;
  const updated = new Date(`${updatedAt}T00:00:00+09:00`).getTime();
  if (Number.isNaN(updated)) return null;
  return (Date.now() - updated) / (1000 * 60 * 60 * 24);
}

// ストーリーズ：円形ボタンの横スクロール。タップで全画面ビューアへ。
// 初回表示は左から順にふわっと現れ、更新から日が浅いカテゴリには「New」バッジを出す。
export function StoryRail({ stories }: { stories: StoryCategory[] }) {
  const [newSlugs, setNewSlugs] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    const next = new Set<string>();
    for (const story of stories) {
      const days = daysSince(story.updatedAt);
      if (days === null || days < 0 || days > STORY_NEW_BADGE_DAYS) continue;
      const seenAt = window.localStorage.getItem(SEEN_KEY_PREFIX + story.slug);
      if (seenAt === story.updatedAt) continue;
      next.add(story.slug);
    }
    setNewSlugs(next);
  }, [stories]);

  function markSeen(story: StoryCategory) {
    if (!story.updatedAt) return;
    window.localStorage.setItem(SEEN_KEY_PREFIX + story.slug, story.updatedAt);
  }

  return (
    <nav className="lab-stories" aria-label="ストーリー" data-tour="stories">
      {stories.map((story, i) => {
        const isNew = newSlugs.has(story.slug);
        const plainLabel = story.label.replace('\n', ' ');
        return (
          <Link
            key={story.slug}
            href={`/lab/story/${story.slug}`}
            className="lab-story"
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            aria-label={isNew ? `${plainLabel}（新着）` : undefined}
            onClick={() => markSeen(story)}
          >
            <span className={`lab-ring ${story.ring === 'default' ? '' : story.ring}`}>
              {story.ringImageUrl ? (
                <img className="lab-ring-img" src={optimizedThumb(story.ringImageUrl)} alt="" loading="lazy" decoding="async" />
              ) : (
                <i aria-hidden="true">{story.emoji}</i>
              )}
              {isNew && <span className="lab-new-badge" aria-hidden="true">New</span>}
            </span>
            <span>
              {story.label.split('\n').map((line, li) => (
                <span key={li} style={{ display: 'block' }}>{line}</span>
              ))}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
