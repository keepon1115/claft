import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { DoodleIcon } from './craft/DoodleIcon';

export function Students() {
  return (
    <section className="hp-section" id="students">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={2} lineColor="var(--brand)">
            スクール生用アプリ
          </SectionTitle>
        </div>

        <div
          className="hp-students-card craft-paper craft-paper--warm craft-tilt craft-lift reveal"
          style={{ '--rot': '0.5deg' } as CSSProperties}
        >
          <span className="craft-tape" aria-hidden="true" />
          <div className="hp-students-head">
            <span className="hp-students-icon" aria-hidden="true">
              <DoodleIcon name="book" size={36} />
            </span>
            <div>
              <h3 className="hp-students-title">在籍生向け学習環境</h3>
              <p className="hp-students-body">
                CLAFTスクール生は、専用のアプリでクエスト動画の視聴＆意見共有、その他オンラインワークの参加などができます。
              </p>
              <a
                className="craft-sticker"
                href="https://claft-next.vercel.app"
                target="_blank"
                rel="noopener"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                スクール生用アプリへ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
