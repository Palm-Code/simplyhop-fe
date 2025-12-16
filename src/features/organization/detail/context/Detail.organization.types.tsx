import { DashboardRideCardProps } from "@/core/components/dashboard_ride_card";
import {
  GetDashboardOrganizationSuccessDataResponseInterface,
  GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface,
  GetDashboardSuperAdminSuccessDataResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
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
export interface DetailOrganizationInitialStateType {
  profile: DetailOrganizationProfile;
  ride: DetailOrganizationRide;
  driver: DetailOrganizationDriver;
  delete_account_confirmation: DetailOrganizationDeleteAccountConfirmation;
  edit: DetailOrganizationEdit;
  company_data: DetailOrganizationCompanyData;
  company_office: DetailOrganizationCompanyOffice;
  pin_point: DetailOrganizationPinPoint;
  pin_point_delete_confirmation: DetailOrganizationPinPointDeleteConfirmation;
  notification: DetailOrganizationNotification;
}

export interface DetailOrganizationProfile {
  data: null | GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;
  loading: {
    is_fetching: boolean;
  };
}

export interface DetailOrganizationRide {
  data: DashboardRideCardProps[] | null;
  loading: {
    is_fetching: boolean;
  };
}

export interface DetailOrganizationDriver {
  data: GetDashboardOrganizationSuccessDataResponseInterface[] | null;
  pagination: {
    limit: number;
    current_page: number;
  };
  loading: {
    is_fetching: boolean;
  };
}

export type DetailOrganizationItem =
  GetDashboardSuperAdminSuccessDataResponseInterface;

export interface DetailOrganizationDeleteAccountConfirmation {
  is_open: boolean;
}

export interface DetailOrganizationEdit {
  is_open: boolean;
}

export interface DetailOrganizationCompanyData {
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
    pictures: {
      files: ({ id: string; image_url: string } | File)[];
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

export interface DetailOrganizationCompanyOffice {
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
    id?: number;
  }[];
}

export interface DetailOrganizationPinPoint {
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

export interface DetailOrganizationPinPointDeleteConfirmation {
  is_open: boolean;
  index: number | null;
}

export interface DetailOrganizationNotification {
  is_open: boolean;
}

export enum DetailOrganizationActionEnum {
  // Profile
  SetProfileData = "SetProfileData",
  SetProfileDataData = "SetProfileDataData",
  SetProfileLoadingData = "SetProfileLoadingData",

  // Ride
  SetRideData = "SetRideData",
  SetRideDataData = "SetRideDataData",
  SetRideLoadingData = "SetRideLoadingData",

  // Driver
  SetDriverData = "SetDriverData",
  SetDriverDataData = "SetDriverDataData",
  SetDriverLoadingData = "SetDriverLoadingData",
  SetDriverPaginationData = "SetDriverPaginationData",

  // DeleteAccountConfirmation
  SetDeleteAccountConfirmationData = "SetDeleteAccountConfirmationData",

  // Edit
  SetEditData = "SetEditData",
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
export type DetailOrganizationActions =
  | DetailOrganizationProfileActions
  | DetailOrganizationRideActions
  | DetailOrganizationDriverActions
  | DetailOrganizationDeleteAccountConfirmationActions
  | DetailOrganizationEditActions
  | DetailOrganizationCompanyDataActions
  | DetailOrganizationCompanyOfficeActions
  | DetailOrganizationPinPointActions
  | DetailOrganizationPinPointDeleteConfirmationActions
  | DetailOrganizationNotificationActions;

// Action Collection Types consist of:

// Profile
type DetailOrganizationProfilePayload = {
  [DetailOrganizationActionEnum.SetProfileData]: DetailOrganizationProfile;
  [DetailOrganizationActionEnum.SetProfileDataData]: DetailOrganizationProfile["data"];
  [DetailOrganizationActionEnum.SetProfileLoadingData]: DetailOrganizationProfile["loading"];
};

export type DetailOrganizationProfileActions =
  ActionMap<DetailOrganizationProfilePayload>[keyof ActionMap<DetailOrganizationProfilePayload>];

// Ride
type DetailOrganizationRidePayload = {
  [DetailOrganizationActionEnum.SetRideData]: DetailOrganizationRide;
  [DetailOrganizationActionEnum.SetRideDataData]: DetailOrganizationRide["data"];
  [DetailOrganizationActionEnum.SetRideLoadingData]: DetailOrganizationRide["loading"];
};

export type DetailOrganizationRideActions =
  ActionMap<DetailOrganizationRidePayload>[keyof ActionMap<DetailOrganizationRidePayload>];

// Driver
type DetailOrganizationDriverPayload = {
  [DetailOrganizationActionEnum.SetDriverData]: DetailOrganizationDriver;
  [DetailOrganizationActionEnum.SetDriverDataData]: DetailOrganizationDriver["data"];
  [DetailOrganizationActionEnum.SetDriverLoadingData]: DetailOrganizationDriver["loading"];
  [DetailOrganizationActionEnum.SetDriverPaginationData]: DetailOrganizationDriver["pagination"];
};

export type DetailOrganizationDriverActions =
  ActionMap<DetailOrganizationDriverPayload>[keyof ActionMap<DetailOrganizationDriverPayload>];

// DeleteAccountConfirmation
type DetailOrganizationDeleteAccountConfirmationPayload = {
  [DetailOrganizationActionEnum.SetDeleteAccountConfirmationData]: DetailOrganizationDeleteAccountConfirmation;
};

export type DetailOrganizationDeleteAccountConfirmationActions =
  ActionMap<DetailOrganizationDeleteAccountConfirmationPayload>[keyof ActionMap<DetailOrganizationDeleteAccountConfirmationPayload>];

// Edit
type DetailOrganizationEditPayload = {
  [DetailOrganizationActionEnum.SetEditData]: DetailOrganizationEdit;
};

export type DetailOrganizationEditActions =
  ActionMap<DetailOrganizationEditPayload>[keyof ActionMap<DetailOrganizationEditPayload>];

// CompanyData
type DetailOrganizationCompanyDataPayload = {
  [DetailOrganizationActionEnum.SetCompanyDataData]: DetailOrganizationCompanyData;
};

export type DetailOrganizationCompanyDataActions =
  ActionMap<DetailOrganizationCompanyDataPayload>[keyof ActionMap<DetailOrganizationCompanyDataPayload>];

// CompanyOffice
type DetailOrganizationCompanyOfficePayload = {
  [DetailOrganizationActionEnum.SetCompanyOfficeData]: DetailOrganizationCompanyOffice;
};

export type DetailOrganizationCompanyOfficeActions =
  ActionMap<DetailOrganizationCompanyOfficePayload>[keyof ActionMap<DetailOrganizationCompanyOfficePayload>];

// PinPoint
type DetailOrganizationPinPointPayload = {
  [DetailOrganizationActionEnum.SetPinPointData]: DetailOrganizationPinPoint;
};

export type DetailOrganizationPinPointActions =
  ActionMap<DetailOrganizationPinPointPayload>[keyof ActionMap<DetailOrganizationPinPointPayload>];

// PinPointDeleteConfirmation
type DetailOrganizationPinPointDeleteConfirmationPayload = {
  [DetailOrganizationActionEnum.SetPinPointDeleteConfirmationData]: DetailOrganizationPinPointDeleteConfirmation;
};

export type DetailOrganizationPinPointDeleteConfirmationActions =
  ActionMap<DetailOrganizationPinPointDeleteConfirmationPayload>[keyof ActionMap<DetailOrganizationPinPointDeleteConfirmationPayload>];

// Notification
type DetailOrganizationNotificationPayload = {
  [DetailOrganizationActionEnum.SetNotificationData]: DetailOrganizationNotification;
};

export type DetailOrganizationNotificationActions =
  ActionMap<DetailOrganizationNotificationPayload>[keyof ActionMap<DetailOrganizationNotificationPayload>];
