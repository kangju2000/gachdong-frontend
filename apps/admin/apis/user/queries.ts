import { userApi } from '../config/instance';
import { queryOptions } from '@tanstack/react-query';
import { keys } from './keys';

const { getProfileImage } = userApi.사용자프로필이미지Api;

export const queries = {
  profileImage: () =>
    queryOptions({
      queryKey: keys.profileImage(),
      queryFn: getProfileImage,
    }),
};
