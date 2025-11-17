"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  VehicleCreateSupportActions,
  VehicleCreateSupportInitialStateType,
} from "./VehicleCreate.support.types";
import {
  VehicleCreateSupportNotificationReducers,
  VehicleCreateSupportVehicleInformationReducers,
} from "./VehicleCreate.support.reducers";

const initialState: VehicleCreateSupportInitialStateType = {
  vehicle_information: {
    general: {
      form: {
        car_brand: {
          selected: null,
          items: [],
          error: null,
          query: "",
        },
        car_category: {
          selected: null,
          items: [],
          error: null,
          query: "",
        },
        car_model: {
          value: "",
          error: null,
        },
        car_color: {
          value: "",
          error: null,
        },
        license_plate: {
          value: "",
          error: null,
        },
      },
    },
    pictures: {
      files: [],
    },
    capacity: {
      passenger_seats: {
        form: {
          available_seat: {
            selected: null,
            items: [],
          },
          available_car_seat: {
            selected: null,
            items: [],
          },
        },
      },
      luggage: {
        form: {
          luggage: {
            selected: null,
            items: [],
          },
          luggage_size: {
            selected: null,
            items: [],
          },
        },
      },
    },
    trip: {
      form: {
        smoking: {
          selected: null,
          items: [],
        },
        music: {
          selected: null,
          items: [],
        },
        pet: {
          selected: null,
          items: [],
        },
      },
    },
  },
  notification: {
    is_open: false,
  },
};

const VehicleCreateSupportContext = createContext<{
  state: VehicleCreateSupportInitialStateType;
  dispatch: Dispatch<VehicleCreateSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { vehicle_information, notification }: VehicleCreateSupportInitialStateType,
  action: VehicleCreateSupportActions
) => ({
  vehicle_information: VehicleCreateSupportVehicleInformationReducers(
    vehicle_information,
    action
  ),
  notification: VehicleCreateSupportNotificationReducers(notification, action),
});

const VehicleCreateSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <VehicleCreateSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VehicleCreateSupportContext.Provider>
  );
};

export { VehicleCreateSupportProvider, VehicleCreateSupportContext };
