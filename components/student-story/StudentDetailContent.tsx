'use client';

import { MobileContainer } from '@/components/MobileContainer';
import { useReveal } from '@/lib/useReveal';
import {
  BackButton,
  PersonalCard,
  FutureVision,
  CurrentActions,
  Timeline,
  CTASection,
} from '@/components/student-story';
import type { StudentProfile } from '@/lib/studentData';

type StudentDetailContentProps = {
  student: StudentProfile;
};

export function StudentDetailContent({ student }: StudentDetailContentProps) {
  useReveal();

  return (
    <MobileContainer className="px-0">
      {/* 戻るボタン */}
      <BackButton />

      {/* Personal Card */}
      <PersonalCard 
        profile={{
          name: student.name,
          grade: student.grade,
          likes: student.likes,
          character: student.character,
          motivationEnv: student.motivationEnv,
          avatarEmoji: student.avatarEmoji,
        }}
      />

      {/* Future Vision */}
      <FutureVision 
        visionText={student.futureVision.text}
        subText={student.futureVision.subText}
      />

      {/* Current Actions */}
      <CurrentActions actions={student.currentActions} />

      {/* Timeline */}
      <Timeline events={student.timeline} />

      {/* CTA */}
      <CTASection />
    </MobileContainer>
  );
}
