export const CATEGORY_MAP = {
  ACADEMIC: '학술 · 사회',
  EXHIBITION: '전시 · 취미',
  SPORTS: '체육',
  PERFORMANCE: '공연',
  MUSIC: '음악',
  RELIGION: '종교',
  OTHER: '기타',
} as const;

export type Category = keyof typeof CATEGORY_MAP;
