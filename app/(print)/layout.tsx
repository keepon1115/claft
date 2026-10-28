// 印刷用ページ専用の枠。HPのヘッダー・ナビ・フッター・CTAは持たない
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
