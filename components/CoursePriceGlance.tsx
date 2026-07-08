import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { courses } from '@/lib/courses';

// 料金早わかり：/courses まで掘らなくても、コース名・対象・月額が一目でわかる表。
export function CoursePriceGlance() {
  return (
    <section className="hp-section hp-glance">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={3} lineColor="var(--cream)">
            料金早わかり
          </SectionTitle>
          <p className="lead hp-section-lead">全コース、1ヶ月の無料体験から始められます</p>
        </div>

        <div className="hp-glance-card craft-paper craft-tilt reveal" style={{ '--rot': '0.3deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <table className="hp-glance-table">
            <thead>
              <tr>
                <th scope="col">コース名</th>
                <th scope="col">対象</th>
                <th scope="col">月額</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className={course.id === 'career' ? 'hp-glance-row--featured' : undefined}>
                  <td>
                    {course.id === 'career' && <span className="hp-glance-badge">全部入り</span>}
                    {course.title}
                  </td>
                  <td>{course.target}</td>
                  <td>{course.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="hp-glance-foot reveal">
          <Link href="/courses" className="craft-sticker craft-sticker--ghost">
            くわしく比較する
          </Link>
          <span className="craft-label hp-glance-chip">月単位で解約OK</span>
        </div>
      </div>
    </section>
  );
}
