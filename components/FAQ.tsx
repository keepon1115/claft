import { SectionTitle } from './craft/SectionTitle';
import { faqs, faqPageJsonLd } from '@/lib/faq';
import { JsonLd } from './JsonLd';

// jsonLd: FAQPage 構造化データを出力するか。FAQ は複数ページに表示されるため、
// 重複を避けて1ページ（トップ）でのみ true にする。
export function FAQ({ jsonLd = false }: { jsonLd?: boolean }) {
  return (
    <section className="hp-section" id="faq">
      {jsonLd && <JsonLd data={faqPageJsonLd} />}
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor="var(--pink)">
            よくある質問
          </SectionTitle>
        </div>

        <div className="hp-faq-list">
          {faqs.map((faq, i) => (
            <details key={i} className="hp-faq-item craft-paper craft-tilt reveal">
              <summary>
                <span>{faq.q}</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="hp-faq-a">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
