import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { CtaPair } from './CtaPair';

export function FlowApply() {
  return (
    <section className="hp-section" id="apply">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={3} lineColor="var(--green)">
            入会までの流れ
          </SectionTitle>
        </div>

        <div className="hp-steps">
          {/* STEP 1 */}
          <div
            className="hp-step craft-paper craft-tilt craft-lift reveal"
            style={{ '--rot': '-0.5deg', '--accent-rgb': 'var(--brand-rgb)', '--tape-rgb': 'var(--brand-rgb)' } as CSSProperties}
          >
            <span className="craft-tape craft-tape--tl" aria-hidden="true" />
            <div className="hp-step-head">
              <div className="hp-step-num">1</div>
              <div>
                <h3 className="hp-step-title">お気軽にご相談ください！</h3>
                <p className="hp-step-body">
                  PDF資料で詳細をご確認ください。<br />
                  ご不明な点やご質問はLINEからお問合せください。30分程度の個別面談も可能です。
                </p>
              </div>
            </div>
            <div className="hp-step-actions">
              <a
                className="craft-sticker craft-sticker--ghost"
                href="/assets/siryo.pdf"
                target="_blank"
                rel="noopener"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDFダウンロード
              </a>
            </div>
            <div className="hp-step-actions hp-step-actions--cta">
              <CtaPair location="flow" compact />
            </div>
          </div>

          {/* STEP 2 */}
          <div
            className="hp-step craft-paper craft-tilt craft-lift reveal"
            style={{ '--rot': '0.4deg', '--accent-rgb': 'var(--green-rgb)', '--tape-rgb': 'var(--green-rgb)', transitionDelay: '100ms' } as CSSProperties}
          >
            <span className="craft-tape craft-tape--tr" aria-hidden="true" />
            <div className="hp-step-head">
              <div className="hp-step-num">2</div>
              <div>
                <h3 className="hp-step-title">まずは1ヶ月無料体験</h3>
                <p className="hp-step-body">
                  アプリを使って体験できます。<br />
                  オンラインワークも参加できます。
                </p>
              </div>
            </div>
            <div className="hp-step-actions">
              <Link href="/contact" className="craft-sticker">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                体験を申し込む
              </Link>
            </div>
          </div>

          {/* STEP 3 */}
          <div
            className="hp-step craft-paper craft-tilt craft-lift reveal"
            style={{ '--rot': '-0.3deg', '--accent-rgb': '224 158 22', '--tape-rgb': 'var(--cream-rgb)', transitionDelay: '200ms' } as CSSProperties}
          >
            <span className="craft-tape craft-tape--tl craft-tape--cream" aria-hidden="true" />
            <div className="hp-step-head">
              <div className="hp-step-num">3</div>
              <div>
                <h3 className="hp-step-title">入会のお申し込み</h3>
                <p className="hp-step-body">
                  体験終了後、ご入会の意思をお聞きします。<br />
                  翌月から正式にスタート！
                </p>
              </div>
            </div>
            <p className="hp-step-note">体験後の入会は自由です。強引な勧誘は一切ありません。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
