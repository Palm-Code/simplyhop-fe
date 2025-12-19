"use client";
import * as React from "react";
import clsx from "clsx";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import { useSearchParams, useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export const NotificationResultTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.notification.is_open;
  const handleClose = () => {
    dispatch({
      type: ResultTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
    const params = new URLSearchParams(searchParams.toString()); // Ambil semua params
    params.delete("ride_id");
    router.push(
      `${AppCollectionURL.private.tripResult()}?${params.toString()}`,
      { scroll: false }
    );
  };

  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[824px]",
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
              "bg-[#EFF9EC]"
            )}
          >
            <SVGIcon
              name="Check"
              className={clsx(
                "w-[5rem] h-[5rem]",
                "text-[#249124] dark:text-[#33CC33]"
              )}
            />
          </div>
        </div>

        <h1
          className={clsx(
            "text-[1.5rem] text-[black] darK:text-white font-bold text-center"
          )}
        >
          {dictionaries.notification.title}
        </h1>

        <Link
          className={clsx("w-full")}
          href={dictionaries.notification.cta.back.href}
        >
          <Button
            aria-label={dictionaries.notification.cta.back.children}
            name={dictionaries.notification.cta.back.children}
          >
            {dictionaries.notification.cta.back.children}
          </Button>
        </Link>
      </div>
    </AdaptiveModal>
  );
};
