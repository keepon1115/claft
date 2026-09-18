import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Underline, ArrowRightDoodle } from './HandDrawn';
import { DoodleIcon } from './DoodleIcon';
import type { Program } from '@/lib/programs';

type Props = {
  program: Program;
  rotate: string;
  delay?: number;
  /** カード下部に追加で出す要素（例：career ページの「全コース参加OK」バッジ） */
  extra?: ReactNode;
  className?: string;
};

// 「4つの学び」共通のカード（紙片＋テープ）。TOP/コース・料金ページ（CoursePlans）と
// /career ページで共用する。
export function ProgramCard({ program, rotate, delay = 0, extra, className = '' }: Props) {
  return (
    <Link
      href={program.link}
      className={`hp-program-card craft-paper craft-tilt craft-lift reveal ${className}`}
      style={
        {
          '--rot': rotate,
          '--accent-rgb': program.accentRgb,
          '--tape-rgb': program.accentRgb,
          transitionDelay: `${delay}ms`,
        } as CSSProperties
      }
    >
      <span className="craft-tape" aria-hidden="true" />
      <span className="hp-program-label">{program.label}</span>

      <div className="hp-program-head">
        <span className="hp-program-icon" aria-hidden="true">
          <DoodleIcon name={program.icon} size={32} />
        </span>
        <p className="hp-program-catch">{program.catch}</p>
      </div>

      <h3 className="hp-program-title">{program.title}</h3>
      <Underline variant={program.underline} className="hp-program-line craft-draw" />

      <p className="hp-program-desc">{program.description}</p>

      {extra}

      <span className="hp-program-more">
        くわしく見る
        <ArrowRightDoodle width={18} />
      </span>
    </Link>
  );
}
