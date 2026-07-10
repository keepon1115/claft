"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Nav } from './Nav';
import { trackEvent } from '@/lib/analytics';

export function Header(){
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="c-header">
        <div className="container nav">
          {/* ハンバーガーボタン */}
          <button 
            className={`hamburger ${open ? 'active' : ''}`}
            id="hamburgerBtn" 
            aria-label="メニューを開く"
            onClick={() => setOpen(!open)}
          >
            <span></span><span></span><span></span>
          </button>

          {/* ロゴ：ここに className="h-10 w-auto" を追加しました */}
          <Link href="/" className="logo-btn" aria-label="CLAFT トップへ" onClick={() => setOpen(false)}>
            <img 
              src="/assets/images/common/logo.png" 
              alt="CLAFT ロゴ" 
              className="h-10 w-auto"
            />
          </Link>

          {/* 右側のCTA：文言どおり体験申込フォームへ（LINEは追従CTA側が担う） */}
          <div className="cta-row" style={{ marginLeft: 'auto' }}>
            <Link
              className="btn btn-primary btn-cta"
              href="/contact?type=taiken"
              onClick={() => trackEvent('cta_taiken_click', { location: 'header' })}
            >
              無料体験実施中
            </Link>
          </div>
        </div>

        {/* サイドメニュー (ドロワー) */}
        <div className={`side-menu ${open ? 'active' : ''}`} id="sideMenu">
          <div className="side-menu-inner p-4 pt-16">
            <Nav onLinkClick={() => setOpen(false)} />
          </div>
        </div>

        {/* オーバーレイ背景 */}
        <div 
          className={`menu-overlay ${open ? 'active' : ''}`} 
          id="menuOverlay"
          onClick={() => setOpen(false)}
        ></div>
      </header>
    </>
  );
}