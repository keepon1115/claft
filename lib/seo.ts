// SEO/GEO の単一の真実（Single Source of Truth）。
// 正規ドメイン・組織情報・既定メタデータをここに集約し、
// sitemap / robots / layout / 各ページ metadata から参照する。
// 過去に github.io・vercel.app が混在していたため、参照を必ずここへ寄せる。

import type { Metadata } from 'next';

// 正規ドメイン。環境変数で上書き可能だが、既定は本番の正規URL。
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claft.keeponlearning.fun'
).replace(/\/$/, '');

export const SITE_NAME = 'CLAFT';

// 全ページ・SNS・AI回答で一致させる説明文（エンティティの一貫性）。
export const SITE_DESCRIPTION =
  '探究×対話×実践で“自分の軸”をつくる、八尾の対面教室と全国どこからでも学べるオンラインのハイブリッドスクール。小3〜中3対象。';

export const SITE_LOCALE = 'ja_JP';

// 既定のOGP画像（公開アセット）。ページ側で上書き可。
export const DEFAULT_OG_IMAGE = '/assets/index/top_hero.png';
export const ORG_LOGO = '/assets/images/common/logo.png';

// 八尾の対面教室（LocalBusiness / 連絡先用）。詳細は Phase 2 で拡充。
export const ORG_AREA = '大阪府八尾市';

// 絶対URLを組み立てる。
export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// ルートの既定メタデータ。各ページは title/description/alternates を上書きする。
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CLAFT — 自分の手で創るキャリア',
    template: '%s | CLAFT',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: 'CLAFT — 自分の手で創るキャリア',
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'CLAFT' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLAFT — 自分の手で創るキャリア',
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  // ※ Google Search Console の所有権確認メタタグは app/layout.tsx の <head> で
  //   render 時に env を読んで明示出力している（ビルド時 env 評価の取りこぼしを避けるため）。
};

// Organization + WebSite の JSON-LD（AIが「CLAFTとは何者か」を確定するための一次情報）。
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_NAME,
  alternateName: 'クラフト',
  url: SITE_URL,
  logo: absoluteUrl(ORG_LOGO),
  description: SITE_DESCRIPTION,
  areaServed: '日本',
  address: {
    '@type': 'PostalAddress',
    addressRegion: '大阪府',
    addressLocality: '八尾市',
    addressCountry: 'JP',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ja',
};

// 八尾の対面拠点（LocalBusiness）。
// CLAFT はこの「ロボットプログラミング教室 キープオン（エジソンアカデミー本校）」の
// 取り組みの一つ。今後オンラインフリースクール化するが、対面拠点情報はローカルSEOの要なので明記する。
// ★geo（緯度経度）だけ未記入。判明したら入れるとGoogleマップ露出がさらに上がる。
export const BUSINESS = {
  locationName: 'ロボットプログラミング教室 キープオン（エジソンアカデミー本校）',
  streetAddress: '北亀井町3丁目2-21 株式会社アーテック内',
  postalCode: '581-0066',
  telephone: '+81-90-8652-4333',
  email: 's.kawahara@keeponlearning.fun',
  priceRange: '¥¥',
  // schema.org の openingHours 形式（定休日: 日・火・木）。
  openingHours: [
    'Mo 18:30-20:00',
    'We 16:00-20:00',
    'Fr 18:30-20:00',
    'Sa 10:30-17:00',
  ],
  // 例: { latitude: 34.62, longitude: 135.60 }
  geo: null as { latitude: number; longitude: number } | null,
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#localbusiness`,
  name: BUSINESS.locationName,
  alternateName: `${SITE_NAME}（CLAFT）`,
  url: SITE_URL,
  logo: absoluteUrl(ORG_LOGO),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: SITE_DESCRIPTION,
  email: BUSINESS.email,
  ...(BUSINESS.telephone ? { telephone: BUSINESS.telephone } : {}),
  priceRange: BUSINESS.priceRange,
  areaServed: '日本',
  address: {
    '@type': 'PostalAddress',
    ...(BUSINESS.postalCode ? { postalCode: BUSINESS.postalCode } : {}),
    addressRegion: '大阪府',
    addressLocality: '八尾市',
    ...(BUSINESS.streetAddress ? { streetAddress: BUSINESS.streetAddress } : {}),
    addressCountry: 'JP',
  },
  ...(BUSINESS.geo
    ? { geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo } }
    : {}),
  ...(BUSINESS.openingHours.length
    ? { openingHours: BUSINESS.openingHours }
    : {}),
};
