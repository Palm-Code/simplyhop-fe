"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  AccountSupportActions,
  AccountSupportInitialStateType,
} from "./Account.support.types";
import {
  AccountSupportDeactivateConfirmationReducers,
  AccountSupportDeactivateNotificationReducers,
  AccountSupportDeactivateReducers,
  AccountSupportInformationReducers,
} from "./Account.support.reducers";

const initialState: AccountSupportInitialStateType = {
  information: {
    email: "kevin@simplyhop.com",
    first_name: "Kevin",
    last_name: "Jordi",
    phonenumber: "+49 123456789",
    city: "Berlin",
    about_me:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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

const AccountSupportContext = createContext<{
  state: AccountSupportInitialStateType;
  dispatch: Dispatch<AccountSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    information,
    deactivate,
    deactivate_confirmation,
    deactivate_notification,
  }: AccountSupportInitialStateType,
  action: AccountSupportActions
) => ({
  information: AccountSupportInformationReducers(information, action),
  deactivate: AccountSupportDeactivateReducers(deactivate, action),
  deactivate_confirmation: AccountSupportDeactivateConfirmationReducers(
    deactivate_confirmation,
    action
  ),
  deactivate_notification: AccountSupportDeactivateNotificationReducers(
    deactivate_notification,
    action
  ),
});

const AccountSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AccountSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AccountSupportContext.Provider>
  );
};

export { AccountSupportProvider, AccountSupportContext };
