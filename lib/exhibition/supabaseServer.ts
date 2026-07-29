import { createClient, SupabaseClient } from '@supabase/supabase-js';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`環境変数 ${name} が設定されていません`);
  return v;
}

/**
 * Next.js の Data Cache は、ページ側で dynamic = 'force-dynamic' を指定していても
 * supabase-js 内部の fetch までは自動で no-store にならず、ディスクキャッシュ
 * （.next/cache/fetch-cache）に古いレスポンスが残り続けることがある。
 * ここで明示的に no-store を指定し、常に最新のDB状態を取得する。
 */
function noStoreFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input, { ...init, cache: 'no-store' });
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
    { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: noStoreFetch } },
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
    { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: noStoreFetch } },
  );
}
