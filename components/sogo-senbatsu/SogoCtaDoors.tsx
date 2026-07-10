'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

type Props = {
  location: string;
};

// 総合型選抜LP専用の2扉CTA。本人向け(Yononaka体験)と保護者向け(30分相談)を並列で出す。
export function SogoCtaDoors({ location }: Props) {
  return (
    <div className="sg-cta-doors">
      <Link
        href="/yononaka"
        className="sg-cta-door sg-cta-door--line"
        onClick={() => trackEvent('cta_taiken_click', { location })}
      >
        Yononakaをのぞいてみる（体験）
      </Link>
      <Link
        href="/contact"
        className="sg-cta-door sg-cta-door--fill"
        onClick={() => trackEvent('cta_sogo_click', { location })}
      >
        30分無料オンライン相談（Zoom）
      </Link>
    </div>
  );
}
