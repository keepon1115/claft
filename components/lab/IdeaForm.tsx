'use client';

import { useState } from 'react';
import Link from 'next/link';

// ⑤ アイデア箱フォーム。「受け取る人」から「言う・つくる側」へ（0→1）。
// 送信先は未定（オーナー確認待ち）のため、submit はローカル完了表示まで。
export function IdeaForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // TODO: 送信先が未定（FormSubmit？Supabase？）。確定したらここで送信する。
    console.log('[lab/idea] 送信内容（送信先TODO）:', data);
    setDone(true);
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
          <br />
          <small>※アプリ準備中のため、送信の接続は設定中です</small>
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

      <button type="submit" className="lab-submit green">送信する</button>
      <p className="lab-form-note">
        ボツはありません。小さな思いつきほど、おもしろくなります。
      </p>
    </form>
  );
}
