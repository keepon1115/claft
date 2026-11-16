import type { Metadata } from "next";
import { defaultOpenGraph } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FestaContent from "./FestaContent";

// スクールフェスタ（年2回）の常設ページ。★URL /festa は会場パネルのQRに使うので変えないこと。
const TITLE = "スクールフェスタ";
const DESCRIPTION =
  "スタッフとスクール生が一緒になって企画する、CLAFT（キープオン）のスクールフェスタ。保護者や友達、地域の方々も含め、わいわい楽しむスクールの一大行事です。年2回開催、次回は2026年11月29日（日）。";
const OG_IMAGE = "/assets/festa/og.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
      <BreadcrumbJsonLd trail={[["ミライクラフト", "/futurecraft"], ["スクールフェスタ", "/festa"]]} />
      <FestaContent />
    </>
  );
}
