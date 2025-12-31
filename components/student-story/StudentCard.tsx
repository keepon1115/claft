'use client';

import Link from 'next/link';

type StudentCardProps = {
  slug: string;
  name: string;
  grade: string;
  avatarEmoji: string;
  shortIntro: string;
};

export function StudentCard({ slug, name, grade, avatarEmoji, shortIntro }: StudentCardProps) {
  return (
    <div 
      className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow)] reveal"
      style={{ 
        boxShadow: '0 8px 24px rgba(31, 41, 55, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        lineHeight: 'var(--leading-loose)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(31, 41, 55, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 41, 55, 0.06)';
      }}
    >
      {/* アバターと基本情報 */}
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
          style={{ 
            background: 'linear-gradient(135deg, var(--brand) 0%, #58c3a2 100%)',
            boxShadow: '0 4px 12px rgba(52, 198, 190, 0.3)'
          }}
        >
          {avatarEmoji}
        </div>
        <div className="flex-1">
          <h3 className="heading-md mb-1">{name}</h3>
          <p className="body-sm text-[var(--ink-500)]">{grade}</p>
        </div>
      </div>
      
      {/* 簡単な紹介文 */}
      <p 
        className="body-base text-[var(--ink-700)] mb-4"
        style={{ lineHeight: 'var(--leading-loose)' }}
      >
        {shortIntro}
      </p>
      
      {/* 「ストーリーを見る」ボタン */}
      <Link 
        href={`/student-story/${slug}`}
        className="inline-flex items-center gap-2 py-2 px-4 rounded-full font-bold text-[var(--text-sm)] transition-all"
        style={{ 
          background: 'linear-gradient(135deg, var(--brand) 0%, #58c3a2 100%)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(52, 198, 190, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        ストーリーを見る
        <span className="text-lg">→</span>
      </Link>
    </div>
  );
}
