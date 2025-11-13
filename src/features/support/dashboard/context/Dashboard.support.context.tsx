"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DashboardSupportActions,
  DashboardSupportInitialStateType,
} from "./Dashboard.support.types";
import { DashboardSupportSummaryReducers } from "./Dashboard.support.reducers";

const initialState: DashboardSupportInitialStateType = {
  summary: {
    personal: null,
    organization_admin: null,
    super_admin: null,
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
  { summary }: DashboardSupportInitialStateType,
  action: DashboardSupportActions
) => ({
  summary: DashboardSupportSummaryReducers(summary, action),
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
