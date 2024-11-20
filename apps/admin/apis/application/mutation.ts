import { ToChangeApplicationStatus, ToCreateApplicationFormDTO } from '@gachdong/api/application';
import { applicationApi } from '../config/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clubKeys } from '../club';
import { useParams } from 'next/navigation';
import { applicationKeys } from '.';

const { changeApplicationForm, createApplicationForm, deleteApplicationForm, changeApplicationStatus } =
  applicationApi.지원Api관리자;

export const useChangeApplicationForm = () => {
  return useMutation({
    mutationFn: ({ formId, data }: { formId: number; data: ToCreateApplicationFormDTO }) =>
      changeApplicationForm(formId, data),
  });
};

export const useCreateApplicationForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ToCreateApplicationFormDTO) => createApplicationForm(data),
    onSuccess: (_, { clubId }) => {
      queryClient.invalidateQueries({ queryKey: clubKeys.recruitment.byClub(Number(clubId)) });
    },
  });
};

export const useDeleteApplicationForm = () => {
  return useMutation({
    mutationFn: (formId: number) => deleteApplicationForm(formId),
  });
};

export const useChangeApplicationStatus = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const clubId = Number(params.id);

  return useMutation({
    mutationFn: (data: ToChangeApplicationStatus) => changeApplicationStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clubKeys.recruitment.detail(clubId, Number(params.recruitmentId)) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.clubApplicationList(Number(params.recruitmentId)) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.clubApplication(Number(params.recruitmentId)) });
    },
  });
};
