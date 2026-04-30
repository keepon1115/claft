import type { Metadata } from 'next'
import {
  Press_Start_2P,
  DotGothic16,
  Zen_Kaku_Gothic_New,
  Bungee,
} from 'next/font/google'
import GameExhibitionContent from './GameExhibitionContent'

// このページ専用の追加フォント。CSS変数で読み込み、他ページには影響しない。
const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-press-start',
  display: 'swap',
})

const dotGothic = DotGothic16({
  weight: ['400'],
  variable: '--font-dot-gothic',
  display: 'swap',
  preload: false, // 日本語フォント
})

const zenKakuGothic = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700', '900'],
  variable: '--font-zen-kaku-gothic',
  display: 'swap',
  preload: false,
})

const bungee = Bungee({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bungee',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GAME EXHIBITION | 6月開催 ゲーム展示会 | キープオン',
  description:
    'スクールのみんなが作ったオリジナルゲームを、1ヶ月間あそびつくす。プレイヤーも、クリエイターも、ぜんぶつないでスクールをアーケードに。',
}

export default function GameExhibitionPage() {
  return (
    <div
      className={`${pressStart.variable} ${dotGothic.variable} ${zenKakuGothic.variable} ${bungee.variable}`}
    >
      <GameExhibitionContent />
    </div>
  )
}
