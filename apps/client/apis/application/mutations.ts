import {
  ChangeApplicationPayload,
  CreateApplicationPayload,
  ToCreateApplicationFormDTO,
} from '../__generated__/application/swagger';
import { applicationApi } from '../config/instance';
import { useMutation } from '@tanstack/react-query';

export const useChangeApplication = () => {
  return useMutation({
    mutationFn: ({ applyId, data }: { applyId: number; data: ChangeApplicationPayload }) =>
      applicationApi.지원Api.changeApplication(applyId, data),
  });
};

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: ({ applyId, data }: { applyId: number; data: CreateApplicationPayload }) =>
      applicationApi.지원Api.createApplication(applyId, data),
  });
};

export const useChangeApplicationForm = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ToCreateApplicationFormDTO }) => applicationApi.지원Api.changeApplicationForm(data),
  });
};

export const useCreateApplicationForm = () => {
  return useMutation({
    mutationFn: (data: ToCreateApplicationFormDTO) => applicationApi.지원Api.createApplicationForm(data),
  });
};

export const useDeleteForm = () => {
  return useMutation({
    mutationFn: (formId: number) => applicationApi.지원Api.deleteForm(formId),
  });
};

export const useDeleteApplication = () => {
  return useMutation({
    mutationFn: (applyId: number) => applicationApi.지원Api.deleteApplication(applyId),
  });
};
