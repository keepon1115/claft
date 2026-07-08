import type { Work } from './types';

/** 発表者コメントを1つの文章にまとめる（値がある項目だけを段落として連結） */
export function buildAuthorComment(work: Work): string {
  return [
    work.author_intro,
    work.story_made,
    work.story_devised,
    work.story_struggled,
    work.story_learned,
  ]
    .filter((s): s is string => !!s && s.trim().length > 0)
    .join('\n\n');
}
