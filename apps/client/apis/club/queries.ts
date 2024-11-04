import { RECRUIT_LIST } from '@/constants/data';
import { keys } from './keys';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { clubApi } from '../config/instance';

const { getClubs, getClub, getClubContactInfo, getClubActivities } = clubApi.public동아리Api;

export const queries = {
  clubs: () =>
    queryOptions({
      queryKey: keys.clubs(),
      queryFn: getClubs,
    }),
  club: (clubId: number) =>
    queryOptions({
      queryKey: keys.club(clubId),
      queryFn: () => getClub(clubId),
    }),
  contactInfo: (clubId: number) =>
    queryOptions({
      queryKey: keys.contactInfo(clubId),
      queryFn: () => getClubContactInfo(clubId),
    }),
  recruitments: () =>
    queryOptions({
      queryKey: keys.recruitments(),
      queryFn: () => {
        const result = {
          results: RECRUIT_LIST.slice(0, 3),
        };
        return new Promise<typeof result>(resolve => resolve(result));
      },
    }),
  activities: (clubId: number) =>
    queryOptions({
      queryKey: keys.activities(clubId),
      queryFn: () => getClubActivities(clubId),
    }),
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
