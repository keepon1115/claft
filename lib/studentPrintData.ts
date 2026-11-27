// 印刷ページだけが使うデータ。HP(/student-story)の data/student-stories.json とは別に持つ。
// 更新: npm run import:stories -- <CSVフォルダ> --print-only（docs/MEMBER_STORIES_SHEET_RULES.md）
import prints from '@/data/student-print.json';
import type { StudentStory } from '@/lib/studentData';

export type PrintStory = Pick<
  StudentStory,
  'slug' | 'name' | 'grade' | 'avatarEmoji' | 'iconUrl' | 'shortIntro' | 'likes' | 'character' | 'strengths'
>;

/** シートで「公開」の人（印刷の対象） */
export const printStories = prints as PrintStory[];
