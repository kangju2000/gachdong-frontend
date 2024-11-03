export const keys = {
  all: ['clubs'] as const,
  lists: () => [...keys.all, 'list'] as const,
  recruitments: () => [...keys.all, 'recruitments'] as const,
  detail: (clubId: number) => [...keys.all, 'detail', clubId] as const,
  contactInfo: (clubId: number) => [...keys.all, 'contactInfo', clubId] as const,
  activities: (clubId: number) => [...keys.all, 'activities', clubId] as const,
};
