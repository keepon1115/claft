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
  LaterConnection,
  LikesHistory,
  ExhibitVideo,
  VisitorQuestion,
} from '@/components/student-story';
import { buildTimelineEvents, formatYearMonth, type StudentStory } from '@/lib/studentData';

type StudentDetailContentProps = {
  student: StudentStory;
};

export function StudentDetailContent({ student }: StudentDetailContentProps) {
  useReveal();

  const events = buildTimelineEvents(student);

  return (
    <MobileContainer className="px-0">
      <BackButton />

      <PersonalCard
        profile={{
          name: student.name,
          grade: student.grade,
          likes: student.likes,
          character: student.character,
          strengths: student.strengths,
          motivationEnv: student.motivationEnv,
          quote: student.quote,
          avatarEmoji: student.avatarEmoji,
        }}
      />

      <LikesHistory history={student.likesHistory} likes={student.likes} updatedAt={student.updatedAt} />

      {student.futureVision && (
        <FutureVision
          visionText={student.futureVision.text}
          subText={student.futureVision.subText}
          goalThisYear={student.goalThisYear}
        />
      )}

      {student.currentActions.length > 0 && <CurrentActions actions={student.currentActions} />}

      {student.exhibitVideoUrl && <ExhibitVideo url={student.exhibitVideoUrl} name={student.name} />}

      {student.laterConnection && <LaterConnection text={student.laterConnection} />}

      {events.length > 0 && <Timeline events={events} />}

      {student.visitorQuestion && <VisitorQuestion name={student.name} question={student.visitorQuestion} />}

      {student.updatedAt && (
        <p className="text-center text-[var(--text-xs)] text-[var(--ink-500)] px-4 m-0">
          {formatYearMonth(student.updatedAt)}時点の内容です
        </p>
      )}

      <CTASection />
    </MobileContainer>
  );
}
