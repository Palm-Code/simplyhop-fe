import { AvatarProps } from "@/core/components/avatar";
import { BookingCardChatTripProps } from "../components/booking_card";
import { RideDetailCardChatTripProps } from "../components/ride_detail_card";
import { PriceCardChatTripProps } from "../components/price_card";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface ChatTripInitialStateType {
  list: ChatTripList;
  room: ChatTripRoom;
  offer: ChatTripOffer;
}

// State Collection Types consist of:
export interface ChatTripList {
  search: {
    value: string;
  };
  tab: {
    selected: { id: string; name: string } | null;
  };
  message: {
    items: {
      id: string;
      booking_id: string;
      avatar: AvatarProps;
      name: string;
      message: string;
      date: string;
      isNew: boolean;
      booking_status: string | null;
    }[];
    pagination: {
      current: number;
      last: null | number;
    };
  };
}

export interface ChatTripRoom {
  id: number | null;
  header: {
    name: string;
    avatar: AvatarProps;
  };
  booking: {
    status: string | null;
  };
  message: {
    items: {
      id: string;
      type: string;
      role: string;
      sender_id: string;
      time: string;
      name: string;
      date: string;
      avatar: AvatarProps;
      message: string;
      booking: BookingCardChatTripProps | null;
    }[];
    pagination: {
      current: number;
      last: null | number;
      is_refetch: boolean;
      counter: number;
    };
  };
  chat: {
    input: {
      value: string;
    };
  };
}

export interface ChatTripOffer {
  is_open: boolean;
  form: {
    price_offer: {
      value: number;
    };
    notes: {
      value: string;
    };
  };
  ride: null | RideDetailCardChatTripProps;
  price: null | PriceCardChatTripProps;
  date: null | { label: string; date: string };
  passenger: null | {
    adult: number;
    children: number;
  };
}

export enum ChatTripActionEnum {
  // List
  SetListData = "SetListData",
  SetListMessageItems = "SetListMessageItems",
  SetListMessagePaginationCurrent = "SetListMessagePaginationCurrent",
  SetListMessagePaginationLast = "SetListMessagePaginationLast",
  // Room
  SetRoomData = "SetRoomData",
  SetRoomBookingStatus = "SetRoomBookingStatus",
  SetRoomMessageItems = "SetRoomMessageItems",
  SetRoomMessagePaginationCurrent = "SetRoomMessagePaginationCurrent",
  SetRoomMessagePaginationLast = "SetRoomMessagePaginationLast",
  SetRoomMessagePaginationIsRefetch = "SetRoomMessagePaginationIsRefetch",
  SetRoomMessagePaginationCounter = "SetRoomMessagePaginationCounter",
  // Offer
  SetOfferData = "SetOfferData",
}

// Action Collection Types
export type ChatTripActions =
  | ChatTripListActions
  | ChatTripRoomActions
  | ChatTripOfferActions;

// Action Collection Types consist of:
// List
type ChatTripListPayload = {
  [ChatTripActionEnum.SetListData]: ChatTripList;
  [ChatTripActionEnum.SetListMessageItems]: ChatTripList["message"]["items"];
  [ChatTripActionEnum.SetListMessagePaginationCurrent]: ChatTripList["message"]["pagination"]["current"];
  [ChatTripActionEnum.SetListMessagePaginationLast]: ChatTripList["message"]["pagination"]["last"];
};

export type ChatTripListActions =
  ActionMap<ChatTripListPayload>[keyof ActionMap<ChatTripListPayload>];

// Room
type ChatTripRoomPayload = {
  [ChatTripActionEnum.SetRoomData]: ChatTripRoom;
  [ChatTripActionEnum.SetRoomBookingStatus]: ChatTripRoom["booking"]["status"];
  [ChatTripActionEnum.SetRoomMessageItems]: ChatTripRoom["message"]["items"];
  [ChatTripActionEnum.SetRoomMessagePaginationCurrent]: ChatTripRoom["message"]["pagination"]["current"];
  [ChatTripActionEnum.SetRoomMessagePaginationLast]: ChatTripRoom["message"]["pagination"]["last"];
  [ChatTripActionEnum.SetRoomMessagePaginationIsRefetch]: ChatTripRoom["message"]["pagination"]["is_refetch"];
  [ChatTripActionEnum.SetRoomMessagePaginationCounter]: ChatTripRoom["message"]["pagination"]["counter"];
};

export type ChatTripRoomActions =
  ActionMap<ChatTripRoomPayload>[keyof ActionMap<ChatTripRoomPayload>];

// Offer
type ChatTripOfferPayload = {
  [ChatTripActionEnum.SetOfferData]: ChatTripOffer;
};

export type ChatTripOfferActions =
  ActionMap<ChatTripOfferPayload>[keyof ActionMap<ChatTripOfferPayload>];
