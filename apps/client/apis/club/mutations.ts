import { useMutation } from '@tanstack/react-query';
import { clubApi } from '../config/instance';
import { CreateClubRequest } from '../__generated__/club/swagger';

// TODO: 어드민으로 이동
export const useCreateClub = () => {
  return useMutation({
    mutationFn: (data: CreateClubRequest) => clubApi.동아리Api.createClub(data),
  });
};
