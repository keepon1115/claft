'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

// サイト全体に常駐する予約CTA（CVゴール=LINE相談・無料体験予約の並列2択）。
// /contact 自体や管理画面では出さない（重複・邪魔を回避）。
const HIDE_ON = ['/contact', '/admin', '/author', '/sogo-senbatsu'];

export function ReserveCTA() {
  const pathname = usePathname() || '';
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="reserve-cta-group">
      <a
        href="https://lin.ee/wcsFK9A"
        target="_blank"
        rel="noopener"
        className="reserve-cta reserve-cta--line"
        onClick={() => trackEvent('cta_line_click', { location: 'reserve-cta', from: pathname })}
        aria-label="LINEで気軽に相談する"
      >
        <span aria-hidden="true">💬</span>
        <span className="reserve-cta-label">LINEで相談</span>
      </a>
      <Link
        href="/contact?type=taiken"
        className="reserve-cta"
        onClick={() => {
          trackEvent('cta_taiken_click', { location: 'reserve-cta', from: pathname });
          trackEvent('reserve_cta_click', { from: pathname });
        }}
        aria-label="無料体験・個別相談を予約する"
      >
        <span aria-hidden="true">🎒</span>
        <span className="reserve-cta-label">無料体験を予約</span>
      </Link>
    </div>
  );
}
