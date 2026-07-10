import type { Metadata } from 'next';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { BUSINESS } from '@/lib/seo';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: 'CLAFT（運営：キープオン株式会社）の特定商取引法に基づく表記。',
  alternates: { canonical: '/tokushoho' },
};

const rows: { label: string; value: React.ReactNode }[] = [
  { label: '販売事業者', value: 'キープオン株式会社' },
  { label: '運営統括責任者', value: '川原保' },
  {
    label: '所在地',
    value: `〒${BUSINESS.postalCode} 大阪府八尾市${BUSINESS.streetAddress}`,
  },
  { label: '電話番号', value: '090-8652-4333（お問い合わせはLINE・メールを推奨しています）' },
  { label: 'メールアドレス', value: BUSINESS.email },
  {
    label: '販売価格',
    value: (
      <>
        各コースの月額料金は{' '}
        <a href="/courses" className="text-[var(--brand)] no-underline hover:underline">
          コース・料金ページ
        </a>{' '}
        に記載のとおりです。
      </>
    ),
  },
  {
    label: '料金以外に必要な費用',
    value: 'コースにより教材費等が別途必要な場合があります。詳細は各コースページに記載します。',
  },
  {
    label: 'お支払い方法',
    value: 'クレジットカード・PayPay・口座振替に対応しています。',
  },
  {
    label: 'お支払い時期',
    value: '月初のお支払いとなります。',
  },
  {
    label: 'サービス提供時期',
    value: 'お申し込み・体験後、ご案内する開始日よりサービスを提供します。',
  },
  {
    label: '返品・キャンセルについて',
    value:
      'オンラインで提供する学習サービスの性質上、返品はお受けできません。ご入会後の解約は月単位で可能です。詳しくはFAQをご覧ください。',
  },
  {
    label: '動作環境',
    value: 'インターネットに接続されたパソコンまたはタブレット。コースにより推奨環境が異なります。',
  },
];

export default function TokushohoPage() {
  return (
    <MobileContainer>
      <Section>
        <h1 className="heading-xl mb-6">特定商取引法に基づく表記</h1>

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
