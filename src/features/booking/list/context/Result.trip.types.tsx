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
export interface ResultTripInitialStateType {
  filters: ResultTripFilters;
  vehicle_filters: ResultTripVehicleFilters;
  advanced_filter: ResultTripAdvancedFilter;
  rides: ResultTripRides;
  detail: ResultTripDetail;
  notification: ResultTripNotification;
}

// State Collection Types consist of:
export interface ResultTripFilters {
  is_open: boolean;
  origin: {
    page_sheet: {
      is_open: boolean;
    };
    query: string;
    items: { id: string; name: string }[];
    saved_items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  destination: {
    page_sheet: {
      is_open: boolean;
    };
    query: string;
    items: { id: string; name: string }[];
    saved_items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  date: {
    mode: "single" | "multiple";
    selected: Date | Date[];
  };

  passenger: {
    car_seat: {
      checked: boolean;
    };
    value: { id: string; value: number }[];
  };
}

export interface ResultTripVehicleFilters {
  is_open: boolean;
  luggage: {
    selected: { id: string; name: string }[];
  };
  smoker: {
    selected: { id: string; name: string }[];
  };
  music: {
    selected: { id: string; name: string }[];
  };
  pets: {
    selected: { id: string; name: string }[];
  };
  driver_gender: {
    selected: { id: string; name: string }[];
  };
  shift: {
    selected: { id: string; name: string }[];
    items: { id: string; name: string }[];
  };
  sort: {
    selected: null | { id: string; name: string };
  };
}

export interface ResultTripAdvancedFilter {
  luggage: {
    selected: { id: string; name: string }[];
  };
  smoker: {
    selected: { id: string; name: string }[];
  };
  music: {
    selected: { id: string; name: string }[];
  };
  pets: {
    selected: { id: string; name: string }[];
  };
  driver_gender: {
    selected: { id: string; name: string }[];
  };
  shift: {
    selected: { id: string; name: string }[];
    items: { id: string; name: string }[];
  };
  sort: {
    selected: null | { id: string; name: string };
  };
}

export interface ResultTripRides {
  data: TripCardProps[];
  pagination: {
    current: number;
    last: null | number;
  };
}

export interface ResultTripDetail {
  is_open: boolean;
  data: TripCardProps | null;
  form: {
    price_offer: {
      value: number;
    };
    notes: {
      value: string;
    };
  };
}

export interface ResultTripNotification {
  is_open: boolean;
}

export enum ResultTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // VehicleFilters
  SetVehicleFiltersData = "SetVehicleFiltersData",
  // AdvancedFilter
  SetAdvancedFilterData = "SetAdvancedFilterData",
  // Rides
  SetRidesData = "SetRidesData",
  SetRidesDataData = "SetRidesDataData",
  SetRidesDataPaginationCurrent = "SetRidesDataPaginationCurrent",
  SetRidesDataPaginationLast = "SetRidesDataPaginationLast",
  // Detail
  SetDetailData = "SetDetailData",
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type ResultTripActions =
  | ResultTripFiltersActions
  | ResultTripVehicleFiltersActions
  | ResultTripAdvancedFilterActions
  | ResultTripRidesActions
  | ResultTripDetailActions
  | ResultTripNotificationActions;

// Action Collection Types consist of:
// Filters
type ResultTripFiltersPayload = {
  [ResultTripActionEnum.SetFiltersData]: ResultTripFilters;
};

export type ResultTripFiltersActions =
  ActionMap<ResultTripFiltersPayload>[keyof ActionMap<ResultTripFiltersPayload>];

// VehicleFilters
type ResultTripVehicleFiltersPayload = {
  [ResultTripActionEnum.SetVehicleFiltersData]: ResultTripVehicleFilters;
};

export type ResultTripVehicleFiltersActions =
  ActionMap<ResultTripVehicleFiltersPayload>[keyof ActionMap<ResultTripVehicleFiltersPayload>];

// AdvancedFilter
type ResultTripAdvancedFilterPayload = {
  [ResultTripActionEnum.SetAdvancedFilterData]: ResultTripAdvancedFilter;
};

export type ResultTripAdvancedFilterActions =
  ActionMap<ResultTripAdvancedFilterPayload>[keyof ActionMap<ResultTripAdvancedFilterPayload>];

// Rides
type ResultTripRidesPayload = {
  [ResultTripActionEnum.SetRidesData]: ResultTripRides;
  [ResultTripActionEnum.SetRidesDataData]: ResultTripRides["data"];
  [ResultTripActionEnum.SetRidesDataPaginationCurrent]: ResultTripRides["pagination"]["current"];
  [ResultTripActionEnum.SetRidesDataPaginationLast]: ResultTripRides["pagination"]["last"];
};

export type ResultTripRidesActions =
  ActionMap<ResultTripRidesPayload>[keyof ActionMap<ResultTripRidesPayload>];

// Detail
type ResultTripDetailPayload = {
  [ResultTripActionEnum.SetDetailData]: ResultTripDetail;
};

export type ResultTripDetailActions =
  ActionMap<ResultTripDetailPayload>[keyof ActionMap<ResultTripDetailPayload>];

// Notification
type ResultTripNotificationPayload = {
  [ResultTripActionEnum.SetNotificationData]: ResultTripNotification;
};

export type ResultTripNotificationActions =
  ActionMap<ResultTripNotificationPayload>[keyof ActionMap<ResultTripNotificationPayload>];
