import { AvatarProps } from "@/core/components/avatar";
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
export interface ListDriverInitialStateType {
  table: ListDriverTable;
  user_profile: ListDriverUserProfile;
}

export type ListDriverTable = {
  items: ListDriverItem[];
  pagination: {
    limit: number;
    current_page: number;
  };
  loading: {
    is_fetching: boolean;
  };
};

export interface ListDriverUserProfile {
  is_open: boolean;
  user_id: string | null;
  data: null | User;
}

export type ListDriverItem = GetDashboardSuperAdminSuccessDataResponseInterface;

export enum ListDriverActionEnum {
  SetTableData = "SetTableData",
  SetTableItemsData = "SetItemsData",
  SetTablePaginationData = "SetPaginationData",
  SetTableLoadingData = "SetLoadingData",

  // UserProfile
  SetUserProfileData = "SetUserProfileData",
}

// Action Collection Types
export type ListDriverActions =
  | ListDriverTableActions
  | ListDriverUserProfileActions;

// Action Collection Types consist of:

// Table
type ListDriverTablePayload = {
  [ListDriverActionEnum.SetTableData]: ListDriverTable;
  [ListDriverActionEnum.SetTableItemsData]: ListDriverTable["items"];
  [ListDriverActionEnum.SetTablePaginationData]: ListDriverTable["pagination"];
  [ListDriverActionEnum.SetTableLoadingData]: ListDriverTable["loading"];
};
export type ListDriverTableActions =
  ActionMap<ListDriverTablePayload>[keyof ActionMap<ListDriverTablePayload>];

// UserProfile
type ListDriverUserProfilePayload = {
  [ListDriverActionEnum.SetUserProfileData]: ListDriverUserProfile;
};

export type ListDriverUserProfileActions =
  ActionMap<ListDriverUserProfilePayload>[keyof ActionMap<ListDriverUserProfilePayload>];
