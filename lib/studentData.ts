// ========================================
// スクール生データ
// メンバーは data/student-stories.json（npm run import:stories で更新）。
// しょういちろう(CLAFT代表)だけはExcelに入れず、ここに手書きで持つ。
// ========================================
import stories from '@/data/student-stories.json';

export type StoryEvent = { date: string; category?: string; title: string; description?: string; isCurrent?: boolean };
export type LikesSnapshot = { date: string; likes: string };
export type StudentStory = {
  slug: string; name: string; grade: string; avatarEmoji: string; shortIntro: string;
  likes: string[]; character?: string; strengths?: string; motivationEnv?: string;
  futureVision?: { text: string; subText?: string };
  goalThisYear?: string;
  currentActions: { title: string; description: string; emoji: string; tags?: string[] }[];
  quote?: string; laterConnection?: string; visitorQuestion?: string;
  exhibitVideoUrl?: string; updatedAt?: string;
  interestTags: string[];
  likesHistory: LikesSnapshot[];
  timeline: StoryEvent[];
};
/** 旧名（既存の参照用） */
export type StudentProfile = StudentStory;

// 'YYYY-MM' → '2026年10月'、'YYYY' → '2026年'。形式が違えばそのまま返す
export function formatYearMonth(d: string): string {
  const m = d.match(/^(\d{4})-(\d{1,2})$/);
  if (m) return `${m[1]}年${Number(m[2])}月`;
  return /^\d{4}$/.test(d) ? `${d}年` : d;
}

const founder: StudentStory = {
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
  interestTags: [],
  likesHistory: [],
};

/** Excel由来のメンバー（印刷ページの対象） */
export const memberStories = stories as StudentStory[];

export const studentsData: StudentStory[] = [...memberStories, founder];

export function getStudentBySlug(slug: string): StudentStory | undefined {
  return studentsData.find((s) => s.slug === slug);
}

export function getAllStudentSlugs(): string[] {
  return studentsData.map((s) => s.slug);
}
