'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  ArrowDownDoodle,
  CrossDoodle,
  SparkleDoodle,
  SquiggleDoodle
} from './craft/HandDrawn';
import { CtaPair } from './CtaPair';

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

const YOUTUBE_ID = 'awHyerZPBU4';

export function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="hp-hero">
      {/* 机に散らばる道具（装飾） */}
      <div aria-hidden="true">
        <SparkleDoodle
          className="hp-doodle craft-float"
          style={doodle({ top: '7%', left: '6%', color: 'var(--brand)', opacity: 0.6, '--rot': '-8deg' })}
          width={30}
        />
        <CrossDoodle
          className="hp-doodle craft-float craft-float--slow"
          style={doodle({ top: '12%', right: '7%', color: 'var(--pink)', opacity: 0.5, '--rot': '14deg' })}
          width={20}
        />
        <SquiggleDoodle
          className="hp-doodle craft-float craft-float--slow"
          style={doodle({ bottom: '24%', left: '3%', color: 'var(--green)', opacity: 0.5, '--rot': '-12deg' })}
          width={62}
        />
        <SparkleDoodle
          className="hp-doodle craft-float"
          style={doodle({ bottom: '14%', right: '6%', color: 'var(--cream)', opacity: 0.9, '--rot': '20deg', animationDelay: '1.2s' })}
          width={24}
        />
        {/* 端に貼られた紙きれ */}
        <span className="hp-scrap" style={{ top: '30%', left: '-18px', transform: 'rotate(-10deg)' }}>
          <span className="craft-tape craft-tape--green" />
        </span>
        <span className="hp-scrap" style={{ top: '56%', right: '-20px', transform: 'rotate(8deg)' }}>
          <span className="craft-tape craft-tape--pink" />
        </span>
      </div>

      <div className="hp-hero-inner">
        {/* ① 保護者への宛名タグ＋既存の荷札タグ（紙が2枚重なる） */}
        <p className="hp-hero-eyebrow hp-hero-eyebrow--parent craft-label">
          勉強だけが、ものさしじゃない。
        </p>
        <p className="hp-hero-eyebrow craft-label">自分のキャリア</p>

        {/* ② タイトル：切り抜いた紙片をテープで貼り込む */}
        <h1 className="hp-hero-title">
          <span className="hp-hero-line hp-hero-line--1">
            <span className="craft-tape craft-tape--tl craft-tape--cream" aria-hidden="true" />
            "自分で"
          </span>
          <span className="hp-hero-line hp-hero-line--2">
            <span className="craft-tape craft-tape--tr craft-tape--pink" aria-hidden="true" />
            つくろ！
          </span>
        </h1>

        {/* ③ 動画：スクラップブックに貼ったポラロイド（クリックで再生） */}
        <div className="hp-hero-photo craft-photo">
          <span className="craft-tape craft-tape--tl" aria-hidden="true" />
          <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />
          <div className="hp-hero-screen">
            {playing ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&controls=1`}
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

        {/* ④ リード文 */}
        <p className="hp-hero-copy">
          探究×対話×実践で、<br />
          どんな状況でも生き抜く自信をつけ、<br />
          自分のキャリアを自分で切り拓くスクール
        </p>

        {/* ⑤ 信頼チップ */}
        <div className="hp-hero-chips" aria-label="CLAFTの特徴">
          <span className="craft-paper hp-hero-chip">1ヶ月無料体験</span>
          <span className="craft-paper hp-hero-chip">月額¥7,700〜</span>
          <span className="craft-paper hp-hero-chip">オンライン／八尾教室</span>
        </div>

        {/* ⑥ CTA：LINE｜体験 の並列2択 */}
        <div className="hp-hero-cta">
          <CtaPair location="hero" />
        </div>

        {/* ⑦ 「CLAFTという希望」はテキストリンクへ降格 */}
        <p className="hp-hero-hope-link">
          <Link href="/claft-hope">なぜCLAFTをつくったのか → 「CLAFT」という希望</Link>
        </p>

        {/* ⑧ スクロール誘導 */}
        <div className="hp-hero-scroll" aria-hidden="true">
          <ArrowDownDoodle className="craft-draw craft-draw--auto" width={26} />
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
}
