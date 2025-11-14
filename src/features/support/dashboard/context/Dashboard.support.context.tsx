"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DashboardSupportActions,
  DashboardSupportInitialStateType,
} from "./Dashboard.support.types";
import {
  DashboardSupportSectionsReducers,
  DashboardSupportSummaryReducers,
} from "./Dashboard.support.reducers";

const initialState: DashboardSupportInitialStateType = {
  summary: {
    personal: null,
    organization_admin: null,
    super_admin: null,
  },
  sections: {
    personal: {
      ride: {
        data: null,
      },
      vehicle: {
        data: null,
      },
    },
    organization_admin: {
      ride: {
        data: null,
      },
      driver: {
        data: null,
        pagination: {
          limit: 5,
          current_page: 1,
        },
        loading: {
          is_fetching: true,
        },
      },
    },
    super_admin: {
      organization: {
        data: null,
        pagination: {
          limit: 5,
          current_page: 1,
        },
        loading: {
          is_fetching: true,
        },
      },
      driver: {
        data: null,
        pagination: {
          limit: 5,
          current_page: 1,
        },
        loading: {
          is_fetching: true,
        },
      },
    },
  },
};

const DashboardSupportContext = createContext<{
  state: DashboardSupportInitialStateType;
  dispatch: Dispatch<DashboardSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { summary, sections }: DashboardSupportInitialStateType,
  action: DashboardSupportActions
) => ({
  summary: DashboardSupportSummaryReducers(summary, action),
  sections: DashboardSupportSectionsReducers(sections, action),
});

const DashboardSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DashboardSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DashboardSupportContext.Provider>
  );
};

export { DashboardSupportProvider, DashboardSupportContext };
