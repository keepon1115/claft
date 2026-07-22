import type { Metadata } from "next";
import Schedule2607Content from "./Schedule2607Content";

export const metadata: Metadata = {
  title: "当日のタイムスケジュール | なんでも発表会 | CLAFT",
  description:
    "2026年7月26日（日）開催「なんでも発表会」の当日タイムスケジュールです。午前の部・午後の部の発表順と、展示の部の作品動画をご紹介します。",
  openGraph: {
    title: "当日のタイムスケジュール | なんでも発表会 | CLAFT",
    description: "2026年7月26日（日）開催「なんでも発表会」の当日タイムスケジュール。",
    type: "website",
  },
};

export default function Page() {
  return <Schedule2607Content />;
}
