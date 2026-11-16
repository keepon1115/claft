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

// OGP の既定値。ページが独自の openGraph を書くとルートの既定（画像・サイト名）が
// まるごと置き換わるため、ページ側は { ...defaultOpenGraph, title, description } と広げて使う。
// url: './' は Next が「そのページ自身のURL」に解決する。
export const defaultOpenGraph: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  siteName: SITE_NAME,
  locale: SITE_LOCALE,
  url: './',
  images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'CLAFT' }],
};

// ルートの既定メタデータ。各ページは title/description を上書きする。
// ※ ページ側の title に「| CLAFT」は書かない（template が付ける。二重表記になる）。
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CLAFT — 自分の手で創るキャリア',
    template: '%s | CLAFT',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // './' は各ページ自身のパスに解決される（全ページが自分を canonical に指す）。
  alternates: { canonical: './' },
  openGraph: {
    ...defaultOpenGraph,
    title: 'CLAFT — 自分の手で創るキャリア',
    description: SITE_DESCRIPTION,
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

// 組織エンティティの @id。各ページの JSON-LD（provider / publisher 等）はこの @id を参照する。
export const ORG_ID = `${SITE_URL}/#organization`;
export const PLACE_ID = `${SITE_URL}/#classroom`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// 公式SNS（Footer と同じもの）。AI/検索が「同じ発信元」と判断する手がかり。
export const SOCIAL_LINKS = [
  'https://www.instagram.com/keepon.labo',
  'https://note.com/yononaka_career',
  'https://www.youtube.com/@CLAFT-keepon',
];

// 運営会社
export const OPERATOR_NAME = 'キープオン株式会社';

// ページ側の JSON-LD から組織を参照するときの短縮形（provider / publisher / author に使う）。
export const ORG_REF = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
};

// 組織＝CLAFT（ブランド）。名称は「CLAFT」に統一し、教室（場所）の名称とは混ぜない。
// 教室は下の classroomJsonLd（別ノード）で表し、location で関連づける。
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'クラフト',
  url: SITE_URL,
  logo: absoluteUrl(ORG_LOGO),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: SITE_DESCRIPTION,
  areaServed: '日本',
  sameAs: SOCIAL_LINKS,
  parentOrganization: { '@type': 'Organization', name: OPERATOR_NAME },
  location: { '@id': PLACE_ID },
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
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ja',
  publisher: { '@id': ORG_ID },
};

// パンくず（BreadcrumbList）。trail は「ホーム」の次から [表示名, パス] を並べる。
// 例: breadcrumbJsonLd([['Yononaka', '/yononaka'], ['団体向け', '/yononaka/kyoshitsu']])
export function breadcrumbJsonLd(trail: [name: string, path: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['ホーム', '/'] as [string, string], ...trail].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: path === '/' ? SITE_URL : absoluteUrl(path),
    })),
  };
}

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

// 八尾の教室（実在の場所）。名称は Googleマップ等と揃えるため教室の正式名のまま。
// CLAFT との関係は parentOrganization（→ CLAFT）で表す。
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': PLACE_ID,
  name: BUSINESS.locationName,
  description: `${SITE_NAME}の対面教室（${ORG_AREA}）。`,
  parentOrganization: { '@id': ORG_ID },
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  email: BUSINESS.email,
  ...(BUSINESS.telephone ? { telephone: BUSINESS.telephone } : {}),
  priceRange: BUSINESS.priceRange,
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
