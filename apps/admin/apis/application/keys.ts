export const keys = {
  all: ['application'],
  clubApplicationList: (clubId: number) => [...keys.all, 'clubApplicationList', clubId] as const,
  formInfoAdmin: (formId: number) => [...keys.all, 'formInfoAdmin', formId] as const,
} as const;
