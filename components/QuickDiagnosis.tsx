'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { DoodleIcon, type DoodleIconName } from './craft/DoodleIcon';
import { CtaPair } from './CtaPair';
import { courses } from '@/lib/courses';
import { trackEvent } from '@/lib/analytics';
import {
  GRADE_QUESTION,
  INTEREST_QUESTION,
  CONCERN_QUESTION,
  diagnose,
  type DiagnosisAnswers,
  type DiagnosisResult,
} from '@/lib/diagnosis';

type Step = 0 | 1 | 2 | 3;

export function QuickDiagnosis() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswers>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  function answer<K extends keyof DiagnosisAnswers>(key: K, value: DiagnosisAnswers[K]) {
    if (step === 0) trackEvent('diagnosis_start');
    const next = { ...answers, [key]: value };
    setAnswers(next);

    if (step < 2) {
      setStep((step + 1) as Step);
      return;
    }

    const finalResult = diagnose(next as DiagnosisAnswers);
    trackEvent('diagnosis_complete', {
      grade: next.grade,
      interest: next.interest,
      concern: next.concern,
      result: finalResult.kind === 'course' ? finalResult.courseId : 'guidance',
    });
    setResult(finalResult);
    setStep(3);
  }

  function reset() {
    setAnswers({});
    setResult(null);
    setStep(0);
  }

  return (
    <section className="hp-section hp-diag" id="diagnosis">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={2} lineColor="var(--brand)">
            まずはコース診断を。
          </SectionTitle>
        </div>

        <div className="hp-diag-card craft-paper craft-tilt reveal" style={{ '--rot': '-0.6deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />

          <div className="hp-diag-progress" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`hp-diag-dot ${step > i ? 'hp-diag-dot--done' : ''} ${step === i ? 'hp-diag-dot--active' : ''}`}
              />
            ))}
          </div>

          {step === 0 && <DiagQuestion question={GRADE_QUESTION} onSelect={(v) => answer('grade', v)} />}
          {step === 1 && <DiagQuestion question={INTEREST_QUESTION} onSelect={(v) => answer('interest', v)} />}
          {step === 2 && <DiagQuestion question={CONCERN_QUESTION} onSelect={(v) => answer('concern', v)} />}
          {step === 3 && result && <DiagResult result={result} onReset={reset} />}
        </div>
      </div>
    </section>
  );
}

function DiagQuestion<T extends string>({
  question,
  onSelect,
}: {
  question: { label: string; options: { value: T; label: string }[] };
  onSelect: (value: T) => void;
}) {
  return (
    <div className="hp-diag-q">
      <h3 className="hp-diag-q-title">{question.label}</h3>
      <div className="hp-diag-options">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className="craft-sticker craft-sticker--ghost hp-diag-opt"
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiagResult({ result, onReset }: { result: DiagnosisResult; onReset: () => void }) {
  if (result.kind === 'guidance') {
    return (
      <div className="hp-diag-result">
        <p className="hp-diag-result-stamp">ご案内</p>
        <h3 className="hp-diag-result-title" style={{ color: 'var(--brand-deep)' }}>
          学年に合わせて個別にご案内します
        </h3>
        <p className="hp-diag-result-hint">
          コースは小学3年生からのご案内です。まずはLINEでお子さまの様子をお聞かせください。
        </p>
        <CtaPair location="diagnosis" />
        <button type="button" className="hp-diag-reset" onClick={onReset}>
          もう一度診断する
        </button>
      </div>
    );
  }

  const course = courses.find((c) => c.id === result.courseId);
  const runnerUp = result.runnerUpId ? courses.find((c) => c.id === result.runnerUpId) : null;
  if (!course) return null;

  return (
    <div className="hp-diag-result">
      <p className="hp-diag-result-stamp">おすすめ</p>

      <div
        className="hp-diag-result-card craft-paper craft-tilt"
        style={{ '--rot': '0.5deg', '--accent-rgb': course.accentRgb } as CSSProperties}
      >
        <span className={`craft-tape ${course.tapeClass ?? ''}`} aria-hidden="true" />
        <span className="hp-diag-result-icon" aria-hidden="true">
          <DoodleIcon name={course.icon as DoodleIconName} size={36} />
        </span>
        <h3 className="hp-diag-result-title">{course.title}</h3>
        <p className="hp-diag-result-desc">{course.description}</p>
        <div className="hp-diag-result-meta">
          <span>{course.target}</span>
          <strong>{course.price}</strong>
        </div>
        {course.external ? (
          <a href={course.link} target="_blank" rel="noopener" className="craft-sticker cs-card-cta">
            くわしく見る
          </a>
        ) : (
          <Link href={course.link} className="craft-sticker cs-card-cta">
            くわしく見る
          </Link>
        )}
      </div>

      {runnerUp && (
        <p className="hp-diag-runnerup">
          気になる方はこちらも：{' '}
          {runnerUp.external ? (
            <a href={runnerUp.link} target="_blank" rel="noopener">
              {runnerUp.title}
            </a>
          ) : (
            <Link href={runnerUp.link}>{runnerUp.title}</Link>
          )}
        </p>
      )}

      <p className="hp-diag-result-hint">診断結果を添えてLINEで相談すると話が早いです</p>
      <CtaPair location="diagnosis" />
      <button type="button" className="hp-diag-reset" onClick={onReset}>
        もう一度診断する
      </button>
    </div>
  );
}
