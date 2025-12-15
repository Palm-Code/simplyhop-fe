"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";

export const AccountSettingsSupport = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const { state, dispatch } = React.useContext(SettingsSupportContext);
  const { state: userState } = React.useContext(UserContext);
  const isEmployee = userState.profile?.role === "employee";
  const isAccountShowed = isEmployee;

  const handleClickList = (id: string) => {
    if (id === "block") {
      return router.push(AppCollectionURL.private.user_block_list());
    } else if (id === "change_password") {
      dispatch({
        type: SettingsSupportActionEnum.SetChangePasswordData,
        payload: {
          ...state.change_password,
          is_open: true,
        },
      });
    }
  };

  const handleClickDeactivateAccount = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
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
        "bg-white dark:bg-[#232323]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem] lg:gap-[1.5rem]",
          "w-full"
        )}
      >
        <h2
          className={clsx(
            "text-[#232323] dark:text-white text-[1rem] font-semibold"
          )}
        >
          {dictionaries.security.title}
        </h2>
        {dictionaries.security.items.map((item, index) => (
          <div
            key={index}
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
              <p
                className={clsx(
                  "text-[#232323] dark:text-white text-[1rem] font-medium"
                )}
              >
                {item.name}
              </p>
              <span
                className={clsx(
                  "text-[#606060] dark:text-[#C3C3C3] text-[0.875rem] font-normal"
                )}
              >
                {item.description}
              </span>
            </div>

            <button
              aria-label={item.cta.children}
              name={item.cta.children}
              className={clsx(
                "px-[0rem] py-[1rem] lg:px-[1.5rem] lg:py-[1rem]",
                "text-[#249124] dark:text-[#33CC33] text-[0.875rem] font-medium",
                "cursor-pointer"
              )}
              onClick={() => handleClickList(item.id)}
            >
              {item.cta.children}
            </button>
          </div>
        ))}
      </div>

      {/* account */}
      {isAccountShowed && (
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem] lg:gap-[1.5rem]",
            "w-full"
          )}
        >
          <h2
            className={clsx(
              "text-[#232323] dark:text-white text-[1.5rem] font-bold"
            )}
          >
            {dictionaries.account.title}
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
              <p
                className={clsx(
                  "text-[#5B5B5B] dark:text-[#DADADA] text-[1rem] font-medium"
                )}
              >
                {dictionaries.account.detail.name}
              </p>
              <span
                className={clsx(
                  "text-[#979797] dark:text-[#C3C3C3] text-[0.875rem] font-normal"
                )}
              >
                {dictionaries.account.detail.description}
              </span>
            </div>

            <button
              aria-label={dictionaries.account.cta.deactivate.children}
              name={dictionaries.account.cta.deactivate.children}
              className={clsx(
                "px-[0rem] py-[1rem] lg:px-[1.5rem] lg:py-[1rem]",
                "text-[#B30606] text-[0.875rem] font-medium",
                "cursor-pointer"
              )}
              onClick={handleClickDeactivateAccount}
            >
              {dictionaries.account.cta.deactivate.children}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
