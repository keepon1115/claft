import type { Metadata } from "next";
import ExhibitionWorks2611Content from "./ExhibitionWorks2611Content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "11月の作品一覧 | なんでも展示会 | CLAFT",
  description:
    "2026年11月開催「なんでも展示会」の作品一覧ページです。動画や写真と、みんなからの応援コメントをご覧いただけます。",
  openGraph: {
    title: "11月の作品一覧 | なんでも展示会 | CLAFT",
    description: "2026年11月「なんでも展示会」の作品一覧。",
    type: "website",
  },
};

export default function Page() {
  return <ExhibitionWorks2611Content />;
}
