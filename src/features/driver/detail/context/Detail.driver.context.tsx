"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DetailDriverActions,
  DetailDriverInitialStateType,
} from "./Detail.driver.types";
import {
  DetailDriverRideReducers,
  DetailDriverUserReducers,
  DetailDriverVehicleReducers,
} from "./Detail.driver.reducers";

const initialState: DetailDriverInitialStateType = {
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
  vehicle: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
};

const DetailDriverContext = createContext<{
  state: DetailDriverInitialStateType;
  dispatch: Dispatch<DetailDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { user, ride, vehicle }: DetailDriverInitialStateType,
  action: DetailDriverActions
) => ({
  user: DetailDriverUserReducers(user, action),
  ride: DetailDriverRideReducers(ride, action),
  vehicle: DetailDriverVehicleReducers(vehicle, action),
});

const DetailDriverProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DetailDriverContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DetailDriverContext.Provider>
  );
};

export { DetailDriverProvider, DetailDriverContext };
