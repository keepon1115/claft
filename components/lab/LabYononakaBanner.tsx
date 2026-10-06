import Link from 'next/link';
import { CHOKOTTO_TOPICS } from '@/lib/lab/yononaka';

// フィード：Yononakaページ（アプリ内）への入口バナー。クリーム地＋琥珀の灯り。
export function LabYononakaBanner() {
  const latest = CHOKOTTO_TOPICS[0];
  return (
    <Link className="lab-yn-banner" href="/lab/yononaka">
      <span className="lab-yn-banner-icon" aria-hidden="true">💡</span>
      <span className="lab-yn-banner-text">
        <b>Yononaka｜今週のお題、ひとこと答えてみませんか？</b>
        <span>{latest ? `${latest.no} ${latest.title}` : 'ひとこと答えてみませんか'}</span>
      </span>
      <span className="lab-yn-banner-arrow" aria-hidden="true">→</span>
    </Link>
  );
}
