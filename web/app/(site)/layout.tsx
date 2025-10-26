import type { Metadata } from 'next';
import '../globals.css';
import { SiteGrid } from '@/components/SiteGrid';

export const metadata: Metadata = { title: 'CLAFT' };

export default function SiteLayout({ children }: { children: React.ReactNode }){
  return <SiteGrid>{children}</SiteGrid>;
}
