import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SparkleDoodle, ArrowRightDoodle } from '@/components/craft/HandDrawn';

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "あなたも「自分らしさ」を見つけませんか？",
  description = "CLAFTでは無料体験を随時受け付けています。\nまずはお気軽にご相談ください。"
}: CTASectionProps) {
  return (
    <section className="py-10 px-4 reveal">
      <div
        className="craft-paper craft-paper--warm craft-tilt text-center p-8"
        style={{ '--rot': '-0.5deg' } as CSSProperties}
      >
        <span className="craft-tape" aria-hidden="true" />
        <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />

        {/* タイトル */}
        <h2 className="heading-lg mb-4" style={{ lineHeight: 'var(--leading-snug)' }}>
          {title}
        </h2>

        {/* 説明文 */}
        <p
          className="body-base text-[var(--ink-600)] mb-6"
          style={{ lineHeight: 'var(--leading-loose)', whiteSpace: 'pre-line' }}
        >
          {description}
        </p>

        {/* CTAボタン */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="craft-sticker">
            無料体験に申し込む
            <ArrowRightDoodle width={20} />
          </Link>
          <Link href="/workshop#trial" className="craft-sticker craft-sticker--ghost">
            ワークショップを見る
            <ArrowRightDoodle width={20} />
          </Link>
        </div>

        {/* 装飾の手描ききらきら */}
        <div className="flex justify-center gap-3 mt-8" aria-hidden="true">
          <SparkleDoodle width={18} style={{ color: 'var(--brand)', opacity: 0.5 }} />
          <SparkleDoodle width={22} style={{ color: 'var(--cream)', opacity: 0.9 }} />
          <SparkleDoodle width={18} style={{ color: 'var(--pink)', opacity: 0.5 }} />
        </div>
      </div>
    </section>
  );
}
