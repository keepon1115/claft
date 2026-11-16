// JSON-LD（構造化データ）を埋め込む共通コンポーネント。
// サーバー/クライアントどちらのコンポーネントからも使える。

import { breadcrumbJsonLd } from '@/lib/seo';

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // 構造化データは固定オブジェクトのみ。XSS リスクなし。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// パンくずの構造化データ。階層のあるページの先頭に1行置く（見た目には出ない）。
// 例: <BreadcrumbJsonLd trail={[['Yononaka', '/yononaka'], ['団体向け', '/yononaka/kyoshitsu']]} />
export function BreadcrumbJsonLd({ trail }: { trail: [name: string, path: string][] }) {
  return <JsonLd data={breadcrumbJsonLd(trail)} />;
}
