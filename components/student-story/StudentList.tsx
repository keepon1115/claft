'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { StudentCard } from '@/components/student-story';
import { studentsData } from '@/lib/studentData';

const FOUNDER_SLUG = 'shoichiro';

export function StudentList() {
  const tag = useSearchParams().get('tag') ?? '';
  const tags = Array.from(new Set(studentsData.flatMap((s) => s.interestTags)));
  const active = tags.includes(tag) ? tag : '';

  // しょういちろうは絞り込みの対象外。「すべて」のときだけ出す
  const list = studentsData.filter((s) => (active ? s.slug !== FOUNDER_SLUG && s.interestTags.includes(active) : true));

  // 絞り込みで差し替わったカードは、スクロール待ちにせず表示する
  useEffect(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
  }, [active]);

  return (
    <>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="興味で絞り込む">
          <TagLink label="すべて" href="/student-story" on={!active} />
          {tags.map((t) => (
            <TagLink key={t} label={t} href={`/student-story?tag=${encodeURIComponent(t)}`} on={active === t} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-6">
        {list.map((student, i) => (
          <StudentCard
            key={student.slug}
            slug={student.slug}
            name={student.name}
            grade={student.grade}
            avatarEmoji={student.avatarEmoji}
            shortIntro={student.shortIntro}
            interestTags={student.interestTags}
            index={i}
          />
        ))}
      </div>
    </>
  );
}

function TagLink({ label, href, on }: { label: string; href: string; on: boolean }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={on ? 'true' : undefined}
      className="ss-tag"
      style={on ? { background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' } : undefined}
    >
      {label}
    </Link>
  );
}
