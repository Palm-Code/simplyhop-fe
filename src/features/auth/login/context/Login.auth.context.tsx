"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  LoginAuthActions,
  LoginAuthInitialStateType,
} from "./Login.auth.types";
import {
  LoginAuthFormReducers,
  LoginAuthOTPFormReducers,
  LoginAuthStepReducers,
} from "./Login.auth.reducers";

const initialState: LoginAuthInitialStateType = {
  step: {
    name: "otp",
  },
  form: {
    email: {
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

const LoginAuthContext = createContext<{
  state: LoginAuthInitialStateType;
  dispatch: Dispatch<LoginAuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { step, form, otp_form }: LoginAuthInitialStateType,
  action: LoginAuthActions
) => ({
  step: LoginAuthStepReducers(step, action),
  form: LoginAuthFormReducers(form, action),
  otp_form: LoginAuthOTPFormReducers(otp_form, action),
});

const LoginAuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <LoginAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LoginAuthContext.Provider>
  );
};

export { LoginAuthProvider, LoginAuthContext };
