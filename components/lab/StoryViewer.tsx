'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { StoryCategory } from '@/lib/lab/content';

const AUTO_ADVANCE_MS = 6000;

// '/'始まり＝ラボアプリ内のページ。同一タブの Link 遷移にする（外部は新規タブ）。
function isInternalHref(href: string) {
  return href.startsWith('/');
}

// ② ストーリー閲覧：全画面・タップ/スワイプ/自動送り・上部進行ドット。
// 最後のカードを送ると次カテゴリへ、最終カテゴリならトップへ戻る（Instagram挙動）。
export function StoryViewer({
  category,
  nextSlug,
}: {
  category: StoryCategory;
  nextSlug: string | null;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const cards = category.cards;
  const isLast = index === cards.length - 1;
  const card = cards[index];

  const close = useCallback(() => router.push('/lab'), [router]);

  const goNext = useCallback(() => {
    if (!isLast) {
      setIndex((i) => i + 1);
    } else if (nextSlug) {
      router.replace(`/lab/story/${nextSlug}`);
    } else {
      close();
    }
  }, [isLast, nextSlug, router, close]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // 自動送り。prefers-reduced-motion では止める（手動送りのみ）。
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, goNext]);

  // キーボード操作：←→で送り、Escで閉じる
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, close]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) goNext();
    else if (dx > 40) goPrev();
  }

  return (
    <div
      className={`lab-sv t-${card.theme}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 背景写真（microCMSで設定された場合のみ。下に暗いスクリムを敷いて文字を読みやすく） */}
      {card.imageUrl && (
        <>
          <img className="lab-sv-bg" key={`${card.id}-bg`} src={card.imageUrl} alt="" />
          <div className="lab-sv-scrim" />
        </>
      )}
      {/* 進行ドット */}
      <div className="lab-sv-dots" aria-label={`${cards.length}枚中${index + 1}枚目`}>
        {cards.map((c, i) => (
          <i
            key={c.id}
            className={i < index ? 'done' : i === index ? 'active' : ''}
          />
        ))}
      </div>

      <button type="button" className="lab-story-close" aria-label="閉じる" onClick={close}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* タップ送り（左1/3＝戻る・右2/3＝進む） */}
      <button type="button" className="lab-sv-zone prev" aria-label="前のカードへ" onClick={goPrev} />
      <button type="button" className="lab-sv-zone next" aria-label="次のカードへ" onClick={goNext} />

      {/* カード本体（index をkeyにして切替時にふわっと出す） */}
      <div className="lab-sv-body" key={card.id}>
        {!card.imageUrl && (
          <span className="lab-sv-emoji" aria-hidden="true">{card.emoji}</span>
        )}
        <div className="lab-sv-text">
          <span className="lab-sv-cat">
            {category.emoji} {category.label.replace('\n', '')}
          </span>
          <h2>{card.title}</h2>
          <p>{card.text}</p>
          {isLast && (
            isInternalHref(category.hpUrl) ? (
              <Link className="s-cta" href={category.hpUrl}>
                {category.ctaLabel ?? '詳細ページを見る →'}
              </Link>
            ) : (
              <a
                className="s-cta"
                href={category.hpUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category.ctaLabel ?? '詳細ページを見る →'}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
