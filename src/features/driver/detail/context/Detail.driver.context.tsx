"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DetailDriverActions,
  DetailDriverInitialStateType,
} from "./Detail.driver.types";
import {
  DetailDriverDeleteAccountConfirmationReducers,
  DetailDriverEditReducers,
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
  edit: {
    is_open: false,
    form: {
      first_name: {
        value: "",
        error: null,
      },
      last_name: {
        value: "",
        error: null,
      },
      city: {
        value: "",
        error: null,
      },
      phonenumber: {
        value: "",
        error: null,
      },
      about_me: {
        value: "",
        error: null,
      },
      gender: {
        selected: null,
        error: null,
      },
    },
  },
  delete_account_confirmation: {
    is_open: false,
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
  {
    user,
    ride,
    vehicle,
    edit,
    delete_account_confirmation,
  }: DetailDriverInitialStateType,
  action: DetailDriverActions
) => ({
  user: DetailDriverUserReducers(user, action),
  ride: DetailDriverRideReducers(ride, action),
  vehicle: DetailDriverVehicleReducers(vehicle, action),
  edit: DetailDriverEditReducers(edit, action),
  delete_account_confirmation: DetailDriverDeleteAccountConfirmationReducers(
    delete_account_confirmation,
    action
  ),
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
