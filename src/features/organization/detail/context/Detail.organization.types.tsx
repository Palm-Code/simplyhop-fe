import { DashboardRideCardProps } from "@/core/components/dashboard_ride_card";
import { User } from "@/core/models/data";
import {
  GetDashboardOrganizationSuccessDataResponseInterface,
  GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface,
  GetDashboardSuperAdminSuccessDataResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";

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
}

// Action Collection Types
export type DetailOrganizationActions =
  | DetailOrganizationProfileActions
  | DetailOrganizationRideActions
  | DetailOrganizationDriverActions;

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
