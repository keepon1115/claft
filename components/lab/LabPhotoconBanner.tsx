import { EXTERNAL_LINKS } from '@/lib/lab/content';

// フィード：今月のフォトコンテストへの導線バナー（別タブ）。秋色（紅葉のオレンジ〜栗色）。
export function LabPhotoconBanner() {
  return (
    <a
      className="lab-pc-banner"
      href={EXTERNAL_LINKS.photocon}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="lab-pc-banner-icon" aria-hidden="true">🍁</span>
      <span className="lab-pc-banner-text">
        <b>今月のフォトコンテスト</b>
        <span>テーマ「秋やん！」</span>
      </span>
      <span className="lab-pc-banner-arrow" aria-hidden="true">→</span>
    </a>
  );
}
