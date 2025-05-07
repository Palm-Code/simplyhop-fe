"use client";
import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import {
  UserActionEnum,
  UserActions,
  UserInitialStateType,
} from "./User.types";
import { UserProfileReducers } from "./User.reducers";
import { useGetUserProfileData } from "@/core/utils/react_query/hooks";

const initialState: UserInitialStateType = {
  profile: null,
};

const UserContext = createContext<{
  state: UserInitialStateType;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: UserInitialStateType,
  action: UserActions
) => ({
  profile: UserProfileReducers(profile, action),
});

const UserProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const query = useGetUserProfileData();

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const user = query.data;
      dispatch({
        type: UserActionEnum.SetProfileData,
        payload: {
          id: user.data.id,
          first_name: user.data?.first_name ?? "",
          last_name: user.data?.last_name ?? "",
          avatar: user.data.avatar,
          email: user.data.email,
          phonenumber: user.data?.mobile ?? "",
          city: user.data?.city ?? "",
          about_me: user.data?.profile?.bio ?? "",
          is_driver: user.data?.is_driver === 1 ? true : false,
          gender: user.data?.gender ?? null,
          is_able_to_ride: user.data.can_share_ride,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
