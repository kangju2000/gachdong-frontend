import { useMutation } from '@tanstack/react-query';
import { clubApi } from '../config/instance';

export const useCreateClub = () => {
  return useMutation({
    mutationFn: clubApi.동아리Api.createClub,
  });
};
