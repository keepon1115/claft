import type { Metadata } from "next";
import Schedule2607Content from "./Schedule2607Content";
import { defaultOpenGraph } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "当日のタイムスケジュール | なんでも発表会",
  description:
    "2026年7月26日（日）開催「なんでも発表会」の当日タイムスケジュールです。午前の部・午後の部の発表順と、展示の部の作品動画をご紹介します。",
  openGraph: {
    ...defaultOpenGraph,
    title: "当日のタイムスケジュール | なんでも発表会 | CLAFT",
    description: "2026年7月26日（日）開催「なんでも発表会」の当日タイムスケジュール。",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['ミライクラフト', '/futurecraft'], ['なんでも発表会', '/futurecraft/Presentation'], ['当日のタイムスケジュール', '/futurecraft/Presentation2607']]} />
      <Schedule2607Content />
    </>
  );
}
