export const keys = {
  all: ['application'],
  lists: () => [...keys.all, 'list'] as const,
  detail: (formId: number) => [...keys.all, 'detail', formId] as const,
} as const;
