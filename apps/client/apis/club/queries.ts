import { CLUBS, RECRUIT_LIST } from '@/constants/data';
import { keys } from './keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubApi } from '../config/instance';
import { ArrayResponseClubSummaryResponse, ClubResponse } from '../__generated__/club/swagger';

// export function useClubs() {
//   return { data: CLUBS };
// }

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
    queryFn: () => {
      // clubApi.동아리Api.getClubs();
      const result = {
        results: [
          {
            clubId: 1,
            clubName: '가츠동',
            category: 'SPORTS',
            shortDescription: '가츠동은 최고의 동아리입니다.',
            clubImageUrl:
              'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
            recruitingStatus: true,
          },
          {
            clubId: 2,
            clubName: '가츠동2',
            category: 'SPORTS',
            shortDescription: '가츠동2는 최고의 동아리입니다.',
            clubImageUrl:
              'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
            recruitingStatus: false,
          },
          {
            clubId: 3,
            clubName: '가츠동3',
            category: 'SPORTS',
            shortDescription: '가츠동3는 최고의 동아리입니다.',
            clubImageUrl:
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
            recruitingStatus: true,
          },
        ],
      };

      return new Promise<typeof result>(resolve => resolve(result));
    },
  });
};

export const useClub = (clubId: number) => {
  return useSuspenseQuery({
    queryKey: keys.detail(clubId),
    queryFn: () => {
      // clubApi.동아리Api.getClub(clubId);
      const result = {
        clubId: 1,
        clubName: '가츠동',
        category: 'SPORTS',
        shortDescription: '가츠동은 최고의 동아리입니다.',
        clubImageUrl:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
        recruitingStatus: true,
        introduction: '가츠동은 다양한 활동을 하는 동아리입니다.',
        establishedAt: '2024-10-31T03:24:28.735Z',
        updatedAt: '2024-10-31T03:24:28.735Z',
      };
      return new Promise<typeof result>(resolve => resolve(result));
    },
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
