import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { Underline, ArrowRightDoodle } from './craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from './craft/DoodleIcon';
import { programs } from '@/lib/programs';

export function ProgramsScrapbook() {
  return (
    <section className="hp-section hp-programs">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor="var(--cream)">
            CLAFTの学び
          </SectionTitle>
          <p className="lead hp-section-lead">勉強ではなく、新たなモノをつくる「冒険」</p>
          <p className="hp-programs-note">
            この4つは、キャリアコースにぜんぶ入っています。Yononakaとミライクラフトは、
            どのコースからでも参加できます。
          </p>
        </div>

        {/* スクラップブックに貼られた4枚の紙片 */}
        <div className="hp-programs-grid">
          {programs.map((program, i) => (
            <Link
              key={program.id}
              href={program.link}
              className="hp-program-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--rot': program.rotate,
                  '--accent-rgb': program.accentRgb,
                  '--tape-rgb': program.accentRgb,
                  transitionDelay: `${i * 90}ms`
                } as CSSProperties
              }
            >
              <span className="craft-tape" aria-hidden="true" />
              <span className="hp-program-label">{program.label}</span>

              <span className="hp-program-icon" aria-hidden="true">
                <DoodleIcon name={program.icon} size={36} />
              </span>

              <h3 className="hp-program-title">{program.title}</h3>
              <Underline
                variant={program.underline}
                className="hp-program-line craft-draw"
              />

              <p className="hp-program-desc">{program.description}</p>
            </Link>
          ))}
        </div>

        {/* メンバーのストーリー／キャリアコースへのボタン */}
        <div className="hp-programs-cta reveal">
          <Link href="/student-story" className="craft-sticker craft-sticker--ghost">
            メンバーのストーリー
            <ArrowRightDoodle width={24} />
          </Link>
          <Link href="/career" className="craft-sticker">
            キャリアコースを見る
            <ArrowRightDoodle width={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}
