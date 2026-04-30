import type { Metadata } from "next";
import NandemoClient from "./NandemoClient";

export const metadata: Metadata = {
  title: "なんでも発表会 | CLAFT",
  description:
    "好きなことを、好きなだけ。CLAFTの「なんでも発表会」は、ゲーム・おもちゃ・自作の作品まで、自分の“好き”を堂々と語れる場所です。失敗OK、年齢不問。発表の第一歩を、ここから踏み出そう。",
  openGraph: {
    title: "なんでも発表会 | CLAFT",
    description:
      "好きなことを、好きなだけ。年齢不問・失敗OKの発表ステージ、はじまります。",
    type: "website",
  },
};

export default function Page() {
  return <NandemoClient />;
}
