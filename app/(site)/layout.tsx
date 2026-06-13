import { Suspense } from 'react';
import { SiteGrid } from '@/components/SiteGrid';

// HP側の枠（左ナビ/ヘッダー/フッター/FAB）はこのグループ専用。
// (lab) のPWAはこの枠を持たないため、ルートレイアウトから移設した。
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SiteGrid>
        {children}
      </SiteGrid>
    </Suspense>
  );
}
