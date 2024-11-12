export const keys = {
  all: ['user'] as const,
  profileImage: () => [...keys.all, 'profileImage'] as const,
};
