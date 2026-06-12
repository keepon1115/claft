import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowDownDoodle, ArrowRightDoodle } from './craft/HandDrawn';
import { DoodleIcon } from './craft/DoodleIcon';

export function EntranceDoors() {
  return (
    <section className="hp-section">
      <div className="container">
        {/* 手描きの矢印（線が描かれてから2枚のドアへ） */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <ArrowDownDoodle className="hp-doors-arrow craft-draw" width={48} />
        </div>

        {/* 2つのドア＝2通の招待状 */}
        <div className="hp-doors-grid">
          {/* 左のドア：親子で参加 */}
          <Link
            href="/contact"
            className="hp-door craft-paper craft-tilt craft-lift reveal"
            style={
              {
                '--rot': '-1.2deg',
                '--accent-rgb': 'var(--pink-rgb)',
                transitionDelay: '100ms'
              } as CSSProperties
            }
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <div>
              <span className="hp-door-icon" aria-hidden="true">
                <DoodleIcon name="family" size={44} />
              </span>

              <h3 className="hp-door-title">親子で参加</h3>
              <p className="subtitle hp-door-sub">Kids &amp; Parents</p>

              <p className="hp-door-body">
                お子さまの可能性を広げたい保護者の方へ。
                <br />
                <strong className="emphasis">小学生・中学生・高校生</strong>が対象です。
              </p>
            </div>

            <span className="hp-door-btn craft-sticker craft-sticker--cream">
              <span>このドアを開く</span>
              <ArrowRightDoodle width={24} />
            </span>
          </Link>

          {/* 右のドア：大人として参加 */}
          <Link
            href="/contact"
            className="hp-door hp-door--adult craft-paper craft-tilt craft-lift reveal"
            style={
              {
                '--rot': '1.2deg',
                '--accent-rgb': 'var(--brand-rgb)',
                transitionDelay: '200ms'
              } as CSSProperties
            }
          >
            <span className="craft-tape" aria-hidden="true" />
            <div>
              <span className="hp-door-icon" aria-hidden="true">
                <DoodleIcon name="compass" size={44} />
              </span>

              <h3 className="hp-door-title">大人として参加</h3>
              <p className="subtitle hp-door-sub">Adults &amp; Seekers</p>

              <p className="hp-door-body">
                自分のキャリアを自律的に築きたい方へ。
                <br />
                <strong className="emphasis">大学生・社会人</strong>が対象です。
              </p>
            </div>

            <span className="hp-door-btn craft-sticker">
              <span>このドアを開く</span>
              <ArrowRightDoodle width={24} />
            </span>
          </Link>
        </div>

        {/* 追加メッセージ */}
        <div className="hp-doors-msg reveal" style={{ transitionDelay: '300ms' }}>
          <p>
            迷っている方も、お気軽にお問い合わせください。
            <br />
            一緒に、あなたに合った道を見つけましょう。
          </p>
        </div>
      </div>
    </section>
  );
}
