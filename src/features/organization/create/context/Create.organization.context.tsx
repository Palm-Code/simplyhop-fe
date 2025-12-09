"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  CreateOrganizationActions,
  CreateOrganizationInitialStateType,
} from "./Create.organization.types";
import {
  CreateOrganizationCompanyDataReducers,
  CreateOrganizationNotificationReducers,
  CreateOrganizationPersonalInformationReducers,
  CreateOrganizationRidePlanReducers,
  CreateOrganizationVehicleInformationReducers,
} from "./Create.organization.reducers";

const initialState: CreateOrganizationInitialStateType = {
  company_data: {
    form: {
      company_type: {
        selected: null,
      },
      domain: {
        value: "",
        error: null,
      },
      company_code: {
        value: "",
        error: null,
      },
      admin_email: {
        value: "",
        error: null,
      },
      company_name: {
        value: "",
        error: null,
      },
      telephone: {
        value: "",
        error: null,
      },
      responsible_person: {
        first_name: {
          value: "",
          error: null,
        },
        last_name: {
          value: "",
          error: null,
        },
      },
    },
  },
  personal_information: {
    form: {
      email: {
        value: "",
        error: null,
      },
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
  ride_plan: {
    form: {
      offer_trip: {
        selected: null,
      },
    },
  },
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

const CreateOrganizationContext = createContext<{
  state: CreateOrganizationInitialStateType;
  dispatch: Dispatch<CreateOrganizationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    company_data,
    personal_information,
    ride_plan,
    vehicle_information,
    notification,
  }: CreateOrganizationInitialStateType,
  action: CreateOrganizationActions
) => ({
  company_data: CreateOrganizationCompanyDataReducers(company_data, action),
  personal_information: CreateOrganizationPersonalInformationReducers(
    personal_information,
    action
  ),
  ride_plan: CreateOrganizationRidePlanReducers(ride_plan, action),
  vehicle_information: CreateOrganizationVehicleInformationReducers(
    vehicle_information,
    action
  ),
  notification: CreateOrganizationNotificationReducers(notification, action),
});

const CreateOrganizationProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CreateOrganizationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CreateOrganizationContext.Provider>
  );
};

export { CreateOrganizationProvider, CreateOrganizationContext };
