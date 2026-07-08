import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { parentVoices, communityStats } from '@/lib/voices';

// 保護者の社会的証明。素材が届くまでは在校生ストーリーへの誘導にフォールバックする。
export function ParentVoices() {
  const hasVoices = parentVoices.length > 0;

  return (
    <section className="hp-section hp-voice" id="voices">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor="var(--pink)">
            保護者のみなさんから
          </SectionTitle>
        </div>

        {communityStats.length > 0 && (
          <div className="hp-voice-stats reveal">
            {communityStats.map((stat) => (
              <span key={stat.label} className="craft-label hp-voice-stat">
                {stat.value} {stat.label}
              </span>
            ))}
          </div>
        )}

        {hasVoices ? (
          <div className="hp-voice-list">
            {parentVoices.map((voice, i) => (
              <div
                key={voice.id}
                className="hp-voice-card craft-paper craft-paper--ruled craft-tilt reveal"
                style={{ '--rot': `${i % 2 === 0 ? -0.6 : 0.6}deg`, transitionDelay: `${i * 100}ms` } as CSSProperties}
              >
                <span className="craft-tape craft-tape--cream" aria-hidden="true" />
                {voice.before && voice.after && (
                  <p className="hp-voice-change">
                    <span>{voice.before}</span>
                    <span aria-hidden="true">→</span>
                    <span>{voice.after}</span>
                  </p>
                )}
                <p className="hp-voice-quote">{voice.quote}</p>
                <p className="hp-voice-sign">{voice.parentLabel}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="hp-voice-fallback craft-paper craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
            <span className="craft-tape" aria-hidden="true" />
            <p className="hp-voice-fallback-text">
              保護者の声は準備中です。まずは実際にCLAFTで学ぶメンバーたちのストーリーをご覧ください。
            </p>
            <Link href="/student-story" className="craft-sticker">
              メンバーのストーリーを読む
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
