import {
  ListOrganizationActionEnum,
  ListOrganizationActions,
  ListOrganizationTable,
} from "./List.organization.types";

// Table
export const ListOrganizationTableReducers = (
  state: ListOrganizationTable,
  action: ListOrganizationActions
) => {
  switch (action.type) {
    case ListOrganizationActionEnum.SetTableData:
      return action.payload;
    case ListOrganizationActionEnum.SetTableItemsData:
      return {
        ...state,
        items: action.payload,
      };
    case ListOrganizationActionEnum.SetTablePaginationData:
      return {
        ...state,
        pagination: action.payload,
      };
    case ListOrganizationActionEnum.SetTableLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
