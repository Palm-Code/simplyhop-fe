"use client";
import * as React from "react";
import clsx from "clsx";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export const NotificationRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.notification.is_open;
  const handleClose = () => {
    dispatch({
      type: RegistrationProfileActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
  };

  const handleClickGoToHomepage = () => {
    dispatch({
      type: RegistrationProfileActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
    router.push(AppCollectionURL.private.trip());
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
              "bg-[#EFF9EC] dark:bg-[#232323]"
            )}
          >
            <SVGIcon
              name="ContrastCheckMark"
              className={clsx(
                "w-[5rem] h-[5rem]",
                "text-[#249124] dark:text-[#33CC33]"
              )}
            />
          </div>
        </div>

        <h1
          className={clsx(
            "text-[1.5rem] text-[black] dark:text-white font-bold text-center"
          )}
        >
          {dictionaries.notification.title}
        </h1>

        <div className={clsx("w-full h-[1.25rem]")} />

        <Button
          aria-label={dictionaries.notification.cta.back.children}
          name={dictionaries.notification.cta.back.children}
          className={clsx("py-[1rem]")}
          onClick={handleClickGoToHomepage}
        >
          {dictionaries.notification.cta.back.children}
        </Button>
      </div>
    </AdaptiveModal>
  );
};
