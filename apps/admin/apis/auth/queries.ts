import { authApi } from '../config/instance';
import { useQuery } from '@tanstack/react-query';
import { keys } from './keys';

const { getProfile } = authApi.인증인가Api;

export const authQueries = {
  profile: {
    queryKey: keys.profile(),
    queryFn: getProfile,
  },
} as const;

export const useProfile = () => {
  return useQuery({
    ...authQueries.profile,
    retry: false,
    throwOnError: false,
  });
};
