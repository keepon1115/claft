"use client";
import { Nav } from './Nav';
import { RightRail } from './RightRail';
import { Header } from './Header';
import { Footer } from './Footer';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function SiteGrid({ children }: { children: React.ReactNode }){
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    const elements = document.querySelectorAll('.reveal:not(.in)');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);
  
  if (isEmbed) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Mobile Header (1280px未満で表示) */}
      <div className="xl:hidden">
        <Header />
      </div>

      {/* Main Grid Layout (1280px以上で適用。スタイルは globals.css が単一ソース) */}
      <div className="site-grid">

        {/* Left Sidebar (PC Navigation) */}
        <aside className="site-left">
          <div className="site-left-scroll">
            <Nav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="site-main">
          {children}
        </div>

        {/* Right Sidebar (Icons) */}
        <aside className="site-right account-icons">
          <RightRail />
        </aside>
      </div>

      {/* Footer（モバイル・PC共通。机の端のクラフト紙帯） */}
      <Footer />

      {/* FAB (Mobile Only) */}
      <div className="fab xl:hidden fixed right-4 bottom-4 z-50">
        <a href="https://lin.ee/wcsFK9A" target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 bg-[#06c755] text-white px-4 py-3.5 rounded-full font-bold shadow-lg">
          <img src="/assets/images/common/line_icon_white.svg" width="24" height="24" alt="" />
          <span>LINEで相談</span>
        </a>
      </div>
    </>
  );
}