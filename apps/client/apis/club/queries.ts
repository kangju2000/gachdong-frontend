import { keys } from './keys';
import { queryOptions, skipToken } from '@tanstack/react-query';
import { clubApi } from '../config/instance';

const { getClubs, getClub, getClubContactInfo, getClubActivities, getClubRecruitments, getClubsRecruitments } =
  clubApi.public동아리Api;

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
      queryFn: () => getClubsRecruitments(),
    }),
  recruitmentByClub: (clubId: number) =>
    queryOptions({
      queryKey: keys.recruitmentByClub(clubId),
      queryFn: () => getClubRecruitments(clubId),
    }),
  recruitmentsDetail: (recruitmentId: number) =>
    queryOptions({
      queryKey: keys.recruitmentsDetail(recruitmentId),
      // queryFn: () => getClubRecruitments(recruitmentId),
      queryFn: () => skipToken,
    }),
  activities: (clubId: number) =>
    queryOptions({
      queryKey: keys.activities(clubId),
      queryFn: () => getClubActivities(clubId),
    }),
};
