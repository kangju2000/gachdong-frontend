export interface SignupState {
  form: {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    verificationCode: string;
  };
  ui: {
    showPassword: boolean;
    showConfirmPassword: boolean;
  };
  verification: {
    isSent: boolean;
    isVerified: boolean;
    isLoading: boolean;
    error: string | null;
  };
}

export type SignupAction =
  | { type: 'SET_FIELD'; field: keyof SignupState['form']; value: string }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY'; field: 'showPassword' | 'showConfirmPassword' }
  | { type: 'SET_VERIFICATION_SENT' }
  | { type: 'SET_VERIFIED' }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'RESET_FORM' };
