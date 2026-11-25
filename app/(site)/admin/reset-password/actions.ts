'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { getAdminClient } from '@/lib/exhibition/adminAuth';
import { absoluteUrl } from '@/lib/seo';

export type ResetStatus = { message?: string; error?: string; linkInvalid?: boolean };


export async function requestPasswordReset(_state: ResetStatus, form: FormData): Promise<ResetStatus> {
  const email = z.string().trim().max(254).email().safeParse(form.get('email'));
  if (!email.success) return { error: 'メールアドレスを確認してください。' };

  const client = await getAdminClient();
  const { error } = await client.auth.resetPasswordForEmail(email.data, {
    redirectTo: absoluteUrl('/admin/reset-password/callback'),
  });
  if (error) return { error: 'メールの送信を完了できませんでした。少し時間をおいて再度お試しください。' };
  return { message: '運営アカウントに登録済みのメールアドレスであれば、再設定メールが届きます。' };
}

export async function completePasswordReset(_state: ResetStatus, form: FormData): Promise<ResetStatus> {
  const password = form.get('password');
  if (typeof password !== 'string' || password.length < 8 || new TextEncoder().encode(password).length > 72) {
    return { error: 'パスワードは8文字以上、72バイト以内で入力してください。' };
  }
  if (password !== form.get('confirmation')) return { error: '2つのパスワードが一致していません。' };
  const cookieStore = await cookies();
  const marker = cookieStore.get('claft-recovery')?.value;
  const client = await getAdminClient();
  const { data: { session } } = await client.auth.getSession();
  if (!marker || !session || marker !== createHash('sha256').update(session.access_token).digest('hex')) {
    return { error: '再設定リンクの有効期限が切れているか、使用済みです。メールを送り直してください。', linkInvalid: true };
  }

  const { error: updateError } = await client.auth.updateUser({ password });
  if (updateError) {
    return { error: 'パスワードを変更できませんでした。今までと異なるパスワードでお試しください。' };
  }
  cookieStore.set('claft-recovery', '', { path: '/admin/reset-password', maxAge: 0 });
  await client.auth.signOut({ scope: 'local' });
  redirect('/admin/login?reset=done');
}
