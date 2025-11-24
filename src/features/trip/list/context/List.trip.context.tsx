"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ListTripActions, ListTripInitialStateType } from "./List.trip.types";
import {
  ListTripBookReducers,
  ListTripCancelBookNotificationReducers,
  ListTripCompleteRideConfirmationReducers,
  ListTripDeleteRideNotificationReducers,
  ListTripDetailBookNotificationReducers,
  ListTripDetailRideNotificationReducers,
  ListTripFiltersReducers,
  ListTripRideReducers,
  ListTripShareRideNotificationReducers,
  ListTripSuccessCancelBookNotificationReducers,
  ListTripSuccessDeleteRideNotificationReducers,
} from "./List.trip.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: ListTripInitialStateType = {
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

const ListTripContext = createContext<{
  state: ListTripInitialStateType;
  dispatch: Dispatch<ListTripActions>;
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
  }: ListTripInitialStateType,
  action: ListTripActions
) => ({
  filters: ListTripFiltersReducers(filters, action),
  ride: ListTripRideReducers(ride, action),
  book: ListTripBookReducers(book, action),
  detail_ride_notification: ListTripDetailRideNotificationReducers(
    detail_ride_notification,
    action
  ),
  delete_ride_notification: ListTripDeleteRideNotificationReducers(
    delete_ride_notification,
    action
  ),
  success_delete_ride_notification:
    ListTripSuccessDeleteRideNotificationReducers(
      success_delete_ride_notification,
      action
    ),
  share_ride_notification: ListTripShareRideNotificationReducers(
    share_ride_notification,
    action
  ),
  detail_book_notification: ListTripDetailBookNotificationReducers(
    detail_book_notification,
    action
  ),
  cancel_book_notification: ListTripCancelBookNotificationReducers(
    cancel_book_notification,
    action
  ),
  success_cancel_book_notification:
    ListTripSuccessCancelBookNotificationReducers(
      success_cancel_book_notification,
      action
    ),
  complete_ride_confirmation: ListTripCompleteRideConfirmationReducers(
    complete_ride_confirmation,
    action
  ),
});

const ListTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ListTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ListTripContext.Provider>
  );
};

export { ListTripProvider, ListTripContext };
