import { useMutation } from '@tanstack/react-query';
import { authApi } from '../config/instance';
import { useRouter } from 'next/navigation';
import { CookieManager } from '@/lib/auth/cookies';

const { login, completeRegistration, sendVerificationCode, resetPassword, verifyCode } = authApi.public인증인가Api;
const { logout, changePassword, deleteAccount } = authApi.인증인가Api;

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: response => {
      // TODO: toast로 변경
      alert('로그인이 완료되었습니다');

      CookieManager.setToken({ accessToken: response.token ?? '' });
      router.replace('/');
    },
    onError: () => {
      // TODO: toast로 변경
      alert('로그인에 실패하였습니다.');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      CookieManager.removeToken();
      router.replace('/');
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: completeRegistration,
    onSuccess: () => {
      // TODO: toast로 변경
      alert('회원가입이 완료되었습니다.');
      router.replace('/login');
    },
    onError: () => {
      // TODO: toast로 변경
      alert('회원가입에 실패하였습니다.');
    },
  });
};

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      // TODO: toast로 변경
      alert('인증 코드가 전송되었습니다.');
    },
    onError: () => {
      // TODO: toast로 변경
      alert('인증 코드 전송에 실패하였습니다.');
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // TODO: toast로 변경
      alert('비밀번호 재설정이 완료되었습니다.');
    },
    onError: () => {
      // TODO: toast로 변경
      alert('비밀번호 재설정에 실패하였습니다.');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      // TODO: toast로 변경
      alert('비밀번호 변경이 완료되었습니다.');
    },
    onError: () => {
      // TODO: toast로 변경
      alert('비밀번호 변경에 실패하였습니다.');
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      // TODO: toast로 변경
      alert('회원탈퇴가 완료되었습니다.');
    },
    onError: () => {
      // TODO: toast로 변경
      alert('회원탈퇴에 실패하였습니다.');
    },
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
  });
};
