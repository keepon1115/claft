'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

// サイト全体に常駐する予約CTA（CVゴール=無料体験・個別相談の予約）。
// /contact 自体や管理画面では出さない（重複・邪魔を回避）。
const HIDE_ON = ['/contact', '/admin', '/author'];

export function ReserveCTA() {
  const pathname = usePathname() || '';
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <Link
      href="/contact?type=taiken"
      className="reserve-cta"
      onClick={() => trackEvent('reserve_cta_click', { from: pathname })}
      aria-label="無料体験・個別相談を予約する"
    >
      <span aria-hidden="true">🎒</span>
      <span className="reserve-cta-label">無料体験を予約</span>
    </Link>
  );
}
