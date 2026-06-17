import { MobileContainer, Section } from '@/components/MobileContainer';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

// コースカードコンポーネント（紙片＋テープ＋値札）
const CourseCard = ({
  title,
  description,
  target,
  price,
  priceLabel = '月額料金',
  priceNote,
  accentRgb,
  tapeClass = '',
  icon,
  link,
  external = false,
  ageGroup,
  rotate = '0deg',
  delay = 0
}: {
  title: string;
  description: string;
  target: string;
  price: string;
  priceLabel?: string;
  priceNote?: string;
  accentRgb: string;
  tapeClass?: string;
  icon: DoodleIconName;
  link: string;
  external?: boolean;
  ageGroup: string;
  rotate?: string;
  delay?: number;
}) => (
  <div
    className="cs-card craft-paper craft-tilt craft-lift reveal"
    style={
      {
        '--rot': rotate,
        '--accent-rgb': accentRgb,
        '--tape-rgb': accentRgb,
        transitionDelay: `${delay}ms`
      } as CSSProperties
    }
  >
    <span className={`craft-tape ${tapeClass}`} aria-hidden="true" />

    {/* 対象年齢層バッジ */}
    <div className="cs-card-badge">{ageGroup}</div>

    {/* アイコン */}
    <span className="cs-card-icon" aria-hidden="true">
      <DoodleIcon name={icon} size={36} />
    </span>

    {/* タイトル */}
    <h3 className="cs-card-title">{title}</h3>

    {/* 説明 */}
    <p className="cs-card-desc">{description}</p>

    {/* 対象・料金（値札） */}
    <div className="cs-card-info">
      <div className="cs-card-info-row">
        <span className="cs-card-info-label">対象</span>
        <p className="cs-card-info-value">{target}</p>
      </div>
      <div className="cs-card-info-row">
        <span className="cs-card-info-label">{priceLabel}</span>
        <p className="cs-card-price">{price}</p>
        {priceNote && <p className="cs-card-note">{priceNote}</p>}
      </div>
    </div>

    {/* CTAボタン */}
    {external ? (
      <a href={link} target="_blank" rel="noopener" className="craft-sticker cs-card-cta">
        詳しく見る
        <ArrowRightDoodle width={22} />
      </a>
    ) : (
      <Link href={link} className="craft-sticker cs-card-cta">
        詳しく見る
        <ArrowRightDoodle width={22} />
      </Link>
    )}
  </div>
);

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

export function CoursesClient() {
  return (
    <MobileContainer>
      {/* ========================================
          Hero Section
          ======================================== */}
      <Section>
        <div className="cs-hero">
          {/* 浮遊する道具（装飾） */}
          <div aria-hidden="true">
            <span
              className="craft-doodle craft-float"
              style={doodle({ top: '8%', left: '4%', color: 'var(--green)', opacity: 0.45, '--rot': '-10deg' })}
            >
              <DoodleIcon name="gamepad" size={34} />
            </span>
            <span
              className="craft-doodle craft-float craft-float--slow"
              style={doodle({ top: '12%', right: '6%', color: 'var(--pink)', opacity: 0.45, '--rot': '12deg' })}
            >
              <DoodleIcon name="wrench" size={30} />
            </span>
            <span
              className="craft-doodle craft-float"
              style={doodle({ bottom: '12%', left: '8%', color: 'var(--cream)', opacity: 0.8, '--rot': '-6deg', animationDelay: '1s' })}
            >
              <DoodleIcon name="bulb" size={26} />
            </span>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* キャッチコピー（荷札タグ） */}
            <p className="cs-hero-label craft-label">コース・料金</p>

            <h1 className="cs-hero-title craft-misprint">
              未来を創る力を、
              <br />
              遊びから。
            </h1>
            <Underline variant={2} className="cs-hero-line craft-draw craft-draw--auto" />

            <p className="cs-hero-lead">興味に合わせて選べるコース</p>
          </div>
        </div>
      </Section>

      {/* ========================================
          Course Cards
          ======================================== */}
      <Section>
        <div className="cs-cards">
          {/* カードA：マイクラSDGsコース */}
          <CourseCard
            title="マイクラSDGsコース"
            description="マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！SDGsの目標を深く理解し、身近な問題として捉え、創造的な解決策を考え、実行する力を育みます。"
            target="小学3年生〜"
            price="¥7,700〜"
            accentRgb="var(--green-rgb)"
            icon="gamepad"
            link="/minecraft"
            ageGroup="小学生・中学生向け"
            rotate="-1.2deg"
            delay={0}
          />

          {/* カードB：ロボットプログラミングコース */}
          <CourseCard
            title="ロボットプログラミングコース"
            description="世界で採用されている、アーテックロボットを使った本格的なプログラミング学習。ブロックで遊びながらかたちを組み立て、プログラミングをして思い通りの動きを表現します。"
            target="小学3年生〜"
            price="¥7,700〜"
            accentRgb="var(--pink-rgb)"
            tapeClass="craft-tape--tr"
            icon="wrench"
            link="https://www.keeponlearning.fun/online"
            ageGroup="小学生・中学生向け"
            rotate="1deg"
            delay={90}
          />

          {/* カードC：キャリアコース */}
          <CourseCard
            title="キャリアコース"
            description="クエスト・PBL・ジブンクラフトが含まれます。"
            target="中学生〜"
            price="¥7,700〜"
            accentRgb="224 158 22"
            tapeClass="craft-tape--cream"
            icon="compass"
            link="/jibun-craft"
            ageGroup="中学生・高校生向け"
            rotate="-0.8deg"
            delay={180}
          />

          {/* カードD：英会話×STEAMコース */}
          <CourseCard
            title="英会話×STEAMコース"
            description="「作る → 英語で深める → 発表する」を1ヶ月で1サイクル。ロボットプログラミング×1on1英会話で、英語で自分の意見を語れる力を育てる個別カリキュラムです。内容はお子さまの興味に合わせてカスタマイズできます。"
            target="小学3年生〜"
            price="¥11,000 + ¥2,750/回"
            priceNote="ロボット月2回 + 英会話チケット制（推奨 月2回）／教材費 ¥13,000（別途）"
            accentRgb="var(--brand-rgb)"
            tapeClass="craft-tape--tl"
            icon="mic"
            link="/english-steam"
            ageGroup="小学生・中学生向け"
            rotate="0.9deg"
            delay={270}
          />

          {/* カードE：英会話（Hello Kiwi英会話） */}
          <CourseCard
            title="英会話（Hello Kiwi英会話）"
            description="ニュージーランド育ちの日本人講師と学ぶ英会話。一人ひとりの目標やレベルに合わせてレッスンをカスタマイズ。通学またはオンラインで受講できます。"
            target="小学生〜大人"
            price="¥2,750/回"
            priceLabel="料金"
            priceNote="50分・チケット制"
            accentRgb="var(--green-rgb)"
            tapeClass="craft-tape--green"
            icon="talk"
            link="https://www.hellokiwieikaiwa.com/"
            external
            ageGroup="小学生〜大人向け"
            rotate="-1deg"
            delay={360}
          />
        </div>
      </Section>

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />
    </MobileContainer>
  );
}
