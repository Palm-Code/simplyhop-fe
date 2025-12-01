import { UserBlock } from "@/core/models/data";

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
export interface ListUserBlockInitialStateType {
  items: ListUserBlockItems;
}

// State Collection Types consist of:
export interface ListUserBlockItems {
  items: UserBlock[];
  pagination: {
    limit: number;
    current_page: number;
  };
  loading: {
    is_fetching: boolean;
  };
}

export enum ListUserBlockActionEnum {
  // Items
  SetItemsData = "SetItemsData",
  SetItemsItemsData = "SetItemsItemsData",
  SetItemsLoadingData = "SetItemsLoadingData",
  SetItemsPaginationData = "SetItemsPaginationData",
}

// Action Collection Types
export type ListUserBlockActions = ListUserBlockItemsActions;

// Action Collection Types consist of:
// Items
type ListUserBlockItemsPayload = {
  [ListUserBlockActionEnum.SetItemsData]: ListUserBlockItems;
  [ListUserBlockActionEnum.SetItemsItemsData]: ListUserBlockItems["items"];
  [ListUserBlockActionEnum.SetItemsLoadingData]: ListUserBlockItems["loading"];
  [ListUserBlockActionEnum.SetItemsPaginationData]: ListUserBlockItems["pagination"];
};

export type ListUserBlockItemsActions =
  ActionMap<ListUserBlockItemsPayload>[keyof ActionMap<ListUserBlockItemsPayload>];
