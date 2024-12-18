'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../config/instance';
import { useRouter } from 'next/navigation';
import { keys } from './keys';
import { toast } from '@/hooks/use-toast';
import { removeTokens, setTokens } from '@/lib/auth/actions';
import { getClientToken } from '@/lib/auth/cookies';
import { LoginRequest } from '@gachdong/api/auth';

const {
  login,
  completeRegistration,
  sendVerificationCode,
  resetPassword,
  verifyCode,
  sendRegistrationVerificationCode,
} = authApi.public사용자인증인가Api;
const { logout, changePassword, deleteAccount } = authApi.사용자인증인가Api;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await login(credentials);
      await setTokens({
        accessToken: response.accessToken ?? '',
        refreshToken: response.refreshToken ?? '',
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: '로그인에 성공하였습니다.',
      });

      queryClient.invalidateQueries({ queryKey: keys.all });
      router.replace('/');
    },
    onError: () => {
      toast({
        title: '로그인에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      logout({
        headers: {
          'Refresh-Token': `Bearer ${getClientToken().refreshToken!}`,
        },
      }),
    onSuccess: () => {
      toast({
        title: '로그아웃이 완료되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '로그아웃에 실패하였습니다.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      router.replace('/login');
      queryClient.invalidateQueries({ queryKey: keys.all });
      queryClient.resetQueries({ queryKey: keys.profile() });
      removeTokens();
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: completeRegistration,
    onSuccess: () => {
      toast({
        title: '회원가입이 완료되었습니다.',
      });
      router.replace('/login');
    },
    onError: () => {
      toast({
        title: '회원가입에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      toast({
        title: '인증 코드가 전송되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '인증 코드 전송에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useSendRegistrationVerificationCode = () => {
  return useMutation({
    mutationFn: sendRegistrationVerificationCode,
    onError: async err => {
      toast({
        title: (await err.response.text()) ?? '인증 코드 전송에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: '비밀번호 재설정이 완료되었습니다.',
      });
      router.replace('/login');
    },
    onError: async err => {
      toast({
        title: (await err.response.text()) ?? '비밀번호 재설정에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: '비밀번호 변경이 완료되었습니다.',
      });
    },
    onError: async err => {
      toast({
        title: (await err.response.text()) ?? '비밀번호 변경에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      toast({
        title: '회원탈퇴가 완료되었습니다.',
      });

      removeTokens();
      queryClient.invalidateQueries({ queryKey: keys.all });
      queryClient.resetQueries({ queryKey: keys.profile() });
      router.replace('/login');
    },
    onError: () => {
      toast({
        title: '회원탈퇴에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      toast({
        title: '인증이 완료되었습니다.',
      });
    },
    onError: () => {
      toast({
        title: '인증에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};
