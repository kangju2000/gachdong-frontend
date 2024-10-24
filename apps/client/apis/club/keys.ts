export const keys = {
  all: ['clubs'] as const,
  lists: () => [...keys.all, 'list'] as const,
  detail: (clubName: string) => [...keys.all, 'detail', clubName] as const,
};
