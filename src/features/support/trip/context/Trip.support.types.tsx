import { RideBookingListItemProps } from "@/core/components/ride_booking_list_item";
import { BookCardTripSupportProps } from "../components/book_card";
import { RideCardTripSupportProps } from "../components/ride_card";
import { BookDetailCardTripSupportProps } from "../components/book_detail_card";
import { CarPriceItemProps } from "@/core/components/car_price_item";

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
export interface TripSupportInitialStateType {
  filters: TripSupportFilters;
  ride: TripSupportRide;
  book: TripSupportBook;
  detail_ride_notification: TripSupportDetailRideNotification;
  delete_ride_notification: TripSupportDeleteRideNotification;
  success_delete_ride_notification: TripSupportSuccessDeleteRideNotification;
  detail_book_notification: TripSupportDetailBookNotification;
  cancel_book_notification: TripSupportCancelBookNotification;
  success_cancel_book_notification: TripSupportSuccessCancelBookNotification;
  share_ride_notification: TripSupportShareRideNotification;
  complete_ride_confirmation: TripSupportCompleteRideConfirmation;
}

// State Collection Types consist of:
export interface TripSupportFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export interface TripSupportRide {
  data: RideCardTripSupportProps[];
  pagination: {
    current: number;
    last: null | number;
  };
  detail:
    | (RideCardTripSupportProps & {
        booking: RideBookingListItemProps[];
      })
    | null;
}

export interface TripSupportBook {
  data: BookCardTripSupportProps[];
  pagination: {
    current: number;
    last: null | number;
  };
  detail:
    | (BookDetailCardTripSupportProps & { price: CarPriceItemProps })
    | null;
}

export interface TripSupportDetailRideNotification {
  is_open: boolean;
}

export interface TripSupportDeleteRideNotification {
  is_open: boolean;
}

export interface TripSupportSuccessDeleteRideNotification {
  is_open: boolean;
}

export interface TripSupportShareRideNotification {
  is_open: boolean;
  share: {
    link: string;
    message: string;
  };
}

export interface TripSupportDetailBookNotification {
  is_open: boolean;
}

export interface TripSupportCancelBookNotification {
  is_open: boolean;
}

export interface TripSupportSuccessCancelBookNotification {
  is_open: boolean;
}

export interface TripSupportCompleteRideConfirmation {
  is_open: boolean;
  confirmed_booking: {
    id: number;
    type: "joined" | "unjoined";
  }[];
}

export enum TripSupportActionEnum {
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
export type TripSupportActions =
  | TripSupportFiltersActions
  | TripSupportRideActions
  | TripSupportBookActions
  | TripSupportDetailRideNotificationActions
  | TripSupportDeleteRideNotificationActions
  | TripSupportSuccessDeleteRideNotificationActions
  | TripSupportShareRideNotificationActions
  | TripSupportDetailBookNotificationActions
  | TripSupportCancelBookNotificationActions
  | TripSupportSuccessCancelBookNotificationActions
  | TripSupportCompleteRideConfirmationActions;

// Action Collection Types consist of:
// Filters
type TripSupportFiltersPayload = {
  [TripSupportActionEnum.SetFiltersData]: TripSupportFilters;
};

export type TripSupportFiltersActions =
  ActionMap<TripSupportFiltersPayload>[keyof ActionMap<TripSupportFiltersPayload>];

// Ride
type TripSupportRidePayload = {
  [TripSupportActionEnum.SetRideData]: TripSupportRide;
  [TripSupportActionEnum.SetRideDataData]: TripSupportRide["data"];
  [TripSupportActionEnum.SetRideDataPaginationCurrent]: TripSupportRide["pagination"]["current"];
  [TripSupportActionEnum.SetRideDataPaginationLast]: TripSupportRide["pagination"]["last"];
};

export type TripSupportRideActions =
  ActionMap<TripSupportRidePayload>[keyof ActionMap<TripSupportRidePayload>];

// Book
type TripSupportBookPayload = {
  [TripSupportActionEnum.SetBookData]: TripSupportBook;
  [TripSupportActionEnum.SetBookDataData]: TripSupportBook["data"];
  [TripSupportActionEnum.SetBookDataPaginationCurrent]: TripSupportBook["pagination"]["current"];
  [TripSupportActionEnum.SetBookDataPaginationLast]: TripSupportBook["pagination"]["last"];
};

export type TripSupportBookActions =
  ActionMap<TripSupportBookPayload>[keyof ActionMap<TripSupportBookPayload>];

// DetailRideNotification
type TripSupportDetailRideNotificationPayload = {
  [TripSupportActionEnum.SetDetailRideNotificationData]: TripSupportDetailRideNotification;
};

export type TripSupportDetailRideNotificationActions =
  ActionMap<TripSupportDetailRideNotificationPayload>[keyof ActionMap<TripSupportDetailRideNotificationPayload>];

// DeleteRideNotification
type TripSupportDeleteRideNotificationPayload = {
  [TripSupportActionEnum.SetDeleteRideNotificationData]: TripSupportDeleteRideNotification;
};

export type TripSupportDeleteRideNotificationActions =
  ActionMap<TripSupportDeleteRideNotificationPayload>[keyof ActionMap<TripSupportDeleteRideNotificationPayload>];

// SuccessDeleteRideNotification
type TripSupportSuccessDeleteRideNotificationPayload = {
  [TripSupportActionEnum.SetSuccessDeleteRideNotificationData]: TripSupportSuccessDeleteRideNotification;
};

export type TripSupportSuccessDeleteRideNotificationActions =
  ActionMap<TripSupportSuccessDeleteRideNotificationPayload>[keyof ActionMap<TripSupportSuccessDeleteRideNotificationPayload>];

// ShareRideNotification
type TripSupportShareRideNotificationPayload = {
  [TripSupportActionEnum.SetShareRideNotificationData]: TripSupportShareRideNotification;
};

export type TripSupportShareRideNotificationActions =
  ActionMap<TripSupportShareRideNotificationPayload>[keyof ActionMap<TripSupportShareRideNotificationPayload>];

// DetailBookNotification
type TripSupportDetailBookNotificationPayload = {
  [TripSupportActionEnum.SetDetailBookNotificationData]: TripSupportDetailBookNotification;
};

export type TripSupportDetailBookNotificationActions =
  ActionMap<TripSupportDetailBookNotificationPayload>[keyof ActionMap<TripSupportDetailBookNotificationPayload>];

// CancelBookNotification
type TripSupportCancelBookNotificationPayload = {
  [TripSupportActionEnum.SetCancelBookNotificationData]: TripSupportCancelBookNotification;
};

export type TripSupportCancelBookNotificationActions =
  ActionMap<TripSupportCancelBookNotificationPayload>[keyof ActionMap<TripSupportCancelBookNotificationPayload>];

// SuccessCancelBookNotification
type TripSupportSuccessCancelBookNotificationPayload = {
  [TripSupportActionEnum.SetSuccessCancelBookNotificationData]: TripSupportSuccessCancelBookNotification;
};

export type TripSupportSuccessCancelBookNotificationActions =
  ActionMap<TripSupportSuccessCancelBookNotificationPayload>[keyof ActionMap<TripSupportSuccessCancelBookNotificationPayload>];

// CompleteRideConfirmation
type TripSupportCompleteRideConfirmationPayload = {
  [TripSupportActionEnum.SetCompleteRideConfirmationData]: TripSupportCompleteRideConfirmation;
};

export type TripSupportCompleteRideConfirmationActions =
  ActionMap<TripSupportCompleteRideConfirmationPayload>[keyof ActionMap<TripSupportCompleteRideConfirmationPayload>];
