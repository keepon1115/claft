/** 作品カード/詳細で使う表示用の日付（例: "7/26"）。JSTで表示する。 */
export function formatWorkDate(iso: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(iso));
}
