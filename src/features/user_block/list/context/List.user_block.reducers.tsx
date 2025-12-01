import {
  ListUserBlockActionEnum,
  ListUserBlockActions,
  ListUserBlockItems,
} from "./List.user_block.types";

// Items
export const ListUserBlockItemsReducers = (
  state: ListUserBlockItems,
  action: ListUserBlockActions
) => {
  switch (action.type) {
    case ListUserBlockActionEnum.SetItemsData:
      return action.payload;
    case ListUserBlockActionEnum.SetItemsItemsData:
      return {
        ...state,
        items: action.payload,
      };
    case ListUserBlockActionEnum.SetItemsLoadingData:
      return {
        ...state,
        loading: action.payload,
      };
    case ListUserBlockActionEnum.SetItemsPaginationData:
      return {
        ...state,
        pagination: action.payload,
      };

    default:
      return state;
  }
};
