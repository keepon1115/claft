import type { Metadata } from 'next';
import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { issues, seasonThemes, featureColors } from '@/lib/monthlyData';
import ScrollAnimInit from '@/components/monthly/ScrollAnimInit';

export const metadata: Metadata = {
  title: 'KEEPON JOURNAL | CLAFT',
  description: 'キープオンが毎月配信する月刊WEBマガジン。イベント振り返り・ロボットニュース・お知らせを、スクラップブック風の読み物としてお届けします。',
};

const featureLabels = { recap: 'イベント振り返り', news: 'ロボットニュース', info: 'お知らせ' } as const;
const featureIcons = { recap: '🏆', news: '🤖', info: '📢' } as const;

export default function MonthlyIndexPage() {
  const sorted = [...issues].sort((a, b) => b.year * 100 + b.month - (a.year * 100 + a.month));

  return (
    <MobileContainer>
      <ScrollAnimInit />

      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-animate {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: none;
        }
        .issue-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.1) !important;
        }
      `}} />

      {/* ヘッダー */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              background: 'rgba(52,198,190,0.12)',
              color: '#2a9d96',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            月刊WEBマガジン
          </span>
          <h1
            className="heading-xl"
            style={{
              display: 'block',
              fontFamily: 'var(--font-zen), sans-serif',
              marginBottom: '8px',
              position: 'relative',
            }}
          >
            KEEPON JOURNAL
            <svg
              style={{ display: 'block', margin: '2px auto 0', width: '80%', height: '10px' }}
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M3,7 Q50,5 100,6 T197,7" stroke="#34c6be" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.5" />
            </svg>
          </h1>
          <p className="body-sm" style={{ color: 'var(--ink-500)', marginTop: '12px' }}>
            "創って伝える"スクールの、毎月の記録
          </p>
        </div>
      </Section>

      {/* バックナンバー一覧 */}
      <Section className="scroll-animate">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sorted.map((issue) => {
            const theme = seasonThemes[issue.season];
            return (
              <Link key={issue.slug} href={`/monthly/${issue.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  className="issue-card"
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                    border: '1.5px solid rgba(0,0,0,0.06)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* カラーヘッダー */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${theme.headingBg}, #fff)`,
                      padding: '20px 20px 16px',
                      borderBottom: `3px solid ${theme.accent}30`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '2px 10px',
                          background: '#34c6be',
                          color: '#fff',
                          borderRadius: '50px',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        Vol.{issue.volume}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--ink-600)', fontWeight: 700 }}>
                        {issue.year}年{issue.month}月号
                      </span>
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontSize: '11px',
                          padding: '2px 8px',
                          background: theme.headingBg,
                          color: 'var(--ink-600)',
                          borderRadius: '50px',
                          border: `1px solid ${theme.accent}40`,
                        }}
                      >
                        {theme.label}
                      </span>
                    </div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 900,
                        color: 'var(--ink-900)',
                        fontFamily: 'var(--font-zen), sans-serif',
                      }}
                    >
                      {issue.coverTitle}
                    </h2>
                  </div>

                  {/* 3本柱プレビュー */}
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      {issue.features.map((f) => (
                        <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: featureColors[f.id],
                              fontSize: '11px',
                              flexShrink: 0,
                            }}
                            aria-hidden="true"
                          >
                            {featureIcons[f.id]}
                          </span>
                          <span style={{ fontWeight: 700, color: featureColors[f.id], fontSize: '12px', minWidth: '90px' }}>
                            {featureLabels[f.id]}
                          </span>
                          <span style={{ color: 'var(--ink-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {f.title}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 16px',
                          background: 'rgba(52,198,190,0.1)',
                          color: '#2a9d96',
                          borderRadius: '50px',
                          fontSize: '13px',
                          fontWeight: 700,
                        }}
                      >
                        読む →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Section>
    </MobileContainer>
  );
}
