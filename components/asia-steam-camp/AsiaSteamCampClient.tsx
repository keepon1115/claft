import type { CSSProperties } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

// フェーズの色＝トークン化（旅のスタンプ4色）
const PHASE = {
  green: 'var(--green-rgb)',
  amber: '224 158 22',
  brand: 'var(--brand-rgb)',
  violet: 'var(--violet-rgb)'
};

type Phase = { phase: number; title: string; description: string; accentRgb: string; icon: DoodleIconName; rot: string };

const phases: Phase[] = [
  { phase: 1, title: '自分の国の課題を調べて発表', description: '日本が抱えるSDGsの課題を調査し、他国の参加者に「お題」として提示します。', accentRgb: PHASE.green, icon: 'search', rot: '-1.6deg' },
  { phase: 2, title: '他の国の課題を解決するロボットを考える', description: 'バングラデシュやマレーシアからのお題を受け取り、解決策をロボット＆プログラミングで形にします。', accentRgb: PHASE.amber, icon: 'wrench', rot: '1.2deg' },
  { phase: 3, title: '発表動画を撮影し提出', description: '各国の先生が審査と評価を行います。', accentRgb: PHASE.brand, icon: 'flag', rot: '-1deg' },
  { phase: 4, title: 'オンライン結果発表&交流会', description: '3カ国をオンラインでつなぎ、制作したロボット作品の結果発表後、コミュニケーションを取り合います。', accentRgb: PHASE.violet, icon: 'talk', rot: '1.2deg' }
];

type TLItem = { date: string; title: string; description?: string; links?: { label: string; url: string }[] };
type ScheduleGroup = { label: string; icon: DoodleIconName; accentRgb: string; items: TLItem[] };

const schedule: ScheduleGroup[] = [
  {
    label: 'Phase 1：課題発見',
    icon: 'search',
    accentRgb: PHASE.green,
    items: [
      { date: '12/22(月)20:00~21:00', title: 'オンラインワークを行い、「SDGsとは何か？」や「各国の現状」について理解を深めました。', links: [{ label: 'アーカイブはこちら', url: 'https://youtu.be/AAd-4wT_ss4' }, { label: '振り返りはこちら', url: 'https://www.youtube.com/watch?v=4T8RVQF1_YY' }] },
      { date: '1/10(土)15:30~16:30', title: '教室に集まり、SDGsに関わる日本の課題について、チームで話し合いました。', links: [{ label: '事前準備のフォーム', url: 'https://forms.gle/6Kni6P1W3VnZSaA46' }, { label: 'ライブレポート①', url: 'https://note.com/yononaka_career/n/n2c11fae40377' }] },
      { date: '1/17(土)10:00~16:30', title: '教室に集まり、他国の参加者に「お題」として提示するためのプレゼン動画の作成を進めました。', links: [{ label: 'ライブレポート②', url: 'https://note.com/yononaka_career/n/n0a302bcdf0f8?magazine_key=m3684b8fac7b5' }] },
      { date: '1/21', title: '「お題」のプレゼン動画完成。', links: [{ label: '各チームのプレゼン動画はこちら', url: 'https://youtube.com/playlist?list=PLg8PlJHz4ogtFzD8Sj-SuvYoL3dmZDR7Q&si=PLFQo9UW_aB_zMDw' }, { label: 'ダイジェスト動画はこちら', url: 'https://youtu.be/34lVwyA5JbA' }] }
    ]
  },
  {
    label: 'Phase 2：制作',
    icon: 'wrench',
    accentRgb: PHASE.amber,
    items: [
      { date: '1/22〜2/20', title: 'バングラデシュ・マレーシアからのお題が到着。お題に対する解決策を考え、ロボットを制作開始。', links: [{ label: 'ライブレポート③', url: 'https://note.com/yononaka_career/n/n87edae993206?magazine_key=m3684b8fac7b5' }, { label: 'ライブレポート④', url: 'https://note.com/yononaka_career/n/n26ec4941929b?magazine_key=m3684b8fac7b5' }] }
    ]
  },
  {
    label: 'Phase 3：発表',
    icon: 'flag',
    accentRgb: PHASE.brand,
    items: [
      { date: '2/21(土)', title: '「解決策(ロボット)」のプレゼン動画完成。', description: '各国の先生が審査と評価を行います。', links: [{ label: 'ライブレポート⑤', url: 'https://note.com/yononaka_career/n/n73c9c099c4fe' }, { label: '各チームのプレゼン動画はこちら', url: 'https://youtube.com/playlist?list=PLg8PlJHz4ogunk0ZcN3QtDGo8Qt6M1ixb&si=kcPjWYVIEp1vHyUD' }] }
    ]
  },
  {
    label: 'Phase 4：交流',
    icon: 'talk',
    accentRgb: PHASE.violet,
    items: [
      { date: '3/7(土)13:00〜', title: 'オンライン結果発表&交流会', description: '3カ国をオンラインでつなぎ、制作したロボット作品のプレゼント質疑応答、その他コミュニケーションの時間もあり海外交流を楽しみました。（場所：アーテック5階フリースペース）', links: [{ label: 'ライブレポート⑥', url: 'https://note.com/yononaka_career/n/n7344cb8e70b8' }] }
    ]
  }
];

const gallery = [
  { name: 'photo1.png', alt: 'STEAMキャンプ活動の様子 1' },
  { name: 'photo2.jpg', alt: 'STEAMキャンプ活動の様子 2' },
  { name: 'photo3.jpg', alt: 'STEAMキャンプ活動の様子 3' },
  { name: 'photo4.jpg', alt: 'STEAMキャンプ活動の様子 4' }
];

function TimelineItem({ item, accentRgb, isLast, index }: { item: TLItem; accentRgb: string; isLast: boolean; index: number }) {
  return (
    <div className="sc-tl" style={{ '--accent-rgb': accentRgb } as CSSProperties}>
      <div className="sc-tl-rail">
        <span className="sc-tl-dot" aria-hidden="true" />
        {!isLast && <span className="sc-tl-line" aria-hidden="true" />}
      </div>
      <div className="sc-tl-card craft-paper craft-tilt reveal" style={{ '--rot': `${index % 2 === 0 ? 0.5 : -0.5}deg` } as CSSProperties}>
        <span className="sc-date">{item.date}</span>
        <h4 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--font-black)', lineHeight: 'var(--leading-snug)', color: 'var(--ink-900)' }}>
          {item.title}
        </h4>
        {item.description && (
          <p style={{ margin: '8px 0 0', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-600)' }}>
            {item.description}
          </p>
        )}
        {item.links && item.links.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
            {item.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="cd-textlink" style={{ fontSize: 'var(--text-sm)' }}>
                {link.label}
                <ArrowRightDoodle width={18} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AsiaSteamCampClient() {
  return (
    <MobileContainer>
      {/* ===== ヒーロー ===== */}
      <Section className="cd-hero">
        {/* 漂う手描きの旅道具 */}
        <div aria-hidden="true">
          <span className="craft-doodle craft-float" style={doodle({ top: '6%', left: '5%', color: 'var(--pink)', opacity: 0.5, '--rot': '-10deg' })}>
            <DoodleIcon name="flag" size={28} />
          </span>
          <span className="craft-doodle craft-float craft-float--slow" style={doodle({ bottom: '30%', left: '5%', color: 'var(--green)', opacity: 0.5, '--rot': '8deg' })}>
            <DoodleIcon name="globe" size={30} />
          </span>
          <span className="craft-doodle craft-float" style={doodle({ bottom: '24%', right: '6%', color: 'var(--brand)', opacity: 0.5, '--rot': '-8deg', animationDelay: '1s' })}>
            <DoodleIcon name="wrench" size={28} />
          </span>
        </div>

        <p className="cd-hero-label craft-label" style={{ color: 'var(--brand-deep)' }}>STEAMキャンプ</p>

        <h1 className="cd-hero-title craft-misprint">SDGs×ロボットプログラミングで国際交流</h1>
        <Underline variant={2} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: 'var(--green)' }} />

        <p className="cd-hero-lead">
          日本・バングラデシュ・マレーシアの3カ国の小中学生がオンラインで交流し、SDGs(持続可能な開発目標)という地球規模の課題に対して、ロボットとプログラミングで解決案を発表するプロジェクト。
        </p>

        {/* ヒーロー画像（テープ留めポラロイド） */}
        <div className="cd-photo craft-photo reveal" style={{ marginTop: '32px' }}>
          <span className="craft-tape craft-tape--green" aria-hidden="true" />
          <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />
          <img src="/assets/asia-steam-camp/hero.png" alt="Asia STEAM Camp" />
        </div>
      </Section>

      {/* ===== ライブレポートバナー（搭乗券風） ===== */}
      <Section>
        <a
          href="https://note.com/yononaka_career/m/m3684b8fac7b5"
          target="_blank"
          rel="noopener noreferrer"
          className="craft-paper craft-paper--warm craft-tilt craft-lift reveal"
          style={{ '--rot': '-1deg', '--accent-rgb': '224 158 22', display: 'flex', overflow: 'hidden', textDecoration: 'none' } as CSSProperties}
        >
          <span className="craft-tape craft-tape--pink" aria-hidden="true" />

          {/* 左メインエリア */}
          <div style={{ flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'rgb(var(--accent-rgb))', letterSpacing: '0.12em' }}>
              <DoodleIcon name="globe" size={16} />
              BOARDING PASS
            </div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--ink-900)', lineHeight: 1.4 }}>
              ライブレポートはこちら
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-sm)', color: 'var(--ink-600)', marginTop: '2px' }}>
              <span style={{ fontWeight: 'var(--font-bold)' }}>CLAFT</span>
              <span style={{ flex: 1, maxWidth: '54px', height: '2px', backgroundImage: 'repeating-linear-gradient(to right, rgb(var(--accent-rgb)) 0 3px, transparent 3px 6px)' }} />
              <span style={{ color: 'rgb(var(--accent-rgb))', display: 'inline-flex' }} aria-hidden="true"><DoodleIcon name="globe" size={16} /></span>
              <span style={{ flex: 1, maxWidth: '54px', height: '2px', backgroundImage: 'repeating-linear-gradient(to right, rgb(var(--accent-rgb)) 0 3px, transparent 3px 6px)' }} />
              <span style={{ fontWeight: 'var(--font-bold)' }}>note</span>
            </div>
          </div>

          {/* ミシン目（縦） */}
          <div style={{ width: '0', margin: '10px 0', borderLeft: '2px dashed rgb(var(--accent-rgb) / 0.5)' }} aria-hidden="true" />

          {/* 右半券：矢印 */}
          <div style={{ width: '64px', display: 'grid', placeItems: 'center', background: 'rgb(var(--accent-rgb))', color: '#fff' }}>
            <ArrowRightDoodle width={26} />
          </div>
        </a>
      </Section>

      {/* ===== イベント概要（エアメール風） ===== */}
      <Section>
        <div className="reveal craft-tilt" style={{ '--rot': '0.3deg', position: 'relative' } as CSSProperties}>
          {/* エアメールの縞枠（赤×青＝航空便の伝統モチーフとして残す） */}
          <div
            style={{
              position: 'relative',
              padding: '4px',
              borderRadius: 'var(--radius-paper)',
              backgroundImage: 'repeating-linear-gradient(45deg, #34c6be 0 10px, #f06a6a 10px 20px, #ffffff 20px 30px)'
            }}
          >
            <div className="craft-paper craft-paper--warm" style={{ position: 'relative', padding: '26px 24px' }}>
              <span
                style={{
                  position: 'absolute',
                  top: '-13px',
                  right: '20px',
                  padding: '4px 12px',
                  background: 'var(--pink)',
                  color: '#fff',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  letterSpacing: '0.1em',
                  border: '2px solid #fff',
                  borderRadius: '4px',
                  boxShadow: '0 2px 6px rgba(92,77,42,0.22)',
                  transform: 'rotate(3deg)'
                }}
              >
                AIR MAIL
              </span>

              <div style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                <p style={{ margin: '0 0 16px' }}>
                  <strong style={{ color: 'var(--ink-900)' }}>株式会社アーテック</strong>主催、大好評の国際交流プログラム「<strong style={{ color: 'var(--green)' }}>STEAMキャンプ</strong>」を再びオンラインで開催！
                </p>
                <p style={{ margin: 0 }}>
                  世界中で教材として採用されている「
                  <a href="https://www.artec-kk.co.jp/blocks/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-900)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}>アーテックブロック</a>
                  」と「
                  <a href="https://www.keeponlearning.fun/edison-academy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-900)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}>ロボットプログラミング</a>
                  」を活用し、海外の仲間たちと互いにSDGsの課題（お題）を出し合い、解決に向けた作品づくりに取り組む実践的なイベントです。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== イベントの流れ（パスポートスタンプ） ===== */}
      <Section className="hp-programs">
        <div className="hp-section-head" style={{ marginBottom: '36px' }}>
          <SectionTitle variant={1} lineColor="var(--green)">
            イベントの流れ
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {phases.map((p, i) => (
            <div
              key={p.phase}
              className="sc-stamp craft-paper craft-tilt craft-lift reveal"
              style={{ '--accent-rgb': p.accentRgb, '--tape-rgb': p.accentRgb, '--rot': p.rot, transitionDelay: `${i * 90}ms` } as CSSProperties}
            >
              <span className="sc-stamp-badge">Phase {p.phase}</span>
              <span className="sc-stamp-icon" aria-hidden="true">
                <DoodleIcon name={p.icon} size={28} />
              </span>
              <h3 style={{ margin: '0 0 8px', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--ink-900)', lineHeight: 'var(--leading-snug)' }}>
                {p.title}
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== イベントのポイント（ポラロイド） ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '32px' }}>
          <SectionTitle variant={2} lineColor="var(--cream)">
            イベントのポイント
          </SectionTitle>
        </div>

        <div className="cd-photo craft-photo reveal" style={{ marginInline: 'auto', maxWidth: '440px' }}>
          <span className="craft-tape craft-tape--green" aria-hidden="true" />
          <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />
          <img src="/assets/asia-steam-camp/point.png" alt="イベントのポイント" />
        </div>
      </Section>

      {/* ===== 具体的なスケジュール ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '34px' }}>
          <SectionTitle variant={3} lineColor="var(--brand)">
            具体的なスケジュール
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {schedule.map((group) => (
            <div key={group.label}>
              <span className="sc-phase-label reveal" style={{ '--accent-rgb': group.accentRgb } as CSSProperties}>
                <DoodleIcon name={group.icon} size={20} />
                {group.label}
              </span>
              <div>
                {group.items.map((item, i) => (
                  <TimelineItem
                    key={i}
                    item={item}
                    accentRgb={group.accentRgb}
                    isLast={i === group.items.length - 1}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 活動の様子（思い出アルバム） ===== */}
      <Section className="hp-programs">
        <div className="hp-section-head" style={{ marginBottom: '32px' }}>
          <SectionTitle variant={1} lineColor="var(--cream)">
            活動の様子
          </SectionTitle>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {gallery.map((photo, i) => (
            <div
              key={i}
              className="craft-photo craft-tilt craft-lift reveal"
              style={{ '--rot': `${(i % 2 === 0 ? -1.4 : 1.4)}deg`, transitionDelay: `${i * 70}ms` } as CSSProperties}
            >
              <img src={`/assets/asia-steam-camp/activities/${photo.name}`} alt={photo.alt} style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '2px' }} />
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--ink-500)', marginTop: '20px', fontStyle: 'italic', fontSize: 'var(--text-sm)' }}>
          ※ STEAMキャンプでの貴重な体験の瞬間をお楽しみください
        </p>
      </Section>
    </MobileContainer>
  );
}
