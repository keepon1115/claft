import type { Metadata } from "next";
import RobotWorks2608Content from "./RobotWorks2608Content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "8月の作品紹介 | ロボット発表会 | CLAFT",
  description:
    "2026年8月開催「ロボット発表会」テーマ『未来のお仕事ロボット』の作品紹介ページです。動画と、みんなからの応援コメントをご覧いただけます。",
  openGraph: {
    title: "8月の作品一覧 | ロボット発表会 | CLAFT",
    description: "2026年8月「ロボット発表会」テーマ『未来のお仕事ロボット』の作品紹介。",
    type: "website",
  },
};

export default function Page() {
  return <RobotWorks2608Content />;
}
