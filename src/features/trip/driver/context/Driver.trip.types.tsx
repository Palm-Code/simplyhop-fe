import { User } from "@/core/models/data";

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
export interface DriverTripInitialStateType {
  user: DriverTripUser;
}

export interface DriverTripUser {
  data: null | User;
  loading: {
    is_fetching: boolean;
  };
}

export enum DriverTripActionEnum {
  // User
  SetUserData = "SetUserData",
  SetUserDataData = "SetUserDataData",
  SetUserLoadingData = "SetUserLoadingData",
}

// Action Collection Types
export type DriverTripActions = DriverTripUserActions;

// Action Collection Types consist of:

// User
type DriverTripUserPayload = {
  [DriverTripActionEnum.SetUserData]: DriverTripUser;
  [DriverTripActionEnum.SetUserDataData]: DriverTripUser["data"];
  [DriverTripActionEnum.SetUserLoadingData]: DriverTripUser["loading"];
};

export type DriverTripUserActions =
  ActionMap<DriverTripUserPayload>[keyof ActionMap<DriverTripUserPayload>];
