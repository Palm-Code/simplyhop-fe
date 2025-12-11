import { FormError } from "@/core/utils/form";
import { RideDetailCardPlanRideTripProps } from "../components/ride_detail_card";
import { MapMode } from "@/core/utils/map/types";

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
export interface PlanRideTripInitialStateType {
  filters: PlanRideTripFilters;
  map: PlanRideTripMap;
  detail: PlanRideTripDetail;
  notification: PlanRideTripNotification;
}

// State Collection Types consist of:
export interface PlanRideTripFilters {
  auto: {
    bottom_sheet: {
      is_open: boolean;
    };
    query: string;
    items: { id: string; name: string }[];
    selected: null | { id: string; name: string };
    data: (RideDetailCardPlanRideTripProps["car"] & { seat: number })[];
  };

  origin: {
    page_sheet: {
      is_open: boolean;
    };
    query: string;
    items: { id: string; name: string; description?: string }[];
    saved_items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
    company_office: {
      checked: boolean;
    };
  };
  destination: {
    page_sheet: {
      is_open: boolean;
    };
    query: string;
    items: { id: string; name: string; description?: string }[];
    saved_items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
    company_office: {
      checked: boolean;
    };
  };
  date: {
    selected: Date | Date[];
  };

  time: {
    value: string;
  };
}

export interface PlanRideTripMap {
  polyline_path: { lat: number; lng: number }[];
  marker: boolean;
  initial_coordinate: { lat: number; lng: number } | null;
  mode: MapMode;
}

export interface PlanRideTripDetail {
  is_open: boolean;
  form: {
    plan: {
      date: {
        selected: Date | Date[];
      };
      time: {
        value: string;
      };
      recurring: {
        selected: null | { id: string; name: string };
      };
      shift: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      umweg: {
        value: string;
        error: FormError;
      };
      seat: {
        value: string;
        error: FormError;
      };
      available_child_seat: {
        value: string;
        error: FormError;
      };
      back_seat: {
        checked: boolean;
      };
    };
    other: {
      price: {
        value: number;
      };
      notes: {
        value: string;
      };
    };
    tnc: {
      checked: boolean;
    };
  };
  distance_matrix: null | {
    distance: {
      text: string;
      value: number;
    };
    duration: {
      text: string;
      value: number;
    };
    duration_in_traffic: {
      text: string;
      value: number;
    };
  };
}

export interface PlanRideTripNotification {
  is_open: boolean;
  share: {
    link: string;
    message: string;
  };
}

export enum PlanRideTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // Map
  SetMapData = "SetMapData",
  // Detail
  SetDetailData = "SetDetailData",
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type PlanRideTripActions =
  | PlanRideTripFiltersActions
  | PlanRideTripMapActions
  | PlanRideTripDetailActions
  | PlanRideTripNotificationActions;

// Action Collection Types consist of:
// Filters
type PlanRideTripFiltersPayload = {
  [PlanRideTripActionEnum.SetFiltersData]: PlanRideTripFilters;
};

export type PlanRideTripFiltersActions =
  ActionMap<PlanRideTripFiltersPayload>[keyof ActionMap<PlanRideTripFiltersPayload>];

// Map
type PlanRideTripMapPayload = {
  [PlanRideTripActionEnum.SetMapData]: PlanRideTripMap;
};

export type PlanRideTripMapActions =
  ActionMap<PlanRideTripMapPayload>[keyof ActionMap<PlanRideTripMapPayload>];

// Detail
type PlanRideTripDetailPayload = {
  [PlanRideTripActionEnum.SetDetailData]: PlanRideTripDetail;
};

export type PlanRideTripDetailActions =
  ActionMap<PlanRideTripDetailPayload>[keyof ActionMap<PlanRideTripDetailPayload>];

// Notification
type PlanRideTripNotificationPayload = {
  [PlanRideTripActionEnum.SetNotificationData]: PlanRideTripNotification;
};

export type PlanRideTripNotificationActions =
  ActionMap<PlanRideTripNotificationPayload>[keyof ActionMap<PlanRideTripNotificationPayload>];
