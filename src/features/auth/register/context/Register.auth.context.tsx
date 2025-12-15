"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  RegisterAuthActions,
  RegisterAuthInitialStateType,
} from "./Register.auth.types";
import {
  RegisterAuthStepReducers,
  RegisterAuthOrganizationReducers,
  RegisterAuthFormReducers,
  RegisterAuthOTPFormReducers,
} from "./Register.auth.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: RegisterAuthInitialStateType = {
  step: {
    name: "organization",
    // step: "password_setup",
  },
  organization: {
    data: [],
    pagination: {
      current: PAGINATION.NUMBER,
      last: null,
    },
    loading: {
      is_fetching: true,
      is_loading: true,
    },
  },
  form: {
    organization: null,
    email: {
      value: "",
      error: null,
    },
    company_code: {
      value: "",
      error: null,
    },
    error: null,
  },
  otp_form: {
    otp: {
      value: "",
    },
    error: null,
  },
};

const RegisterAuthContext = createContext<{
  state: RegisterAuthInitialStateType;
  dispatch: Dispatch<RegisterAuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { step, organization, form, otp_form }: RegisterAuthInitialStateType,
  action: RegisterAuthActions
) => ({
  step: RegisterAuthStepReducers(step, action),
  organization: RegisterAuthOrganizationReducers(organization, action),
  form: RegisterAuthFormReducers(form, action),
  otp_form: RegisterAuthOTPFormReducers(otp_form, action),
});

const RegisterAuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <RegisterAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RegisterAuthContext.Provider>
  );
};

export { RegisterAuthProvider, RegisterAuthContext };
