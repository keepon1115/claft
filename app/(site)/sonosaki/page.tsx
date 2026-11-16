import type { Metadata } from 'next';
import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { CtaPair } from '@/components/CtaPair';
import { defaultOpenGraph } from '@/lib/seo';

// 「好きなことを探究する、その先に…」
// 2026/11/29 秋のスクールフェスタの特設ページ（会場パネルのQRの行き先）。
// フェスタ後は同じURL（/sonosaki）のまま常設ページになる。★URLは変えないこと（QRが印刷済み）。
//
// いまは仮の中身。本文を差し替えるときにやること：
//   1. この下の PROVISIONAL を false にする（検索に載るようになる）
//   2. app/sitemap.ts の STATIC_PATHS に '/sonosaki' を足す
//   3. 「準備中」の段落を本文に置き換える
const PROVISIONAL = true;

const TITLE = '好きなことを探究する、その先に…';
const DESCRIPTION =
  '好きなことを探究する、その先に何があるのか。CLAFT（キープオン）のスクール生の歩みを紹介するページです。2026年11月29日のスクールフェスタにあわせて公開します。';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { ...defaultOpenGraph, title: TITLE, description: DESCRIPTION },
  ...(PROVISIONAL ? { robots: { index: false, follow: true } } : {}),
};

export default function SonosakiPage() {
  return (
    <MobileContainer>
      <Section>
        <p className="craft-label" style={{ color: 'var(--brand-deep)' }}>
          2026.11.29 スクールフェスタ
        </p>
        <h1 className="heading-xl mb-6">{TITLE}</h1>

        <p className="body-base text-ink-700 mb-4">
          このページは、スクールフェスタにあわせて準備中です。
          <br />
          内容はまもなく公開します。
        </p>
      </Section>

      <Section>
        <div className="space-y-0 body-base text-ink-700">
          <p className="py-4 border-b border-black/[0.08]">
            <Link href="/student-story" className="cd-textlink">
              メンバーのストーリーを読む
            </Link>
          </p>
          <p className="py-4 border-b border-black/[0.08]">
            <Link href="/courses" className="cd-textlink">
              コース・料金を見る
            </Link>
          </p>
          <p className="py-4 border-b border-black/[0.08]">
            <Link href="/" className="cd-textlink">
              CLAFTのトップページへ
            </Link>
          </p>
        </div>
      </Section>

      <Section>
        <CtaPair location="sonosaki" />
      </Section>
    </MobileContainer>
  );
}
