import { Hero } from '@/components/Hero';
import { CourseGrid } from '@/components/CourseGrid';
import { Values } from '@/components/Values';
import { Philosophy } from '@/components/Philosophy';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Download } from '@/components/Download';
import { Students } from '@/components/Students';

export default function SiteHome(){
  return (
    <>
      <Hero />
      <Values />
      <Philosophy />
      <CourseGrid />
      <FlowApply />
      <FAQ />
      <Download />
      <Students />
    </>
  );
}
