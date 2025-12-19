import { Organization } from "@/core/models/data";
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
export interface RegisterAuthInitialStateType {
  step: RegisterAuthStep;
  organization: RegisterAuthOrganization;
  form: RegisterAuthForm;
  otp_form: RegisterAuthOTPForm;
}

// State Collection Types consist of:
export interface RegisterAuthStep {
  name: "organization" | "form" | "otp";
}

export interface RegisterAuthOrganization {
  data: Organization[];
  pagination: {
    current: number;
    last: null | number;
  };
  loading: {
    is_fetching: boolean;
    is_loading: boolean;
  };
}
export interface RegisterAuthForm {
  organization: Organization | null;
  email: {
    value: string;
    error: FormError;
  };
  company_code: {
    value: string;
    error: FormError;
  };
  error: null | {
    code: string;
  };
}

export interface RegisterAuthOTPForm {
  otp: {
    value: string;
  };
  error: null | {
    code: string;
  };
}

export enum RegisterAuthActionEnum {
  // Step
  SetStepData = "SetStepData",
  // Organization
  SetOrganizationData = "SetOrganizationData",
  SetOrganizationDataData = "SetOrganizationDataData",
  SetOrganizationPaginationData = "SetOrganizationPaginationData",
  SetOrganizationLoadingData = "SetOrganizationLoadingData",
  // Form
  SetFormData = "SetFormData",
  // OTPForm
  SetOTPFormData = "SetOTPFormData",
}

// Action Collection Types
export type RegisterAuthActions =
  | RegisterAuthStepActions
  | RegisterAuthOrganizationActions
  | RegisterAuthFormActions
  | RegisterAuthOTPFormActions;

// Action Collection Types consist of:
// Step
type RegisterAuthStepPayload = {
  [RegisterAuthActionEnum.SetStepData]: RegisterAuthStep;
};

export type RegisterAuthStepActions =
  ActionMap<RegisterAuthStepPayload>[keyof ActionMap<RegisterAuthStepPayload>];

// Organization
type RegisterAuthOrganizationPayload = {
  [RegisterAuthActionEnum.SetOrganizationData]: RegisterAuthOrganization;
  [RegisterAuthActionEnum.SetOrganizationDataData]: RegisterAuthOrganization["data"];
  [RegisterAuthActionEnum.SetOrganizationPaginationData]: RegisterAuthOrganization["pagination"];
  [RegisterAuthActionEnum.SetOrganizationLoadingData]: RegisterAuthOrganization["loading"];
};

export type RegisterAuthOrganizationActions =
  ActionMap<RegisterAuthOrganizationPayload>[keyof ActionMap<RegisterAuthOrganizationPayload>];

// Form
type RegisterAuthFormPayload = {
  [RegisterAuthActionEnum.SetFormData]: RegisterAuthForm;
};

export type RegisterAuthFormActions =
  ActionMap<RegisterAuthFormPayload>[keyof ActionMap<RegisterAuthFormPayload>];

// OTPForm
type RegisterAuthOTPFormPayload = {
  [RegisterAuthActionEnum.SetOTPFormData]: RegisterAuthOTPForm;
};

export type RegisterAuthOTPFormActions =
  ActionMap<RegisterAuthOTPFormPayload>[keyof ActionMap<RegisterAuthOTPFormPayload>];
