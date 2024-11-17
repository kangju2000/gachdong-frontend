export const keys = {
  all: ['clubs'] as const,

  // Club 관련 기본 키들
  lists: {
    all: () => [...keys.all, 'list'] as const,
    authorized: () => [...keys.lists.all(), 'authorized'] as const,
  },

  // 특정 클럽 관련 키들
  detail: {
    root: (clubId: number) => [...keys.all, 'detail', clubId] as const,
    info: (clubId: number) => [...keys.detail.root(clubId), 'info'] as const,
    contact: (clubId: number) => [...keys.detail.root(clubId), 'contact'] as const,
    activities: (clubId: number) => [...keys.detail.root(clubId), 'activities'] as const,
  },

  // 모집 관련 키들
  recruitment: {
    all: () => [...keys.all, 'recruitments'] as const,
    byClub: (clubId: number) => [...keys.recruitment.all(), clubId] as const,
    detail: (clubId: number, recruitmentId: number) => [...keys.recruitment.byClub(clubId), recruitmentId] as const,
  },

  // 권한 관련 키들
  auth: {
    hasAuthority: (clubId: number) => [...keys.all, 'auth', 'hasAuthority', clubId] as const,
    isValidRecruitment: (recruitmentId: number) => [...keys.all, 'auth', 'isValidRecruitment', recruitmentId] as const,
  },
};
