import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { Underline } from './craft/HandDrawn';

export function Philosophy() {
  return (
    <section className="hp-section" id="philosophy">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={2} lineColor="var(--brand)">
            勉強から<span className="craft-highlight" style={{ color: 'var(--brand-deep)' }}>冒険</span>へ
          </SectionTitle>
        </div>

        {/* ノートの1ページ（罫線の上に本文が載る） */}
        <div className="hp-philosophy-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />

          <p>
            CLAFTは、教科書を暗記し、テストで高得点を取るための「勉強」をする場ではありません。<br />
            「探究・対話・実践」を通して、 自分だけの正解をカタチにする場所です。
          </p>

          <p>
            自分の心が動く"興味や疑問"をきっかけに、<br />
            未知の世界へ飛びこみ、おもしろい仲間と出会い、 この世にまだないモノを創り出す。<br />
            それは、決められたレールを歩くことではなく、 自ら道を切り拓いていく「冒険」そのものです。
          </p>

          <p className="hp-philosophy-q">
            <strong>あなたはCLAFTでどんな冒険をしますか？</strong>
            <Underline variant={3} className="craft-draw" />
          </p>
        </div>
      </div>
    </section>
  );
}
