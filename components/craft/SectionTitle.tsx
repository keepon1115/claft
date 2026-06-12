import type { ReactNode } from 'react';
import { Underline } from './HandDrawn';

type Props = {
  children: ReactNode;
  /** 紙タグで出す小さな前置きラベル */
  eyebrow?: string;
  /** アンダーラインの線種（セクションごとに変えて手描き感を出す） */
  variant?: 1 | 2 | 3;
  /** アンダーラインの色（CSSカラー） */
  lineColor?: string;
  className?: string;
};

/**
 * セクション見出しの共通部品。
 * 版ずれ（misprint）＋手描きアンダーラインの描画アニメーション付き。
 * .reveal は SiteGrid の IntersectionObserver が監視する。
 */
export function SectionTitle({
  children,
  eyebrow,
  variant = 1,
  lineColor = 'var(--cream)',
  className = ''
}: Props) {
  return (
    <div className={`craft-title reveal ${className}`}>
      {eyebrow && <span className="craft-title-eyebrow craft-label">{eyebrow}</span>}
      <h2 className="craft-title-h craft-misprint">
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        <Underline variant={variant} className="craft-title-line craft-draw" style={{ color: lineColor }} />
      </h2>
    </div>
  );
}
