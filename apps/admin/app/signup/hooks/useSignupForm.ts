import { useReducer, useCallback } from 'react';
import { useRegister, useSendVerificationCode, useVerifyCode } from '@/apis/auth';
import { signupReducer, initialState } from '../reducers/signupReducer';
import { toast } from '@/hooks/use-toast';

export function useSignupForm() {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  const { mutateAsync: sendVerificationCode } = useSendVerificationCode();
  const { mutateAsync: verifyCode } = useVerifyCode();
  const { mutateAsync: completeRegistration } = useRegister();

  const updateField = useCallback((field: keyof typeof state.form, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const togglePasswordVisibility = useCallback((field: 'showPassword' | 'showConfirmPassword') => {
    dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY', field });
  }, []);

  const handleSendVerification = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      await sendVerificationCode({ email: `${state.form.username}@gachon.ac.kr` });
      dispatch({ type: 'SET_VERIFICATION_SENT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: '인증 코드 전송에 실패했습니다.' });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  }, [state.form.username, sendVerificationCode]);

  const handleVerify = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      await verifyCode({
        email: `${state.form.username}@gachon.ac.kr`,
        code: state.form.verificationCode,
      });
      dispatch({ type: 'SET_VERIFIED' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: '인증에 실패했습니다.' });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  }, [state.form.username, state.form.verificationCode, verifyCode]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (state.form.password !== state.form.confirmPassword) {
        toast({
          title: '비밀번호가 일치하지 않습니다.',
          variant: 'destructive',
        });
        return;
      }

      try {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        await completeRegistration({
          name: state.form.name,
          email: `${state.form.username}@gachon.ac.kr`,
          password: state.form.password,
          role: 'ADMIN',
        });

        dispatch({ type: 'RESET_FORM' });
      } finally {
        dispatch({ type: 'SET_LOADING', isLoading: false });
      }
    },
    [state.form, completeRegistration]
  );

  return {
    state,
    updateField,
    togglePasswordVisibility,
    handleSendVerification,
    handleVerify,
    handleSubmit,
  };
}
