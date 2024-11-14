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
      queryClient.invalidateQueries({ queryKey: clubKeys.recruitmentByClub(Number(clubId)) });
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
    onSuccess: (_, { applicationId, status }) => {
      queryClient.invalidateQueries({ queryKey: clubKeys.recruitmentsDetail(clubId, applicationId) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.clubApplicationList(clubId) });
    },
  });
};
