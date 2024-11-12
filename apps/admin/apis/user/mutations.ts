'use client';

import { useMutation } from '@tanstack/react-query';
import { userApi } from '../config/instance';

const { updateProfileImage, uploadProfileImage, deleteProfileImage } = userApi.사용자프로필이미지Api;

export const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: updateProfileImage,
  });
};

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: uploadProfileImage,
  });
};

export const useDeleteProfileImage = () => {
  return useMutation({
    mutationFn: deleteProfileImage,
  });
};
