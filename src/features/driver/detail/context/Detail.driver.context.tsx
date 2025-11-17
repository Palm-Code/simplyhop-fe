"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  DetailDriverActions,
  DetailDriverInitialStateType,
} from "./Detail.driver.types";
import { DetailDriverUserReducers } from "./Detail.driver.reducers";

const initialState: DetailDriverInitialStateType = {
  user: {
    data: null,
  },
};

const DetailDriverContext = createContext<{
  state: DetailDriverInitialStateType;
  dispatch: Dispatch<DetailDriverActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { user }: DetailDriverInitialStateType,
  action: DetailDriverActions
) => ({
  user: DetailDriverUserReducers(user, action),
});

const DetailDriverProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DetailDriverContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DetailDriverContext.Provider>
  );
};

export { DetailDriverProvider, DetailDriverContext };
