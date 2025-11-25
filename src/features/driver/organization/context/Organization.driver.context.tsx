"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  OrganizationDriverActions,
  OrganizationDriverInitialStateType,
} from "./Organization.driver.types";
import { OrganizationDriverProfileReducers } from "./Organization.driver.reducers";

const initialState: OrganizationDriverInitialStateType = {
  profile: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
};

const OrganizationDriverContext = createContext<{
  state: OrganizationDriverInitialStateType;
  dispatch: Dispatch<OrganizationDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: OrganizationDriverInitialStateType,
  action: OrganizationDriverActions
) => ({
  profile: OrganizationDriverProfileReducers(profile, action),
});

const OrganizationDriverProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <OrganizationDriverContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OrganizationDriverContext.Provider>
  );
};

export { OrganizationDriverProvider, OrganizationDriverContext };
