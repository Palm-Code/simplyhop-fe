"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  OrganizationDetailDriverActions,
  OrganizationDetailDriverInitialStateType,
} from "./OrganizationDetail.driver.types";
import { OrganizationDetailDriverProfileReducers } from "./OrganizationDetail.driver.reducers";

const initialState: OrganizationDetailDriverInitialStateType = {
  profile: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
};

const OrganizationDetailDriverContext = createContext<{
  state: OrganizationDetailDriverInitialStateType;
  dispatch: Dispatch<OrganizationDetailDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: OrganizationDetailDriverInitialStateType,
  action: OrganizationDetailDriverActions
) => ({
  profile: OrganizationDetailDriverProfileReducers(profile, action),
});

const OrganizationDetailDriverProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <OrganizationDetailDriverContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OrganizationDetailDriverContext.Provider>
  );
};

export { OrganizationDetailDriverProvider, OrganizationDetailDriverContext };
