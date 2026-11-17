import type { Metadata, Viewport } from 'next';
import { defaultOpenGraph } from '@/lib/seo';
import './sensors.css';

// センサーズのゲーム群は HP のナビ（SiteGrid）を持たない全画面レイアウト。
// スタイルは .sz-app 配下にスコープして HP 側と干渉させない（LESSONS.md の方針）。
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fff7e6',
};

const title = 'センサーズ ゲームランド';
const description =
  'ロボットの センサーが キャラクターに なった「センサーズ」と あそぼう。パズル、ミニゲーム、プログラミングで センサーの はたらきが わかる。';

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${title}` },
  description,
  openGraph: { ...defaultOpenGraph, title, description },
};

export default function SensorsLayout({ children }: { children: React.ReactNode }) {
  return <div className="sz-app">{children}</div>;
}
