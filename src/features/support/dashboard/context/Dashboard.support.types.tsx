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
export interface DashboardSupportInitialStateType {
  information: DashboardSupportInformation;
}

// State Collection Types consist of:
export interface DashboardSupportInformation {
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  phonenumber: string;
  about_me: string;
}

export enum DashboardSupportActionEnum {
  // Information
  SetInformationData = "SetInformationData",
}

// Action Collection Types
export type DashboardSupportActions = DashboardSupportInformationActions;

// Action Collection Types consist of:
// Information
type DashboardSupportInformationPayload = {
  [DashboardSupportActionEnum.SetInformationData]: DashboardSupportInformation;
};

export type DashboardSupportInformationActions =
  ActionMap<DashboardSupportInformationPayload>[keyof ActionMap<DashboardSupportInformationPayload>];
