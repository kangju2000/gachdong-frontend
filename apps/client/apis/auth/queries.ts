import { authApi } from '../config/instance';
import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';
import { keys } from './keys';

const { getProfile } = authApi.인증인가Api;

export const authQueries: Record<Exclude<keyof typeof keys, 'all'>, { queryKey: QueryKey; queryFn: QueryFunction }> = {
  profile: {
    queryKey: keys.profile(),
    queryFn: getProfile,
  },
};

export const useProfile = () => {
  return useQuery({
    ...authQueries.profile,
    retry: false,
    throwOnError: false,
  });
};
