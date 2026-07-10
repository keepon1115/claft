'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDownDoodle, Underline } from './craft/HandDrawn';
import { CtaPair } from './CtaPair';

const YOUTUBE_ID = 'awHyerZPBU4';

export function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="hp-hero">
      <div className="hp-hero-inner">
        {/* ① キッカー：地に直接書く小さな前置き */}
        <p className="hp-hero-kicker">テストには、出ないけれど。</p>

        {/* ② タイトル：前フリ（小）→オチ（特大・赤鉛筆の下線） */}
        <h1 className="hp-hero-title">
          <span className="hp-hero-title-sub">テストに出ないことほど、</span>
          <span className="hp-hero-title-main">
            人生に出る。
            <Underline variant={2} className="hp-hero-title-underline craft-draw craft-draw--auto" />
          </span>
        </h1>

        {/* ③ 受けの一文：違和感の肯定 → CLAFTの自己紹介 */}
        <p className="hp-hero-answer">
          勉強や部活だけが、子どもの選択肢なのだろうか？<br />
          「好き」を入り口に、キャリアまでつなげるのが<br />
          「CLAFT」のスクールです。
        </p>

        {/* ④ 動画：ポラロイド（回転なし・クリックで再生） */}
        <div className="hp-hero-photo craft-photo">
          <div className="hp-hero-screen">
            {playing ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&rel=0&controls=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ display: 'block', width: '100%', height: '100%' }}
              ></iframe>
            ) : (
              <button
                type="button"
                className="hp-hero-play"
                onClick={() => setPlaying(true)}
                aria-label="紹介動画を再生する"
              >
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                  alt=""
                  aria-hidden="true"
                  className="hp-hero-play-thumb"
                />
                <span className="hp-hero-play-icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ⑤ リード文：読者（保護者）への問いかけ */}
        <p className="hp-hero-copy">
          探究×対話×実践で、<br />
          どんな状況でも生き抜く自信をつけ、<br />
          自分のキャリアを自分で切り拓く！
        </p>

        {/* ⑥ 信頼チップ */}
        <div className="hp-hero-chips" aria-label="CLAFTの特徴">
          <span className="craft-paper hp-hero-chip">1ヶ月無料体験</span>
          <span className="craft-paper hp-hero-chip">月額¥7,700〜</span>
          <span className="craft-paper hp-hero-chip">オンライン／八尾教室</span>
        </div>

        {/* ⑦ CTA：LINE｜体験 の並列2択 */}
        <div className="hp-hero-cta">
          <CtaPair location="hero" />
        </div>

        {/* ⑧ 「CLAFTという希望」はテキストリンクへ降格 */}
        <p className="hp-hero-hope-link">
          <Link href="/claft-hope">なぜCLAFTをつくったのか → 「CLAFT」という希望</Link>
        </p>

        {/* ⑨ スクロール誘導 */}
        <div className="hp-hero-scroll" aria-hidden="true">
          <ArrowDownDoodle className="craft-draw craft-draw--auto" width={26} />
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
}
