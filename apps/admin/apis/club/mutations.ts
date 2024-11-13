'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clubApi } from '../config/instance';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { keys } from './keys';

const { createClub, createClubActivity, createClubContactInfo, createClubRecruitment } = clubApi.admin동아리Api;

export const useCreateClub = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createClub,
    onSuccess: club => {
      toast({
        title: '동아리가 추가되었습니다.',
      });
      queryClient.invalidateQueries({ queryKey: keys.clubs() });
      router.replace(`/dashboard/${club.clubId}`);
    },
    onError: () => {
      toast({
        title: '동아리 추가에 실패하였습니다.',
      });
    },
  });
};

export const useCreateClubActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClubActivity,
    onSuccess: ({ clubId }) => {
      queryClient.invalidateQueries({ queryKey: keys.activities(clubId) });
      toast({
        title: '동아리 활동이 추가되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '동아리 활동 추가에 실패하였습니다.',
      });
    },
  });
};

export const useCreateClubContactInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClubContactInfo,
    onSuccess: ({ clubId }) => {
      queryClient.invalidateQueries({ queryKey: keys.contactInfo(clubId) });
      toast({
        title: '동아리 연락처가 추가되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '동아리 연락처 추가에 실패하였습니다.',
      });
    },
  });
};

export const useCreateClubRecruitment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClubRecruitment,
    onSuccess: () => {
      // TODO: 리턴으로 recruitmentId 생기면 recruitmentsDetail 쿼리 invalidate 처리하기
      queryClient.invalidateQueries({ queryKey: keys.recruitments() });
      toast({
        title: '동아리 채용 공고가 추가되었습니다.',
      });
    },
  });
};
