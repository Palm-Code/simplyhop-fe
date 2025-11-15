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
export type ListDriverItem =
  GetDashboardSuperAdminSuccessDataResponseInterface;

export enum ListDriverActionEnum {
  SetTableData = "SetTableData",
  SetTableItemsData = "SetItemsData",
  SetTablePaginationData = "SetPaginationData",
  SetTableLoadingData = "SetLoadingData",
}

// Action Collection Types
export type ListDriverActions = ListDriverTableActions;

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
