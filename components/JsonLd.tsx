// JSON-LD（構造化データ）を埋め込む共通コンポーネント。
// サーバー/クライアントどちらのコンポーネントからも使える。

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // 構造化データは固定オブジェクトのみ。XSS リスクなし。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
