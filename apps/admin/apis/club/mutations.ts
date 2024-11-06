'use client';

import { useMutation } from '@tanstack/react-query';
import { clubApi } from '../config/instance';
import { toast } from '@/hooks/use-toast';

export const useCreateClub = () => {
  return useMutation({
    mutationFn: clubApi.동아리Api.createClub,
    onSuccess: () => {
      toast({
        title: '동아리 생성이 완료되었습니다.',
      });
    },
  });
};
