import { authApi } from '../config/instance';
import { queryOptions } from '@tanstack/react-query';
import { keys } from './keys';

const { getProfile } = authApi.인증인가Api;

export const queries = {
  profile: () =>
    queryOptions({
      queryKey: keys.profile(),
      queryFn: getProfile,
      retry: false,
      throwOnError: false,
    }),
};
