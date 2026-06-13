'use client';

import { useEffect } from 'react';

// Service Worker の登録。/lab 配下のページからのみ呼ばれ、
// scope を /lab に限定して HP 側のページには一切関与させない。
// next-pwa は開発モードでは SW を生成しないため、本番ビルドのみ登録する。
export function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker
      .register('/sw.js', { scope: '/lab' })
      .catch((err) => console.error('[lab] SW登録に失敗:', err));
  }, []);

  return null;
}
