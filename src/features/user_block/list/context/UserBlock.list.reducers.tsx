import {
  UserBlockListActionEnum,
  UserBlockListActions,
  UserBlockListItems,
} from "./UserBlock.list.types";

// Items
export const UserBlockListItemsReducers = (
  state: UserBlockListItems,
  action: UserBlockListActions
) => {
  switch (action.type) {
    case UserBlockListActionEnum.SetItemsData:
      return action.payload;
    case UserBlockListActionEnum.SetItemsItemsData:
      return {
        ...state,
        items: action.payload,
      };
    case UserBlockListActionEnum.SetItemsLoadingData:
      return {
        ...state,
        loading: action.payload,
      };
    case UserBlockListActionEnum.SetItemsPaginationData:
      return {
        ...state,
        pagination: action.payload,
      };

    default:
      return state;
  }
};
