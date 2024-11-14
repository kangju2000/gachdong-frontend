import { ToChangeApplicationStatus, ToCreateApplicationFormDTO } from '@gachdong/api/application';
import { applicationApi } from '../config/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clubKeys } from '../club';
import { useParams } from 'next/navigation';

const {
  changeApplicationForm,
  createApplicationForm,
  deleteApplicationForm,
  changeApplicationStatus,
  getClubApplicationList,
  getFormInfoAdmin,
} = applicationApi.지원Api관리자;

export const useChangeApplicationForm = () => {
  return useMutation({
    mutationFn: ({ formId, data }: { formId: number; data: ToCreateApplicationFormDTO }) =>
      changeApplicationForm(formId, data),
  });
};

export const useCreateApplicationForm = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  return useMutation({
    mutationFn: (data: ToCreateApplicationFormDTO) => createApplicationForm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clubKeys.recruitmentByClub(Number(params.id)) });
    },
  });
};

export const useDeleteApplicationForm = () => {
  return useMutation({
    mutationFn: (formId: number) => deleteApplicationForm(formId),
  });
};

export const useGetFormInfoAdmin = () => {
  return useMutation({
    mutationFn: (formId: number) => getFormInfoAdmin(formId),
  });
};

export const useChangeApplicationStatus = () => {
  return useMutation({
    mutationFn: (data: ToChangeApplicationStatus) => changeApplicationStatus(data),
  });
};

export const useGetClubApplicationList = () => {
  return useMutation({
    mutationFn: (applyId: number) => getClubApplicationList(applyId),
  });
};
