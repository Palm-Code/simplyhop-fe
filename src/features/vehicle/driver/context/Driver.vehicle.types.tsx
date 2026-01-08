import { GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";

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
export interface DriverVehicleInitialStateType {
  profile: DriverVehicleProfile;
}

export interface DriverVehicleProfile {
  data: null | GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;
  loading: {
    is_fetching: boolean;
  };
}

export enum DriverVehicleActionEnum {
  // Profile
  SetProfileData = "SetProfileData",
  SetProfileDataData = "SetProfileDataData",
  SetProfileLoadingData = "SetProfileLoadingData",
}

// Action Collection Types
export type DriverVehicleActions = DriverVehicleProfileActions;

// Action Collection Types consist of:

// Profile
type DriverVehicleProfilePayload = {
  [DriverVehicleActionEnum.SetProfileData]: DriverVehicleProfile;
  [DriverVehicleActionEnum.SetProfileDataData]: DriverVehicleProfile["data"];
  [DriverVehicleActionEnum.SetProfileLoadingData]: DriverVehicleProfile["loading"];
};

export type DriverVehicleProfileActions =
  ActionMap<DriverVehicleProfilePayload>[keyof ActionMap<DriverVehicleProfilePayload>];
