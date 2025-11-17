import { DashboardRideCardProps } from "@/core/components/dashboard_ride_card";
import { DashboardVehicleCardProps } from "@/core/components/dashboard_vehicle_card";
import { User } from "@/core/models/data";
import { GetDashboardSuperAdminSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";

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
}

// Action Collection Types
export type DetailDriverActions =
  | DetailDriverUserActions
  | DetailDriverRideActions
  | DetailDriverVehicleActions;

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
