import { applicationApi } from '../config/instance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { keys } from './keys';

export const useFormInfoAdmin = (formId: number) => {
  return useSuspenseQuery({
    queryKey: keys.detail(formId),
    queryFn: () => applicationApi.지원Api.getFormInfoAdmin(formId),
  });
};

export const useFormInfoUser = (formId: number) => {
  return useSuspenseQuery({
    queryKey: keys.detail(formId),
    queryFn: () => applicationApi.지원Api.getFormInfoUser(formId),
  });
};

export const useApplicationHistory = () => {
  return useSuspenseQuery({
    queryKey: keys.lists(),
    queryFn: () => applicationApi.지원Api.getaApplicationHistory(),
  });
};
