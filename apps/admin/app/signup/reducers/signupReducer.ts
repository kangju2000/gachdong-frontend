import { SignupState, SignupAction } from '../types';

export const initialState: SignupState = {
  form: {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  },
  ui: {
    showPassword: false,
    showConfirmPassword: false,
  },
  verification: {
    isSent: false,
    isVerified: false,
    isLoading: false,
    error: null,
  },
};

export function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };

    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.field]: !state.ui[action.field],
        },
      };

    case 'SET_VERIFICATION_SENT':
      return {
        ...state,
        verification: {
          ...state.verification,
          isSent: true,
          error: null,
        },
      };

    case 'SET_VERIFIED':
      return {
        ...state,
        verification: {
          ...state.verification,
          isVerified: true,
          error: null,
        },
      };

    case 'SET_LOADING':
      return {
        ...state,
        verification: {
          ...state.verification,
          isLoading: action.isLoading,
        },
      };

    case 'SET_ERROR':
      return {
        ...state,
        verification: {
          ...state.verification,
          error: action.error,
        },
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}
