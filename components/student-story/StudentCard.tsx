import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRightDoodle } from '@/components/craft/HandDrawn';

type StudentCardProps = {
  slug: string;
  name: string;
  grade: string;
  avatarEmoji: string;
  shortIntro: string;
  /** 一覧での貼り込み角度を散らす */
  index?: number;
};

export function StudentCard({ slug, name, grade, avatarEmoji, shortIntro, index = 0 }: StudentCardProps) {
  return (
    <div
      className="craft-paper craft-tilt craft-lift reveal p-6"
      style={
        {
          '--rot': `${index % 2 === 0 ? -0.8 : 0.8}deg`,
          '--tape-rgb': index % 2 === 0 ? 'var(--brand-rgb)' : 'var(--cream-rgb)',
          transitionDelay: `${(index % 4) * 80}ms`,
        } as CSSProperties
      }
    >
      <span className={`craft-tape ${index % 2 === 0 ? '' : 'craft-tape--cream'}`} aria-hidden="true" />

      {/* アバターと基本情報 */}
      <div className="flex items-center gap-4 mb-4">
        <div className="ss-avatar">{avatarEmoji}</div>
        <div className="flex-1">
          <h3 className="heading-md mb-1">{name}</h3>
          <p className="body-sm text-[var(--ink-500)]">{grade}</p>
        </div>
      </div>

      {/* 簡単な紹介文 */}
      <p className="body-base text-[var(--ink-700)] mb-5" style={{ lineHeight: 'var(--leading-loose)' }}>
        {shortIntro}
      </p>

      {/* 「ストーリーを見る」ボタン */}
      <Link href={`/student-story/${slug}`} className="craft-sticker" style={{ padding: '10px 22px', fontSize: 'var(--text-sm)' }}>
        ストーリーを見る
        <ArrowRightDoodle width={20} />
      </Link>
    </div>
  );
}
