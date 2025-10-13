"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  MyListTripActions,
  MyListTripInitialStateType,
} from "./MyList.trip.types";
import {
  MyListTripBookReducers,
  MyListTripCancelBookNotificationReducers,
  MyListTripCompleteRideConfirmationReducers,
  MyListTripDeleteRideNotificationReducers,
  MyListTripDetailBookNotificationReducers,
  MyListTripDetailRideNotificationReducers,
  MyListTripFiltersReducers,
  MyListTripRideReducers,
  MyListTripShareRideNotificationReducers,
  MyListTripSuccessCancelBookNotificationReducers,
  MyListTripSuccessDeleteRideNotificationReducers,
} from "./MyList.trip.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: MyListTripInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
  ride: {
    data: [],
    pagination: {
      current: PAGINATION.NUMBER,
      last: null,
    },
    detail: null,
  },
  book: {
    data: [],
    pagination: {
      current: PAGINATION.NUMBER,
      last: null,
    },
    detail: null,
  },
  detail_ride_notification: {
    is_open: false,
  },
  delete_ride_notification: {
    is_open: false,
  },
  success_delete_ride_notification: {
    is_open: false,
  },
  share_ride_notification: {
    is_open: false,
    share: {
      link: "",
      message: "",
    },
  },
  detail_book_notification: {
    is_open: false,
  },
  cancel_book_notification: {
    is_open: false,
  },
  success_cancel_book_notification: {
    is_open: false,
  },
  complete_ride_confirmation: {
    is_open: false,
  },
};

const MyListTripContext = createContext<{
  state: MyListTripInitialStateType;
  dispatch: Dispatch<MyListTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    filters,
    ride,
    book,
    detail_ride_notification,
    delete_ride_notification,
    success_delete_ride_notification,
    share_ride_notification,
    detail_book_notification,
    cancel_book_notification,
    success_cancel_book_notification,
    complete_ride_confirmation,
  }: MyListTripInitialStateType,
  action: MyListTripActions
) => ({
  filters: MyListTripFiltersReducers(filters, action),
  ride: MyListTripRideReducers(ride, action),
  book: MyListTripBookReducers(book, action),
  detail_ride_notification: MyListTripDetailRideNotificationReducers(
    detail_ride_notification,
    action
  ),
  delete_ride_notification: MyListTripDeleteRideNotificationReducers(
    delete_ride_notification,
    action
  ),
  success_delete_ride_notification:
    MyListTripSuccessDeleteRideNotificationReducers(
      success_delete_ride_notification,
      action
    ),
  share_ride_notification: MyListTripShareRideNotificationReducers(
    share_ride_notification,
    action
  ),
  detail_book_notification: MyListTripDetailBookNotificationReducers(
    detail_book_notification,
    action
  ),
  cancel_book_notification: MyListTripCancelBookNotificationReducers(
    cancel_book_notification,
    action
  ),
  success_cancel_book_notification:
    MyListTripSuccessCancelBookNotificationReducers(
      success_cancel_book_notification,
      action
    ),
  complete_ride_confirmation: MyListTripCompleteRideConfirmationReducers(
    complete_ride_confirmation,
    action
  ),
});

const MyListTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MyListTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyListTripContext.Provider>
  );
};

export { MyListTripProvider, MyListTripContext };
