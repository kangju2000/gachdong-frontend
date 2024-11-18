'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../config/instance';
import { authKeys } from '../auth';

const { uploadProfileImage, deleteProfileImage } = userApi.사용자프로필이미지Api;

// export const useUpdateProfileImage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateProfileImage,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: authKeys.profile() });
//     },
//   });
// };

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};
