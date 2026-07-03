import { EXTERNAL_LINKS } from '@/lib/lab/content';

// フィード最上部の常設バナー：教育・キャリアブログへの導線（別タブ）。
export function LabBlogBanner() {
  return (
    <a
      className="lab-blog-banner"
      href={EXTERNAL_LINKS.blog}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="lab-blog-banner-icon" aria-hidden="true">📚</span>
      <span className="lab-blog-banner-text">
        <b>教育・キャリアブログ</b>
        <span>子育て・学び・仕事のヒントを発信中</span>
      </span>
      <span className="lab-blog-banner-arrow" aria-hidden="true">→</span>
    </a>
  );
}
