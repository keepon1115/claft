import { MobileContainer } from '@/components/MobileContainer';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';
import { CoursePlans } from '@/components/CoursePlans';

export function CoursesClient() {
  return (
    <MobileContainer>
      {/* ページ内に見出しの視覚要素は置かず、SEO/アクセシビリティ用にh1のみ残す */}
      <h1 className="sr-only">コース・料金</h1>

      {/* ========================================
          通学／オンラインで選ぶコースと料金
          （トップページと同じ CoursePlans を使用）
          ======================================== */}
      <CoursePlans />

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />
    </MobileContainer>
  );
}
