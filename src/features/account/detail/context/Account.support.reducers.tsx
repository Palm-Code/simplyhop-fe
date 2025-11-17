import {
  AccountSupportActionEnum,
  AccountSupportActions,
  AccountSupportDeactivate,
  AccountSupportDeactivateConfirmation,
  AccountSupportDeactivateNotification,
  AccountSupportInformation,
} from "./Account.support.types";

// Information
export const AccountSupportInformationReducers = (
  state: AccountSupportInformation,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetInformationData:
      return action.payload;

    default:
      return state;
  }
};

// Deactivate
export const AccountSupportDeactivateReducers = (
  state: AccountSupportDeactivate,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetDeactivateData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateConfirmation
export const AccountSupportDeactivateConfirmationReducers = (
  state: AccountSupportDeactivateConfirmation,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetDeactivateConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateNotification
export const AccountSupportDeactivateNotificationReducers = (
  state: AccountSupportDeactivateNotification,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetDeactivateNotificationData:
      return action.payload;

    default:
      return state;
  }
};
