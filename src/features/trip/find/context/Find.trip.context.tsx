"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { FindTripActions, FindTripInitialStateType } from "./Find.trip.types";
import {
  FindTripFiltersReducers,
  FindTripMapReducers,
} from "./Find.trip.reducers";
import dayjs from "dayjs";

const initialState: FindTripInitialStateType = {
  filters: {
    origin: {
      page_sheet: {
        is_open: false,
      },
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
      query: "",
      saved_items: [],
    },
    destination: {
      page_sheet: {
        is_open: false,
      },
      selected: {
        item: null,
        lat_lng: null,
      },
      query: "",
      items: [],
      saved_items: [],
    },
    date: {
      mode: "multiple",
      selected: [],
    },
    passenger: {
      car_seat: {
        checked: false,
      },
      value: [],
    },
  },
  map: {
    polyline_path: [],
    marker: false,
    initial_coordinate: null,
    mode: "country",
  },
};

const FindTripContext = createContext<{
  state: FindTripInitialStateType;
  dispatch: Dispatch<FindTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, map }: FindTripInitialStateType,
  action: FindTripActions
) => ({
  filters: FindTripFiltersReducers(filters, action),
  map: FindTripMapReducers(map, action),
});

const FindTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <FindTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FindTripContext.Provider>
  );
};

export { FindTripProvider, FindTripContext };
