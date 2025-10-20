import {
  LoginAuthActionEnum,
  LoginAuthActions,
  LoginAuthForm,
  LoginAuthOTPForm,
  LoginAuthStep,
} from "./Login.auth.types";

// Step
export const LoginAuthStepReducers = (
  state: LoginAuthStep,
  action: LoginAuthActions
) => {
  switch (action.type) {
    case LoginAuthActionEnum.SetStepData:
      return action.payload;

    default:
      return state;
  }
};

// Form
export const LoginAuthFormReducers = (
  state: LoginAuthForm,
  action: LoginAuthActions
) => {
  switch (action.type) {
    case LoginAuthActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};

// OTPForm
export const LoginAuthOTPFormReducers = (
  state: LoginAuthOTPForm,
  action: LoginAuthActions
) => {
  switch (action.type) {
    case LoginAuthActionEnum.SetOTPFormData:
      return action.payload;

    default:
      return state;
  }
};
