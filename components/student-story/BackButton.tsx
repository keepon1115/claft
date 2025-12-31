'use client';

import Link from 'next/link';

export function BackButton() {
  return (
    <div className="px-4 py-4">
      <Link 
        href="/student-story"
        className="inline-flex items-center gap-2 py-2 px-4 rounded-full font-medium text-[var(--text-sm)] transition-all"
        style={{ 
          background: 'rgba(0, 0, 0, 0.04)',
          color: 'var(--ink-700)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.transform = 'translateX(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <span className="text-lg">←</span>
        一覧に戻る
      </Link>
    </div>
  );
}
