import { keys } from './keys';
import { queryOptions } from '@tanstack/react-query';
import { clubApi } from '../config/instance';

const {
  getClubs,
  getClub,
  getClubContactInfo,
  getClubActivities,
  getClubRecruitments,
  getClubsRecruitments,
  getClubRecruitment,
} = clubApi.public동아리Api;

export const queries = {
  clubs: () =>
    queryOptions({
      queryKey: keys.lists.all(),
      queryFn: getClubs,
    }),
  club: (clubId: number) =>
    queryOptions({
      queryKey: keys.detail.info(clubId),
      queryFn: () => getClub(clubId),
    }),
  contactInfo: (clubId: number) =>
    queryOptions({
      queryKey: keys.detail.contact(clubId),
      queryFn: () => getClubContactInfo(clubId),
    }),
  recruitments: () =>
    queryOptions({
      queryKey: keys.recruitment.all(),
      queryFn: () => getClubsRecruitments(),
    }),
  recruitmentByClub: (clubId: number) =>
    queryOptions({
      queryKey: keys.recruitment.byClub(clubId),
      queryFn: () => getClubRecruitments(clubId),
    }),
  recruitmentsDetail: (clubId: number, recruitmentId: number) =>
    queryOptions({
      queryKey: keys.recruitment.detail(clubId, recruitmentId),
      queryFn: () => getClubRecruitment(clubId, recruitmentId),
    }),
  activities: (clubId: number) =>
    queryOptions({
      queryKey: keys.detail.activities(clubId),
      queryFn: () => getClubActivities(clubId),
    }),
};
