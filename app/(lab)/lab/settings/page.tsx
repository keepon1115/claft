import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { NotificationSettings } from '@/components/lab/NotificationSettings';

export const metadata: Metadata = { title: '設定 | キープオンラボ' };

// ⑦ 設定：プッシュ通知トグル＋ホーム画面追加の案内
export default function SettingsPage() {
  return (
    <>
      <LabPageHeader title="設定" />
      <main className="lab-page-body">
        <h2 className="lab-feed-h">通知</h2>
        <NotificationSettings />

        <h2 className="lab-feed-h" style={{ marginTop: 24 }}>ホーム画面に追加</h2>
        <div className="lab-card">
          <h3><span aria-hidden="true">📱</span>iPhone（Safari）の場合</h3>
          <ol>
            <li>画面下の「共有」ボタン（□に↑）をタップ</li>
            <li>「ホーム画面に追加」を選ぶ</li>
            <li>右上の「追加」をタップ</li>
          </ol>
        </div>
        <div className="lab-card">
          <h3><span aria-hidden="true">🤖</span>Android（Chrome）の場合</h3>
          <ol>
            <li>右上のメニュー（︙）をタップ</li>
            <li>「アプリをインストール」または「ホーム画面に追加」を選ぶ</li>
          </ol>
        </div>
        <p className="lab-form-note">
          追加すると、アプリのようにワンタップでラボを開けます。
        </p>
      </main>
    </>
  );
}
