'use client';

import { useState } from 'react';
import Link from 'next/link';

// 送信先：keeponlabo@gmail.com（FormSubmit.co のAJAXエンドポイント）。
// ※初回のみFormSubmitから有効化メールが届くので、リンクを一度クリックして有効化すること。
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/keeponlabo@gmail.com';

// ⑤ アイデア箱フォーム。「受け取る人」から「言う・つくる側」へ（0→1）。
export function IdeaForm() {
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    data.append('_subject', '【キープオンラボ】アイデア箱に新着');
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
        <span className="done-emoji" aria-hidden="true">💌</span>
        <h2>ラボに届きました！</h2>
        <p>
          アイデアをありがとう。きみの「あったらいいな」が、
          ラボの次の一歩になります。
          スタッフみんなで、たいせつに読みます。
        </p>
        <div className="lab-done-actions">
          <button type="button" className="lab-done-sub" onClick={() => setDone(false)}>
            もうひとつ送る
          </button>
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
        <span>ニックネーム</span>
        <input className="lab-input" name="nickname" placeholder="例）マイクラ博士（なくてもOK）" />
      </label>

      <label className="lab-field">
        <span>きみのアイデア<em className="lab-req">必須</em></span>
        <textarea
          className="lab-textarea"
          name="idea"
          required
          placeholder="こんなのあったらいいな、を自由に書いてね。&#10;イベントの企画、つくってみたいもの、ラボへのお願い、なんでも大歓迎！"
          style={{ minHeight: 150 }}
        />
      </label>

      {status === 'error' && (
        <p className="lab-form-error">
          送信にしっぱいしました。電波のいい場所でもう一度ためしてね。
        </p>
      )}

      <button type="submit" className="lab-submit green" disabled={status === 'sending'}>
        {status === 'sending' ? '送信中…' : '送信する'}
      </button>
      <p className="lab-form-note">
        ボツはありません。小さな思いつきほど、おもしろくなります。
      </p>
    </form>
  );
}
