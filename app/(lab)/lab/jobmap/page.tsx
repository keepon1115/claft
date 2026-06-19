import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';

export const metadata: Metadata = { title: 'お仕事マップ | キープオンラボ' };

// ⑥ お仕事マップ：ラボの歩き方からの導線。現在準備中のプレースホルダ。
export default function JobMapPage() {
  return (
    <>
      <LabPageHeader title="🗺️ お仕事マップ" />
      <main className="lab-page-body">
        <div className="lab-soon">
          <span className="lab-soon-emoji">🛠️</span>
          <h2>作成中です</h2>
          <p>少々お待ちください。</p>
          <p className="lab-soon-note">
            「好き」から社会の仕事を逆引きできる「お仕事マップ」を準備しています。
            公開までもうしばらくお待ちください。
          </p>
        </div>
      </main>
    </>
  );
}
