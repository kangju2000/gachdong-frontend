export const keys = {
  all: ['auth'],
  profile: () => [...keys.all, 'profile'] as const,
} as const;
