import { GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";

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
export type ListOrganizationItem =
  GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface;

export enum ListOrganizationActionEnum {
  SetTableData = "SetTableData",
  SetTableItemsData = "SetItemsData",
  SetTablePaginationData = "SetPaginationData",
  SetTableLoadingData = "SetLoadingData",
}

// Action Collection Types
export type ListOrganizationActions = ListOrganizationTableActions;

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
