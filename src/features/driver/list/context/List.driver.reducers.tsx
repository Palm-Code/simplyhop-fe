import {
  ListDriverActionEnum,
  ListDriverActions,
  ListDriverTable,
} from "./List.driver.types";

// Table
export const ListDriverTableReducers = (
  state: ListDriverTable,
  action: ListDriverActions
) => {
  switch (action.type) {
    case ListDriverActionEnum.SetTableData:
      return action.payload;
    case ListDriverActionEnum.SetTableItemsData:
      return {
        ...state,
        items: action.payload,
      };
    case ListDriverActionEnum.SetTablePaginationData:
      return {
        ...state,
        pagination: action.payload,
      };
    case ListDriverActionEnum.SetTableLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
