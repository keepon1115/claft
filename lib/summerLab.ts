// ============================================================
// サマプロ・ラボ 2026（夏休み特別・8回チケット）— 共通定数
//
// チラシ・LP（/summer-lab）・ラボアプリのストーリーカードが
// この値を参照する（単一の真実のソース）。
// ============================================================

export const SUMMER_LAB = {
  path: '/summer-lab',
  /** この日付（JST）を過ぎたら受付終了表示に切り替える／ストーリーから消える */
  deadline: '2026-08-31',
  reserveUrl: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
} as const;

/** 今日（JST）が受付期限を過ぎているか */
export function isSummerLabExpired(now: Date = new Date()): boolean {
  const jstToday = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return jstToday > SUMMER_LAB.deadline;
}
