import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient, User } from '@supabase/supabase-js';

/**
 * 運営（Supabase Auth でログイン済みのユーザー）用クライアント。
 * RLS の authenticated ポリシーで全テーブルを操作できる。
 * RSC からは cookie 書き込みができないため setAll は失敗を握りつぶす
 * （サーバーアクション / ルートハンドラからは正常に書き込まれる）。
 */
export function getAdminClient(): SupabaseClient {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // RSC からの呼び出しでは書き込み不可（無視してよい）
          }
        },
      },
    },
  );
}

/** ログイン中の運営ユーザーを返す。未ログインなら null */
export async function getAdminUser(): Promise<User | null> {
  const supabase = getAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
