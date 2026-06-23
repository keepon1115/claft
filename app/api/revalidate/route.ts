import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Notionで公開/編集した直後に /blog を即時反映させる手動リフレッシュ。
// 使い方: https://claft.keeponlearning.fun/api/revalidate?secret=（REVALIDATE_SECRET）
// REVALIDATE_SECRET 未設定なら無効（401）。
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'unauthorized' }, { status: 401 });
  }

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/sitemap.xml');

  return NextResponse.json({
    ok: true,
    revalidated: ['/blog', '/blog/[slug]', '/sitemap.xml'],
    now: Date.now(),
  });
}
