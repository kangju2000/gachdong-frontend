import { ChangeApplicationPayload, CreateApplicationPayload } from '@gachdong/api/application';
import { applicationApi } from '../config/instance';
import { useMutation } from '@tanstack/react-query';

const { changeApplication, createApplication, deleteApplication } = applicationApi.지원Api사용자;

// TODO
export const useChangeApplication = () => {
  return useMutation({
    mutationFn: ({ applyId, data }: { applyId: number; data: ChangeApplicationPayload }) =>
      changeApplication(applyId, data),
  });
};

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: ({ applyId, data }: { applyId: number; data: CreateApplicationPayload }) =>
      createApplication(applyId, data),
  });
};

// TODO
export const useDeleteApplication = () => {
  return useMutation({
    mutationFn: (applyId: number) => deleteApplication(applyId),
  });
};
