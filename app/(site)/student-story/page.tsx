'use client';

import { Suspense } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { useReveal } from '@/lib/useReveal';
import { HeroSection } from '@/components/student-story';
import { StudentList } from '@/components/student-story/StudentList';

export default function StudentStoryIndexPage() {
  useReveal();

  return (
    <MobileContainer className="px-0">
      <HeroSection />

      <Section className="px-4">
        <Suspense>
          <StudentList />
        </Suspense>
      </Section>
    </MobileContainer>
  );
}
