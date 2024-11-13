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

const { hasAuthority, isValidRecruitment, getAuthorizedClubs } = clubApi.admin동아리Api;

export const queries = {
  /**
   * PUBLIC
   */

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
  recruitmentsDetail: (clubId: number, recruitmentId: number) =>
    queryOptions({
      queryKey: keys.recruitmentsDetail(clubId, recruitmentId),
      queryFn: () => getClubRecruitment(clubId, recruitmentId),
    }),
  activities: (clubId: number) =>
    queryOptions({
      queryKey: keys.activities(clubId),
      queryFn: () => getClubActivities(clubId),
    }),

  /**
   * ADMIN
   */

  hasAuthority: (clubId: number) =>
    queryOptions({
      queryKey: keys.hasAuthority(clubId),
      queryFn: () => hasAuthority({ clubId: clubId.toString() }),
    }),
  isValidRecruitment: (recruitmentId: number) =>
    queryOptions({
      queryKey: keys.isValidRecruitment(recruitmentId),
      queryFn: () => isValidRecruitment({ recruitmentId: recruitmentId.toString() }),
    }),
  authorizedClubs: () =>
    queryOptions({
      queryKey: keys.authorizedClubs(),
      queryFn: getAuthorizedClubs,
    }),
};
