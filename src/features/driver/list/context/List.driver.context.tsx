"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ListDriverActions,
  ListDriverInitialStateType,
} from "./List.driver.types";
import {
  ListDriverBlockedUserReducers,
  ListDriverDeleteAccountConfirmationReducers,
  ListDriverDeleteChatConfirmationReducers,
  ListDriverTableReducers,
  ListDriverUserProfileReducers,
} from "./List.driver.reducers";

const initialState: ListDriverInitialStateType = {
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
  delete_chat_confirmation: {
    is_open: false,
  },
  delete_account_confirmation: {
    is_open: false,
  },
  blocked_user: {
    is_open: false,
    user_id: null,
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

const ListDriverContext = createContext<{
  state: ListDriverInitialStateType;
  dispatch: Dispatch<ListDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    table,
    user_profile,
    delete_chat_confirmation,
    delete_account_confirmation,
    blocked_user,
  }: ListDriverInitialStateType,
  action: ListDriverActions
) => ({
  table: ListDriverTableReducers(table, action),
  user_profile: ListDriverUserProfileReducers(user_profile, action),
  delete_chat_confirmation: ListDriverDeleteChatConfirmationReducers(
    delete_chat_confirmation,
    action
  ),
  delete_account_confirmation: ListDriverDeleteAccountConfirmationReducers(
    delete_account_confirmation,
    action
  ),
  blocked_user: ListDriverBlockedUserReducers(blocked_user, action),
});

const ListDriverProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ListDriverContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ListDriverContext.Provider>
  );
};

export { ListDriverProvider, ListDriverContext };
