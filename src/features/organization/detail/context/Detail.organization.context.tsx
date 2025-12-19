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
  DetailOrganizationCompanyDataReducers,
  DetailOrganizationCompanyOfficeReducers,
  DetailOrganizationPinPointReducers,
  DetailOrganizationPinPointDeleteConfirmationReducers,
  DetailOrganizationNotificationReducers,
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
  delete_account_confirmation: {
    is_open: false,
  },
  edit: {
    is_open: false,
  },
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
      pictures: {
        files: [],
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
    delete_account_confirmation,
    edit,
    company_data,
    company_office,
    pin_point,
    pin_point_delete_confirmation,
    notification,
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
  company_data: DetailOrganizationCompanyDataReducers(company_data, action),
  company_office: DetailOrganizationCompanyOfficeReducers(
    company_office,
    action
  ),
  pin_point: DetailOrganizationPinPointReducers(pin_point, action),
  pin_point_delete_confirmation:
    DetailOrganizationPinPointDeleteConfirmationReducers(
      pin_point_delete_confirmation,
      action
    ),
  notification: DetailOrganizationNotificationReducers(notification, action),
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
