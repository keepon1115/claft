import Link from 'next/link';
import { ArrowRightDoodle } from '@/components/craft/HandDrawn';

export function BackButton() {
  return (
    <div className="px-4 py-4">
      <Link href="/student-story" className="ss-back">
        <ArrowRightDoodle width={20} style={{ transform: 'scaleX(-1)' }} />
        一覧に戻る
      </Link>
    </div>
  );
}
