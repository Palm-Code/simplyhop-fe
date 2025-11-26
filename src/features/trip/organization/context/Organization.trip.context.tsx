"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  OrganizationTripActions,
  OrganizationTripInitialStateType,
} from "./Organization.trip.types";
import { OrganizationTripProfileReducers } from "./Organization.trip.reducers";

const initialState: OrganizationTripInitialStateType = {
  profile: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
};

const OrganizationTripContext = createContext<{
  state: OrganizationTripInitialStateType;
  dispatch: Dispatch<OrganizationTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: OrganizationTripInitialStateType,
  action: OrganizationTripActions
) => ({
  profile: OrganizationTripProfileReducers(profile, action),
});

const OrganizationTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <OrganizationTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OrganizationTripContext.Provider>
  );
};

export { OrganizationTripProvider, OrganizationTripContext };
