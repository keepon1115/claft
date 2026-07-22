import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionTitle } from "@/components/craft/SectionTitle";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";
import LiteYouTube from "@/components/exhibition/LiteYouTube";

/* ============================================================
   なんでも発表会 当日タイムスケジュール（単独ページ）
   - 2026.7.26(日) @ アーテック5F フリースペース
   - クラフトデザインシステム準拠（craft-* 部品＋ nd-* レイヤー）
============================================================ */

type ScheduleItem = {
  time: string;
  name: string;
  theme: string;
  staff?: boolean;
};

// 午前の部（10:30–12:00）
const morningSchedule: ScheduleItem[] = [
  { time: "10:30 – 10:40", name: "サトル・ショウイチロウ・タモツ", theme: "冒頭あいさつ" },
  { time: "10:40 – 10:50", name: "脇村 彰吾", theme: "宇宙の絵" },
  { time: "10:50 – 11:00", name: "山池渚嵯", theme: "環境への影響　映画を見て分析" },
  { time: "11:00 – 11:10", name: "山崎 皓", theme: "足の構造" },
  { time: "11:10 – 11:20", name: "松本 明里・岡本 涼芭", theme: "フルート・ピアニカで演奏" },
  { time: "11:20 – 11:30", name: "鷲田八重", theme: "犬について知ろう！" },
  { time: "11:30 – 11:40", name: "今井 奎佑", theme: "サバゲー" },
  { time: "11:40 – 11:50", name: "宇田 瑛太郎", theme: "テーマ未定" },
  { time: "11:50 – 12:00", name: "（南部 兼史朗）", theme: "4月の発表会「日本の魅力」を英語で紹介" },
];

// 休憩ブロック（12:00–14:00）
const breakItems: { time: string; label: string }[] = [
  { time: "12:00 – 13:15", label: "ランチタイム" },
  { time: "13:15 – 14:00", label: "PLAY CLAFT 意見交換会" },
];

// 午後の部（14:00–16:30）
const afternoonSchedule: ScheduleItem[] = [
  { time: "14:00 – 14:10", name: "田中遼太郎", theme: "高校について" },
  { time: "14:10 – 14:20", name: "藤原 碧", theme: "AIでつくった車のゲーム（A5Rally）" },
  { time: "14:20 – 14:30", name: "高嶋 真之介", theme: "テーマ未定" },
  { time: "14:30 – 15:00", name: "藤原 碧・高嶋 真之介・岡本 悠嗣・竹内 章人", theme: "マイクラベッドウォーズ" },
  { time: "15:00 – 15:30", name: "橋本 月音", theme: "まほうのおかし", staff: true },
  { time: "15:30 – 16:00", name: "田中 碧", theme: "アプローチとコミュニケーション", staff: true },
  { time: "16:00 – 16:30", name: "サトル・ショウイチロウ・タモツ", theme: "抽選会結果発表" },
];

// 展示の部（動画は準備でき次第、youtubeUrl を追加）
const exhibits: { name: string; theme: string; youtubeUrl?: string }[] = [
  { name: "篠原 暖怜", theme: "スマホロボット", youtubeUrl: "https://youtu.be/rjLENDrpLv0" },
  { name: "岡本 涼芭", theme: "ピアノの演奏" },
  { name: "末信 勇人", theme: "テーマ未定" },
  { name: "中津留 大翔", theme: "行動心理学" },
];

function TimetableRow({ item }: { item: ScheduleItem }) {
  return (
    <div className="nd-tt-row">
      <span className="nd-tt-time">{item.time}</span>
      <span className="nd-tt-label">
        <span className="nd-tt-name">{item.name}</span>
        <span className="nd-tt-theme">・{item.theme}</span>
        {item.staff && (
          <span className="nd-tag" style={{ "--accent-rgb": "var(--violet-rgb)" } as CSSProperties}>
            スタッフ
          </span>
        )}
      </span>
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/futurecraft/Presentation" className="nd-back">
      <ArrowLeft size={16} />
      発表会ページに戻る
    </Link>
  );
}

export default function Schedule2607Content() {
  return (
    <main className="nd-page">
      {/* ========== ヘッダー ========== */}
      <section className="nd-hero">
        <div className="container">
          <p className="nd-hero-eyebrow reveal">
            <span className="craft-label">TIME SCHEDULE</span>
          </p>

          <h1 className="nd-hero-title craft-misprint reveal">当日のタイムスケジュール</h1>

          <div
            className="nd-hero-info craft-paper craft-tilt reveal"
            style={{ "--rot": "0.6deg" } as CSSProperties}
          >
            <div className="nd-info-row">
              <span className="nd-info-label">DATE</span>
              <p className="nd-info-value">2026.7.26（日）</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">TIME</span>
              <p className="nd-info-value">10:30 – 16:30</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">PLACE</span>
              <p className="nd-info-value">アーテック5F フリースペース</p>
            </div>
          </div>

          <div className="nd-cta reveal">
            <BackLink />
          </div>
        </div>
      </section>

      {/* ========== 午前の部 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="MORNING ・ 10:30 – 12:00" variant={1} lineColor="var(--brand)">
              午前の部
            </SectionTitle>
          </div>

          <div className="nd-timetable craft-paper reveal" style={{ "--rot": "0deg" } as CSSProperties}>
            {morningSchedule.map((item, i) => (
              <TimetableRow key={`morning-${i}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 休憩 ========== */}
      <section className="nd-section">
        <div className="container">
          <div
            className="nd-timetable craft-paper reveal"
            style={{ "--rot": "-0.3deg" } as CSSProperties}
          >
            {breakItems.map((b, i) => (
              <div key={`break-${i}`} className="nd-tt-row nd-tt-row--break">
                <span className="nd-tt-time">{b.time}</span>
                <span className="nd-tt-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 午後の部 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="AFTERNOON ・ 14:00 – 16:30" variant={2} lineColor="var(--pink)">
              午後の部
            </SectionTitle>
          </div>

          <div className="nd-timetable craft-paper reveal" style={{ "--rot": "0.2deg" } as CSSProperties}>
            {afternoonSchedule.map((item, i) => (
              <TimetableRow key={`afternoon-${i}`} item={item} />
            ))}
          </div>
          <p className="nd-tt-note reveal">※ 時間は当日の進行により前後する場合があります。</p>
        </div>
      </section>

      {/* ========== 展示の部 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="EXHIBITION ・ 展示の部" variant={3} lineColor="var(--green)">
              展示の部
            </SectionTitle>
            <p className="lead nd-section-lead">
              会場に来られない方にも見てもらえるよう、展示作品を動画でご紹介します。
            </p>
          </div>

          <div className="nd-exhibits">
            {exhibits.map((e, i) => (
              <div
                key={e.name}
                className="nd-exhibit craft-paper craft-tilt reveal"
                style={
                  {
                    "--rot": i % 2 === 0 ? "-0.5deg" : "0.5deg",
                    transitionDelay: `${i * 70}ms`,
                  } as CSSProperties
                }
              >
                <div className="nd-exhibit-head">
                  <h3 className="nd-exhibit-title">{e.name}</h3>
                  <p className="nd-exhibit-theme">{e.theme}</p>
                </div>
                {e.youtubeUrl ? (
                  <div className="nd-exhibit-video">
                    <LiteYouTube url={e.youtubeUrl} title={`${e.name}：${e.theme}`} />
                  </div>
                ) : (
                  <p className="nd-exhibit-pending">動画は準備でき次第、公開予定です。</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 戻る ========== */}
      <section className="nd-section nd-section--last">
        <div className="container">
          <div className="nd-cta reveal">
            <Link href="/futurecraft/Presentation" className="craft-sticker">
              発表会ページに戻る
              <ArrowRightDoodle width={24} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
