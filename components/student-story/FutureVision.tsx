import type { CSSProperties } from 'react';
import { DoodleIcon } from '@/components/craft/DoodleIcon';
import { SparkleDoodle } from '@/components/craft/HandDrawn';

type FutureVisionProps = {
  visionText: string;
  subText?: string;
};

export function FutureVision({ visionText, subText }: FutureVisionProps) {
  return (
    <section className="py-8 px-4 reveal">
      <div className="craft-paper craft-paper--warm craft-tilt p-6" style={{ '--rot': '0.6deg' } as CSSProperties}>
        <span className="craft-tape craft-tape--pink" aria-hidden="true" />

        {/* ラベル */}
        <div className="flex items-center gap-2 mb-4">
          <span style={{ color: 'var(--pink)' }} aria-hidden="true">
            <DoodleIcon name="sparkle" size={24} />
          </span>
          <h2 className="heading-sm text-[var(--pink)] m-0">なりたい姿・将来のイメージ</h2>
        </div>

        {/* メインビジョン */}
        <p className="heading-md text-[var(--ink-900)] mb-0" style={{ lineHeight: 'var(--leading-loose)' }}>
          {visionText}
        </p>

        {/* サブテキスト */}
        {subText && (
          <p className="body-sm text-[var(--ink-600)] mt-4 mb-0" style={{ lineHeight: 'var(--leading-loose)' }}>
            {subText}
          </p>
        )}

        {/* 装飾の手描ききらきら */}
        <div className="flex justify-end mt-4 gap-2" aria-hidden="true">
          <SparkleDoodle width={18} style={{ color: 'var(--pink)', opacity: 0.6 }} />
          <SparkleDoodle width={18} style={{ color: 'var(--cream)', opacity: 0.9 }} />
          <SparkleDoodle width={18} style={{ color: 'var(--brand)', opacity: 0.6 }} />
        </div>
      </div>
    </section>
  );
}
