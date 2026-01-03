// ========================================
// スクール生データ
// ========================================

export type StudentProfile = {
  slug: string; // URL用の識別子（英数字のみ）
  name: string;
  grade: string;
  avatarEmoji: string;
  shortIntro: string; // 一覧ページで表示する簡単な紹介文
  likes: string[];
  character: string;
  motivationEnv: string;
  futureVision: {
    text: string;
    subText?: string;
  };
  currentActions: {
    title: string;
    description: string;
    emoji: string;
    tags?: string[];
  }[];
  timeline: {
    date: string;
    title: string;
    description?: string;
    isCurrent?: boolean;
  }[];
};

// ========================================
// スクール生データ（ここを編集してください）
// ========================================

export const studentsData: StudentProfile[] = [
  // はると さんのデータ
{
  slug: 'haruto',
  name: 'はると',
  grade: '高校2年生',
  avatarEmoji: '🎮',
  shortIntro: 'ゲーム開発とモノづくり、デジタルとアナログの両面から「つくること」を探究する',
  likes: ['ゲーム制作（RPG）', '農業', '演劇', '創作物'],
  character: '「個人的実行力」が高い、現代のニュートン',
  motivationEnv: '必要な機材が揃い、誘惑（私物ゲーム）が視界に入らず、適度に静かな環境',
  futureVision: {
    text: 'ゲームを単独で作りたい。ゲーム会社に入ってどういう技術があるか見てみたい。',
    subText: '畑を持って農作物を作りたいし、テオヤンセンのような創作物も作ってみたい。',
  },
  currentActions: [
    {
      title: 'セーブ&ロードをギミックとしたゲーム',
      description: '物語、キャラクターデザインまで、自分の「好き」を詰め込んだ世界観を一人で構築中',
      emoji: '🎮',
      tags: ['Unity', 'ゲームデザイン', 'ストーリーテリング'],
    },
  ],
  timeline: [
    {
      date: '2018年1月',
      title: 'エジソンアカデミー入校',
      description: 'ロボットプログラミング教室でオリジナルロボット制作＆発表',
    },
    {
      date: '2021年8月',
      title: 'Yononaka参加',
      description: '初回のテーマ「生きるってなんだろう」から参加',
    },
    {
      date: '2024年1月',
      title: 'PBL(課題解決型学習)参加',
      description: 'ターボワープを使ってゲーム制作',
    },
    {
      date: '2025年6月',
      title: 'キャリアスクール「CLAFT」参加',
      description: 'プレイクラフトで「カードゲーム」の企画にかかわる',
    },
    {
      date: '2025年11月',
      title: 'なんでも展示会に参加',
      description: '3つのオリジナルゲームの制作と発表',
    },
    {
      date: '2026年1月',
      title: 'セーブ&ロードをギミックとしたゲーム',
      description: '物語、キャラクターデザインまで、自分の「好き」を詰め込んだ世界観を一人で構築中',
      isCurrent: true,
    },
  ],
},

// ひかる さんのデータ
{
  slug: 'hikaru',
  name: 'ひかる',
  grade: '高校1年生',
  avatarEmoji: '🏓',
  shortIntro: '卓球で全国出場を目指しながら、考え方の探究をしている',
  likes: ['卓球', '読書（ミステリー、心理・思考系）', 'ゲーム', 'アニメ'],
  character: '「決断力」が高い、現代の坂本龍馬',
  motivationEnv: '天気が晴れ、ストレスや苦手な人の干渉がない、「昨日できたことが今日もできる」状態',
  futureVision: {
    text: '今の自分の延長線上にある「改良版の自分」を目指す',
    subText: '学んだ知識と思考力を武器に、経済的にも精神的にも自立した大人になる',
  },
  currentActions: [
    {
      title: '卓球×思考の言語化',
      description: '卓球を通じて得た「考え方」や「継続の重要性」を整理して発表',
      emoji: '🏓',
      tags: ['卓球', '思考力', '戦略', 'アスリート思考'],
    },
  ],
  timeline: [
    {
      date: '2023年1月',
      title: 'エジソンアカデミー入校',
      description: 'ロボットプログラミング教室でオリジナルロボット制作＆発表',
    },
    {
      date: '2024年5月',
      title: 'Yononaka参加',
      description: '自分カイシャづくり体験での「お金と役割」から参加',
    },
    {
      date: '2025年6月',
      title: 'キャリアスクール「CLAFT」参加',
      description: 'プレイクラフトで「カードゲーム」の企画にかかわる',
    },
    {
      date: '2026年1月',
      title: '卓球×思考の言語化',
      description: '卓球を通じて得た「考え方」や「継続の重要性」を整理して発表',
      isCurrent: true,
    },
  ],
},

// けんしろう さんのデータ
{
  slug: 'kenshiro',
  name: 'けんしろう',
  grade: '中学3年生',
  avatarEmoji: '🎮',
  shortIntro: '勉強にゲームの要素を加えれば楽しめるのではないか？と探究中',
  likes: ['ゲーム', '野球', '英語', '会話'],
  character: '「共感・傾聴力」が高い、現代の聖徳太子',
  motivationEnv: '目標の先に「自分へのご褒美」が設定されている環境',
  futureVision: {
    text: '英語で世界中の人々と対話する仕事をしたい',
    subText: '単なる知識習得ではなく、英会話のようにリアルな対話に挑戦中',
  },
  currentActions: [
    {
      title: '英語とゲームを掛け合わせた敵を倒しながら進むゲーム制作',
      description: '勉強のやる気が起きなくてもゲームならできるのかという問いを立てている',
      emoji: '🎮',
      tags: ['英語', 'バトルゲーム', 'ゲーミフィケーション'],
    },
  ],
  timeline: [
    {
      date: '2019年1月',
      title: 'エジソンアカデミー入校',
      description: '低学年向け「自考力キッズ(パズル×ロボット×プログラミング)」カリキュラム受講',
    },
    {
      date: '2021年1月',
      title: 'エジソンアカデミー参加',
      description: 'ロボットプログラミング教室でオリジナルロボット制作＆発表',
    },
    {
      date: '2024年5月',
      title: 'Yononaka参加',
      description: '自分カイシャづくり体験での「お金と役割」から参加',
    },
    {
      date: '2024年8月',
      title: 'PBL参加',
      description: '障害とはどういうものか、スライドを使ってプレゼン発表',
    },
    {
      date: '2025年1月',
      title: 'PBL2回目',
      description: '宇宙を舞台にしたシューティングゲームの制作',
    },
    {
      date: '2025年6月',
      title: 'キャリアスクール「CLAFT」参加',
      description: 'プレイクラフトで「紙ひこうき大会」の企画にかかわる',
    },
    {
      date: '2026年1月',
      title: '英語とゲームを掛け合わせた敵を倒しながら進むゲーム制作',
      description: '勉強のやる気が起きなくてもゲームならできるのかという問いを立てている',
      isCurrent: true,
    },
  ],
},
  {
    slug: 'shoichiro',
    name: 'しょういちろう',
    grade: 'CLAFT代表',
    avatarEmoji: '🦦',
    shortIntro: '1児の父。教育ファシリテーター、キャリアコンサルタント、AIエンジニア',
    likes: ['人やAIと会話する', '音楽を聴く', 'コーヒーを飲む'],
    character: '話を聴くこと、訊いて想いを引き出すタイプ',
    motivationEnv: '静かな場所でパソコンとモニター2台がある環境',
    futureVision: {
      text: '正解がひとつでないお題に対して、意見をつくってつたえる機会を広げる',
      subText: 'まさにCLAFTのようなコミュニティが大切であることを証明したい',
    },
    currentActions: [
      {
        title: 'CLAFTアプリを開発中',
        description: 'React + TypeScriptで、楽しく学べるアプリを制作中。デザインから実装まで全部自分で。',
        emoji: '💻',
        tags: ['React', 'TypeScript', 'UI/UX'],
      },
    ],
    timeline: [
      {
        date: '2022年1月',
        title: 'Yononakaスタート',
        description: '正解がひとつでないお題に対して、意見をつくってつたえるオンラインワーク',
      },
      {
        date: '2023年12月',
        title: 'センサーズ誕生',
        description: 'ロボットプログラミングで使用するロボットセンサー基本5種のキャラクター',
      },
      {
        date: '2024年1月',
        title: 'PBL(課題解決型学習)スタート',
        description: '好きや疑問を起点に、自分で学びを進めて、制作＆発表する探究学習',
      },
      {
        date: '2024年7月',
        title: 'キャリアコンサルタントを取得',
        description: '国家資格のキャリアに関する専門家',
      },
      {
        date: '2025年6月',
        title: 'キャリアスクール「CLAFT」スタート',
        description: '自分のキャリアを自分の手で創るスクール',
        isCurrent: true,
      },
    ],
  },
];

// ========================================
// ヘルパー関数
// ========================================

/**
 * slugから生徒データを取得
 */
export function getStudentBySlug(slug: string): StudentProfile | undefined {
  return studentsData.find((student) => student.slug === slug);
}

/**
 * 全生徒のslugリストを取得（動的ルート生成用）
 */
export function getAllStudentSlugs(): string[] {
  return studentsData.map((student) => student.slug);
}
