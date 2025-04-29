"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  SettingsSupportActions,
  SettingsSupportInitialStateType,
} from "./Settings.support.types";
import {
  SettingsSupportChangePasswordReducers,
  SettingsSupportDeactivateConfirmationReducers,
  SettingsSupportDeactivateNotificationReducers,
  SettingsSupportDeactivateReducers,
} from "./Settings.support.reducers";

const initialState: SettingsSupportInitialStateType = {
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
  change_password: {
    is_open: false,
    form: {
      actual_password: {
        value: "",
        error: null,
      },
      new_password: {
        value: "",
        error: null,
      },
      confirm_new_password: {
        value: "",
        error: null,
      },
      tnc: {
        checked: false,
      },
    },
  },
};

const SettingsSupportContext = createContext<{
  state: SettingsSupportInitialStateType;
  dispatch: Dispatch<SettingsSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    deactivate,
    deactivate_confirmation,
    deactivate_notification,
    change_password,
  }: SettingsSupportInitialStateType,
  action: SettingsSupportActions
) => ({
  deactivate: SettingsSupportDeactivateReducers(deactivate, action),
  deactivate_confirmation: SettingsSupportDeactivateConfirmationReducers(
    deactivate_confirmation,
    action
  ),
  deactivate_notification: SettingsSupportDeactivateNotificationReducers(
    deactivate_notification,
    action
  ),
  change_password: SettingsSupportChangePasswordReducers(
    change_password,
    action
  ),
});

const SettingsSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SettingsSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SettingsSupportContext.Provider>
  );
};

export { SettingsSupportProvider, SettingsSupportContext };
