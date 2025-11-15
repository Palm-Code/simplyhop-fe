"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ListDriverActions,
  ListDriverInitialStateType,
} from "./List.driver.types";
import { ListDriverTableReducers } from "./List.driver.reducers";

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
};

const ListDriverContext = createContext<{
  state: ListDriverInitialStateType;
  dispatch: Dispatch<ListDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { table }: ListDriverInitialStateType,
  action: ListDriverActions
) => ({
  table: ListDriverTableReducers(table, action),
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
