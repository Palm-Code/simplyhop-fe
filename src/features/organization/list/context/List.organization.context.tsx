"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ListOrganizationActions,
  ListOrganizationInitialStateType,
} from "./List.organization.types";
import {
  ListOrganizationDeleteAccountConfirmationReducers,
  ListOrganizationTableReducers,
  ListOrganizationUserProfileReducers,
} from "./List.organization.reducers";

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
  user_profile: {
    is_open: false,
    user_id: null,
    data: null,
  },
  delete_account_confirmation: {
    is_open: false,
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
  {
    table,
    user_profile,
    delete_account_confirmation,
  }: ListOrganizationInitialStateType,
  action: ListOrganizationActions
) => ({
  table: ListOrganizationTableReducers(table, action),
  user_profile: ListOrganizationUserProfileReducers(user_profile, action),
  delete_account_confirmation:
    ListOrganizationDeleteAccountConfirmationReducers(
      delete_account_confirmation,
      action
    ),
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
