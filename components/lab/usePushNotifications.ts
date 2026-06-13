'use client';

import { useCallback, useEffect, useState } from 'react';

export type PushPermission = NotificationPermission | 'unsupported';

// プッシュ通知の許可フローを束ねるフック（購読のガラ）。
// 実購読は VAPID キー発行待ちのため subscribeToPush 内の TODO で停止中。
export function usePushNotifications() {
  const [permission, setPermission] = useState<PushPermission>('default');

  useEffect(() => {
    if (
      !('Notification' in window) ||
      !('serviceWorker' in navigator) ||
      !('PushManager' in window)
    ) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission);
  }, []);

  /** 通知をONにする。許可が取れて購読まで進めたら true */
  const enable = useCallback(async (): Promise<boolean> => {
    if (permission === 'unsupported') return false;
    let perm = Notification.permission;
    if (perm === 'default') {
      perm = await Notification.requestPermission();
    }
    setPermission(perm);
    if (perm !== 'granted') return false;
    await subscribeToPush();
    return true;
  }, [permission]);

  return { permission, enable };
}

// Web Push の購読処理（ガラ）。
async function subscribeToPush(): Promise<void> {
  // TODO: VAPID公開鍵の発行待ち（オーナー確認事項）。鍵が用意できたら以下を有効化する。
  // const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_LAB_VAPID_PUBLIC_KEY!;
  // const reg = await navigator.serviceWorker.ready;
  // const sub = await reg.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  // });
  // TODO: 購読情報の保存先も未定（自前API or Supabase）。決まり次第ここでPOSTする。
  // await fetch('/api/lab/push/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(sub),
  // });
}

/** VAPID公開鍵（base64url文字列）を pushManager.subscribe が受け取る形式へ変換 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}
