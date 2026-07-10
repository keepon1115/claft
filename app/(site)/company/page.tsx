import type { Metadata } from 'next';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { BUSINESS } from '@/lib/seo';

export const metadata: Metadata = {
  title: '運営会社',
  description: 'CLAFTの運営会社「キープオン株式会社」について。',
  alternates: { canonical: '/company' },
};

const rows: { label: string; value: React.ReactNode }[] = [
  { label: '会社名', value: 'キープオン株式会社' },
  { label: '代表者', value: '川原保' },
  {
    label: '所在地',
    value: `〒${BUSINESS.postalCode} 大阪府八尾市${BUSINESS.streetAddress}`,
  },
  { label: '電話番号', value: '090-8652-4333' },
  { label: 'メールアドレス', value: BUSINESS.email },
  {
    label: '事業内容',
    value:
      '中高生向けキャリアスクール「CLAFT」の運営、ロボットプログラミング教室（エジソンアカデミー本校）の運営、対話型学びプログラム「Yononaka」の提供。',
  },
];

export default function CompanyPage() {
  return (
    <MobileContainer>
      <Section>
        <h1 className="heading-xl mb-6">運営会社</h1>

        <div className="space-y-0 body-base text-ink-700">
          {rows.map((row) => (
            <div key={row.label} className="py-4 border-b border-black/[0.08]">
              <p className="font-bold text-ink-900 mb-1">{row.label}</p>
              <p>{row.value}</p>
            </div>
          ))}
        </div>
      </Section>
    </MobileContainer>
  );
}
