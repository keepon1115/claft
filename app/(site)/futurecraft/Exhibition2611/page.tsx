import type { Metadata } from "next";
import ExhibitionWorks2611Content from "./ExhibitionWorks2611Content";
import { defaultOpenGraph } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "11月の作品一覧 | なんでも展示会",
  description:
    "2026年11月開催「なんでも展示会」の作品一覧ページです。動画や写真と、みんなからの応援コメントをご覧いただけます。",
  openGraph: {
    ...defaultOpenGraph,
    title: "11月の作品一覧 | なんでも展示会 | CLAFT",
    description: "2026年11月「なんでも展示会」の作品一覧。",
    type: "website",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ work?: string | string[] }>;
}) {
  const { work } = await searchParams;
  return (
    <>
      <BreadcrumbJsonLd trail={[['ミライクラフト', '/futurecraft'], ['なんでも展示会', '/futurecraft/Exhibition'], ['11月の作品一覧', '/futurecraft/Exhibition2611']]} />
      <ExhibitionWorks2611Content selectedWorkId={typeof work === "string" ? work : undefined} />
    </>
  );
}
