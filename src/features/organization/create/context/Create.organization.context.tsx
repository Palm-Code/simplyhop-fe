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
      },
    ],
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
    company_office,
    notification,
  }: CreateOrganizationInitialStateType,
  action: CreateOrganizationActions
) => ({
  company_data: CreateOrganizationCompanyDataReducers(company_data, action),
  company_office: CreateOrganizationCompanyOfficeReducers(
    company_office,
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
