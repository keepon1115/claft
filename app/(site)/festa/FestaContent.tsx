import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";

/* ============================================================
   スクールフェスタ ランディングページ
   - なんでも展示会（futurecraft/Exhibition/NandemoTenjikaiContent）と同じ nd-* 構成
   - 年2回開催。開催ごとに下の定数（日付・画像・リンク）を差し替える
   - PC の中央480pxカラムでもスマホと同じ見た目になるよう、ビューポート分岐（sm:/lg:）は使わない
============================================================ */

// メインビジュアル（16:9）
export const FESTA_HERO_IMG = "/assets/festa/hero.webp";
const FESTA_DATE = "2026.11.29（日）";
// 「詳細はこちら」の行き先（今回の詳細ページ。申し込みフォームはその中）
const DETAIL_HREF = "/festa/2611";
const PAST_URL = "https://spring-schoolfesta2026.figma.site/";
const PAST_LABEL_1 = "前回(2026/3)の";
const PAST_LABEL_2 = "スクールフェスタはこちら";

function DetailButton() {
  return (
    <Link href={DETAIL_HREF} className="craft-sticker">
      詳細はこちら
      <ArrowRightDoodle width={24} />
    </Link>
  );
}

function PastButton() {
  return (
    <a
      href={PAST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="craft-sticker craft-sticker--ghost"
      // 文言が長いので、スマホ幅でははみ出さないよう折り返し・余白を詰める
      style={{ maxWidth: "100%", whiteSpace: "normal", textAlign: "center", padding: "13px 20px" }}
    >
      {/* 折り返すなら「の」の後で切る（1文字だけ次の行に落ちないように） */}
      <span>
        <span style={{ whiteSpace: "nowrap" }}>{PAST_LABEL_1}</span>
        <span style={{ whiteSpace: "nowrap" }}>{PAST_LABEL_2}</span>
      </span>
      <ArrowRightDoodle width={24} />
    </a>
  );
}

export default function FestaContent() {
  return (
    <main className="nd-page nd-page--autumn">
      {/* ========== Hero ========== */}
      <section className="nd-hero nd-section--last">
        <div className="container">
          <p className="nd-hero-eyebrow reveal">
            <span className="craft-label">スクールイベント ・ 年2回開催</span>
          </p>

          <h1 className="nd-hero-title craft-misprint reveal">スクールフェスタ</h1>

          <div
            className="nd-hero-photo craft-photo craft-tilt reveal"
            style={{ "--rot": "-1.2deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FESTA_HERO_IMG}
              alt="秋のスクールフェスタ 2026年11月29日（日）"
              width={640}
              height={360}
            />
          </div>

          <p className="nd-hero-copy reveal">
            スタッフとスクール生が一緒になって企画するイベント。
            <br />
            保護者や友達、地域の方々も含め、
            <br />
            わいわい楽しむスクールの一大行事です！
          </p>

          <div
            className="nd-hero-info craft-paper craft-tilt reveal"
            style={{ "--rot": "0.6deg" } as CSSProperties}
          >
            <div className="nd-info-row">
              <span className="nd-info-label">開催</span>
              <p className="nd-info-value">{FESTA_DATE}</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">CYCLE</span>
              <p className="nd-info-value">年2回開催</p>
            </div>
          </div>

          <div className="nd-cta reveal">
            <DetailButton />
            <PastButton />
          </div>
        </div>
      </section>
    </main>
  );
}
