import { Nav } from './Nav';
import { RightRail } from './RightRail';

export function SiteGrid({ children }: { children: React.ReactNode }){
  return (
    <div className="px-3 lg:px-0">
      <div className="mx-auto my-4 hidden w-[min(1200px,96%)] grid-cols-[300px_1fr_360px] gap-4 lg:grid">
        <Nav />
        <main className="min-w-0">{children}</main>
        <RightRail />
      </div>
      <main className="lg:hidden">
        {children}
      </main>
    </div>
  );
}
