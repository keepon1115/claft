// GA4 へのイベント送信ヘルパー。gtag 未ロード時は無視（安全）。
// CV計測の中心は「無料体験・個別相談の予約」。

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// 予約フォーム送信完了（コンバージョン）。GA4 側でこの 'reservation_submit' を
// キーイベント（コンバージョン）に設定する。
export function trackReservation(inquiryType: string) {
  trackEvent('reservation_submit', { inquiry_type: inquiryType });
}
