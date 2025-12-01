"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ListUserBlockActions,
  ListUserBlockInitialStateType,
} from "./List.user_block.types";
import { ListUserBlockItemsReducers } from "./List.user_block.reducers";

const initialState: ListUserBlockInitialStateType = {
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

const ListUserBlockContext = createContext<{
  state: ListUserBlockInitialStateType;
  dispatch: Dispatch<ListUserBlockActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { items }: ListUserBlockInitialStateType,
  action: ListUserBlockActions
) => ({
  items: ListUserBlockItemsReducers(items, action),
});

const ListUserBlockProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ListUserBlockContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ListUserBlockContext.Provider>
  );
};

export { ListUserBlockProvider, ListUserBlockContext };
