"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DashboardSupportActions,
  DashboardSupportInitialStateType,
} from "./Dashboard.support.types";
import { DashboardSupportInformationReducers } from "./Dashboard.support.reducers";

const initialState: DashboardSupportInitialStateType = {
  information: {
    email: "kevin@simplyhop.com",
    first_name: "Kevin",
    last_name: "Jordi",
    phonenumber: "+49 123456789",
    city: "Berlin",
    about_me:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};

const DashboardSupportContext = createContext<{
  state: DashboardSupportInitialStateType;
  dispatch: Dispatch<DashboardSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { information }: DashboardSupportInitialStateType,
  action: DashboardSupportActions
) => ({
  information: DashboardSupportInformationReducers(information, action),
});

const DashboardSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DashboardSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DashboardSupportContext.Provider>
  );
};

export { DashboardSupportProvider, DashboardSupportContext };
