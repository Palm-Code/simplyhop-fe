import {
  ListDriverActionEnum,
  ListDriverActions,
  ListDriverBlockedUser,
  ListDriverDeleteAccountConfirmation,
  ListDriverDeleteChatConfirmation,
  ListDriverTable,
  ListDriverUserProfile,
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

// UserProfile
export const ListDriverUserProfileReducers = (
  state: ListDriverUserProfile,
  action: ListDriverActions
) => {
  switch (action.type) {
    case ListDriverActionEnum.SetUserProfileData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteChatConfirmation
export const ListDriverDeleteChatConfirmationReducers = (
  state: ListDriverDeleteChatConfirmation,
  action: ListDriverActions
) => {
  switch (action.type) {
    case ListDriverActionEnum.SetDeleteChatConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteAccountConfirmation
export const ListDriverDeleteAccountConfirmationReducers = (
  state: ListDriverDeleteAccountConfirmation,
  action: ListDriverActions
) => {
  switch (action.type) {
    case ListDriverActionEnum.SetDeleteAccountConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// BlockedUser
export const ListDriverBlockedUserReducers = (
  state: ListDriverBlockedUser,
  action: ListDriverActions
) => {
  switch (action.type) {
    case ListDriverActionEnum.SetBlockedUserData:
      return action.payload;
    case ListDriverActionEnum.SetBlockedUserItemsData:
      return {
        ...state,
        items: action.payload,
      };
    case ListDriverActionEnum.SetBlockedUserPaginationData:
      return {
        ...state,
        pagination: action.payload,
      };
    case ListDriverActionEnum.SetBlockedUserLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
