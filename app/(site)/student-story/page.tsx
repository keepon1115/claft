'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useReveal } from '@/lib/useReveal';
import { HeroSection, StudentCard } from '@/components/student-story';
import { studentsData } from '@/lib/studentData';

export default function StudentStoryIndexPage() {
  useReveal();

  return (
    <MobileContainer className="px-0 bg-[var(--bg)]">
      {/* Hero Section */}
      <HeroSection />

      {/* スクール生カード一覧 */}
      <Section className="px-4">
        <div className="flex flex-col gap-6">
          {studentsData.map((student) => (
            <StudentCard
              key={student.slug}
              slug={student.slug}
              name={student.name}
              grade={student.grade}
              avatarEmoji={student.avatarEmoji}
              shortIntro={student.shortIntro}
            />
          ))}
        </div>
      </Section>
    </MobileContainer>
  );
}
