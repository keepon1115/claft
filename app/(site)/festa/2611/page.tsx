import type { Metadata } from "next";
import { defaultOpenGraph } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Festa2611Content from "./Festa2611Content";

// 2026年11月（26秋）のスクールフェスタ詳細ページ。★URL /festa/2611 は会場パネルのQRに使うので変えないこと。
const TITLE = "スクールフェスタ 2026秋（11/29）";
const DESCRIPTION =
  "2026年11月29日（日）開催、CLAFT（キープオン）のスクールフェスタ。スクール生が企画した3つのイベント「スーパーボールパーティー」「ミッション〇〇」「グループ対抗ミニゲーム」と、なんでも展示会、パネル展示「好きなことを探究する、その先に…」をご案内します。参加無料。";
const OG_IMAGE = "/assets/festa/og.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/festa/2611" },
  openGraph: {
    ...defaultOpenGraph,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "秋のスクールフェスタ 2026年11月29日（日）" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          ["ミライクラフト", "/futurecraft"],
          ["スクールフェスタ", "/festa"],
          ["2026秋", "/festa/2611"],
        ]}
      />
      <Festa2611Content />
    </>
  );
}
