// ============================================================
// キープオンラボ — microCMS クライアント（サーバー専用）
//
// 依存を増やさないため SDK は使わず fetch で実装。
// ISR（next.revalidate）で、再ビルドなしに更新が反映される。
// 環境変数（MICROCMS_*）が未設定／取得失敗時は null を返し、
// 呼び出し側が静的ダミーへフォールバックできるようにする。
// ============================================================

const DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

/** microCMS のリストAPIレスポンス */
type MicroCMSList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

/**
 * microCMS のリストAPIを取得する。
 * 未設定・404（API未作成）・通信失敗時は null（→静的フォールバック）。
 * @param endpoint API ID（例: 'posts'）
 * @param query 追加クエリ（例: 'orders=-publishedAt'）
 * @param revalidate ISRの再検証秒数
 */
export async function fetchList<T>(
  endpoint: string,
  query = '',
  revalidate = 60,
): Promise<T[] | null> {
  if (!DOMAIN || !API_KEY) return null;

  const q = query ? `&${query}` : '';
  try {
    const res = await fetch(
      `https://${DOMAIN}.microcms.io/api/v1/${endpoint}?limit=100${q}`,
      {
        headers: { 'X-MICROCMS-API-KEY': API_KEY },
        next: { revalidate },
      },
    );
    if (!res.ok) {
      // 404＝API未作成（セットアップ前）はフォールバックさせる。
      if (res.status !== 404) {
        console.error(`[lab/microCMS] ${endpoint} ${res.status}`);
      }
      return null;
    }
    const data = (await res.json()) as MicroCMSList<T>;
    return data.contents ?? [];
  } catch (err) {
    console.error('[lab/microCMS] fetch失敗:', err);
    return null;
  }
}
