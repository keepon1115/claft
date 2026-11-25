'use client';

import { useActionState, useEffect, useState } from 'react';
import { completePasswordReset, requestPasswordReset, type ResetStatus } from './actions';

const inputClass = 'mt-1 min-h-11 w-full rounded-lg border border-[#1F1810]/30 px-3 py-2 text-base focus:outline focus:outline-2 focus:outline-[var(--brand-deep)]';
const buttonClass = 'min-h-11 w-full rounded-full bg-[#1F1810] px-4 py-2 text-sm font-bold text-white disabled:opacity-50';
const initialState: ResetStatus = {};

export function ResetForm() {
  const [token, setToken] = useState<string>();
  const [sent, send, sending] = useActionState(requestPasswordReset, initialState);
  const [completed, complete, completing] = useActionState(completePasswordReset, initialState);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const value = hash.get('token_hash');
    if (!value) return;
    window.history.replaceState(window.history.state, '', window.location.pathname);
    setToken(value);
  }, []);

  if (token && !completed.linkInvalid) {
    return (
      <form action={complete} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <label className="block text-sm font-medium">新しいパスワード
          <input className={inputClass} name="password" type="password" minLength={8} required autoComplete="new-password" />
        </label>
        <label className="block text-sm font-medium">新しいパスワード（確認）
          <input className={inputClass} name="confirmation" type="password" minLength={8} required autoComplete="new-password" />
        </label>
        {completed.error && <p role="alert" className="text-sm text-[#902a14]">{completed.error}</p>}
        <button type="submit" disabled={completing} className={buttonClass}>{completing ? '変更中…' : 'パスワードを変更する'}</button>
      </form>
    );
  }

  return (
    <form action={send} className="space-y-4">
      {completed.linkInvalid && !sent.message && <p role="alert" className="text-sm text-[#902a14]">{completed.error}</p>}
      <label className="block text-sm font-medium">運営アカウントのメールアドレス
        <input className={inputClass} name="email" type="email" required maxLength={254} autoComplete="email" />
      </label>
      {sent.error && <p role="alert" className="text-sm text-[#902a14]">{sent.error}</p>}
      {sent.message && <p role="status" className="text-sm">{sent.message}</p>}
      <button type="submit" disabled={sending} className={buttonClass}>{sending ? '送信中…' : '再設定メールを送る'}</button>
    </form>
  );
}
