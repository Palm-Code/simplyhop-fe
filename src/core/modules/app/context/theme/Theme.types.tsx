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
export interface ThemeInitialStateType {
  mode: ThemeMode;
}

// State Collection Types consist of:
export interface ThemeMode {
  is_dark: boolean;
}

export enum ThemeActionEnum {
  // Mode
  SetModeData = "SetModeData",
}

// Action Collection Types
export type ThemeActions = ThemeModeActions;

// Action Collection Types consist of:
// Mode
type ThemeModePayload = {
  [ThemeActionEnum.SetModeData]: ThemeMode;
};

export type ThemeModeActions =
  ActionMap<ThemeModePayload>[keyof ActionMap<ThemeModePayload>];
