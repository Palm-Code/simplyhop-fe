import { RideBookingListItemProps } from "@/core/components/ride_booking_list_item";
import { BookingCardProps } from "@/core/components/book_card";
import { BookingDetailCardProps } from "@/core/components/booking_detail_card";
import { CarPriceItemProps } from "@/core/components/car_price_item";
import { TripCardProps } from "@/core/components/trip_card";

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
export interface ListTripInitialStateType {
  filters: ListTripFilters;
  ride: ListTripRide;
  book: ListTripBook;
  detail_ride_notification: ListTripDetailRideNotification;
  delete_ride_notification: ListTripDeleteRideNotification;
  success_delete_ride_notification: ListTripSuccessDeleteRideNotification;
  detail_book_notification: ListTripDetailBookNotification;
  cancel_book_notification: ListTripCancelBookNotification;
  success_cancel_book_notification: ListTripSuccessCancelBookNotification;
  share_ride_notification: ListTripShareRideNotification;
  complete_ride_confirmation: ListTripCompleteRideConfirmation;
}

// State Collection Types consist of:
export interface ListTripFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export interface ListTripRide {
  data: TripCardProps[];
  pagination: {
    current: number;
    last: null | number;
  };
  detail:
    | (TripCardProps & {
        booking: RideBookingListItemProps[];
      })
    | null;
}

export interface ListTripBook {
  data: TripCardProps[];
  pagination: {
    current: number;
    last: null | number;
  };
  detail: (BookingDetailCardProps & { price: CarPriceItemProps }) | null;
}

export interface ListTripDetailRideNotification {
  is_open: boolean;
}

export interface ListTripDeleteRideNotification {
  is_open: boolean;
}

export interface ListTripSuccessDeleteRideNotification {
  is_open: boolean;
}

export interface ListTripShareRideNotification {
  is_open: boolean;
  share: {
    link: string;
    message: string;
  };
}

export interface ListTripDetailBookNotification {
  is_open: boolean;
}

export interface ListTripCancelBookNotification {
  is_open: boolean;
}

export interface ListTripSuccessCancelBookNotification {
  is_open: boolean;
}

export interface ListTripCompleteRideConfirmation {
  is_open: boolean;
  confirmed_booking: {
    id: number;
    type: "joined" | "unjoined";
  }[];
}

export enum ListTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",

  // Ride
  SetRideData = "SetRideData",
  SetRideDataData = "SetRideDataData",
  SetRideDataPaginationCurrent = "SetRideDataPaginationCurrent",
  SetRideDataPaginationLast = "SetRideDataPaginationLast",

  // Book
  SetBookData = "SetBookData",
  SetBookDataData = "SetBookDataData",
  SetBookDataPaginationCurrent = "SetBookDataPaginationCurrent",
  SetBookDataPaginationLast = "SetBookDataPaginationLast",

  // DetailRideNotification
  SetDetailRideNotificationData = "SetDetailRideNotificationData",

  // DeleteRideNotification
  SetDeleteRideNotificationData = "SetDeleteRideNotificationData",

  // SuccessDeleteRideNotification
  SetSuccessDeleteRideNotificationData = "SetSuccessDeleteRideNotificationData",

  // ShareRideNotification
  SetShareRideNotificationData = "SetShareRideNotificationData",

  // DetailBookNotification
  SetDetailBookNotificationData = "SetDetailBookNotificationData",

  // CancelBookNotification
  SetCancelBookNotificationData = "SetCancelBookNotificationData",

  // SuccessCancelBookNotification
  SetSuccessCancelBookNotificationData = "SetSuccessCancelBookNotificationData",

  // CompleteRideConfirmation
  SetCompleteRideConfirmationData = "SetCompleteRideConfirmationData",
}

// Action Collection Types
export type ListTripActions =
  | ListTripFiltersActions
  | ListTripRideActions
  | ListTripBookActions
  | ListTripDetailRideNotificationActions
  | ListTripDeleteRideNotificationActions
  | ListTripSuccessDeleteRideNotificationActions
  | ListTripShareRideNotificationActions
  | ListTripDetailBookNotificationActions
  | ListTripCancelBookNotificationActions
  | ListTripSuccessCancelBookNotificationActions
  | ListTripCompleteRideConfirmationActions;

// Action Collection Types consist of:
// Filters
type ListTripFiltersPayload = {
  [ListTripActionEnum.SetFiltersData]: ListTripFilters;
};

export type ListTripFiltersActions =
  ActionMap<ListTripFiltersPayload>[keyof ActionMap<ListTripFiltersPayload>];

// Ride
type ListTripRidePayload = {
  [ListTripActionEnum.SetRideData]: ListTripRide;
  [ListTripActionEnum.SetRideDataData]: ListTripRide["data"];
  [ListTripActionEnum.SetRideDataPaginationCurrent]: ListTripRide["pagination"]["current"];
  [ListTripActionEnum.SetRideDataPaginationLast]: ListTripRide["pagination"]["last"];
};

export type ListTripRideActions =
  ActionMap<ListTripRidePayload>[keyof ActionMap<ListTripRidePayload>];

// Book
type ListTripBookPayload = {
  [ListTripActionEnum.SetBookData]: ListTripBook;
  [ListTripActionEnum.SetBookDataData]: ListTripBook["data"];
  [ListTripActionEnum.SetBookDataPaginationCurrent]: ListTripBook["pagination"]["current"];
  [ListTripActionEnum.SetBookDataPaginationLast]: ListTripBook["pagination"]["last"];
};

export type ListTripBookActions =
  ActionMap<ListTripBookPayload>[keyof ActionMap<ListTripBookPayload>];

// DetailRideNotification
type ListTripDetailRideNotificationPayload = {
  [ListTripActionEnum.SetDetailRideNotificationData]: ListTripDetailRideNotification;
};

export type ListTripDetailRideNotificationActions =
  ActionMap<ListTripDetailRideNotificationPayload>[keyof ActionMap<ListTripDetailRideNotificationPayload>];

// DeleteRideNotification
type ListTripDeleteRideNotificationPayload = {
  [ListTripActionEnum.SetDeleteRideNotificationData]: ListTripDeleteRideNotification;
};

export type ListTripDeleteRideNotificationActions =
  ActionMap<ListTripDeleteRideNotificationPayload>[keyof ActionMap<ListTripDeleteRideNotificationPayload>];

// SuccessDeleteRideNotification
type ListTripSuccessDeleteRideNotificationPayload = {
  [ListTripActionEnum.SetSuccessDeleteRideNotificationData]: ListTripSuccessDeleteRideNotification;
};

export type ListTripSuccessDeleteRideNotificationActions =
  ActionMap<ListTripSuccessDeleteRideNotificationPayload>[keyof ActionMap<ListTripSuccessDeleteRideNotificationPayload>];

// ShareRideNotification
type ListTripShareRideNotificationPayload = {
  [ListTripActionEnum.SetShareRideNotificationData]: ListTripShareRideNotification;
};

export type ListTripShareRideNotificationActions =
  ActionMap<ListTripShareRideNotificationPayload>[keyof ActionMap<ListTripShareRideNotificationPayload>];

// DetailBookNotification
type ListTripDetailBookNotificationPayload = {
  [ListTripActionEnum.SetDetailBookNotificationData]: ListTripDetailBookNotification;
};

export type ListTripDetailBookNotificationActions =
  ActionMap<ListTripDetailBookNotificationPayload>[keyof ActionMap<ListTripDetailBookNotificationPayload>];

// CancelBookNotification
type ListTripCancelBookNotificationPayload = {
  [ListTripActionEnum.SetCancelBookNotificationData]: ListTripCancelBookNotification;
};

export type ListTripCancelBookNotificationActions =
  ActionMap<ListTripCancelBookNotificationPayload>[keyof ActionMap<ListTripCancelBookNotificationPayload>];

// SuccessCancelBookNotification
type ListTripSuccessCancelBookNotificationPayload = {
  [ListTripActionEnum.SetSuccessCancelBookNotificationData]: ListTripSuccessCancelBookNotification;
};

export type ListTripSuccessCancelBookNotificationActions =
  ActionMap<ListTripSuccessCancelBookNotificationPayload>[keyof ActionMap<ListTripSuccessCancelBookNotificationPayload>];

// CompleteRideConfirmation
type ListTripCompleteRideConfirmationPayload = {
  [ListTripActionEnum.SetCompleteRideConfirmationData]: ListTripCompleteRideConfirmation;
};

export type ListTripCompleteRideConfirmationActions =
  ActionMap<ListTripCompleteRideConfirmationPayload>[keyof ActionMap<ListTripCompleteRideConfirmationPayload>];
