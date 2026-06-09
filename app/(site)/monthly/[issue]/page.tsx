import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { issues, getIssue, seasonThemes } from '@/lib/monthlyData';
import JournalCover from '@/components/monthly/JournalCover';
import JournalToc from '@/components/monthly/JournalToc';
import FeatureSection from '@/components/monthly/FeatureSection';
import ScrollAnimInit from '@/components/monthly/ScrollAnimInit';

interface Props {
  params: { issue: string };
}

export function generateStaticParams() {
  return issues.map((i) => ({ issue: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = getIssue(params.issue);
  if (!issue) return {};
  return {
    title: `KEEPON JOURNAL ${issue.year}年${issue.month}月号 Vol.${issue.volume} | CLAFT`,
    description: issue.coverSubtitle,
  };
}

export default function IssuePage({ params }: Props) {
  const issue = getIssue(params.issue);
  if (!issue) notFound();

  const theme = seasonThemes[issue.season];

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
        html { scroll-behavior: smooth; }
      `}} />

      {/* ===== 表紙 ===== */}
      <Section className="scroll-animate" style={{ paddingBottom: '4px' }}>
        <JournalCover issue={issue} />
      </Section>

      {/* ===== 目次 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <JournalToc features={issue.features} />
      </Section>

      {/* ===== 区切り ===== */}
      <div
        style={{ textAlign: 'center', margin: '4px 0 8px', color: 'var(--ink-400)', fontSize: '14px', letterSpacing: '0.3em' }}
        aria-hidden="true"
      >
        ✦ ✦ ✦
      </div>

      {/* ===== 各特集 ===== */}
      {issue.features.map((feature, i) => (
        <Section key={feature.id} style={{ paddingTop: '4px', paddingBottom: '4px' }}>
          <FeatureSection feature={feature} theme={theme} index={i} />
        </Section>
      ))}

      {/* ===== 編集後記 ===== */}
      <Section className="scroll-animate">
        <div
          style={{
            background: theme.headingBg,
            borderRadius: '16px',
            padding: '24px',
            border: `1.5px dashed ${theme.accent}50`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '20px',
              padding: '3px 16px',
              background: 'rgba(52,198,190,0.2)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#2a9d96',
              borderRadius: '3px',
              transform: 'rotate(-1.5deg)',
            }}
            aria-hidden="true"
          >
            編集後記
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-700)' }}>
            {issue.editorNote}
          </p>
          <p style={{ margin: '12px 0 0', fontSize: '12px', color: 'var(--ink-500)', textAlign: 'right' }}>
            — {issue.year}年{issue.month}月号 Vol.{issue.volume}
          </p>
        </div>
      </Section>

      {/* ===== バックナンバーへ ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center' }}>
          <a
            href="/monthly"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              background: 'rgba(52,198,190,0.1)',
              color: '#2a9d96',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              border: '1.5px solid rgba(52,198,190,0.3)',
            }}
          >
            ← バックナンバー一覧
          </a>
        </div>
      </Section>
    </MobileContainer>
  );
}
