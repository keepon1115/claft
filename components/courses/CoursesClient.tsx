import { MobileContainer, Section } from '@/components/MobileContainer';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';
import { courses } from '@/lib/courses';
import { programs } from '@/lib/programs';

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
          {/* コース定義は lib/courses.ts に集約（表示と構造化データの単一ソース） */}
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              title={c.title}
              description={c.description}
              target={c.target}
              price={c.price}
              priceLabel={c.priceLabel}
              priceNote={c.priceNote}
              accentRgb={c.accentRgb}
              tapeClass={c.tapeClass}
              icon={c.icon as DoodleIconName}
              link={c.link}
              external={c.external}
              ageGroup={c.ageGroup}
              rotate={c.rotate}
              delay={c.delay}
            />
          ))}
        </div>
      </Section>

      {/* ========================================
          コース×学びマトリクス
          ======================================== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={3} lineColor="var(--brand)">
            コースと学びの関係
          </SectionTitle>
          <p className="lead hp-section-lead">
            キャリアコースは4つの学びがぜんぶ入り。Yononaka・ミライクラフトは、
            どのコースからでも参加できます。
          </p>
        </div>

        <div className="hp-glance-card craft-paper craft-tilt reveal" style={{ '--rot': '-0.3deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <div style={{ overflowX: 'auto' }}>
            <table className="hp-glance-table cs-matrix-table">
              <thead>
                <tr>
                  <th scope="col">学び</th>
                  <th scope="col">キャリアコース</th>
                  <th scope="col">マイクラSDGs</th>
                  <th scope="col">英会話×STEAM</th>
                  <th scope="col">Hello Kiwi英会話</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id}>
                    <td>{program.title}</td>
                    <td className="cs-matrix-cell cs-matrix-cell--yes">◎</td>
                    <td className="cs-matrix-cell">{program.openToAll ? '○' : '－'}</td>
                    <td className="cs-matrix-cell">{program.openToAll ? '○' : '－'}</td>
                    <td className="cs-matrix-cell">{program.openToAll ? '○' : '－'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cd-tip" style={{ marginTop: '14px' }}>
            ◎＝カリキュラムに含む　○＝どのコースでも参加OK
          </p>
        </div>

        <div className="hp-glance-foot reveal">
          <Link href="/career" className="craft-sticker craft-sticker--ghost">
            キャリアコースを詳しく見る
          </Link>
        </div>
      </Section>

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />
    </MobileContainer>
  );
}
