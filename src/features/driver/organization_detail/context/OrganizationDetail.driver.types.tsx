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
export interface OrganizationDetailDriverInitialStateType {
  profile: OrganizationDetailDriverProfile;
}

export interface OrganizationDetailDriverProfile {
  data: null | GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;
  loading: {
    is_fetching: boolean;
  };
}

export enum OrganizationDetailDriverActionEnum {
  // Profile
  SetProfileData = "SetProfileData",
  SetProfileDataData = "SetProfileDataData",
  SetProfileLoadingData = "SetProfileLoadingData",
}

// Action Collection Types
export type OrganizationDetailDriverActions = OrganizationDetailDriverProfileActions;

// Action Collection Types consist of:

// Profile
type OrganizationDetailDriverProfilePayload = {
  [OrganizationDetailDriverActionEnum.SetProfileData]: OrganizationDetailDriverProfile;
  [OrganizationDetailDriverActionEnum.SetProfileDataData]: OrganizationDetailDriverProfile["data"];
  [OrganizationDetailDriverActionEnum.SetProfileLoadingData]: OrganizationDetailDriverProfile["loading"];
};

export type OrganizationDetailDriverProfileActions =
  ActionMap<OrganizationDetailDriverProfilePayload>[keyof ActionMap<OrganizationDetailDriverProfilePayload>];
