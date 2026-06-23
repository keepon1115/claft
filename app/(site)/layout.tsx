import { Suspense } from 'react';
import { SiteGrid } from '@/components/SiteGrid';
import { ReserveCTA } from '@/components/ReserveCTA';

// HP側の枠（左ナビ/ヘッダー/フッター/FAB）はこのグループ専用。
// (lab) のPWAはこの枠を持たないため、ルートレイアウトから移設した。
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SiteGrid>
        {children}
      </SiteGrid>
      {/* CVゴール（無料体験・個別相談の予約）への常駐CTA */}
      <ReserveCTA />
    </Suspense>
  );
}
