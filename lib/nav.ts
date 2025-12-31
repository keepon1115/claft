export type NavItem = { 
  label: string; 
  href: string;
  variant?: 'cream' | 'pink' | 'default';
  external?: boolean;
  children?: { label: string; href: string; external?: boolean }[];
  alwaysOpen?: boolean;
};

export const navItems: NavItem[] = [
  { 
    label: '「CLAFT」という希望', 
    href: '/claft-hope',
    variant: 'cream'
  },
  { 
    label: 'メンバーのストーリー', 
    href: '/student-story',
    variant: 'cream'
  },
  { 
    label: 'PBL(課題解決型学習)', 
    href: '/pbl'
  },
  { 
    label: 'Yononaka(対話ワーク)', 
    href: '/yononaka'
  },
  { 
    label: 'ミライクラフト', 
    href: '/futurecraft',
    alwaysOpen: true,
    children: [
      { label: 'PLAY CLAFT', href: '/play-claft' },
      { label: 'STEAMキャンプ', href: '/asia-steam-camp' }
    ]
  },
  { 
    label: 'ジブンクラフト', 
    href: '/jibun-craft'
  },
  { 
    label: 'コース・料金', 
    href: '/courses',
    alwaysOpen: true,
    children: [
      { label: 'マイクラSDGs', href: '/minecraft' },
      { label: 'ロボットプログラミング', href: 'https://www.keeponlearning.fun/online', external: true }
    ]
  },
  { 
    label: '無料体験/問合せ', 
    href: '/contact'
  },
  { 
    label: 'フリースクール', 
    href: '#',
    alwaysOpen: true,
    children: [
      { label: 'キープオンラボ', href: 'https://keeponlabo.com/', external: true },
      { label: 'エジソンアカデミー本校', href: 'https://www.keeponlearning.fun/', external: true }
    ]
  }
];
