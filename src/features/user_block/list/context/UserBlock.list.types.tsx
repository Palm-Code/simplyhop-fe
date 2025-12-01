import { GetUserBlockListSuccessResponseInterface } from "@/core/models/rest/simplyhop/user_block";

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
export interface UserBlockListInitialStateType {
  items: UserBlockListItems;
}

// State Collection Types consist of:
export interface UserBlockListItems {
  items: UserBlockListItem[];
  pagination: {
    limit: number;
    current_page: number;
  };
  loading: {
    is_fetching: boolean;
  };
}
export type UserBlockListItem =
  GetUserBlockListSuccessResponseInterface["data"];

export enum UserBlockListActionEnum {
  // Items
  SetItemsData = "SetItemsData",
  SetItemsItemsData = "SetItemsItemsData",
  SetItemsLoadingData = "SetItemsLoadingData",
  SetItemsPaginationData = "SetItemsPaginationData",
}

// Action Collection Types
export type UserBlockListActions = UserBlockListItemsActions;

// Action Collection Types consist of:
// Items
type UserBlockListItemsPayload = {
  [UserBlockListActionEnum.SetItemsData]: UserBlockListItems;
  [UserBlockListActionEnum.SetItemsItemsData]: UserBlockListItems["items"];
  [UserBlockListActionEnum.SetItemsLoadingData]: UserBlockListItems["loading"];
  [UserBlockListActionEnum.SetItemsPaginationData]: UserBlockListItems["pagination"];
};

export type UserBlockListItemsActions =
  ActionMap<UserBlockListItemsPayload>[keyof ActionMap<UserBlockListItemsPayload>];
