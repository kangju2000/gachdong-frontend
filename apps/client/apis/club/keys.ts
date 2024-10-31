export const keys = {
  all: ['clubs'] as const,
  lists: () => [...keys.all, 'list'] as const,
  detail: (clubId: string) => [...keys.all, 'detail', clubId] as const,
  contactInfo: (clubId: string) => [...keys.all, 'contactInfo', clubId] as const,
  activities: (clubId: string) => [...keys.all, 'activities', clubId] as const,
};
