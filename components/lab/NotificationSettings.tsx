'use client';

import { useEffect, useState } from 'react';
import { usePushNotifications } from './usePushNotifications';

// ⑦ プッシュ通知のON/OFFトグル（全体・新着イベントの2粒度）。
// ONにする時にブラウザの通知許可を取得し、設定値は localStorage に保持する。
// 実際の配信（VAPIDキー・送信サーバー）は usePushNotifications 内の TODO で停止中。

const STORAGE_KEY = 'lab-notify-settings';

type NotifySettings = {
  all: boolean;
  newEvent: boolean;
};

const DEFAULTS: NotifySettings = { all: false, newEvent: false };

const PERMISSION_LABEL: Record<string, string> = {
  granted: '✅ 通知は許可されています',
  denied: '🚫 ブラウザでブロック中です。端末の設定から許可してください',
  default: '🔕 まだ許可されていません。スイッチをONにすると確認が出ます',
  unsupported: 'このブラウザはプッシュ通知に対応していません',
};

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotifySettings>(DEFAULTS);
  const { permission, enable } = usePushNotifications();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSettings({ ...DEFAULTS, ...JSON.parse(saved) });
    } catch {
      /* 壊れた保存値は初期値で上書き */
    }
  }, []);

  function save(next: NotifySettings) {
    setSettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async function toggle(key: keyof NotifySettings) {
    const turningOn = !settings[key];
    if (turningOn) {
      const ok = await enable();
      if (!ok) return; // 許可が取れなければONにしない（状態表示で案内）
    }
    save({ ...settings, [key]: turningOn });
  }

  const disabled = permission === 'unsupported';

  return (
    <>
      <div className="lab-toggle-row">
        <div>
          <span className="t-label">プッシュ通知(全体)</span>
          <span className="t-desc">お知らせ・活動報告などすべての通知</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={settings.all}
          aria-label="プッシュ通知(全体)"
          className="lab-switch"
          disabled={disabled}
          onClick={() => toggle('all')}
        />
      </div>

      <div className="lab-toggle-row">
        <div>
          <span className="t-label">新着イベント</span>
          <span className="t-desc">募集開始をいちはやくお知らせ(おすすめ)</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={settings.newEvent}
          aria-label="新着イベント通知"
          className="lab-switch"
          disabled={disabled}
          onClick={() => toggle('newEvent')}
        />
      </div>

      <p className="lab-form-note" role="status">
        {PERMISSION_LABEL[permission]}
        <br />
        ※通知の配信は準備中です。設定はこの端末に保存されます。
      </p>
    </>
  );
}
