// トップの簡単診断（3問→コース提案）の質問・配点の単一ソース。
// コース情報自体は持たず、lib/courses.ts の id を指すだけ（文言の二重管理をしない）。

export type CourseId = 'minecraft-sdgs' | 'english-steam' | 'career' | 'hello-kiwi';

export type GradeAnswer = 'g1-2' | 'g3-4' | 'g5-6' | 'jhs' | 'hs';
export type InterestAnswer = 'game' | 'craft' | 'english' | 'future' | 'exploring';
export type ConcernAnswer = 'mismatch' | 'strength' | 'anxiety' | 'opinion';

export type DiagnosisAnswers = {
  grade: GradeAnswer;
  interest: InterestAnswer;
  concern: ConcernAnswer;
};

type Question<T extends string> = {
  id: keyof DiagnosisAnswers;
  label: string;
  options: { value: T; label: string }[];
};

export const GRADE_QUESTION: Question<GradeAnswer> = {
  id: 'grade',
  label: 'お子さまの学年は？',
  options: [
    { value: 'g1-2', label: '小1〜2' },
    { value: 'g3-4', label: '小3〜4' },
    { value: 'g5-6', label: '小5〜6' },
    { value: 'jhs', label: '中学生' },
    { value: 'hs', label: '高校生' },
  ],
};

export const INTEREST_QUESTION: Question<InterestAnswer> = {
  id: 'interest',
  label: 'お子さまが夢中なことは？',
  options: [
    { value: 'game', label: 'ゲーム・マイクラ' },
    { value: 'craft', label: 'ものづくり・ロボット' },
    { value: 'english', label: '英語・海外' },
    { value: 'future', label: '将来や社会の話' },
    { value: 'exploring', label: 'まだ探し中' },
  ],
};

export const CONCERN_QUESTION: Question<ConcernAnswer> = {
  id: 'concern',
  label: 'いちばん気になっていることは？',
  options: [
    { value: 'mismatch', label: '学校の勉強が合わない' },
    { value: 'strength', label: '好き・得意をもっと伸ばしたい' },
    { value: 'anxiety', label: '将来が少し不安' },
    { value: 'opinion', label: '自分の意見を言える子になってほしい' },
  ],
};

type ScoreMap = Partial<Record<CourseId, number>>;

const GRADE_SCORES: Record<GradeAnswer, ScoreMap> = {
  'g1-2': {},
  'g3-4': { 'minecraft-sdgs': 1, 'english-steam': 1, 'hello-kiwi': 1 },
  'g5-6': { 'minecraft-sdgs': 1, 'english-steam': 1, 'hello-kiwi': 1 },
  jhs: { career: 2 },
  hs: { career: 3 },
};

const INTEREST_SCORES: Record<InterestAnswer, ScoreMap> = {
  game: { 'minecraft-sdgs': 3 },
  craft: { 'minecraft-sdgs': 3, 'english-steam': 1 },
  english: { 'english-steam': 3, 'hello-kiwi': 2 },
  future: { career: 3 },
  exploring: { 'minecraft-sdgs': 1, career: 2 },
};

const CONCERN_SCORES: Record<ConcernAnswer, ScoreMap> = {
  mismatch: { 'minecraft-sdgs': 2, career: 1 },
  strength: { 'minecraft-sdgs': 1, 'english-steam': 1, career: 1 },
  anxiety: { career: 3 },
  opinion: { 'minecraft-sdgs': 1, 'english-steam': 2, career: 2 },
};

// 同点タイブレーク優先順
const TIEBREAK_ORDER: CourseId[] = ['minecraft-sdgs', 'career', 'english-steam', 'hello-kiwi'];

export type DiagnosisResult =
  | { kind: 'guidance' }
  | { kind: 'course'; courseId: CourseId; runnerUpId: CourseId | null };

export function diagnose(answers: DiagnosisAnswers): DiagnosisResult {
  // 小1〜2はコース対象外（lib/courses.ts の target は小3〜）のため個別案内に振る。
  if (answers.grade === 'g1-2') return { kind: 'guidance' };

  const scores = new Map<CourseId, number>(TIEBREAK_ORDER.map((id) => [id, 0]));
  for (const map of [GRADE_SCORES[answers.grade], INTEREST_SCORES[answers.interest], CONCERN_SCORES[answers.concern]]) {
    for (const [id, point] of Object.entries(map) as [CourseId, number][]) {
      scores.set(id, (scores.get(id) ?? 0) + point);
    }
  }

  const ranked = TIEBREAK_ORDER.map((id) => ({ id, score: scores.get(id) ?? 0 })).sort((a, b) => b.score - a.score);

  return {
    kind: 'course',
    courseId: ranked[0].id,
    runnerUpId: ranked[1] && ranked[1].score > 0 ? ranked[1].id : null,
  };
}
