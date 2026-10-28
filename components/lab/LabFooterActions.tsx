import { EXTERNAL_LINKS } from '@/lib/lab/content';

// フィード最下部の常設導線：Google口コミ / アプリ改善・ご意見フォーム（別タブ）。
export function LabFooterActions() {
  return (
    <div className="lab-footer-actions">
      <a
        className="lab-footer-action"
        href={EXTERNAL_LINKS.googleReview}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="lab-footer-action-icon" aria-hidden="true">⭐</span>
        <span className="lab-footer-action-text">
          <b>Google口コミのお願い</b>
          <span>ラボの感想をひとこと書いてもらえると励みになります</span>
        </span>
        <span className="lab-footer-action-arrow" aria-hidden="true">→</span>
      </a>
      <a
        className="lab-footer-action"
        href={EXTERNAL_LINKS.appFeedback}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="lab-footer-action-icon" aria-hidden="true">💡</span>
        <span className="lab-footer-action-text">
          <b>アプリ改善/ご意見はこちら</b>
          <span>使いにくい点・ほしい機能を教えてください</span>
        </span>
        <span className="lab-footer-action-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
