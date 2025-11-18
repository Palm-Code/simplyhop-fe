"use client";
import React, { createContext, Dispatch, useEffect, useReducer } from "react";
import {
  ThemeActionEnum,
  ThemeActions,
  ThemeInitialStateType,
} from "./Theme.types";
import { ThemeModeReducers } from "./Theme.reducers";

const initialState: ThemeInitialStateType = {
  mode: {
    is_dark: false,
  },
};

const ThemeContext = createContext<{
  state: ThemeInitialStateType;
  isDarkMode: boolean;
  dispatch: Dispatch<ThemeActions>;
  toggleTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
}>({
  state: initialState,
  isDarkMode: false,
  dispatch: () => null,
  toggleTheme: () => {},
  setLightMode: () => {},
  setDarkMode: () => {},
});

const mainReducer = (
  { mode }: ThemeInitialStateType,
  action: ThemeActions
) => ({
  mode: ThemeModeReducers(mode, action),
});

const ThemeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    // Set initial theme based on stored preference or default to dark
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = storedTheme === "dark" || (!storedTheme && true);

    dispatch({
      type: ThemeActionEnum.SetModeData,
      payload: {
        ...state.mode,
        is_dark: prefersDark,
      },
    });

    // Apply theme to document
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (isDark?: boolean) => {
    const newMode = isDark !== undefined ? isDark : !state.mode.is_dark;
    dispatch({
      type: ThemeActionEnum.SetModeData,
      payload: {
        ...state.mode,
        is_dark: newMode,
      },
    });

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const setLightMode = () => toggleTheme(false);
  const setDarkMode = () => toggleTheme(true);

  return (
    <ThemeContext.Provider
      value={{
        state,
        isDarkMode: state.mode.is_dark,
        dispatch,
        toggleTheme,
        setDarkMode,
        setLightMode,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
