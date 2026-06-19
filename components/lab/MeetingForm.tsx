'use client';

import { useState } from 'react';
import Link from 'next/link';

// 送信先：keeponlabo@gmail.com（FormSubmit.co のAJAXエンドポイント）。
// ※初回のみFormSubmitから有効化メールが届くので、リンクを一度クリックして有効化すること。
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/keeponlabo@gmail.com';

// ④ 面談申込フォーム。
export function MeetingForm() {
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    data.append('_subject', '【キープオンラボ】面談申込');
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('idle');
        setDone(true);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (done) {
    return (
      <div className="lab-done">
        <span className="done-emoji" aria-hidden="true">🤝</span>
        <h2>申込内容を受け付けました</h2>
        <p>
          日程が決まりましたら、ご記入いただいた連絡先へ
          ラボからご連絡します。少しだけお待ちくださいね。
        </p>
        <div className="lab-done-actions">
          <Link href="/lab" className="lab-done-sub">トップへ戻る</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* スパム対策（ハニーポット） */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

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

      {status === 'error' && (
        <p className="lab-form-error">
          送信に失敗しました。通信環境をご確認のうえ、もう一度お試しください。
        </p>
      )}

      <button type="submit" className="lab-submit navy" disabled={status === 'sending'}>
        {status === 'sending' ? '送信中…' : 'この内容で申し込む'}
      </button>
      <p className="lab-form-note">いただいた内容は面談の調整にのみ使用します。</p>
    </form>
  );
}
