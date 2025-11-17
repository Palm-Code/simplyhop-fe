"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  AccountUpdateSupportActions,
  AccountUpdateSupportInitialStateType,
} from "./AccountUpdate.support.types";
import {
  AccountUpdateSupportDeactivateConfirmationReducers,
  AccountUpdateSupportDeactivateNotificationReducers,
  AccountUpdateSupportDeactivateReducers,
  AccountUpdateSupportFormReducers,
  AccountUpdateSupportNotificationReducers,
} from "./AccountUpdate.support.reducers";

const initialState: AccountUpdateSupportInitialStateType = {
  form: {
    first_name: {
      value: "",
      error: null,
    },
    last_name: {
      value: "",
      error: null,
    },
    city: {
      value: "",
      error: null,
    },
    phonenumber: {
      value: "",
      error: null,
    },
    about_me: {
      value: "",
      error: null,
    },
    gender: {
      selected: null,
      error: null,
    },
    pictures: {
      files: [],
    },
  },
  notification: {
    is_open: false,
  },
  deactivate: {
    is_open: false,
  },
  deactivate_confirmation: {
    is_open: false,
    form: {
      password: {
        value: "",
      },
    },
  },
  deactivate_notification: {
    is_open: false,
  },
};

const AccountUpdateSupportContext = createContext<{
  state: AccountUpdateSupportInitialStateType;
  dispatch: Dispatch<AccountUpdateSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    form,
    notification,
    deactivate,
    deactivate_confirmation,
    deactivate_notification,
  }: AccountUpdateSupportInitialStateType,
  action: AccountUpdateSupportActions
) => ({
  form: AccountUpdateSupportFormReducers(form, action),
  notification: AccountUpdateSupportNotificationReducers(notification, action),
  deactivate: AccountUpdateSupportDeactivateReducers(deactivate, action),
  deactivate_confirmation: AccountUpdateSupportDeactivateConfirmationReducers(
    deactivate_confirmation,
    action
  ),
  deactivate_notification: AccountUpdateSupportDeactivateNotificationReducers(
    deactivate_notification,
    action
  ),
});

const AccountUpdateSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AccountUpdateSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AccountUpdateSupportContext.Provider>
  );
};

export { AccountUpdateSupportProvider, AccountUpdateSupportContext };
