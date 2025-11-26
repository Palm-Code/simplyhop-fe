"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DriverTripActions,
  DriverTripInitialStateType,
} from "./Driver.trip.types";
import { DriverTripUserReducers } from "./Driver.trip.reducers";

const initialState: DriverTripInitialStateType = {
  user: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
};

const DriverTripContext = createContext<{
  state: DriverTripInitialStateType;
  dispatch: Dispatch<DriverTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { user }: DriverTripInitialStateType,
  action: DriverTripActions
) => ({
  user: DriverTripUserReducers(user, action),
});

const DriverTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DriverTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DriverTripContext.Provider>
  );
};

export { DriverTripProvider, DriverTripContext };
