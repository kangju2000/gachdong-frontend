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

export const useClub = (clubName: string) => {
  return useSuspenseQuery({
    queryKey: keys.detail(clubName),
    queryFn: () => clubApi.동아리Api.getClub(clubName),
  });
};
