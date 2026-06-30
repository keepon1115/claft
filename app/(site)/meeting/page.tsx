'use client';

import { useState } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/s.kawahara@keeponlearning.fun';

const inputCls =
  'w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all';

export default function MeetingPage() {
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    data.append('_subject', '【CLAFT】個別面談申込');
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json().catch(() => null);
      const delivered = res.ok && (!json || json.success === 'true' || json.success === true);
      if (delivered) {
        setDone(true);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <MobileContainer>
      <Section>
        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              background: 'rgba(52,198,190,0.12)',
              color: '#2a9d96',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            個別相談
          </span>
          <h1
            className="heading-xl"
            style={{ fontFamily: 'var(--font-zen), sans-serif', marginBottom: '8px' }}
          >
            個別面談のお申し込み
          </h1>
          <p className="body-base" style={{ color: 'var(--ink-600)' }}>
            悩み事・進路相談・スクールへのご意見など、お気軽にご相談ください。
            <br />
            ご希望の日時をもとに、スタッフから折り返しご連絡します。
          </p>
        </div>

        {done ? (
          <div
            style={{
              background: 'rgba(52,198,190,0.08)',
              borderRadius: '20px',
              padding: '48px 24px',
              textAlign: 'center',
              border: '1.5px solid rgba(52,198,190,0.2)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
            <h2 className="heading-md" style={{ marginBottom: '12px' }}>
              申込内容を受け付けました
            </h2>
            <p className="body-base" style={{ color: 'var(--ink-600)', marginBottom: '24px' }}>
              日程が決まりましたら、ご記入いただいた連絡先へ
              <br />
              スタッフからご連絡します。少しだけお待ちください。
            </p>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                background: 'rgba(52,198,190,0.12)',
                color: '#2a9d96',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              トップへ戻る
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* スパム対策 */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

            <div>
              <label htmlFor="parentName" className="block mb-2 font-semibold text-ink-800 text-sm">
                保護者のお名前 <span className="text-pink text-xs">*必須</span>
              </label>
              <input
                id="parentName"
                name="保護者氏名"
                type="text"
                placeholder="例）山田 花子"
                required
                autoComplete="name"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="childName" className="block mb-2 font-semibold text-ink-800 text-sm">
                お子さまのお名前 <span className="text-ink-500 text-xs">任意</span>
              </label>
              <input
                id="childName"
                name="お子さま氏名"
                type="text"
                placeholder="例）山田 太郎"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold text-ink-800 text-sm">
                メールアドレス <span className="text-pink text-xs">*必須</span>
              </label>
              <input
                id="email"
                name="メール"
                type="email"
                placeholder="例）hanako@example.com"
                required
                autoComplete="email"
                inputMode="email"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="tel" className="block mb-2 font-semibold text-ink-800 text-sm">
                電話番号 <span className="text-ink-500 text-xs">任意</span>
              </label>
              <input
                id="tel"
                name="電話番号"
                type="tel"
                placeholder="例）090-1234-5678"
                autoComplete="tel"
                inputMode="tel"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="firstChoice" className="block mb-2 font-semibold text-ink-800 text-sm">
                第1希望の日時 <span className="text-pink text-xs">*必須</span>
              </label>
              <input
                id="firstChoice"
                name="第1希望日時"
                type="datetime-local"
                required
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="secondChoice" className="block mb-2 font-semibold text-ink-800 text-sm">
                第2希望の日時 <span className="text-ink-500 text-xs">任意</span>
              </label>
              <input
                id="secondChoice"
                name="第2希望日時"
                type="datetime-local"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="topic" className="block mb-2 font-semibold text-ink-800 text-sm">
                ご相談したいこと <span className="text-ink-500 text-xs">任意</span>
              </label>
              <textarea
                id="topic"
                name="相談内容"
                rows={5}
                placeholder="例）家庭での学習の様子について相談したい、スクールへのアイデアがある、など"
                className={`${inputCls} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#e05', fontSize: '14px' }}>
                送信に失敗しました。通信環境をご確認のうえ、もう一度お試しください。
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #34c6be, #2da89e)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.6 : 1,
                  boxShadow: '0 4px 16px rgba(52,198,190,0.35)',
                  transition: 'opacity 0.2s',
                  width: '100%',
                  fontFamily: 'var(--font-zen), sans-serif',
                }}
              >
                {status === 'sending' ? '送信中…' : 'この内容で申し込む'}
              </button>
              <p style={{ margin: '12px 0 0', fontSize: '12px', color: 'var(--ink-500)', textAlign: 'center' }}>
                いただいた内容は面談の調整にのみ使用します。
              </p>
            </div>
          </form>
        )}
      </Section>
    </MobileContainer>
  );
}
