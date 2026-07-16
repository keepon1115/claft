// Weekly KEEPON のバックナンバー。新しい号を追加する際はここに追加してください（新しい順推奨）。
// 各号の canvaUrl に Canva 公開ページの URL を設定してください。

export interface WeeklyIssue {
  id: string;
  date: string;       // 配信日 YYYY-MM-DD
  title: string;
  canvaUrl: string;   // Canva 公開ページ URL
  thumbnail?: string; // サムネ画像パス（任意。無ければカラープレースホルダーを表示）
}

export const weeklyIssues: WeeklyIssue[] = [
  { id: 'w-150', date: '2026-07-17', title: 'Weekly KEEPON 第150号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon7-17' },
  { id: 'w-149', date: '2026-07-10', title: 'Weekly KEEPON 第149号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon7-10' },
  { id: 'w-148', date: '2026-07-03', title: 'Weekly KEEPON 第148号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon7-3' },
  { id: 'w-147', date: '2026-06-26', title: 'Weekly KEEPON 第147号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon6-26' },
  { id: 'w-146', date: '2026-06-19', title: 'Weekly KEEPON 第146号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon6-19' },
  { id: 'w-145', date: '2026-06-12', title: 'Weekly KEEPON 第145号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon6-12' },
  { id: 'w-144', date: '2026-06-05', title: 'Weekly KEEPON 第144号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon6-5' },
  { id: 'w-143', date: '2026-05-29', title: 'Weekly KEEPON 第143号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon5-29' },
  { id: 'w-142', date: '2026-05-22', title: 'Weekly KEEPON 第142号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon5-22' },
  { id: 'w-141', date: '2026-05-15', title: 'Weekly KEEPON 第141号', canvaUrl: 'https://keepon.my.canva.site/weekly-keepon5-15' },
];
