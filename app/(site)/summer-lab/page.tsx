import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';
import { SUMMER_LAB, isSummerLabExpired } from '@/lib/summerLab';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'サマプロ・ラボ｜夏休み特別8回チケット',
  description:
    '7・8月限定。通常4回分の11,000円（税込）で8回通える夏休み特別チケット。ロボット・ゲームづくり・英会話まで、好きなことを好きなだけ。',
  alternates: { canonical: SUMMER_LAB.path },
};

const AMBER = '224 158 22';

const activities: { icon: DoodleIconName; title: string; note?: string }[] = [
  { icon: 'flag', title: 'ロボット競技会（URC）', note: '※8/3まで' },
  { icon: 'mic', title: 'ロボット発表会（スクール内）', note: '※8月開催' },
  { icon: 'gamepad', title: 'マイクラカップ', note: '※9/7まで' },
  { icon: 'bulb', title: 'ゲームづくり・自由研究' },
  { icon: 'pencil', title: '宿題＆自習（イーボード）' },
  { icon: 'talk', title: '英会話' },
];

const reassurances: { icon: DoodleIconName; title: string; text: string }[] = [
  { icon: 'compass', title: '自分のペースでOK！', text: 'やってみたいことから、はじめよう！' },
  { icon: 'sparkle', title: 'いろんなことにチャレンジ！', text: '新しい発見や「できた！」が、きっと見つかる！' },
  { icon: 'family', title: '先生がしっかりサポート！', text: 'わからないことも、いつでも聞けるから安心！' },
];

const overview: { icon: DoodleIconName; label: string; text: string }[] = [
  { icon: 'coin', label: '受講料', text: '11,000円（税込）' },
  { icon: 'flag', label: 'チケット枚数', text: '8回（1コマ60分）' },
  { icon: 'clock', label: '購入・利用期間', text: `7月〜8月末（${SUMMER_LAB.deadline}で有効期限切れ）` },
  { icon: 'family', label: '対象', text: 'スクール生・新規どちらもOK' },
  { icon: 'heart', label: 'ごきょうだいでの共有', text: 'できません（お一人さま専用のチケットです）' },
  { icon: 'rocket', label: '使い切った後', text: '追加購入OK' },
];

const faqs: { icon: DoodleIconName; q: string; a: string }[] = [
  {
    icon: 'coin',
    q: '1回だけの利用でも半額になりますか？',
    a: 'なりません。実質半額になるのは、夏休み特別の8回チケットをセットでご購入いただいた場合のみです。通常の1回チケット（2,750円）自体が値下がりするわけではありません。',
  },
  {
    icon: 'clock',
    q: 'チケットは9月に持ち越せますか？',
    a: `持ち越せません。ご利用期限は${SUMMER_LAB.deadline}までです。夏休み中に使い切れるよう、計画的にご利用ください。`,
  },
  {
    icon: 'sparkle',
    q: 'はじめてでも参加できますか？',
    a: 'できます！新規のご家庭も大歓迎です。ロボットもゲームづくりも英会話も、好きなことから気軽に始められます。',
  },
];

export default function SummerLabPage() {
  const expired = isSummerLabExpired();

  return (
    <MobileContainer>
      {/* ヒーロー */}
      <Section>
        <div className="cd-hero" style={{ padding: '28px 0 8px' }}>
          <div className="container">
            <p className="cd-hero-label craft-label" style={{ color: `rgb(${AMBER})` }}>
              夏休み特別・7〜8月だけ
            </p>
            <h1 className="cd-hero-title craft-misprint">
              サマプロ・ラボ
            </h1>
            <Underline
              variant={2}
              className="cd-hero-line craft-draw craft-draw--auto"
              style={{ color: `rgb(${AMBER})` }}
            />
            <p className="cd-hero-lead">
              ロボットも、ゲームも、英会話も。夏休みだから、自分のペースでとことん楽しもう！
            </p>
          </div>
        </div>
      </Section>

      {/* 比較図（主役） */}
      <Section>
        <div
          className="cd-price-card sl-compare craft-paper craft-paper--warm craft-tilt reveal"
          style={{ '--rot': '-0.4deg', '--accent-rgb': AMBER } as CSSProperties}
        >
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />

          <p className="sl-compare-lead">
            受講料 <strong>11,000円（税込）</strong>はそのまま。
          </p>

          <div className="sl-compare-row">
            <span className="sl-compare-label">ふだん</span>
            <div className="sl-compare-bar sl-compare-bar--normal">
              <span>4回</span>
            </div>
          </div>
          <div className="sl-compare-row">
            <span className="sl-compare-label">この夏</span>
            <div className="sl-compare-bar sl-compare-bar--summer">
              <span>8回！！</span>
            </div>
          </div>

          <p className="sl-compare-note">
            1回あたり 2,750円 → <strong>1,375円</strong>
          </p>
          <span className="sl-compare-badge">実質半額！</span>

          <p className="cd-price-note">
            ※8回セット購入時のみの特別価格です（1回チケットの割引ではありません）
          </p>
          <p className="cd-price-note">
            ※比較対象：通常販売中の4回チケット 11,000円（税込）
          </p>
        </div>
      </Section>

      {/* この夏できること */}
      <Section>
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor={`rgb(${AMBER})`}>
            この夏、できること
          </SectionTitle>
        </div>

        <div className="cd-chip-grid">
          {activities.map((item, i) => (
            <div
              key={item.title}
              className="cd-chip craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': AMBER,
                  '--rot': `${i % 2 === 0 ? -1 : 1}deg`,
                  transitionDelay: `${i * 90}ms`,
                } as CSSProperties
              }
            >
              <span className="cd-chip-icon" aria-hidden="true">
                <DoodleIcon name={item.icon} size={26} />
              </span>
              <h3>{item.title}</h3>
              {item.note && <p className="cd-price-note" style={{ margin: '4px 0 0' }}>{item.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* 3つの安心 */}
      <Section>
        <div className="cd-info-list">
          {reassurances.map((item, i) => (
            <div
              key={item.title}
              className="cd-info-item craft-paper craft-tilt reveal"
              style={
                {
                  '--accent-rgb': i === 1 ? 'var(--green-rgb)' : i === 2 ? 'var(--pink-rgb)' : 'var(--brand-rgb)',
                  '--rot': `${i % 2 === 0 ? -0.4 : 0.4}deg`,
                  transitionDelay: `${i * 100}ms`,
                } as CSSProperties
              }
            >
              <span className="cd-info-icon" aria-hidden="true">
                <DoodleIcon name={item.icon} size={28} />
              </span>
              <div style={{ flex: 1 }}>
                <strong className="cd-info-label">{item.title}</strong>
                <p className="cd-info-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* チケット概要 */}
      <Section>
        <div className="hp-section-head">
          <SectionTitle variant={3} lineColor="var(--brand)">
            チケット概要
          </SectionTitle>
        </div>

        <div className="cd-info-list">
          {overview.map((item) => (
            <div
              key={item.label}
              className="cd-info-item craft-paper craft-tilt reveal"
              style={{ '--accent-rgb': AMBER } as CSSProperties}
            >
              <span className="cd-info-icon" aria-hidden="true">
                <DoodleIcon name={item.icon} size={28} />
              </span>
              <div style={{ flex: 1 }}>
                <strong className="cd-info-label">{item.label}</strong>
                <p className="cd-info-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div
          className="cd-banner craft-paper craft-paper--warm craft-tilt reveal"
          style={{ '--rot': '0.3deg', '--accent-rgb': AMBER } as CSSProperties}
        >
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          {expired ? (
            <>
              <h2 className="cd-card-title" style={{ marginBottom: 10 }}>今年の受付は終了しました</h2>
              <p style={{ margin: 0 }}>
                また来年の夏休みをお楽しみに！コースのご相談は
                <a href="/contact" className="cd-textlink" style={{ marginLeft: 6 }}>お問い合わせ</a>
                からどうぞ。
              </p>
            </>
          ) : (
            <>
              <h2 className="cd-card-title" style={{ marginBottom: 16 }}>この夏だけの8回チケット、予約はこちらから</h2>
              <a
                href={SUMMER_LAB.reserveUrl}
                target="_blank"
                rel="noopener"
                className="craft-sticker"
                style={{ width: '100%', background: `rgb(${AMBER})` }}
              >
                受講予約はこちら →
              </a>
              <p style={{ margin: '16px 0 0' }}>
                質問がある方は<a href="/contact" className="cd-textlink" style={{ marginLeft: 6 }}>お問い合わせ</a>へ。
              </p>
            </>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="hp-section-head">
          <SectionTitle variant={2} lineColor="var(--pink)">
            よくある質問
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="cd-acc craft-paper craft-tilt reveal"
              style={{ '--accent-rgb': AMBER, '--rot': `${i % 2 === 0 ? -0.4 : 0.4}deg` } as CSSProperties}
            >
              <summary>
                <span className="cd-acc-icon" aria-hidden="true">
                  <DoodleIcon name={item.icon} size={28} />
                </span>
                <span className="cd-acc-title">
                  <strong>{item.q}</strong>
                </span>
                <span className="cd-acc-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="cd-acc-body">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </MobileContainer>
  );
}
