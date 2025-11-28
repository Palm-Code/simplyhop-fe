"use client";
import * as React from "react";
import clsx from "clsx";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";

export const ChangePasswordNotificationSettingsSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(SettingsSupportContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.change_password_notification.is_open;
  const handleClose = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordNotificationData,
      payload: {
        ...state.change_password_notification,
        is_open: false,
      },
    });
  };

  const handleClickBack = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordNotificationData,
      payload: {
        ...state.change_password_notification,
        is_open: false,
      },
    });
  };
  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[524px]",
        "h-[100vh] lg:h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={isOpen}
      variant={isLg ? "modal" : "page_sheet"}
      onClose={handleClose}
    >
      <button
        aria-label={"schließen"}
        name={"schließen"}
        className={clsx(
          "absolute top-[1.5rem] left-[1.5rem]",
          "block lg:hidden",
          "cursor-pointer"
        )}
        onClick={handleClose}
      >
        <SVGIcon
          name="X"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B] dark:text-[#C3C3C3]")}
        />
      </button>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full lg:h-fit",
          "overflow-auto",
          "px-[1rem] py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#EFF9EC]"
            )}
          >
            <SVGIcon
              name="ContrastCheckMark"
              className={clsx("w-[5rem] h-[5rem]", "text-[#33CC33] dark:text-[#249124]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] dark:text-white font-bold text-center")}
        >
          {dictionaries.change_password_notification.title}
        </h1>

        <Button
          aria-label={
            dictionaries.change_password_notification.cta.go_to_homepage
              .children
          }
          name={
            dictionaries.change_password_notification.cta.go_to_homepage
              .children
          }
          className={clsx("py-[1rem]")}
          onClick={handleClickBack}
        >
          {
            dictionaries.change_password_notification.cta.go_to_homepage
              .children
          }
        </Button>
      </div>
    </AdaptiveModal>
  );
};
