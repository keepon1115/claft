import type { Metadata } from 'next';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { BUSINESS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'CLAFT（運営：キープオン株式会社）が取得する個人情報の取り扱いについて。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <MobileContainer>
      <Section>
        <h1 className="heading-xl mb-6">プライバシーポリシー</h1>

        <div className="space-y-8 body-base text-ink-700">
          <p>
            キープオン株式会社（以下「当社」といいます）は、CLAFT（以下「本サービス」といいます）における
            お客さまの個人情報を、以下の方針に基づき適切に取り扱います。
          </p>

          <section>
            <h2 className="heading-md mb-3">1. 取得する情報</h2>
            <p>本サービスでは、無料体験・個別相談のお申し込み等にあたり、以下の情報を取得します。</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>保護者さまのお名前・お子さまのお名前</li>
              <li>メールアドレス・お電話番号</li>
              <li>お子さまの学年・ご希望コース</li>
              <li>体験のご希望日時・お問い合わせ内容</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-md mb-3">2. 利用目的</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>無料体験・個別相談のご案内、日程調整のご連絡</li>
              <li>本サービスに関するお問い合わせへの回答</li>
              <li>入会後のサービス提供・運営連絡</li>
            </ul>
            <p className="mt-2">取得した情報を、上記目的以外に利用することはありません。</p>
          </section>

          <section>
            <h2 className="heading-md mb-3">3. 第三者提供・業務委託</h2>
            <p>
              お問い合わせフォームの送信処理には、外部サービス「FormSubmit」を利用しています。
              送信内容は当社の受信メールアドレスに転送され、上記利用目的の範囲でのみ使用します。
              法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="heading-md mb-3">4. アクセス解析・Cookie</h2>
            <p>
              本サービスでは、サイト改善のためGoogle Analytics 4（GA4）を利用しています。GA4は
              Cookieを用いてアクセス状況を収集しますが、個人を特定する情報は含まれません。詳細は
              Googleのプライバシーポリシーをご確認ください。ブラウザの設定によりCookieを無効化できます。
            </p>
          </section>

          <section>
            <h2 className="heading-md mb-3">5. 保管期間・開示等の請求</h2>
            <p>
              個人情報は、利用目的の達成に必要な期間に限り保管します。ご本人からの開示・訂正・削除の
              ご請求は、下記お問い合わせ先までご連絡ください。確認のうえ、速やかに対応いたします。
            </p>
          </section>

          <section>
            <h2 className="heading-md mb-3">お問い合わせ先</h2>
            <p>
              キープオン株式会社<br />
              メール：{BUSINESS.email}
            </p>
          </section>

          <p className="text-ink-500 text-sm">制定日：2026年7月10日</p>
        </div>
      </Section>
    </MobileContainer>
  );
}
