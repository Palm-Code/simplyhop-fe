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
export interface AccountSupportInitialStateType {
  information: AccountSupportInformation;
  deactivate: AccountSupportDeactivate;
  deactivate_confirmation: AccountSupportDeactivateConfirmation;
  deactivate_notification: AccountSupportDeactivateNotification;
}

// State Collection Types consist of:
export interface AccountSupportInformation {
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  phonenumber: string;
  about_me: string;
}

export interface AccountSupportDeactivate {
  is_open: boolean;
}

export interface AccountSupportDeactivateConfirmation {
  is_open: boolean;
  form: {
    password: {
      value: string;
    };
  };
}

export interface AccountSupportDeactivateNotification {
  is_open: boolean;
}

export enum AccountSupportActionEnum {
  // Information
  SetInformationData = "SetInformationData",
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
  // DeactivateConfirmation
  SetDeactivateConfirmationData = "SetDeactivateConfirmationData",
  // DeactivateNotification
  SetDeactivateNotificationData = "SetDeactivateNotificationData",
}

// Action Collection Types
export type AccountSupportActions =
  | AccountSupportInformationActions
  | AccountSupportDeactivateActions
  | AccountSupportDeactivateConfirmationActions
  | AccountSupportDeactivateNotificationActions;

// Action Collection Types consist of:
// Information
type AccountSupportInformationPayload = {
  [AccountSupportActionEnum.SetInformationData]: AccountSupportInformation;
};

export type AccountSupportInformationActions =
  ActionMap<AccountSupportInformationPayload>[keyof ActionMap<AccountSupportInformationPayload>];

// Deactivate
type AccountSupportDeactivatePayload = {
  [AccountSupportActionEnum.SetDeactivateData]: AccountSupportDeactivate;
};

export type AccountSupportDeactivateActions =
  ActionMap<AccountSupportDeactivatePayload>[keyof ActionMap<AccountSupportDeactivatePayload>];

// DeactivateConfirmation
type AccountSupportDeactivateConfirmationPayload = {
  [AccountSupportActionEnum.SetDeactivateConfirmationData]: AccountSupportDeactivateConfirmation;
};

export type AccountSupportDeactivateConfirmationActions =
  ActionMap<AccountSupportDeactivateConfirmationPayload>[keyof ActionMap<AccountSupportDeactivateConfirmationPayload>];

// DeactivateNotification
type AccountSupportDeactivateNotificationPayload = {
  [AccountSupportActionEnum.SetDeactivateNotificationData]: AccountSupportDeactivateNotification;
};

export type AccountSupportDeactivateNotificationActions =
  ActionMap<AccountSupportDeactivateNotificationPayload>[keyof ActionMap<AccountSupportDeactivateNotificationPayload>];
