'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getAnonClient } from '@/lib/exhibition/supabaseServer';

export type ResetStatus = { message?: string; error?: string; linkInvalid?: boolean };

export async function requestPasswordReset(_state: ResetStatus, form: FormData): Promise<ResetStatus> {
  const email = z.string().trim().max(254).email().safeParse(form.get('email'));
  if (!email.success) return { error: 'メールアドレスを確認してください。' };

  const { error } = await getAnonClient().auth.resetPasswordForEmail(email.data);
  if (error) return { error: 'メールの送信を完了できませんでした。少し時間をおいて再度お試しください。' };
  return { message: '運営アカウントに登録済みのメールアドレスであれば、再設定メールが届きます。' };
}

export async function completePasswordReset(_state: ResetStatus, form: FormData): Promise<ResetStatus> {
  const token = form.get('token');
  const password = form.get('password');
  if (typeof password !== 'string' || password.length < 8 || new TextEncoder().encode(password).length > 72) {
    return { error: 'パスワードは8文字以上、72バイト以内で入力してください。' };
  }
  if (password !== form.get('confirmation')) return { error: '2つのパスワードが一致していません。' };
  if (typeof token !== 'string' || !/^[a-zA-Z0-9_-]{32,256}$/.test(token)) {
    return { error: '再設定リンクを確認できません。メールを送り直してください。', linkInvalid: true };
  }

  // このリクエスト内でだけ復旧セッションを使う。ブラウザには認証Cookieを渡さない。
  const client = getAnonClient();
  const { data, error } = await client.auth.verifyOtp({ type: 'recovery', token_hash: token });
  if (error || !data.session) {
    return { error: '再設定リンクの有効期限が切れているか、使用済みです。メールを送り直してください。', linkInvalid: true };
  }

  const { error: updateError } = await client.auth.updateUser({ password });
  if (updateError) {
    return { error: 'パスワードを変更できませんでした。メールを送り直し、今までと異なるパスワードでお試しください。', linkInvalid: true };
  }
  redirect('/admin/login?reset=done');
}
