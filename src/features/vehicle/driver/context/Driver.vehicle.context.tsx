"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DriverVehicleActions,
  DriverVehicleInitialStateType,
} from "./Driver.vehicle.types";
import { DriverVehicleProfileReducers } from "./Driver.vehicle.reducers";

const initialState: DriverVehicleInitialStateType = {
  profile: {
    data: null,
    loading: {
      is_fetching: true,
    },
  },
};

const DriverVehicleContext = createContext<{
  state: DriverVehicleInitialStateType;
  dispatch: Dispatch<DriverVehicleActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: DriverVehicleInitialStateType,
  action: DriverVehicleActions
) => ({
  profile: DriverVehicleProfileReducers(profile, action),
});

const DriverVehicleProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DriverVehicleContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DriverVehicleContext.Provider>
  );
};

export { DriverVehicleProvider, DriverVehicleContext };
