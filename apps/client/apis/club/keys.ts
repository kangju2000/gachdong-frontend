export const keys = {
  all: ['clubs'] as const,
  clubs: () => [...keys.all, 'clubs'] as const,
  recruitments: () => [...keys.all, 'recruitments'] as const,
  recruitmentByClub: (clubId: number) => [...keys.all, 'recruitmentsByClub', clubId] as const,
  recruitmentsDetail: (recruitmentId: number) => [...keys.all, 'recruitments', recruitmentId] as const,
  club: (clubId: number) => [...keys.all, 'club', clubId] as const,
  contactInfo: (clubId: number) => [...keys.all, 'contactInfo', clubId] as const,
  activities: (clubId: number) => [...keys.all, 'activities', clubId] as const,
};
