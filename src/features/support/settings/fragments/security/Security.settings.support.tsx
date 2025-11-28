"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";

export const SecuritySettingsSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(SettingsSupportContext);

  const handleClickChangePassword = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem] lg:gap-[1.5rem]",
        "w-full",
        "px-[1rem] py-[1rem] lg:px-[1.5rem] lg:py-[1.5rem]",
        "border border-[#D3E7CE] dark:border-[#464646]",
        "rounded-[1.25rem]",
        'bg-white dark:bg-[#232323]'
      )}
    >
      <h2 className={clsx("text-[#232323] dark:text-white text-[1.5rem] font-bold")}>
        {dictionaries.security.title}
      </h2>
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem] lg:gap-[0.25rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-between justify-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[#232323] dark:text-white text-[1rem] font-medium")}>
            {dictionaries.security.detail.name}
          </p>
          <span className={clsx("text-[#606060] dark:text-[#C3C3C3] text-[0.875rem] font-normal")}>
            {dictionaries.security.detail.description}
          </span>
        </div>

        <button
          aria-label={dictionaries.security.cta.change_password.children}
          name={dictionaries.security.cta.change_password.children}
          className={clsx(
            "px-[0rem] py-[1rem] lg:px-[1.5rem] lg:py-[1rem]",
            "text-[#33CC33] dark:text-[#249124] text-[0.875rem] font-medium",
            "cursor-pointer"
          )}
          onClick={handleClickChangePassword}
        >
          {dictionaries.security.cta.change_password.children}
        </button>
      </div>
    </div>
  );
};
