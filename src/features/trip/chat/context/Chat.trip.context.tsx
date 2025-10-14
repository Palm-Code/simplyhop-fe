"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ChatTripActions, ChatTripInitialStateType } from "./Chat.trip.types";
import {
  ChatTripCompletedRideReducers,
  ChatTripDriverProfileReducers,
  ChatTripListReducers,
  ChatTripOfferReducers,
  ChatTripRoomReducers,
} from "./Chat.trip.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: ChatTripInitialStateType = {
  list: {
    search: {
      value: "",
    },
    tab: {
      selected: null,
    },
    message: {
      items: [],
      pagination: {
        current: PAGINATION.NUMBER,
        last: null,
      },
    },
  },
  room: {
    id: null,
    booking: {
      status: null,
    },
    header: {
      user_id: null,
      avatar: {
        src: undefined,
        alt: "",
      },
      name: "",
    },
    message: {
      items: [],
      pagination: {
        current: PAGINATION.NUMBER,
        last: null,
        is_refetch: false,
        counter: 0,
      },
    },

    chat: {
      input: {
        value: "",
      },
    },
  },
  offer: {
    is_open: false,
    form: {
      price_offer: {
        value: 0,
      },
      notes: {
        value: "",
      },
    },
    ride: null,
    price: null,
    date: null,
    passenger: null,
  },

  completed_ride: {
    is_open: false,
    booking: null,
    rating: null,
  },

  driver_profile: {
    is_open: false,
    data: null,
  },
};

const ChatTripContext = createContext<{
  state: ChatTripInitialStateType;
  dispatch: Dispatch<ChatTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    list,
    room,
    offer,
    completed_ride,
    driver_profile,
  }: ChatTripInitialStateType,
  action: ChatTripActions
) => ({
  list: ChatTripListReducers(list, action),
  room: ChatTripRoomReducers(room, action),
  offer: ChatTripOfferReducers(offer, action),
  completed_ride: ChatTripCompletedRideReducers(completed_ride, action),
  driver_profile: ChatTripDriverProfileReducers(driver_profile, action),
});

const ChatTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ChatTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ChatTripContext.Provider>
  );
};

export { ChatTripProvider, ChatTripContext };
