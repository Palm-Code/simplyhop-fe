import { ThemeActionEnum, ThemeActions, ThemeMode } from "./Theme.types";

// Mode
export const ThemeModeReducers = (
  state: ThemeMode,
  action: ThemeActions
) => {
  switch (action.type) {
    case ThemeActionEnum.SetModeData: {
      return action.payload;
    }

    default:
      return state;
  }
};
