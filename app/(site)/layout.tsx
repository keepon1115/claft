import { SiteGrid } from '@/components/SiteGrid';

// HP側の枠（左ナビ/ヘッダー/フッター/FAB）はこのグループ専用。
// (lab) のPWAはこの枠を持たないため、ルートレイアウトから移設した。
// ※ ここを <Suspense> で包んだり、枠で useSearchParams を使ったりしないこと。
//   ページ全体がクライアント描画になり、本文が HTML に出なくなる。
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteGrid>{children}</SiteGrid>;
}
