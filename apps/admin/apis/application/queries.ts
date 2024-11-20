import { applicationApi } from '../config/instance';
import { queryOptions } from '@tanstack/react-query';
import { keys } from './keys';

const { getClubApplicationList, getFormInfoAdmin, getClubApplication, getClubApplicationFormList } =
  applicationApi.지원Api관리자;

export const queries = {
  clubApplicationList: (clubId: number) =>
    queryOptions({
      queryKey: keys.clubApplicationList(clubId),
      queryFn: () => getClubApplicationList(clubId),
      select: data => {
        return data.result!.toGetApplicationDTO ?? [];
      },
    }),
  clubApplication: (applicationId: number) =>
    queryOptions({
      queryKey: keys.clubApplication(applicationId),
      queryFn: () => getClubApplication(applicationId),
      select: data => ({
        ...data,
        result: {
          ...data.result,
        } as NonNullable<typeof data.result> & {
          status: 'SAVED' | `process${number}`;
          applicationBody: Record<string, any>;
        },
      }),
    }),
  clubApplicationFormList: (clubId: number) =>
    queryOptions({
      queryKey: keys.clubApplicationFormList(clubId),
      queryFn: () => getClubApplicationFormList(clubId),
    }),
  formInfoAdmin: (formId: number) =>
    queryOptions({
      queryKey: keys.formInfoAdmin(formId),
      queryFn: () => getFormInfoAdmin(formId),
      select: data => ({
        ...data,
        result: {
          ...data.result,
        } as NonNullable<typeof data.result> & {
          formBody: Record<`question${number}`, any>;
        },
      }),
    }),
};
