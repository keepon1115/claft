'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// 記事末のフィードバック（案A: 役に立った？ + 案B: 質問・感想フォーム）。
// 質問は FormSubmit（keeponlabo@gmail.com・有効化済み）で送信。
// 届いた質問は記事にFAQとして追記し、GEOのQ&A供給源にする運用。
export function FeedbackBlock({ slug, title }: { slug: string; title: string }) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function vote(helpful: 'yes' | 'no') {
    if (voted) return;
    setVoted(helpful);
    trackEvent('article_feedback', { article_slug: slug, helpful });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus('sending');
    const data = new FormData();
    data.append('_subject', `ブログへの質問・感想: ${title}`);
    data.append('_template', 'table');
    data.append('_captcha', 'false');
    data.append('記事', `https://claft.keeponlearning.fun/blog/${slug}`);
    data.append('内容', message);
    if (email.trim()) data.append('返信先メール', email);
    try {
      const res = await fetch('https://formsubmit.co/ajax/keeponlabo@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json().catch(() => null);
      const ok = res.ok && (!json || json.success === 'true' || json.success === true);
      if (ok) {
        setStatus('sent');
        trackEvent('blog_question_submit', { article_slug: slug });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="blog-feedback">
      <div className="blog-feedback-vote">
        <p className="blog-feedback-q">この記事は役に立ちましたか？</p>
        {voted ? (
          <p className="blog-feedback-thanks">
            {voted === 'yes'
              ? 'ありがとうございます！励みになります🎉'
              : 'ありがとうございます。もっと良い記事にします🙏 よろしければ下の欄で「知りたかったこと」を教えてください。'}
          </p>
        ) : (
          <div className="blog-feedback-btns">
            <button type="button" onClick={() => vote('yes')} className="blog-feedback-btn">
              👍 役に立った
            </button>
            <button type="button" onClick={() => vote('no')} className="blog-feedback-btn">
              👎 いまいち
            </button>
          </div>
        )}
      </div>

      <div className="blog-feedback-form">
        <p className="blog-feedback-q">この記事への質問・感想</p>
        <p className="blog-feedback-note">
          いただいた質問には、記事の中でお答えすることがあります。お気軽にどうぞ。
        </p>
        {status === 'sent' ? (
          <p className="blog-feedback-thanks">
            送信しました。ありがとうございます！記事の更新をお楽しみに。
          </p>
        ) : (
          <form onSubmit={submit}>
            <textarea
              className="blog-feedback-textarea"
              rows={3}
              placeholder="例）不登校気味の中1です。この方法は家庭でもできますか？"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="email"
              className="blog-feedback-email"
              placeholder="返信がほしい場合はメールアドレス（任意）"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="craft-sticker blog-feedback-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? '送信中…' : '送信する'}
            </button>
            {status === 'error' && (
              <p className="blog-feedback-error">
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
