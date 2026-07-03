import Link from 'next/link';
import {
  Flag,
  Mic2,
  Gamepad2,
  Lightbulb,
  PencilLine,
  Languages,
  Compass,
  Sparkles,
  Users,
  Coins,
  Clock,
  Rocket,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { SUMMER_LAB, isSummerLabExpired } from '@/lib/summerLab';

const activities: { icon: LucideIcon; title: string; note?: string }[] = [
  { icon: Flag, title: 'ロボット競技会（URC）', note: '※8/3まで' },
  { icon: Mic2, title: 'ロボット発表会（スクール内）', note: '※8月開催' },
  { icon: Gamepad2, title: 'マイクラカップ', note: '※9/7まで' },
  { icon: Lightbulb, title: 'ゲームづくり・自由研究' },
  { icon: PencilLine, title: '宿題＆自習（イーボード）' },
  { icon: Languages, title: '英会話' },
];

const reassurances: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Compass, title: '自分のペースでOK！', text: 'やってみたいことから、はじめよう！' },
  { icon: Sparkles, title: 'いろんなことにチャレンジ！', text: '新しい発見や「できた！」が、きっと見つかる！' },
  { icon: Users, title: '先生がしっかりサポート！', text: 'わからないことも、いつでも聞けるから安心！' },
];

const overview: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: Coins, label: '月額受講料', text: '11,000円（税込）' },
  { icon: Flag, label: 'チケット枚数', text: '8回（1コマ60分）' },
  { icon: Clock, label: '利用期間', text: `7月購入は、7月末期限。8月購入は、8月末期限。` },
  { icon: Users, label: '対象', text: 'スクール生・新規どちらもOK' },
  { icon: Sparkles, label: 'ごきょうだいでの共有', text: 'できません（お一人さま専用のチケットです）' },
  { icon: Rocket, label: '使い切った後', text: '追加購入OK' },
];

const faqs: { q: string; a: string }[] = [
  {
    q: '1回だけの利用でも半額になりますか？',
    a: 'なりません。実質半額になるのは、夏休み特別の8回チケットをセットでご購入いただいた場合のみです。通常の1回チケット（2,750円）自体が値下がりするわけではありません。',
  },
  {
    q: 'チケットは9月に持ち越せますか？',
    a: `持ち越せません。ご利用期限は${SUMMER_LAB.deadline}までです。夏休み中に使い切れるよう、計画的にご利用ください。`,
  },
  {
    q: 'はじめてでも参加できますか？',
    a: 'できます！新規のご家庭も大歓迎です。ロボットもゲームづくりも英会話も、好きなことから気軽に始められます。',
  },
];

export function SummerLabContent() {
  const expired = isSummerLabExpired();

  return (
    <main className="lab-page-body summer-page">
      <header className="summer-hero">
        <span className="summer-eyebrow">夏休み特別・7〜8月だけ</span>
        <h2>サマプロ・ラボ</h2>
        <p>ロボットも、ゲームも、英会話も。夏休みだから、自分のペースでとことん楽しもう！</p>
      </header>

      {/* 比較図（主役） */}
      <section className="summer-card summer-compare">
        <p className="summer-compare-lead">
          受講料 <b>11,000円（税込）</b>はそのまま。
        </p>

        <div className="summer-compare-row">
          <span className="summer-compare-label">ふだん</span>
          <div className="summer-compare-bar normal">
            <span>4回</span>
          </div>
        </div>
        <div className="summer-compare-row">
          <span className="summer-compare-label">この夏</span>
          <div className="summer-compare-bar summer">
            <span>8回！！</span>
          </div>
        </div>

        <p className="summer-compare-note">
          1回あたり 2,750円 → <b>1,375円</b>
        </p>
        <span className="summer-compare-badge">実質半額！</span>

        <p className="summer-note">※8回セット購入時のみの特別価格です（1回チケットの割引ではありません）</p>
        <p className="summer-note">※比較対象：通常販売中の4回チケット 11,000円（税込）</p>
      </section>

      {/* この夏できること */}
      <h3 className="summer-h3">この夏、できること</h3>
      <div className="summer-chip-grid">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="summer-chip">
              <span className="summer-chip-icon" aria-hidden="true">
                <Icon />
              </span>
              <b>{item.title}</b>
              {item.note && <span className="summer-chip-note">{item.note}</span>}
            </div>
          );
        })}
      </div>

      {/* 3つの安心 */}
      <div className="summer-list">
        {reassurances.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="summer-list-item">
              <span className="summer-list-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <b>{item.title}</b>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* チケット概要 */}
      <h3 className="summer-h3">チケット概要</h3>
      <div className="summer-list">
        {overview.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="summer-list-item">
              <span className="summer-list-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <b>{item.label}</b>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <section className="summer-card summer-cta-card">
        {expired ? (
          <>
            <h3>今年の受付は終了しました</h3>
            <p>
              また来年の夏休みをお楽しみに！コースのご相談は
              <Link href="/lab/meeting">面談申込</Link>
              からどうぞ。
            </p>
          </>
        ) : (
          <>
            <h3>この夏だけの8回チケット、予約はこちらから</h3>
            <a href={SUMMER_LAB.reserveUrl} target="_blank" rel="noopener noreferrer" className="summer-cta">
              受講予約はこちら →
            </a>
            <p className="summer-cta-sub">
              質問がある方は<Link href="/lab/meeting">面談申込</Link>へ。
            </p>
          </>
        )}
      </section>

      {/* FAQ */}
      <h3 className="summer-h3">よくある質問</h3>
      <div className="summer-faq">
        {faqs.map((item) => (
          <details key={item.q} className="summer-acc">
            <summary>
              <span>{item.q}</span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
