import { redirect } from 'next/navigation';

/**
 * 作品個別ページは廃止し、一覧ページ内の該当セクションへ誘導する。
 * 既存の共有URL・管理画面からの「公開ページ」リンクを壊さないためリダイレクトのみ残す。
 */
export default function WorkDetailRedirect({
  params,
}: {
  params: { slug: string; workId: string };
}) {
  redirect(`/futurecraft/Exhibition/${params.slug}#work-${params.workId}`);
}
