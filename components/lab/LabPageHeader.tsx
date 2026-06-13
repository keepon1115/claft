import Link from 'next/link';

// サブページ共通ヘッダー：戻る矢印＋画面タイトル（ワイヤーフレームの navy バー）。
export function LabPageHeader({ title }: { title: string }) {
  return (
    <header className="lab-page-header">
      <Link href="/lab" className="lab-back" aria-label="トップへ戻る">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      <h1>{title}</h1>
    </header>
  );
}
