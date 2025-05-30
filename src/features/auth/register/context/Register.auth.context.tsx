"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  RegisterAuthActions,
  RegisterAuthInitialStateType,
} from "./Register.auth.types";
import {
  RegisterAuthStateReducers,
  RegisterAuthGeneralReducers,
  RegisterAuthPasswordSetupReducers,
} from "./Register.auth.reducers";

const initialState: RegisterAuthInitialStateType = {
  state: {
    step: "general",
    // step: "password_setup",
  },
  general: {
    email: {
      value: "",
      error: null,
    },
  },
  password_setup: {
    email: {
      value: "",
    },
    password: {
      value: "",
      error: null,
    },
    confirm_password: {
      value: "",
      error: null,
    },
    tnc: {
      checked: false,
    },
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
  { state, general, password_setup }: RegisterAuthInitialStateType,
  action: RegisterAuthActions
) => ({
  state: RegisterAuthStateReducers(state, action),
  general: RegisterAuthGeneralReducers(general, action),
  password_setup: RegisterAuthPasswordSetupReducers(password_setup, action),
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
