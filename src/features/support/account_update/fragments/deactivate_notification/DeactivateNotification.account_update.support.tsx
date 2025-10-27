"use client";
import * as React from "react";
import clsx from "clsx";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import Cookies from "universal-cookie";

export const DeactivateNotificationAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const isOpen = state.deactivate_notification.is_open;
  const handleClose = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateNotificationData,
      payload: {
        ...state.deactivate_notification,
        is_open: false,
      },
    });
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    router.push(AppCollectionURL.public.login());
  };

  const handleClickGoToHomepage = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateNotificationData,
      payload: {
        ...state.deactivate_notification,
        is_open: false,
      },
    });
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    router.push(AppCollectionURL.public.login());
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
        className={clsx(
          "absolute top-[1.5rem] left-[1.5rem]",
          "block lg:hidden",
          "cursor-pointer"
        )}
        onClick={handleClose}
      >
        <SVGIcon
          name="X"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
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
              "bg-[#F5F5F5]"
            )}
          >
            <SVGIcon
              name="OctagonX"
              className={clsx("w-[5rem] h-[5rem]", "text-[black]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
        >
          {dictionaries.deactivate_notification.title}
        </h1>

        <p
          className={clsx("text-[1rem] text-[#888888] font-normal text-center")}
        >
          {dictionaries.deactivate_notification.message}
        </p>

        <Button
          aria-label={
            dictionaries.deactivate_notification.cta.go_to_homepage.children
          }
          name={
            dictionaries.deactivate_notification.cta.go_to_homepage.children
          }
          className={clsx("py-[1rem]")}
          onClick={handleClickGoToHomepage}
        >
          {dictionaries.deactivate_notification.cta.go_to_homepage.children}
        </Button>
      </div>
    </AdaptiveModal>
  );
};
