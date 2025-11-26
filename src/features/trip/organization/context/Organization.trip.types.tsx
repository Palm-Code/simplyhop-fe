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
export interface OrganizationTripInitialStateType {
  profile: OrganizationTripProfile;
}

export interface OrganizationTripProfile {
  data: null | GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;
  loading: {
    is_fetching: boolean;
  };
}

export enum OrganizationTripActionEnum {
  // Profile
  SetProfileData = "SetProfileData",
  SetProfileDataData = "SetProfileDataData",
  SetProfileLoadingData = "SetProfileLoadingData",
}

// Action Collection Types
export type OrganizationTripActions = OrganizationTripProfileActions;

// Action Collection Types consist of:

// Profile
type OrganizationTripProfilePayload = {
  [OrganizationTripActionEnum.SetProfileData]: OrganizationTripProfile;
  [OrganizationTripActionEnum.SetProfileDataData]: OrganizationTripProfile["data"];
  [OrganizationTripActionEnum.SetProfileLoadingData]: OrganizationTripProfile["loading"];
};

export type OrganizationTripProfileActions =
  ActionMap<OrganizationTripProfilePayload>[keyof ActionMap<OrganizationTripProfilePayload>];
