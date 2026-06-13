// キープオンラボ — Web Push のガラ。
// next-pwa がこのファイルを sw.js に取り込む（カスタムワーカー規約）。
// 配信側（VAPIDキー・送信サーバー）が未契約のため発火はまだしないが、
// 購読が有効になり次第このハンドラがそのまま動く。

self.addEventListener('push', (event) => {
  if (!event.data) return;
  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = { body: event.data.text() };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'キープオンラボ', {
      body: data.body || '',
      icon: '/lab-icons/icon-192.png',
      badge: '/lab-icons/icon-192.png',
      data: { url: data.url || '/lab' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/lab';
  event.waitUntil(self.clients.openWindow(url));
});
