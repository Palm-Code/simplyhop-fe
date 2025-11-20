import { DashboardRideCardProps } from "@/core/components/dashboard_ride_card";
import { DashboardVehicleCardProps } from "@/core/components/dashboard_vehicle_card";
import { User } from "@/core/models/data";
import { GetDashboardSuperAdminSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";
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
export interface DetailDriverInitialStateType {
  user: DetailDriverUser;
  ride: DetailDriverRide;
  vehicle: DetailDriverVehicle;
  edit: DetailDriverEdit;
  delete_account_confirmation: DetailDriverDeleteAccountConfirmation;
}

export interface DetailDriverUser {
  data: null | User;
  loading: {
    is_fetching: boolean;
  };
}

export interface DetailDriverRide {
  data: DashboardRideCardProps[] | null;
  loading: {
    is_fetching: boolean;
  };
}

export interface DetailDriverVehicle {
  data: DashboardVehicleCardProps[] | null;
  loading: {
    is_fetching: boolean;
  };
}

export interface DetailDriverEdit {
  is_open: boolean;
  form: {
    first_name: {
      value: string;
      error: FormError;
    };
    last_name: {
      value: string;
      error: FormError;
    };
    phonenumber: {
      value: string;
      error: FormError;
    };
    city: {
      value: string;
      error: FormError;
    };
    about_me: {
      value: string;
      error: FormError;
    };
    gender: {
      selected: null | { id: string; name: string };
      error: FormError;
    };
  };
}

export interface DetailDriverDeleteAccountConfirmation {
  is_open: boolean;
}

export type DetailDriverItem =
  GetDashboardSuperAdminSuccessDataResponseInterface;

export enum DetailDriverActionEnum {
  // User
  SetUserData = "SetUserData",
  SetUserDataData = "SetUserDataData",
  SetUserLoadingData = "SetUserLoadingData",

  // Ride
  SetRideData = "SetRideData",
  SetRideDataData = "SetRideDataData",
  SetRideLoadingData = "SetRideLoadingData",

  // Vehicle
  SetVehicleData = "SetVehicleData",
  SetVehicleDataData = "SetVehicleDataData",
  SetVehicleLoadingData = "SetVehicleLoadingData",

  // Edit
  SetEditData = "SetEditData",

  // DeleteAccountConfirmation
  SetDeleteAccountConfirmationData = "SetDeleteAccountConfirmationData",
}

// Action Collection Types
export type DetailDriverActions =
  | DetailDriverUserActions
  | DetailDriverRideActions
  | DetailDriverVehicleActions
  | DetailDriverEditActions
  | DetailDriverDeleteAccountConfirmationActions;

// Action Collection Types consist of:

// User
type DetailDriverUserPayload = {
  [DetailDriverActionEnum.SetUserData]: DetailDriverUser;
  [DetailDriverActionEnum.SetUserDataData]: DetailDriverUser["data"];
  [DetailDriverActionEnum.SetUserLoadingData]: DetailDriverUser["loading"];
};

export type DetailDriverUserActions =
  ActionMap<DetailDriverUserPayload>[keyof ActionMap<DetailDriverUserPayload>];

// Ride
type DetailDriverRidePayload = {
  [DetailDriverActionEnum.SetRideData]: DetailDriverRide;
  [DetailDriverActionEnum.SetRideDataData]: DetailDriverRide["data"];
  [DetailDriverActionEnum.SetRideLoadingData]: DetailDriverRide["loading"];
};

export type DetailDriverRideActions =
  ActionMap<DetailDriverRidePayload>[keyof ActionMap<DetailDriverRidePayload>];

// Vehicle
type DetailDriverVehiclePayload = {
  [DetailDriverActionEnum.SetVehicleData]: DetailDriverVehicle;
  [DetailDriverActionEnum.SetVehicleDataData]: DetailDriverVehicle["data"];
  [DetailDriverActionEnum.SetVehicleLoadingData]: DetailDriverVehicle["loading"];
};

export type DetailDriverVehicleActions =
  ActionMap<DetailDriverVehiclePayload>[keyof ActionMap<DetailDriverVehiclePayload>];

// Edit
type DetailDriverEditPayload = {
  [DetailDriverActionEnum.SetEditData]: DetailDriverEdit;
};

export type DetailDriverEditActions =
  ActionMap<DetailDriverEditPayload>[keyof ActionMap<DetailDriverEditPayload>];

// DeleteAccountConfirmation
type DetailDriverDeleteAccountConfirmationPayload = {
  [DetailDriverActionEnum.SetDeleteAccountConfirmationData]: DetailDriverDeleteAccountConfirmation;
};

export type DetailDriverDeleteAccountConfirmationActions =
  ActionMap<DetailDriverDeleteAccountConfirmationPayload>[keyof ActionMap<DetailDriverDeleteAccountConfirmationPayload>];
