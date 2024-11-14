import { userApi } from '../config/instance';
import { queryOptions } from '@tanstack/react-query';
import { keys } from './keys';

const { getProfileImage } = userApi.사용자프로필이미지Api;

export const queries = {
  profileImage: (userReferenceId: string) =>
    queryOptions({
      queryKey: keys.profileImage(userReferenceId),
      queryFn: () => getProfileImage(userReferenceId),
    }),
};
