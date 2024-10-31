import { CLUBS, RECRUIT_LIST } from '@/constants/data';
import { keys } from './keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubApi } from '../config/instance';

export function useClubs() {
  return { data: CLUBS };
}

export function useRecruitments() {
  return { data: RECRUIT_LIST };
}

export const _useClubs = () => {
  return useSuspenseQuery({
    queryKey: keys.lists(),
    queryFn: () => clubApi.동아리Api.getClubs(),
  });
};

export const useClub = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: keys.detail(clubId),
    queryFn: () => clubApi.동아리Api.getClub(clubId),
  });
};

export const useClubContactInfo = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: keys.contactInfo(clubId),
    queryFn: () => clubApi.동아리Api.getClubContactInfo(clubId),
  });
};

export const useClubActivities = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: keys.activities(clubId),
    queryFn: () => clubApi.동아리Api.getClubActivities(clubId),
  });
};
