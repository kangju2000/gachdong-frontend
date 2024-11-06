'use client';

import { useMutation } from '@tanstack/react-query';
import { clubApi } from '../config/instance';
import { toast } from '@/hooks/use-toast';

const { createClub, createClubActivity, createClubContactInfo } = clubApi.admin동아리Api;

export const useCreateClub = () => {
  return useMutation({
    mutationFn: createClub,
    onSuccess: () => {
      toast({
        title: '동아리 생성이 완료되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '동아리 생성에 실패하였습니다.',
      });
    },
  });
};

export const useCreateClubActivity = () => {
  return useMutation({
    mutationFn: createClubActivity,
    onSuccess: () => {
      toast({
        title: '동아리 활동 생성이 완료되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '동아리 활동 생성에 실패하였습니다.',
      });
    },
  });
};

export const useCreateClubContactInfo = () => {
  return useMutation({
    mutationFn: createClubContactInfo,
    onSuccess: () => {
      toast({
        title: '동아리 연락처 생성이 완료되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '동아리 연락처 생성에 실패하였습니다.',
      });
    },
  });
};
