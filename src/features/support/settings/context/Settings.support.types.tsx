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
export interface SettingsSupportInitialStateType {
  deactivate: SettingsSupportDeactivate;
  deactivate_confirmation: SettingsSupportDeactivateConfirmation;
  deactivate_notification: SettingsSupportDeactivateNotification;
  change_password: SettingsSupportChangePassword;
  change_password_notification: SettingsSupportChangePasswordNotification;
}

// State Collection Types consist of:
export interface SettingsSupportDeactivate {
  is_open: boolean;
}

export interface SettingsSupportDeactivateConfirmation {
  is_open: boolean;
  form: {
    password: {
      value: string;
    };
    otp: {
      value: string;
    };
    error: null | {
      code: string;
    };
  };
}

export interface SettingsSupportDeactivateNotification {
  is_open: boolean;
}

export interface SettingsSupportChangePassword {
  is_open: boolean;
  form: {
    actual_password: {
      value: string;
      error: FormError;
    };
    new_password: {
      value: string;
      error: FormError;
    };
    confirm_new_password: {
      value: string;
      error: FormError;
    };
    tnc: {
      checked: boolean;
    };
  };
}

export interface SettingsSupportChangePasswordNotification {
  is_open: boolean;
}

export enum SettingsSupportActionEnum {
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
  // DeactivateConfirmation
  SetDeactivateConfirmationData = "SetDeactivateConfirmationData",
  // DeactivateNotification
  SetDeactivateNotificationData = "SetDeactivateNotificationData",
  // ChangePassword
  SetChangePasswordData = "SetChangePasswordData",
  // ChangePasswordNotification
  SetChangePasswordNotificationData = "SetChangePasswordNotificationData",
}

// Action Collection Types
export type SettingsSupportActions =
  | SettingsSupportDeactivateActions
  | SettingsSupportDeactivateConfirmationActions
  | SettingsSupportDeactivateNotificationActions
  | SettingsSupportChangePasswordActions
  | SettingsSupportChangePasswordNotificationActions;

// Action Collection Types consist of:
// Deactivate
type SettingsSupportDeactivatePayload = {
  [SettingsSupportActionEnum.SetDeactivateData]: SettingsSupportDeactivate;
};

export type SettingsSupportDeactivateActions =
  ActionMap<SettingsSupportDeactivatePayload>[keyof ActionMap<SettingsSupportDeactivatePayload>];

// DeactivateConfirmation
type SettingsSupportDeactivateConfirmationPayload = {
  [SettingsSupportActionEnum.SetDeactivateConfirmationData]: SettingsSupportDeactivateConfirmation;
};

export type SettingsSupportDeactivateConfirmationActions =
  ActionMap<SettingsSupportDeactivateConfirmationPayload>[keyof ActionMap<SettingsSupportDeactivateConfirmationPayload>];

// DeactivateNotification
type SettingsSupportDeactivateNotificationPayload = {
  [SettingsSupportActionEnum.SetDeactivateNotificationData]: SettingsSupportDeactivateNotification;
};

export type SettingsSupportDeactivateNotificationActions =
  ActionMap<SettingsSupportDeactivateNotificationPayload>[keyof ActionMap<SettingsSupportDeactivateNotificationPayload>];

// ChangePassword
type SettingsSupportChangePasswordPayload = {
  [SettingsSupportActionEnum.SetChangePasswordData]: SettingsSupportChangePassword;
};

export type SettingsSupportChangePasswordActions =
  ActionMap<SettingsSupportChangePasswordPayload>[keyof ActionMap<SettingsSupportChangePasswordPayload>];

// ChangePasswordNotification
type SettingsSupportChangePasswordNotificationPayload = {
  [SettingsSupportActionEnum.SetChangePasswordNotificationData]: SettingsSupportChangePasswordNotification;
};

export type SettingsSupportChangePasswordNotificationActions =
  ActionMap<SettingsSupportChangePasswordNotificationPayload>[keyof ActionMap<SettingsSupportChangePasswordNotificationPayload>];
