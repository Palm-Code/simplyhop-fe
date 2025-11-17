import { AvatarProps } from "@/core/components/avatar";
import { User } from "@/core/models/data";
import { GetDashboardSuperAdminSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";

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
export interface DetailDriverInitialStateType {
  user: DetailDriverUser;
}

export interface DetailDriverUser {
  data: null | User;
}

export type DetailDriverItem =
  GetDashboardSuperAdminSuccessDataResponseInterface;

export enum DetailDriverActionEnum {
  // User
  SetUserData = "SetUserData",
}

// Action Collection Types
export type DetailDriverActions = DetailDriverUserActions;

// Action Collection Types consist of:

// User
type DetailDriverUserPayload = {
  [DetailDriverActionEnum.SetUserData]: DetailDriverUser;
};

export type DetailDriverUserActions =
  ActionMap<DetailDriverUserPayload>[keyof ActionMap<DetailDriverUserPayload>];
