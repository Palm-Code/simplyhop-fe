import { FormError } from "@/core/utils/form";
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
export interface CreateOrganizationInitialStateType {
  company_data: CreateOrganizationCompanyData;
  company_office: CreateOrganizationCompanyOffice;
  pin_point: CreateOrganizationPinPoint;
  pin_point_delete_confirmation: CreateOrganizationPinPointDeleteConfirmation;
  notification: CreateOrganizationNotification;
}

// State Collection Types consist of:
export interface CreateOrganizationCompanyData {
  form: {
    company_type: {
      selected: null | { id: string; name: string; description: string };
    };
    domain: {
      value: string;
      error: FormError;
    };
    company_code: {
      value: string;
      error: FormError;
    };
    admin_email: {
      value: string;
      error: FormError;
    };
    company_name: {
      value: string;
      error: FormError;
    };
    telephone: {
      value: string;
      error: FormError;
    };
    responsible_person: {
      first_name: {
        value: string;
        error: FormError;
      };
      last_name: {
        value: string;
        error: FormError;
      };
    };
    address: {
      address_1: {
        value: string;
        error: FormError;
      };
      address_2: {
        value: string;
        error: FormError;
      };
      zip_code: {
        value: string;
        error: FormError;
      };
      city: {
        value: string;
        error: FormError;
      };
    };
  };
}

export interface CreateOrganizationCompanyOffice {
  form: {
    address_name: {
      value: string;
      error: FormError;
    };
    address_1: {
      value: string;
      error: FormError;
    };
    address_2: {
      value: string;
      error: FormError;
    };
    zip_code: {
      value: string;
      error: FormError;
    };
    city: {
      value: string;
      error: FormError;
    };
    pin_point: {
      value: {
        lat: number;
        lng: number;
        location_1: string;
        location_2: string;
      } | null;
    };
    mode: "initial" | "edit" | "view";
  }[];
}

export interface CreateOrganizationPinPoint {
  is_open: boolean;
  index: number | null;
  location: {
    items: { id: string; name: string }[];
    query: string;
    selected: {
      item: null | { id: string; name: string; description: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  map: {
    marker: boolean;
    initial_coordinate: { lat: number; lng: number } | null;
    mode: MapMode;
  };
}

export interface CreateOrganizationPinPointDeleteConfirmation {
  is_open: boolean;
  index: number | null;
}

export interface CreateOrganizationNotification {
  is_open: boolean;
}

export enum CreateOrganizationActionEnum {
  // CompanyData
  SetCompanyDataData = "SetCompanyDataData",
  // CompanyOffice
  SetCompanyOfficeData = "SetCompanyOfficeData",
  // PinPoint
  SetPinPointData = "SetPinPointData",
  // PinPointDeleteConfirmation
  SetPinPointDeleteConfirmationData = "SetPinPointDeleteConfirmationData",
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type CreateOrganizationActions =
  | CreateOrganizationCompanyDataActions
  | CreateOrganizationCompanyOfficeActions
  | CreateOrganizationPinPointActions
  | CreateOrganizationPinPointDeleteConfirmationActions
  | CreateOrganizationNotificationActions;

// Action Collection Types consist of:
// CompanyData
type CreateOrganizationCompanyDataPayload = {
  [CreateOrganizationActionEnum.SetCompanyDataData]: CreateOrganizationCompanyData;
};

export type CreateOrganizationCompanyDataActions =
  ActionMap<CreateOrganizationCompanyDataPayload>[keyof ActionMap<CreateOrganizationCompanyDataPayload>];

// CompanyOffice
type CreateOrganizationCompanyOfficePayload = {
  [CreateOrganizationActionEnum.SetCompanyOfficeData]: CreateOrganizationCompanyOffice;
};

export type CreateOrganizationCompanyOfficeActions =
  ActionMap<CreateOrganizationCompanyOfficePayload>[keyof ActionMap<CreateOrganizationCompanyOfficePayload>];

// PinPoint
type CreateOrganizationPinPointPayload = {
  [CreateOrganizationActionEnum.SetPinPointData]: CreateOrganizationPinPoint;
};

export type CreateOrganizationPinPointActions =
  ActionMap<CreateOrganizationPinPointPayload>[keyof ActionMap<CreateOrganizationPinPointPayload>];

// PinPointDeleteConfirmation
type CreateOrganizationPinPointDeleteConfirmationPayload = {
  [CreateOrganizationActionEnum.SetPinPointDeleteConfirmationData]: CreateOrganizationPinPointDeleteConfirmation;
};

export type CreateOrganizationPinPointDeleteConfirmationActions =
  ActionMap<CreateOrganizationPinPointDeleteConfirmationPayload>[keyof ActionMap<CreateOrganizationPinPointDeleteConfirmationPayload>];

// Notification
type CreateOrganizationNotificationPayload = {
  [CreateOrganizationActionEnum.SetNotificationData]: CreateOrganizationNotification;
};

export type CreateOrganizationNotificationActions =
  ActionMap<CreateOrganizationNotificationPayload>[keyof ActionMap<CreateOrganizationNotificationPayload>];
