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
export interface VehicleCreateSupportInitialStateType {
  vehicle_information: VehicleCreateSupportVehicleInformation;
  notification: VehicleCreateSupportNotification;
}

// State Collection Types consist of:

export interface VehicleCreateSupportVehicleInformation {
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

export interface VehicleCreateSupportNotification {
  is_open: boolean;
}

export enum VehicleCreateSupportActionEnum {
  // VehicleInformation
  SetVehicleInformationData = "SetVehicleInformationData",
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type VehicleCreateSupportActions =
  | VehicleCreateSupportVehicleInformationActions
  | VehicleCreateSupportNotificationActions;

// Action Collection Types consist of:

// VehicleInformation
type VehicleCreateSupportVehicleInformationPayload = {
  [VehicleCreateSupportActionEnum.SetVehicleInformationData]: VehicleCreateSupportVehicleInformation;
};

export type VehicleCreateSupportVehicleInformationActions =
  ActionMap<VehicleCreateSupportVehicleInformationPayload>[keyof ActionMap<VehicleCreateSupportVehicleInformationPayload>];

// Notification
type VehicleCreateSupportNotificationPayload = {
  [VehicleCreateSupportActionEnum.SetNotificationData]: VehicleCreateSupportNotification;
};

export type VehicleCreateSupportNotificationActions =
  ActionMap<VehicleCreateSupportNotificationPayload>[keyof ActionMap<VehicleCreateSupportNotificationPayload>];
