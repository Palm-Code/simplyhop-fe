"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ChatTripActions, ChatTripInitialStateType } from "./Chat.trip.types";
import {
  ChatTripBlockConfirmationReducers,
  ChatTripCompletedRideReducers,
  ChatTripDeleteChatConfirmationReducers,
  ChatTripDriverProfileReducers,
  ChatTripListReducers,
  ChatTripOfferReducers,
  ChatTripRoomReducers,
  ChatTripUnblockConfirmationReducers,
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
    is_blocked: false,
    is_rated: false,
    rating: null,
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
    is_rated: false,
  },

  driver_profile: {
    is_open: false,
    data: null,
  },

  block_confirmation: {
    is_open: false,
  },

  unblock_confirmation: {
    is_open: false,
  },

  delete_chat_confirmation: {
    is_open: false,
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
    block_confirmation,
    unblock_confirmation,
    delete_chat_confirmation,
  }: ChatTripInitialStateType,
  action: ChatTripActions
) => ({
  list: ChatTripListReducers(list, action),
  room: ChatTripRoomReducers(room, action),
  offer: ChatTripOfferReducers(offer, action),
  completed_ride: ChatTripCompletedRideReducers(completed_ride, action),
  driver_profile: ChatTripDriverProfileReducers(driver_profile, action),
  block_confirmation: ChatTripBlockConfirmationReducers(
    block_confirmation,
    action
  ),
  unblock_confirmation: ChatTripUnblockConfirmationReducers(
    unblock_confirmation,
    action
  ),
  delete_chat_confirmation: ChatTripDeleteChatConfirmationReducers(
    delete_chat_confirmation,
    action
  ),
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
