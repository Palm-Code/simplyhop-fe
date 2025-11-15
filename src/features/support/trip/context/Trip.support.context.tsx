"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  TripSupportActions,
  TripSupportInitialStateType,
} from "./Trip.support.types";
import {
  TripSupportBookReducers,
  TripSupportCancelBookNotificationReducers,
  TripSupportCompleteRideConfirmationReducers,
  TripSupportDeleteRideNotificationReducers,
  TripSupportDetailBookNotificationReducers,
  TripSupportDetailRideNotificationReducers,
  TripSupportFiltersReducers,
  TripSupportRideReducers,
  TripSupportShareRideNotificationReducers,
  TripSupportSuccessCancelBookNotificationReducers,
  TripSupportSuccessDeleteRideNotificationReducers,
} from "./Trip.support.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: TripSupportInitialStateType = {
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
    confirmed_booking: [],
  },
};

const TripSupportContext = createContext<{
  state: TripSupportInitialStateType;
  dispatch: Dispatch<TripSupportActions>;
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
  }: TripSupportInitialStateType,
  action: TripSupportActions
) => ({
  filters: TripSupportFiltersReducers(filters, action),
  ride: TripSupportRideReducers(ride, action),
  book: TripSupportBookReducers(book, action),
  detail_ride_notification: TripSupportDetailRideNotificationReducers(
    detail_ride_notification,
    action
  ),
  delete_ride_notification: TripSupportDeleteRideNotificationReducers(
    delete_ride_notification,
    action
  ),
  success_delete_ride_notification:
    TripSupportSuccessDeleteRideNotificationReducers(
      success_delete_ride_notification,
      action
    ),
  share_ride_notification: TripSupportShareRideNotificationReducers(
    share_ride_notification,
    action
  ),
  detail_book_notification: TripSupportDetailBookNotificationReducers(
    detail_book_notification,
    action
  ),
  cancel_book_notification: TripSupportCancelBookNotificationReducers(
    cancel_book_notification,
    action
  ),
  success_cancel_book_notification:
    TripSupportSuccessCancelBookNotificationReducers(
      success_cancel_book_notification,
      action
    ),
  complete_ride_confirmation: TripSupportCompleteRideConfirmationReducers(
    complete_ride_confirmation,
    action
  ),
});

const TripSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <TripSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TripSupportContext.Provider>
  );
};

export { TripSupportProvider, TripSupportContext };
