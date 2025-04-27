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
export interface UserInitialStateType {
  profile: null | UserProfile;
}

// State Collection Types consist of:
export interface UserProfile {
  id: number | null;
  avatar: null | string;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  phonenumber: string;
  about_me: string;
  is_driver: boolean;
  gender: null | string;
  is_able_to_ride: boolean;
}

export enum UserActionEnum {
  // Profile
  SetProfileData = "SetProfileData",
}

// Action Collection Types
export type UserActions = UserProfileActions;

// Action Collection Types consist of:
// Profile
type UserProfilePayload = {
  [UserActionEnum.SetProfileData]: UserProfile;
};

export type UserProfileActions =
  ActionMap<UserProfilePayload>[keyof ActionMap<UserProfilePayload>];
