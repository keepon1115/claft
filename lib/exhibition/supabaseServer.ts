import { createClient, SupabaseClient } from '@supabase/supabase-js';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`環境変数 ${name} が設定されていません`);
  return v;
}

/**
 * anon キーのサーバー用クライアント。
 * RLS が適用されるため「公開済み・approved のものしか見えない」ことが保証される。
 * 公開ページのデータ取得はすべてこちらを使う。
 */
export function getAnonClient(): SupabaseClient {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

/**
 * service role クライアント。RLS をバイパスする。サーバー専用。
 * 使ってよいのは API ルート / サーバーアクションの中だけ。
 */
export function getServiceClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('service role クライアントはサーバーでのみ使用できます');
  }
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
