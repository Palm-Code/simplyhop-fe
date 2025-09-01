"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  PlanRideTripActions,
  PlanRideTripInitialStateType,
} from "./PlanRide.trip.types";
import {
  PlanRideTripDetailReducers,
  PlanRideTripFiltersReducers,
  PlanRideTripMapReducers,
  PlanRideTripNotificationReducers,
} from "./PlanRide.trip.reducers";
import dayjs from "dayjs";

const initialState: PlanRideTripInitialStateType = {
  filters: {
    auto: {
      bottom_sheet: {
        is_open: false,
      },
      query: "",
      selected: null,
      items: [],
      data: [],
    },
    origin: {
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
      selected: [dayjs().toDate()],
    },
    time: {
      value: dayjs().format("HH:mm"),
    },
  },
  map: {
    polyline_path: [],
    marker: false,
    initial_coordinate: null,
    mode: "country",
  },
  detail: {
    is_open: false,
    form: {
      plan: {
        date: {
          selected: [dayjs().toDate()],
        },
        time: {
          value: dayjs().format("HH:mm"),
        },
        umweg: {
          value: "",
          error: null,
        },
        recurring: {
          selected: null,
        },
        shift: {
          selected: null,
          items: [],
        },
        seat: {
          value: "",
          error: null,
        },
        available_child_seat: {
          value: "",
          error: null,
        },
        back_seat: {
          checked: false,
        },
      },
      other: {
        price: {
          value: 0,
        },
        notes: {
          value: "",
        },
      },
      tnc: {
        checked: false,
      },
    },
    distance_matrix: null,
  },
  notification: {
    is_open: false,
    share: {
      link: "",
      message: "",
    },
  },
};

const PlanRideTripContext = createContext<{
  state: PlanRideTripInitialStateType;
  dispatch: Dispatch<PlanRideTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, map, detail, notification }: PlanRideTripInitialStateType,
  action: PlanRideTripActions
) => ({
  filters: PlanRideTripFiltersReducers(filters, action),
  map: PlanRideTripMapReducers(map, action),
  detail: PlanRideTripDetailReducers(detail, action),
  notification: PlanRideTripNotificationReducers(notification, action),
});

const PlanRideTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <PlanRideTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlanRideTripContext.Provider>
  );
};

export { PlanRideTripProvider, PlanRideTripContext };
