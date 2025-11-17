import { FormError } from "@/core/utils/form";

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
export interface VehicleUpdateSupportInitialStateType {
  vehicle_information: VehicleUpdateSupportVehicleInformation;
  notification: VehicleUpdateSupportNotification;
  delete_notification: VehicleUpdateSupportDeleteNotification;
  success_delete_notification: VehicleUpdateSupportSuccessDeleteNotification;
}

// State Collection Types consist of:

export interface VehicleUpdateSupportVehicleInformation {
  general: {
    form: {
      car_brand: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
        error: FormError;
        query: string;
      };
      car_category: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
        error: FormError;
        query: string;
      };
      car_model: {
        value: string;
        error: FormError;
      };
      car_color: {
        value: string;
        error: FormError;
      };
      license_plate: {
        value: string;
        error: FormError;
      };
    };
  };
  pictures: {
    files: ({ id: string; image_url: string } | File)[];
  };
  capacity: {
    passenger_seats: {
      form: {
        available_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        available_car_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
      };
    };
    luggage: {
      form: {
        luggage: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        luggage_size: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
      };
    };
  };
  trip: {
    form: {
      smoking: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      music: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      pet: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
    };
  };
}

export interface VehicleUpdateSupportNotification {
  is_open: boolean;
}

export interface VehicleUpdateSupportDeleteNotification {
  is_open: boolean;
}

export interface VehicleUpdateSupportSuccessDeleteNotification {
  is_open: boolean;
}

export enum VehicleUpdateSupportActionEnum {
  // VehicleInformation
  SetVehicleInformationData = "SetVehicleInformationData",
  SetVehicleInformationCarBrandItems = "SetVehicleInformationCarBrandItems",
  SetVehicleInformationCarCategoryItems = "SetVehicleInformationCarCategoryItems",
  // Notification
  SetNotificationData = "SetNotificationData",
  // DeleteNotification
  SetDeleteNotificationData = "SetDeleteNotificationData",
  // SuccessDeleteNotification
  SetSuccessDeleteNotificationData = "SetSuccessDeleteNotificationData",
}

// Action Collection Types
export type VehicleUpdateSupportActions =
  | VehicleUpdateSupportVehicleInformationActions
  | VehicleUpdateSupportNotificationActions
  | VehicleUpdateSupportDeleteNotificationActions
  | VehicleUpdateSupportSuccessDeleteNotificationActions;

// Action Collection Types consist of:

// VehicleInformation
type VehicleUpdateSupportVehicleInformationPayload = {
  [VehicleUpdateSupportActionEnum.SetVehicleInformationData]: VehicleUpdateSupportVehicleInformation;
  [VehicleUpdateSupportActionEnum.SetVehicleInformationCarBrandItems]: VehicleUpdateSupportVehicleInformation["general"]["form"]["car_brand"]["items"];
  [VehicleUpdateSupportActionEnum.SetVehicleInformationCarCategoryItems]: VehicleUpdateSupportVehicleInformation["general"]["form"]["car_category"]["items"];
};

export type VehicleUpdateSupportVehicleInformationActions =
  ActionMap<VehicleUpdateSupportVehicleInformationPayload>[keyof ActionMap<VehicleUpdateSupportVehicleInformationPayload>];

// Notification
type VehicleUpdateSupportNotificationPayload = {
  [VehicleUpdateSupportActionEnum.SetNotificationData]: VehicleUpdateSupportNotification;
};

export type VehicleUpdateSupportNotificationActions =
  ActionMap<VehicleUpdateSupportNotificationPayload>[keyof ActionMap<VehicleUpdateSupportNotificationPayload>];

// DeleteNotification
type VehicleUpdateSupportDeleteNotificationPayload = {
  [VehicleUpdateSupportActionEnum.SetDeleteNotificationData]: VehicleUpdateSupportDeleteNotification;
};

export type VehicleUpdateSupportDeleteNotificationActions =
  ActionMap<VehicleUpdateSupportDeleteNotificationPayload>[keyof ActionMap<VehicleUpdateSupportDeleteNotificationPayload>];

// SuccessDeleteNotification
type VehicleUpdateSupportSuccessDeleteNotificationPayload = {
  [VehicleUpdateSupportActionEnum.SetSuccessDeleteNotificationData]: VehicleUpdateSupportSuccessDeleteNotification;
};

export type VehicleUpdateSupportSuccessDeleteNotificationActions =
  ActionMap<VehicleUpdateSupportSuccessDeleteNotificationPayload>[keyof ActionMap<VehicleUpdateSupportSuccessDeleteNotificationPayload>];
