import { User, UserBlock } from "@/core/models/data";
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
  delete_chat_confirmation: ListDriverDeleteChatConfirmation;
  delete_account_confirmation: ListDriverDeleteAccountConfirmation;
  blocked_user: ListDriverBlockedUser;
}

export type ListDriverTable = {
  items: ListDriverItem[];
  pagination: {
    current: number;
    last: null | number;
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

export interface ListDriverDeleteChatConfirmation {
  is_open: boolean;
}

export interface ListDriverDeleteAccountConfirmation {
  is_open: boolean;
}

export type ListDriverItem = GetDashboardSuperAdminSuccessDataResponseInterface;

export type ListDriverBlockedUser = {
  is_open: boolean;
  user_id: string | null;
  items: UserBlock[];
  pagination: {
    limit: number;
    current_page: number;
  };
  loading: {
    is_fetching: boolean;
  };
};

export enum ListDriverActionEnum {
  SetTableData = "SetTableData",
  SetTableItemsData = "SetTableItemsData",
  SetTablePaginationData = "SetTablePaginationData",
  SetTableLoadingData = "SetTableLoadingData",

  // UserProfile
  SetUserProfileData = "SetUserProfileData",

  // DeleteChatConfirmation
  SetDeleteChatConfirmationData = "SetDeleteChatConfirmationData",

  // DeleteAccountConfirmation
  SetDeleteAccountConfirmationData = "SetDeleteAccountConfirmationData",

  // Blocked User
  SetBlockedUserData = "SetBlockedUserData",
  SetBlockedUserItemsData = "SetBlockedUserItemsData",
  SetBlockedUserPaginationData = "SetBlockedUseraginationData",
  SetBlockedUserLoadingData = "SetBlockedUserLoadingData",
}

// Action Collection Types
export type ListDriverActions =
  | ListDriverTableActions
  | ListDriverUserProfileActions
  | ListDriverDeleteChatConfirmationActions
  | ListDriverDeleteAccountConfirmationActions
  | ListDriverBlockedUserActions;

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

// DeleteChatConfirmation
type ListDriverDeleteChatConfirmationPayload = {
  [ListDriverActionEnum.SetDeleteChatConfirmationData]: ListDriverDeleteChatConfirmation;
};

export type ListDriverDeleteChatConfirmationActions =
  ActionMap<ListDriverDeleteChatConfirmationPayload>[keyof ActionMap<ListDriverDeleteChatConfirmationPayload>];

// DeleteAccountConfirmation
type ListDriverDeleteAccountConfirmationPayload = {
  [ListDriverActionEnum.SetDeleteAccountConfirmationData]: ListDriverDeleteAccountConfirmation;
};

export type ListDriverDeleteAccountConfirmationActions =
  ActionMap<ListDriverDeleteAccountConfirmationPayload>[keyof ActionMap<ListDriverDeleteAccountConfirmationPayload>];

// BlockedUser
type ListDriverBlockedUserPayload = {
  [ListDriverActionEnum.SetBlockedUserData]: ListDriverBlockedUser;
  [ListDriverActionEnum.SetBlockedUserItemsData]: ListDriverBlockedUser["items"];
  [ListDriverActionEnum.SetBlockedUserPaginationData]: ListDriverBlockedUser["pagination"];
  [ListDriverActionEnum.SetBlockedUserLoadingData]: ListDriverBlockedUser["loading"];
};
export type ListDriverBlockedUserActions =
  ActionMap<ListDriverBlockedUserPayload>[keyof ActionMap<ListDriverBlockedUserPayload>];
