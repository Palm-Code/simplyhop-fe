"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  VehiclesSupportActions,
  VehiclesSupportInitialStateType,
} from "./Vehicles.support.types";
import {
  VehiclesSupportListReducers,
  VehiclesSupportRidePlanReducers,
} from "./Vehicles.support.reducers";

const initialState: VehiclesSupportInitialStateType = {
  list: {
    data: [],
  },
  ride_plan: {
    form: {
      offer_trip: {
        selected: null,
      },
    },
  },
};

const VehiclesSupportContext = createContext<{
  state: VehiclesSupportInitialStateType;
  dispatch: Dispatch<VehiclesSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { list, ride_plan }: VehiclesSupportInitialStateType,
  action: VehiclesSupportActions
) => ({
  list: VehiclesSupportListReducers(list, action),
  ride_plan: VehiclesSupportRidePlanReducers(ride_plan, action),
});

const VehiclesSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <VehiclesSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VehiclesSupportContext.Provider>
  );
};

export { VehiclesSupportProvider, VehiclesSupportContext };
