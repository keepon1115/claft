import type { CSSProperties } from 'react';

/**
 * 手描き線ライブラリ。
 * - すべて currentColor で描画（親の color で着色する）
 * - path に pathLength={1} を付与してあり、.craft-draw と組み合わせると
 *   「線が描かれる」アニメーションになる（globals.css 参照）
 * - 揺らぎのある複数ストローク＝筆圧。preserveAspectRatio は崩さない
 */

type DrawnProps = {
  className?: string;
  style?: CSSProperties;
  width?: number | string;
};

/** 手描きアンダーライン（3種をローテーションして「同じスタンプ」を避ける） */
export function Underline({ variant = 1, className = '', style, width }: DrawnProps & { variant?: 1 | 2 | 3 }) {
  const strokes: Record<number, [string, string]> = {
    1: [
      'M5 10 C 30 6.8, 58 11.4, 86 9 C 114 6.8, 142 11.6, 170 9.4 C 188 8, 204 9.8, 215 8.2',
      'M12 12.6 C 50 10.4, 96 13, 138 11 C 168 9.6, 196 11.6, 210 10.6'
    ],
    2: [
      'M5 9 C 40 4.5, 78 12.5, 116 8.5 C 152 5, 186 11, 215 7.5',
      'M120 13 C 150 11, 182 13.4, 212 11.4'
    ],
    3: [
      'M6 11 C 24 7, 40 12, 58 9 C 76 6, 92 12, 110 9.5 C 128 7, 144 12.5, 162 9.5 C 180 6.5, 198 11.5, 214 8.5',
      'M30 13.5 C 70 11.5, 120 13.8, 168 12 C 188 11.2, 202 12.4, 212 11.8'
    ]
  };
  const [main, sub] = strokes[variant] ?? strokes[1];
  return (
    <svg viewBox="0 0 220 16" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path d={main} pathLength={1} stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity="0.85" />
      <path d={sub} pathLength={1} stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

/** ぐるっと囲む円スクリブル */
export function CircleScribble({ className = '', style, width }: DrawnProps) {
  return (
    <svg viewBox="0 0 132 64" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path
        d="M22 34 C 16 18, 46 7, 70 8.5 C 98 10, 122 19, 119 34 C 116 50, 84 58.5, 56 56 C 32 54, 14 46, 18 30 C 20 22, 30 15, 44 12.5"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/** 下向きの手描き矢印 */
export function ArrowDownDoodle({ className = '', style, width = 34 }: DrawnProps) {
  return (
    <svg viewBox="0 0 40 76" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path
        d="M20 4 C 17.8 20, 22.4 36, 19.6 58"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M8 50 C 12 55.5, 16 61, 19.8 66.5 C 24 60.5, 28.4 54.8, 32.5 49.5"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 右向きの手描き矢印 */
export function ArrowRightDoodle({ className = '', style, width = 28 }: DrawnProps) {
  return (
    <svg viewBox="0 0 76 40" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path
        d="M4 20 C 20 17.8, 36 22.4, 58 19.6"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M50 8 C 55.5 12, 61 16, 66.5 19.8 C 60.5 24, 54.8 28.4, 49.5 32.5"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** きらきら（手描きの十字スパーク） */
export function SparkleDoodle({ className = '', style, width = 26 }: DrawnProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path d="M14 3 C 14.4 7.4, 14.6 9.4, 14.2 12.6" pathLength={1} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M14.2 16 C 14 19, 14.2 22, 14.4 25" pathLength={1} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M3.4 14 C 7 14.3, 9.6 14.4, 12 14.2" pathLength={1} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16.6 14.2 C 19.8 14, 22.6 14.1, 25 14.3" pathLength={1} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** ばつ印（クレヨンのクロス） */
export function CrossDoodle({ className = '', style, width = 20 }: DrawnProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path d="M4.5 5 C 9 9.4, 13.4 13.6, 17.6 17.6" pathLength={1} stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M17.2 4.6 C 13 9, 8.8 13.2, 4.8 17.4" pathLength={1} stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

/** なみなみ線 */
export function SquiggleDoodle({ className = '', style, width = 70 }: DrawnProps) {
  return (
    <svg viewBox="0 0 78 24" fill="none" className={className} style={style} width={width} aria-hidden="true">
      <path
        d="M4 14 C 10 6, 16 6, 22 13 C 28 20, 34 20, 40 13 C 46 6, 52 6, 58 13 C 64 20, 70 20, 74 14"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
