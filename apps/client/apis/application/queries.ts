import { applicationApi } from '../config/instance';
import { queryOptions } from '@tanstack/react-query';
import { keys } from './keys';

const { getFormInfoUser, getApplicationHistory } = applicationApi.지원Api사용자;

export const queries = {
  formInfoUser: (formId: number) =>
    queryOptions({
      queryKey: keys.formInfoUser(formId),
      queryFn: () => getFormInfoUser(formId),
    }),
  applicationHistory: () =>
    queryOptions({
      queryKey: keys.formHistory(),
      queryFn: () => getApplicationHistory(),
    }),
};
