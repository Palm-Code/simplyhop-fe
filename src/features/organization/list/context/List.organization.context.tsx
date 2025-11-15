"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ListOrganizationActions,
  ListOrganizationInitialStateType,
} from "./List.organization.types";
import { ListOrganizationTableReducers } from "./List.organization.reducers";

const initialState: ListOrganizationInitialStateType = {
  table: {
    items: [],
    pagination: {
      limit: 5,
      current_page: 1,
    },
    loading: {
      is_fetching: true,
    },
  },
};

const ListOrganizationContext = createContext<{
  state: ListOrganizationInitialStateType;
  dispatch: Dispatch<ListOrganizationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { table }: ListOrganizationInitialStateType,
  action: ListOrganizationActions
) => ({
  table: ListOrganizationTableReducers(table, action),
});

const ListOrganizationProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ListOrganizationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ListOrganizationContext.Provider>
  );
};

export { ListOrganizationProvider, ListOrganizationContext };
