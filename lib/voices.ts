// 保護者の声・実績数字の単一ソース。
// Phase 3（オーナーから実素材が届くまで）は空のままにする。ダミー文言は絶対に入れない。

export type ParentVoice = {
  id: string;
  parentLabel: string;
  quote: string;
  before?: string;
  after?: string;
};

export const parentVoices: ParentVoice[] = [];

export type CommunityStat = {
  label: string;
  value: string;
};

export const communityStats: CommunityStat[] = [];
