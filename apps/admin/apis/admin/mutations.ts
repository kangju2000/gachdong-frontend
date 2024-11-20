'use client';

import { useMutation } from '@tanstack/react-query';
import { adminApi } from '../config/instance';

const { createInviteCode, registerInviteCode } = adminApi.관리자서비스Api;

export const useCreateInviteCode = () => {
  return useMutation({
    mutationFn: createInviteCode,
  });
};

export const useRegisterInviteCode = () => {
  return useMutation({
    mutationFn: registerInviteCode,
  });
};
