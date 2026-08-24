'use client';

import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { LineIcon } from './craft/LineIcon';

// サイト全体に常駐する予約CTA（CVゴール=LINE相談。1択に統一。体験申込はページ内のCtaPair側で担う）。
// /contact 自体や管理画面では出さない（重複・邪魔を回避）。
const HIDE_ON = ['/contact', '/admin', '/author', '/sogo-senbatsu', '/mujinto'];

export function ReserveCTA() {
  const pathname = usePathname() || '';
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="reserve-cta-group">
      <a
        href="https://lin.ee/wcsFK9A"
        target="_blank"
        rel="noopener"
        className="reserve-cta"
        onClick={() => trackEvent('cta_line_click', { location: 'reserve-cta', from: pathname })}
        aria-label="LINEで気軽に相談する"
      >
        <LineIcon width={20} />
        <span className="reserve-cta-label">LINEで相談</span>
      </a>
    </div>
  );
}
