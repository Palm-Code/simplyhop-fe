"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DetailOrganizationActions,
  DetailOrganizationInitialStateType,
} from "./Detail.organization.types";
import {
  DetailOrganizationRideReducers,
  DetailOrganizationUserReducers,
  DetailOrganizationDriverReducers,
} from "./Detail.organization.reducers";

const initialState: DetailOrganizationInitialStateType = {
  user: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
  ride: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
  driver: {
    data: null,
    loading: {
      is_fetching: true,
    },
    pagination: {
      limit: 10,
      current_page: 1,
    },
  },
};

const DetailOrganizationContext = createContext<{
  state: DetailOrganizationInitialStateType;
  dispatch: Dispatch<DetailOrganizationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { user, ride, driver }: DetailOrganizationInitialStateType,
  action: DetailOrganizationActions
) => ({
  user: DetailOrganizationUserReducers(user, action),
  ride: DetailOrganizationRideReducers(ride, action),
  driver: DetailOrganizationDriverReducers(driver, action),
});

const DetailOrganizationProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DetailOrganizationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DetailOrganizationContext.Provider>
  );
};

export { DetailOrganizationProvider, DetailOrganizationContext };
