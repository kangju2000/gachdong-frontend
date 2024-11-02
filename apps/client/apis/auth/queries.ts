import { authApi } from '../config/instance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { keys } from './keys';

const { getProfile } = authApi.인증인가Api;

export const useProfile = () => {
  return useSuspenseQuery({
    queryKey: keys.profile(),
    queryFn: getProfile,
  });
};
