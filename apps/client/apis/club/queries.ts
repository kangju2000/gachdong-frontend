import { RECRUIT_LIST } from '@/constants/data';
import { keys } from './keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubApi } from '../config/instance';

export function useRecruitments() {
  return useSuspenseQuery({
    queryKey: keys.recruitments(),
    queryFn: () => {
      const result = {
        results: RECRUIT_LIST.slice(0, 3),
      };
      return new Promise<typeof result>(resolve => resolve(result));
    },
  });
}

export const useClubs = () => {
  return useSuspenseQuery({
    queryKey: keys.lists(),
    queryFn: clubApi.public동아리Api.getClubs,
  });
};

export const useClub = (clubId: number) => {
  return useSuspenseQuery({
    queryKey: keys.detail(clubId),
    queryFn: () => clubApi.public동아리Api.getClub(clubId),
  });
};

export const useClubContactInfo = (clubId: number) => {
  return useSuspenseQuery({
    queryKey: keys.contactInfo(clubId),
    queryFn: () => {
      // clubApi.동아리Api.getClubContactInfo(clubId);
      const result = [
        {
          contactMethod: 'gmail',
          contactValue: 'gachdong@gmail.com',
        },
      ];
      return new Promise<typeof result>(resolve => resolve(result));
    },
  });
};

export const useClubActivities = (clubId: number) => {
  return useSuspenseQuery({
    queryKey: keys.activities(clubId),
    queryFn: () => {
      // clubApi.동아리Api.getClubActivities(clubId);
      const result = [
        {
          title: '2024년 봄 캠프',
          date: '2024-04-12',
          description: '봄 캠프에서 다양한 활동을 했습니다.',
        },
      ];
      return new Promise<typeof result>(resolve => resolve(result));
    },
  });
};
