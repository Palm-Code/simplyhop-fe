"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ListDriverActions,
  ListDriverInitialStateType,
} from "./List.driver.types";
import {
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
};

const ListDriverContext = createContext<{
  state: ListDriverInitialStateType;
  dispatch: Dispatch<ListDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { table, user_profile }: ListDriverInitialStateType,
  action: ListDriverActions
) => ({
  table: ListDriverTableReducers(table, action),
  user_profile: ListDriverUserProfileReducers(user_profile, action),
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
