import {
  RegisterAuthActionEnum,
  RegisterAuthActions,
  RegisterAuthStep,
  RegisterAuthForm,
  RegisterAuthOTPForm,
  RegisterAuthOrganization,
} from "./Register.auth.types";

// Step
export const RegisterAuthStepReducers = (
  state: RegisterAuthStep,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetStepData:
      return action.payload;

    default:
      return state;
  }
};

// Organization
export const RegisterAuthOrganizationReducers = (
  state: RegisterAuthOrganization,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetOrganizationData:
      return action.payload;
    case RegisterAuthActionEnum.SetOrganizationDataData:
      return {
        ...state,
        data: action.payload,
      };
    case RegisterAuthActionEnum.SetOrganizationPaginationData:
      return {
        ...state,
        pagination: action.payload,
      };
    case RegisterAuthActionEnum.SetOrganizationLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Form
export const RegisterAuthFormReducers = (
  state: RegisterAuthForm,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};

// OTPForm
export const RegisterAuthOTPFormReducers = (
  state: RegisterAuthOTPForm,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetOTPFormData:
      return action.payload;

    default:
      return state;
  }
};
