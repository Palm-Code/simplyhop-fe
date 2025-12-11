import { DashboardRideCardProps } from "@/core/components/dashboard_ride_card";
import {
  GetDashboardOrganizationSuccessDataResponseInterface,
  GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface,
  GetDashboardSuperAdminSuccessDataResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
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
export interface DetailOrganizationInitialStateType {
  profile: DetailOrganizationProfile;
  ride: DetailOrganizationRide;
  driver: DetailOrganizationDriver;
  edit: DetailOrganizationEdit;
  delete_account_confirmation: DetailOrganizationDeleteAccountConfirmation;
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

export interface DetailOrganizationEdit {
  is_open: boolean;
  form: {
    email: {
      value: string;
      error: FormError;
    };
    name: {
      value: string;
      error: FormError;
    };
    city: {
      value: string;
      error: FormError;
    };
    phonenumber: {
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
  };
}

export interface DetailOrganizationDeleteAccountConfirmation {
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

  // Edit
  SetEditData = "SetEditData",

  // DeleteAccountConfirmation
  SetDeleteAccountConfirmationData = "SetDeleteAccountConfirmationData",
}

// Action Collection Types
export type DetailOrganizationActions =
  | DetailOrganizationProfileActions
  | DetailOrganizationRideActions
  | DetailOrganizationDriverActions
  | DetailOrganizationEditActions
  | DetailOrganizationDeleteAccountConfirmationActions;

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

// Edit
type DetailOrganizationEditPayload = {
  [DetailOrganizationActionEnum.SetEditData]: DetailOrganizationEdit;
};

export type DetailOrganizationEditActions =
  ActionMap<DetailOrganizationEditPayload>[keyof ActionMap<DetailOrganizationEditPayload>];

// DeleteAccountConfirmation
type DetailOrganizationDeleteAccountConfirmationPayload = {
  [DetailOrganizationActionEnum.SetDeleteAccountConfirmationData]: DetailOrganizationDeleteAccountConfirmation;
};

export type DetailOrganizationDeleteAccountConfirmationActions =
  ActionMap<DetailOrganizationDeleteAccountConfirmationPayload>[keyof ActionMap<DetailOrganizationDeleteAccountConfirmationPayload>];
