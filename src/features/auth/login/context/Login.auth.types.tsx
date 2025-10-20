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
  form: LoginAuthForm;
}

// State Collection Types consist of:
export interface LoginAuthForm {
  email: {
    value: string;
    error: FormError;
  };
  error: null | {
    code: string;
  };
}

export enum LoginAuthActionEnum {
  // Form
  SetFormData = "SetFormData",
}

// Action Collection Types
export type LoginAuthActions = LoginAuthFormActions;

// Action Collection Types consist of:
// Form
type LoginAuthFormPayload = {
  [LoginAuthActionEnum.SetFormData]: LoginAuthForm;
};

export type LoginAuthFormActions =
  ActionMap<LoginAuthFormPayload>[keyof ActionMap<LoginAuthFormPayload>];
