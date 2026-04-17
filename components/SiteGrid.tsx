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

      {/* Main Grid Layout (1280px以上で適用) */}
      <div className="site-grid xl:grid xl:grid-cols-[300px_1fr_360px] xl:gap-[18px] xl:w-[min(1280px,96%)] xl:mx-auto xl:py-4">

        {/* Left Sidebar (PC Navigation) */}
        <aside className="site-left hidden xl:block sticky top-4 h-[calc(100dvh-32px)] bg-white p-[10px] rounded-[14px]">
          <div className="site-left-scroll h-full overflow-auto">
            <Nav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="site-main w-full min-w-0">
          {children}
        </div>

        {/* Right Sidebar (Icons)
            justify-center を削除しました。これでCSS側の flex-start (上揃え) が適用されます。
        */}
        <aside className="site-right account-icons hidden xl:flex sticky top-4 h-[calc(100dvh-32px)] bg-white rounded-[14px] items-start pt-3 px-3 w-[360px]">
          <RightRail />
        </aside>
      </div>

      {/* Mobile Footer */}
      <div className="xl:hidden">
        <Footer />
      </div>

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