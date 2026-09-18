'use client';

import { useState } from 'react';
import { Underline } from './craft/HandDrawn';
import { CtaPair } from './CtaPair';

const YOUTUBE_ID = 'awHyerZPBU4';

export function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="hp-hero">
      <div className="hp-hero-inner">
        {/* ① タイトル：前フリ（小）→オチ（特大・赤鉛筆の下線） */}
        <h1 className="hp-hero-title">
          <span className="hp-hero-title-sub">正解を拾うより、</span>
          <span className="hp-hero-title-main">
            心が夢中になる方へ。
            <Underline variant={2} className="hp-hero-title-underline craft-draw craft-draw--auto" />
          </span>
        </h1>

        {/* ② 受けの一文：違和感の肯定 → CLAFTの自己紹介 */}
        <p className="hp-hero-answer">
          価値観が多様化した今、<br />
          勉強や部活だけが道じゃない。<br />
          まだ知らない自分に、出会いに行こう。
        </p>

        {/* ③ 動画：ポラロイド（回転なし・クリックで再生） */}
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

        {/* ④ リード文：読者（保護者）への問いかけ */}
        <p className="hp-hero-copy">
          探究×対話×実践で、<br />
          どんな状況でも生き抜く自信をつけ、<br />
          自分でキャリアを切り拓くスクール。
        </p>

        {/* ⑤ 信頼チップ */}
        <div className="hp-hero-chips" aria-label="CLAFTの特徴">
          <span className="craft-paper hp-hero-chip">1ヶ月無料体験</span>
          <span className="craft-paper hp-hero-chip">月額¥2,200〜</span>
          <span className="craft-paper hp-hero-chip">オンライン／八尾教室</span>
        </div>

        {/* ⑥ CTA：LINE相談を主導線に、「CLAFTという希望」をその下に縦並び */}
        <div className="hp-hero-cta">
          <CtaPair location="hero" withHope />
        </div>
      </div>
    </section>
  );
}
