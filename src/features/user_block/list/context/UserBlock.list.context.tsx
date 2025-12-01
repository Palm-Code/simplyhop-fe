"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  UserBlockListActions,
  UserBlockListInitialStateType,
} from "./UserBlock.list.types";
import { UserBlockListItemsReducers } from "./UserBlock.list.reducers";

const initialState: UserBlockListInitialStateType = {
  items: {
    items: [],
    pagination: {
      limit: 10,
      current_page: 1,
    },
    loading: {
      is_fetching: true,
    },
  },
};

const UserBlockListContext = createContext<{
  state: UserBlockListInitialStateType;
  dispatch: Dispatch<UserBlockListActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { items }: UserBlockListInitialStateType,
  action: UserBlockListActions
) => ({
  items: UserBlockListItemsReducers(items, action),
});

const UserBlockListProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <UserBlockListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserBlockListContext.Provider>
  );
};

export { UserBlockListProvider, UserBlockListContext };
