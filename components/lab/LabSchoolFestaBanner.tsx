import { EXTERNAL_LINKS } from '@/lib/lab/content';

// フィード：秋のスクールフェスタ参加申し込みへの導線バナー（別タブ）。
export function LabSchoolFestaBanner() {
  return (
    <a
      className="lab-festa-banner"
      href={EXTERNAL_LINKS.schoolFesta}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="lab-festa-banner-icon" aria-hidden="true">🏮</span>
      <span className="lab-festa-banner-text">
        <b>秋のスクールフェスタ</b>
        <span>イベント参加申し込み開始！今すぐチェック！</span>
      </span>
      <span className="lab-festa-banner-arrow" aria-hidden="true">→</span>
    </a>
  );
}
