import type { Metadata } from "next";
import RobotPresentationContent from "./RobotPresentationContent";

export const metadata: Metadata = {
  title: "ロボット発表会 | CLAFT",
  description:
    "CLAFTの「ロボット発表会」は、スクール内で年3回開催。その都度変わるテーマに沿ってオリジナルロボットを作り、完成までのプロセスを通してやりきる大変さと達成感を経験します。2026年8月のテーマは『未来のお仕事ロボット』。",
  openGraph: {
    title: "ロボット発表会 | CLAFT",
    description:
      "年3回開催、テーマに沿ってオリジナルロボットをつくる発表会。2026年8月のテーマは『未来のお仕事ロボット』。",
    type: "website",
  },
};

export default function Page() {
  return <RobotPresentationContent />;
}
