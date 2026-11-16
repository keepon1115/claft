import type { Metadata } from "next";
import { defaultOpenGraph } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FestaContent from "./FestaContent";

// スクールフェスタ（年2回）の常設ページ。★URL /festa は会場パネルのQRに使うので変えないこと。
const TITLE = "スクールフェスタ";
const DESCRIPTION =
  "半年に一回、スタッフとスクール生が一緒になって企画するCLAFT（キープオン）のスクールフェスタ。保護者や友達、地域の方々も含め、大勢でわいわい楽しむ一大イベントです。次回は2026年11月29日（日）開催。";
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
