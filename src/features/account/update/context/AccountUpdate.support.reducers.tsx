import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportActions,
  AccountUpdateSupportDeactivate,
  AccountUpdateSupportDeactivateConfirmation,
  AccountUpdateSupportDeactivateNotification,
  AccountUpdateSupportForm,
  AccountUpdateSupportNotification,
} from "./AccountUpdate.support.types";

// Form
export const AccountUpdateSupportFormReducers = (
  state: AccountUpdateSupportForm,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const AccountUpdateSupportNotificationReducers = (
  state: AccountUpdateSupportNotification,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// Deactivate
export const AccountUpdateSupportDeactivateReducers = (
  state: AccountUpdateSupportDeactivate,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetDeactivateData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateConfirmation
export const AccountUpdateSupportDeactivateConfirmationReducers = (
  state: AccountUpdateSupportDeactivateConfirmation,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetDeactivateConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateNotification
export const AccountUpdateSupportDeactivateNotificationReducers = (
  state: AccountUpdateSupportDeactivateNotification,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetDeactivateNotificationData:
      return action.payload;

    default:
      return state;
  }
};
