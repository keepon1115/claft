import { Underline } from '@/components/craft/HandDrawn';

export function HeroSection() {
  return (
    <section className="cd-hero reveal" style={{ padding: '52px 16px 36px' }}>
      {/* キャッチコピー */}
      <h1 className="cd-hero-title craft-misprint">
        <span className="block">メンバーの</span>
        <span className="block">ストーリー</span>
      </h1>
      <Underline variant={1} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: 'var(--brand)' }} />

      {/* サブテキスト */}
      <p className="cd-hero-lead">
        CLAFTで学ぶスクール生が、<br />
        どのように成長しているのかをご紹介します。
      </p>
    </section>
  );
}
