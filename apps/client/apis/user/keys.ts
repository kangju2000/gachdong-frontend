export const keys = {
  all: ['user'] as const,
  profileImage: (userReferenceId: string) => [...keys.all, 'profileImage', userReferenceId] as const,
};
