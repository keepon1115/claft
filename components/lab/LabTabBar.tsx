import Link from 'next/link';

// 下段固定バー：色の序列＝オレンジは最重要CTA（受講予約）だけ。
export function LabTabBar() {
  return (
    <nav className="lab-tabbar" aria-label="主要アクション">
      <Link href="/lab/reserve" className="lab-cta primary">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>受講予約</span>
      </Link>
      <Link href="/lab/meeting" className="lab-cta ghost">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
        </svg>
        <span>面談申込</span>
      </Link>
      <Link href="/lab/roadmap" className="lab-cta sub">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 20l-5.5 1.5L5 4l5-1 4 2 5.5-1.5L18 20l-4 1z" />
          <path d="M10 3v16M14 5v16" />
        </svg>
        <span>ラボの歩き方</span>
      </Link>
    </nav>
  );
}
