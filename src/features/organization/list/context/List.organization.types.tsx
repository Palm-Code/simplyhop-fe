import {
  GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface,
  GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface,
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
export interface ListOrganizationInitialStateType {
  table: ListOrganizationTable;
  user_profile: ListOrganizationUserProfile;
}

export type ListOrganizationTable = {
  items: ListOrganizationItem[];
  pagination: {
    limit: number;
    current_page: number;
  };
  loading: {
    is_fetching: boolean;
  };
};

export interface ListOrganizationUserProfile {
  is_open: boolean;
  user_id: string | null;
  data: null | GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;
}

export type ListOrganizationItem =
  GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface;

export enum ListOrganizationActionEnum {
  SetTableData = "SetTableData",
  SetTableItemsData = "SetItemsData",
  SetTablePaginationData = "SetPaginationData",
  SetTableLoadingData = "SetLoadingData",

  // UserProfile
  SetUserProfileData = "SetUserProfileData",
}

// Action Collection Types
export type ListOrganizationActions =
  | ListOrganizationTableActions
  | ListOrganizationUserProfileActions;

// Action Collection Types consist of:

// Table
type ListOrganizationTablePayload = {
  [ListOrganizationActionEnum.SetTableData]: ListOrganizationTable;
  [ListOrganizationActionEnum.SetTableItemsData]: ListOrganizationTable["items"];
  [ListOrganizationActionEnum.SetTablePaginationData]: ListOrganizationTable["pagination"];
  [ListOrganizationActionEnum.SetTableLoadingData]: ListOrganizationTable["loading"];
};
export type ListOrganizationTableActions =
  ActionMap<ListOrganizationTablePayload>[keyof ActionMap<ListOrganizationTablePayload>];

// UserProfile
type ListOrganizationUserProfilePayload = {
  [ListOrganizationActionEnum.SetUserProfileData]: ListOrganizationUserProfile;
};

export type ListOrganizationUserProfileActions =
  ActionMap<ListOrganizationUserProfilePayload>[keyof ActionMap<ListOrganizationUserProfilePayload>];
