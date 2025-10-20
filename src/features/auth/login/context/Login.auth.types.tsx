import { FormError } from "@/core/utils/form";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface LoginAuthInitialStateType {
  step: LoginAuthStep;
  form: LoginAuthForm;
  otp_form: LoginAuthOTPForm;
}

// State Collection Types consist of:
export interface LoginAuthStep {
  name: "email" | "otp";
}
export interface LoginAuthForm {
  email: {
    value: string;
    error: FormError;
  };
  error: null | {
    code: string;
  };
}

export interface LoginAuthOTPForm {
  otp: {
    value: string;
  };
  error: null | {
    code: string;
  };
}

export enum LoginAuthActionEnum {
  // Step
  SetStepData = "SetStepData",
  // Form
  SetFormData = "SetFormData",
  // OTPForm
  SetOTPFormData = "SetOTPFormData",
}

// Action Collection Types
export type LoginAuthActions =
  | LoginAuthStepActions
  | LoginAuthFormActions
  | LoginAuthOTPFormActions;

// Action Collection Types consist of:
// Step
type LoginAuthStepPayload = {
  [LoginAuthActionEnum.SetStepData]: LoginAuthStep;
};

export type LoginAuthStepActions =
  ActionMap<LoginAuthStepPayload>[keyof ActionMap<LoginAuthStepPayload>];

// Form
type LoginAuthFormPayload = {
  [LoginAuthActionEnum.SetFormData]: LoginAuthForm;
};

export type LoginAuthFormActions =
  ActionMap<LoginAuthFormPayload>[keyof ActionMap<LoginAuthFormPayload>];

// OTPForm
type LoginAuthOTPFormPayload = {
  [LoginAuthActionEnum.SetOTPFormData]: LoginAuthOTPForm;
};

export type LoginAuthOTPFormActions =
  ActionMap<LoginAuthOTPFormPayload>[keyof ActionMap<LoginAuthOTPFormPayload>];
