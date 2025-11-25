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
export interface OrganizationDriverInitialStateType {
  profile: OrganizationDriverProfile;
}

export interface OrganizationDriverProfile {
  data: null | GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;
  loading: {
    is_fetching: boolean;
  };
}

export enum OrganizationDriverActionEnum {
  // Profile
  SetProfileData = "SetProfileData",
  SetProfileDataData = "SetProfileDataData",
  SetProfileLoadingData = "SetProfileLoadingData",
}

// Action Collection Types
export type OrganizationDriverActions = OrganizationDriverProfileActions;

// Action Collection Types consist of:

// Profile
type OrganizationDriverProfilePayload = {
  [OrganizationDriverActionEnum.SetProfileData]: OrganizationDriverProfile;
  [OrganizationDriverActionEnum.SetProfileDataData]: OrganizationDriverProfile["data"];
  [OrganizationDriverActionEnum.SetProfileLoadingData]: OrganizationDriverProfile["loading"];
};

export type OrganizationDriverProfileActions =
  ActionMap<OrganizationDriverProfilePayload>[keyof ActionMap<OrganizationDriverProfilePayload>];
