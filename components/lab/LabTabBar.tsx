import Link from 'next/link';

// 下段固定バー：色の序列＝オレンジは最重要CTA（受講予約）だけ。
export function LabTabBar() {
  return (
    <nav className="lab-tabbar" aria-label="主要アクション">
      <a
        href="https://lin.ee/OUvutfN"
        target="_blank"
        rel="noopener noreferrer"
        className="lab-line-fab"
        aria-label="LINEで問合せ（外部リンク・新しいタブで開く）"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3C6.75 3 2.5 6.55 2.5 10.9c0 3.9 3.36 7.17 7.9 7.8.3.06.7.2.8.46.1.24.06.62.03.87l-.13 1c-.04.3-.24 1.16 1.02.63 1.26-.53 6.8-4 9.27-6.85 1.7-1.87 2.51-3.77 2.51-5.91C23.9 6.55 19.65 3 14.4 3z" />
        </svg>
        <span>LINE問合せ<br />はこちら</span>
      </a>
      <Link href="/lab/reserve" className="lab-cta primary" data-tour="reserve">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>受講予約</span>
      </Link>
      <Link href="/lab/meeting" className="lab-cta ghost" data-tour="meeting">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
        </svg>
        <span>面談申込</span>
      </Link>
      <Link href="/lab/roadmap" className="lab-cta sub" data-tour="roadmap">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 20l-5.5 1.5L5 4l5-1 4 2 5.5-1.5L18 20l-4 1z" />
          <path d="M10 3v16M14 5v16" />
        </svg>
        <span>ラボの歩き方</span>
      </Link>
    </nav>
  );
}
