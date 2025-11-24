"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DetailOrganizationActions,
  DetailOrganizationInitialStateType,
} from "./Detail.organization.types";
import {
  DetailOrganizationRideReducers,
  DetailOrganizationProfileReducers,
  DetailOrganizationDriverReducers,
  DetailOrganizationEditReducers,
  DetailOrganizationDeleteAccountConfirmationReducers,
} from "./Detail.organization.reducers";

const initialState: DetailOrganizationInitialStateType = {
  profile: {
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
  driver: {
    data: null,
    loading: {
      is_fetching: true,
    },
    pagination: {
      limit: 10,
      current_page: 1,
    },
  },
  edit: {
    is_open: false,
    form: {
      email: {
        value: "",
        error: null,
      },
      name: {
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
      responsible_person_name: {
        value: "",
        error: null,
      },
    },
  },
  delete_account_confirmation: {
    is_open: false,
  },
};

const DetailOrganizationContext = createContext<{
  state: DetailOrganizationInitialStateType;
  dispatch: Dispatch<DetailOrganizationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    profile,
    ride,
    driver,
    edit,
    delete_account_confirmation,
  }: DetailOrganizationInitialStateType,
  action: DetailOrganizationActions
) => ({
  profile: DetailOrganizationProfileReducers(profile, action),
  ride: DetailOrganizationRideReducers(ride, action),
  driver: DetailOrganizationDriverReducers(driver, action),
  edit: DetailOrganizationEditReducers(edit, action),
  delete_account_confirmation:
    DetailOrganizationDeleteAccountConfirmationReducers(
      delete_account_confirmation,
      action
    ),
});

const DetailOrganizationProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DetailOrganizationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DetailOrganizationContext.Provider>
  );
};

export { DetailOrganizationProvider, DetailOrganizationContext };
