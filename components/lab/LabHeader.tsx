import Link from 'next/link';
import Image from 'next/image';
import rogo from '@/public/lab-icons/rogo.png';

// 共通ヘッダー：左ロゴ / 右に設定・手紙（アイデア箱）アイコン。
// 手紙はInstagramのDM位置（仕様）。
export function LabHeader() {
  return (
    <header className="lab-header">
      <Link href="/lab" className="lab-logo" aria-label="キープオンラボ トップへ">
        <Image src={rogo} alt="Keeponラボ 0→1コミュニティ" className="lab-logo-img" priority />
      </Link>
      <div className="lab-header-icons">
        <Link href="/lab/settings" className="lab-icon-btn" aria-label="設定">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </Link>
        <Link href="/lab/guide" className="lab-icon-btn" aria-label="アプリの使い方">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
            <path d="M12 17h.01" />
          </svg>
        </Link>
        <Link href="/lab/idea" className="lab-icon-btn" aria-label="アイデア箱">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <span className="lab-badge" aria-hidden="true">!</span>
        </Link>
      </div>
    </header>
  );
}
