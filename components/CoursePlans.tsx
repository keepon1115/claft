'use client';

import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { SectionTitle } from './craft/SectionTitle';
import { Underline, ArrowRightDoodle, PlusDoodle } from './craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from './craft/DoodleIcon';
import { CtaPair } from './CtaPair';
import { programs } from '@/lib/programs';
import { plans, type PlanId } from '@/lib/plans';

// トップ／コース・料金ページ共通：通学・オンラインを押して選ぶ料金セクション。
// 「まずはコース診断を」「保護者のみなさんから」「料金早わかり」「CLAFTの学び」を
// この1セクションに統合している。
export function CoursePlans() {
  const [active, setActive] = useState<PlanId>('onsite');
  const plan = plans.find((p) => p.id === active) ?? plans[0];
  const includedPrograms = plan.includes
    .map((id) => programs.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  function handleTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const idx = plans.findIndex((p) => p.id === active);
    const next = e.key === 'ArrowRight' ? (idx + 1) % plans.length : (idx - 1 + plans.length) % plans.length;
    setActive(plans[next].id);
  }

  return (
    <section className="hp-section hp-plans" id="plans">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={2} lineColor="var(--brand)">
            コースと、料金のこと
          </SectionTitle>
          <p className="lead hp-section-lead">通う？オンライン？ どちらも1ヶ月無料体験から。</p>
        </div>

        <div className="hp-plans-tabs" role="tablist" aria-label="通学・オンラインの切替" onKeyDown={handleTabKeyDown}>
          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`hp-plans-tab-${p.id}`}
              aria-selected={p.id === active}
              aria-controls={`hp-plans-panel-${p.id}`}
              tabIndex={p.id === active ? 0 : -1}
              className={`hp-plans-tab ${p.id === active ? 'hp-plans-tab--active' : ''}`}
              onClick={() => setActive(p.id)}
            >
              {p.tabLabel}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`hp-plans-panel-${plan.id}`}
          aria-labelledby={`hp-plans-tab-${plan.id}`}
          className="hp-plans-panel"
        >
          <div className="hp-plans-frame craft-paper craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
            <span className="craft-tape" aria-hidden="true" />

            <div className="hp-plans-frame-head">
              <p className="hp-plans-frame-label">{plan.label}</p>
              <p className="hp-plans-frame-price">
                <strong>{plan.price}</strong>
                <span>{plan.priceUnit}</span>
              </p>
              <p className="hp-plans-frame-note">{plan.note}</p>
            </div>

            <div className="hp-plans-grid">
              {includedPrograms.map((program, i) => (
                <Link
                  key={program.id}
                  href={program.link}
                  className="hp-program-card hp-plans-card craft-paper craft-tilt craft-lift"
                  style={
                    {
                      '--rot': i % 2 === 0 ? '-0.6deg' : '0.6deg',
                      '--accent-rgb': program.accentRgb,
                      '--tape-rgb': program.accentRgb,
                    } as CSSProperties
                  }
                >
                  <span className="craft-tape" aria-hidden="true" />
                  <span className="hp-program-label">{program.label}</span>
                  <span className="hp-program-icon" aria-hidden="true">
                    <DoodleIcon name={program.icon as DoodleIconName} size={30} />
                  </span>
                  <h3 className="hp-program-title hp-plans-card-title">{program.title}</h3>
                  <Underline variant={program.underline} className="hp-program-line craft-draw" />
                  <p className="hp-program-desc hp-plans-card-desc">{program.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="hp-plans-plus" aria-hidden="true">
            <PlusDoodle width={26} />
          </div>

          <div className="hp-plans-options reveal">
            <p className="hp-plans-options-title">好きなだけ足せる（オプション）</p>
            <ul className="hp-plans-options-list">
              {plan.options.map((opt) =>
                opt.external ? (
                  <li key={opt.id}>
                    <a href={opt.href} target="_blank" rel="noopener" className="hp-plans-option">
                      <span>{opt.label}</span>
                      <span className="hp-plans-option-price">{opt.price}</span>
                      <ArrowRightDoodle width={18} />
                    </a>
                  </li>
                ) : (
                  <li key={opt.id}>
                    <Link href={opt.href} className="hp-plans-option">
                      <span>{opt.label}</span>
                      <span className="hp-plans-option-price">{opt.price}</span>
                      <ArrowRightDoodle width={18} />
                    </Link>
                  </li>
                )
              )}
            </ul>
            <p className="hp-plans-options-hint">オプションは基本コースに加えてご利用いただけます</p>
          </div>
        </div>

        <div className="hp-plans-foot reveal">
          <Link href="/career" className="craft-sticker craft-sticker--ghost">
            キャリアコースをくわしく見る
          </Link>
          <span className="craft-label hp-plans-chip">月単位で解約OK</span>
        </div>

        <div className="hp-plans-cta">
          <CtaPair location="plans" />
        </div>
      </div>
    </section>
  );
}
