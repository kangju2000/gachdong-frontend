export const keys = {
  all: ['application'],
  formInfoAdmin: (formId: number) => [...keys.all, 'formInfoAdmin', formId] as const,
  formInfoUser: (formId: number) => [...keys.all, 'formInfoUser', formId] as const,
  formHistory: () => [...keys.all, 'formHistory'] as const,
} as const;
