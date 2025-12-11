"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  CreateOrganizationActions,
  CreateOrganizationInitialStateType,
} from "./Create.organization.types";
import {
  CreateOrganizationCompanyDataReducers,
  CreateOrganizationCompanyOfficeReducers,
  CreateOrganizationNotificationReducers,
  CreateOrganizationPinPointDeleteConfirmationReducers,
  CreateOrganizationPinPointReducers,
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
      address: {
        address_1: {
          value: "",
          error: null,
        },
        address_2: {
          value: "",
          error: null,
        },
        zip_code: {
          value: "",
          error: null,
        },
        city: {
          value: "",
          error: null,
        },
      },
    },
  },
  company_office: {
    form: [
      {
        address_name: {
          value: "",
          error: null,
        },
        address_1: {
          value: "",
          error: null,
        },
        address_2: {
          value: "",
          error: null,
        },
        zip_code: {
          value: "",
          error: null,
        },
        city: {
          value: "",
          error: null,
        },
        pin_point: {
          value: null,
        },
        mode: "initial",
      },
    ],
  },
  pin_point: {
    is_open: false,
    index: null,
    location: {
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
      query: "",
    },
    map: {
      marker: false,
      initial_coordinate: null,
      mode: "country",
    },
  },
  notification: {
    is_open: false,
  },
  pin_point_delete_confirmation: {
    is_open: false,
    index: null,
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
    company_office,
    pin_point,
    notification,
    pin_point_delete_confirmation,
  }: CreateOrganizationInitialStateType,
  action: CreateOrganizationActions
) => ({
  company_data: CreateOrganizationCompanyDataReducers(company_data, action),
  company_office: CreateOrganizationCompanyOfficeReducers(
    company_office,
    action
  ),
  pin_point: CreateOrganizationPinPointReducers(pin_point, action),
  notification: CreateOrganizationNotificationReducers(notification, action),
  pin_point_delete_confirmation:
    CreateOrganizationPinPointDeleteConfirmationReducers(
      pin_point_delete_confirmation,
      action
    ),
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
