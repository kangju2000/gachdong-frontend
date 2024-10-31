export const keys = {
  all: ['auth'],
  login: () => [...keys.all, 'login'] as const,
} as const;
