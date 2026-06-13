'use client';

import { useState } from 'react';
import Link from 'next/link';

// ④ 面談申込フォーム。
// 送信先は未定（オーナー確認待ち）のため、submit はローカル完了表示まで。
export function MeetingForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // TODO: 送信先が未定（FormSubmit？Supabase？）。確定したらここで送信する。
    // 例: await fetch(MEETING_ENDPOINT, { method: 'POST', body: JSON.stringify(data) })
    console.log('[lab/meeting] 送信内容（送信先TODO）:', data);
    setDone(true);
  }

  if (done) {
    return (
      <div className="lab-done">
        <span className="done-emoji" aria-hidden="true">🤝</span>
        <h2>申込内容を受け付けました</h2>
        <p>
          日程が決まりましたら、ご記入いただいた連絡先へ
          ラボからご連絡します。少しだけお待ちくださいね。
          <br />
          <small>※アプリ準備中のため、送信の接続は設定中です</small>
        </p>
        <div className="lab-done-actions">
          <Link href="/lab" className="lab-done-sub">トップへ戻る</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="lab-field">
        <span>保護者のお名前<em className="lab-req">必須</em></span>
        <input className="lab-input" name="parentName" required autoComplete="name" placeholder="例）山田 花子" />
      </label>

      <label className="lab-field">
        <span>お子さまのお名前</span>
        <input className="lab-input" name="childName" placeholder="例）山田 太郎" />
      </label>

      <label className="lab-field">
        <span>連絡先メールアドレス<em className="lab-req">必須</em></span>
        <input className="lab-input" type="email" name="email" required autoComplete="email" inputMode="email" placeholder="例）hanako@example.com" />
      </label>

      <label className="lab-field">
        <span>電話番号</span>
        <input className="lab-input" type="tel" name="tel" autoComplete="tel" inputMode="tel" placeholder="例）090-1234-5678" />
      </label>

      <label className="lab-field">
        <span>第1希望の日時<em className="lab-req">必須</em></span>
        <input className="lab-input" type="datetime-local" name="firstChoice" required />
      </label>

      <label className="lab-field">
        <span>第2希望の日時</span>
        <input className="lab-input" type="datetime-local" name="secondChoice" />
      </label>

      <label className="lab-field">
        <span>ご相談したいこと</span>
        <textarea
          className="lab-textarea"
          name="topic"
          placeholder="例）家庭での学習の様子について相談したい"
        />
      </label>

      <button type="submit" className="lab-submit navy">この内容で申し込む</button>
      <p className="lab-form-note">いただいた内容は面談の調整にのみ使用します。</p>
    </form>
  );
}
