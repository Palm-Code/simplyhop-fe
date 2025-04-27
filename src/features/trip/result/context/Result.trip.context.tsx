"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ResultTripActions,
  ResultTripInitialStateType,
} from "./Result.trip.types";
import {
  ResultTripAdvancedFilterReducers,
  ResultTripDetailReducers,
  ResultTripFiltersReducers,
  ResultTripNotificationReducers,
  ResultTripRidesReducers,
  ResultTripVehicleFiltersReducers,
} from "./Result.trip.reducers";

const initialState: ResultTripInitialStateType = {
  filters: {
    is_open: false,
    origin: {
      page_sheet: {
        is_open: false,
      },
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
    },
    destination: {
      page_sheet: {
        is_open: false,
      },
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
    },
    date: {
      selected: new Date(),
    },
    passenger: {
      car_seat: {
        checked: false,
      },
      value: [],
    },
  },
  vehicle_filters: {
    is_open: false,
    luggage: {
      selected: [],
    },
    smoker: {
      selected: [],
    },
    music: {
      selected: [],
    },
    pets: {
      selected: [],
    },
    sort: {
      selected: null,
    },
  },
  advanced_filter: {
    luggage: {
      selected: [],
    },
    smoker: {
      selected: [],
    },
    music: {
      selected: [],
    },
    pets: {
      selected: [],
    },
    sort: {
      selected: null,
    },
  },
  rides: {
    data: [],
  },
  detail: {
    is_open: false,
    data: null,
    form: {
      price_offer: {
        value: 0,
      },
      notes: {
        value: "",
      },
    },
  },
  notification: {
    is_open: false,
  },
};

const ResultTripContext = createContext<{
  state: ResultTripInitialStateType;
  dispatch: Dispatch<ResultTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    filters,
    vehicle_filters,
    advanced_filter,
    rides,
    detail,
    notification,
  }: ResultTripInitialStateType,
  action: ResultTripActions
) => ({
  filters: ResultTripFiltersReducers(filters, action),
  vehicle_filters: ResultTripVehicleFiltersReducers(vehicle_filters, action),
  advanced_filter: ResultTripAdvancedFilterReducers(advanced_filter, action),
  rides: ResultTripRidesReducers(rides, action),
  detail: ResultTripDetailReducers(detail, action),
  notification: ResultTripNotificationReducers(notification, action),
});

const ResultTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResultTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResultTripContext.Provider>
  );
};

export { ResultTripProvider, ResultTripContext };
