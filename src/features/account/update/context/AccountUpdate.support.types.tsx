import { FormError } from "@/core/utils/form";

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
export interface AccountUpdateSupportInitialStateType {
  form: AccountUpdateSupportForm;
  notification: AccountUpdateSupportNotification;
  deactivate: AccountUpdateSupportDeactivate;
  deactivate_confirmation: AccountUpdateSupportDeactivateConfirmation;
  deactivate_notification: AccountUpdateSupportDeactivateNotification;
}

// State Collection Types consist of:
export interface AccountUpdateSupportForm {
  first_name: {
    value: string;
    error: FormError;
  };
  last_name: {
    value: string;
    error: FormError;
  };
  phonenumber: {
    value: string;
    error: FormError;
  };
  city: {
    value: string;
    error: FormError;
  };
  about_me: {
    value: string;
    error: FormError;
  };
  gender: {
    selected: null | { id: string; name: string };
    error: FormError;
  };
  pictures: {
    files: File[] | string;
  };
}

export interface AccountUpdateSupportNotification {
  is_open: boolean;
}

export interface AccountUpdateSupportDeactivate {
  is_open: boolean;
}

export interface AccountUpdateSupportDeactivateConfirmation {
  is_open: boolean;
  form: {
    password: {
      value: string;
    };
  };
}

export interface AccountUpdateSupportDeactivateNotification {
  is_open: boolean;
}

export enum AccountUpdateSupportActionEnum {
  // Form
  SetFormData = "SetFormData",
  // Notification
  SetNotificationData = "SetNotificationData",
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
  // DeactivateConfirmation
  SetDeactivateConfirmationData = "SetDeactivateConfirmationData",
  // DeactivateNotification
  SetDeactivateNotificationData = "SetDeactivateNotificationData",
}

// Action Collection Types
export type AccountUpdateSupportActions =
  | AccountUpdateSupportFormActions
  | AccountUpdateSupportNotificationActions
  | AccountUpdateSupportDeactivateActions
  | AccountUpdateSupportDeactivateConfirmationActions
  | AccountUpdateSupportDeactivateNotificationActions;

// Action Collection Types consist of:
// Form
type AccountUpdateSupportFormPayload = {
  [AccountUpdateSupportActionEnum.SetFormData]: AccountUpdateSupportForm;
};

export type AccountUpdateSupportFormActions =
  ActionMap<AccountUpdateSupportFormPayload>[keyof ActionMap<AccountUpdateSupportFormPayload>];

// Notification
type AccountUpdateSupportNotificationPayload = {
  [AccountUpdateSupportActionEnum.SetNotificationData]: AccountUpdateSupportNotification;
};

export type AccountUpdateSupportNotificationActions =
  ActionMap<AccountUpdateSupportNotificationPayload>[keyof ActionMap<AccountUpdateSupportNotificationPayload>];

// Deactivate
type AccountUpdateSupportDeactivatePayload = {
  [AccountUpdateSupportActionEnum.SetDeactivateData]: AccountUpdateSupportDeactivate;
};

export type AccountUpdateSupportDeactivateActions =
  ActionMap<AccountUpdateSupportDeactivatePayload>[keyof ActionMap<AccountUpdateSupportDeactivatePayload>];

// DeactivateConfirmation
type AccountUpdateSupportDeactivateConfirmationPayload = {
  [AccountUpdateSupportActionEnum.SetDeactivateConfirmationData]: AccountUpdateSupportDeactivateConfirmation;
};

export type AccountUpdateSupportDeactivateConfirmationActions =
  ActionMap<AccountUpdateSupportDeactivateConfirmationPayload>[keyof ActionMap<AccountUpdateSupportDeactivateConfirmationPayload>];

// DeactivateNotification
type AccountUpdateSupportDeactivateNotificationPayload = {
  [AccountUpdateSupportActionEnum.SetDeactivateNotificationData]: AccountUpdateSupportDeactivateNotification;
};

export type AccountUpdateSupportDeactivateNotificationActions =
  ActionMap<AccountUpdateSupportDeactivateNotificationPayload>[keyof ActionMap<AccountUpdateSupportDeactivateNotificationPayload>];
