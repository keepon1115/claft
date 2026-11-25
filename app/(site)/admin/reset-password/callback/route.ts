import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminClient } from '@/lib/exhibition/adminAuth';

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code');
  if (!code || code.length > 256) redirect('/admin/reset-password?error=link');

  const client = await getAdminClient();
  const { data, error } = await client.auth.exchangeCodeForSession(code);
  if (error || !data.session || !('redirectType' in data) || data.redirectType !== 'recovery') {
    redirect('/admin/reset-password?error=link');
  }

  const cookieStore = await cookies();
  cookieStore.set('claft-recovery', createHash('sha256').update(data.session.access_token).digest('hex'), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin/reset-password',
    maxAge: 600,
  });
  redirect('/admin/reset-password');
}
