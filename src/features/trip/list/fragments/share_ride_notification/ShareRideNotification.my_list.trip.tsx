"use client";
import * as React from "react";
import clsx from "clsx";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { CopyLinkItem } from "@/core/components/copy_link_item";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";

export const ShareRideNotificationMyListTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(MyListTripContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.share_ride_notification.is_open;
  const handleClose = () => {
    dispatch({
      type: MyListTripActionEnum.SetShareRideNotificationData,
      payload: {
        ...state.share_ride_notification,
        is_open: false,
      },
    });
  };

  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      variant={isLg ? "modal" : "page_sheet"}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-[100vh] lg:h-fit",
          "px-[1rem] py-[1rem] lg:px-[2rem] lg:py-[2rem]"
        )}
      >
        <h1
          className={clsx(
            "text-[2rem] lg:text-[1.5rem] text-[black] font-bold text-center"
          )}
        >
          {dictionaries.share_ride_notification.title}
        </h1>

        <div
          className={clsx(
            "grid grid-flow-row grid-cols-1 lg:grid-cols-none lg:grid-flow-col items-center content-center justify-center justify-items-center gap-[1rem]"
          )}
        >
          <span className={clsx("text-[#98989E] text-[0.875rem] font-normal")}>
            {dictionaries.share_ride_notification.share.label}
          </span>
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]"
            )}
          >
            {dictionaries.share_ride_notification.share.items.map(
              (item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href
                    .replaceAll(
                      "{{link}}",
                      encodeURIComponent(
                        state.share_ride_notification.share.link
                      )
                    )
                    .replaceAll(
                      "{{message}}",
                      encodeURIComponent(
                        state.share_ride_notification.share.message
                      )
                    )}
                  target="_blank"
                  className={clsx(
                    "flex items-center justify-center",
                    "w-[2rem] h-[2rem]",
                    "rounded-[50%]",
                    "bg-[white]"
                  )}
                >
                  <SVGIcon name={item.icon.name as SVGIconProps["name"]} />
                </Link>
              )
            )}
          </div>
        </div>

        <CopyLinkItem
          link={{
            displayLink: isLg
              ? state.share_ride_notification.share.link
              : `${state.share_ride_notification.share.link.slice(0, 15)}...`,
            fullLink: state.share_ride_notification.share.link,
          }}
          cta={{ ...dictionaries.share_ride_notification.share.cta }}
        />

        <Button
          aria-label={dictionaries.share_ride_notification.cta.back.children}
          name={dictionaries.share_ride_notification.cta.back.children}
          onClick={handleClose}
        >
          {dictionaries.share_ride_notification.cta.back.children}
        </Button>
      </div>
    </AdaptiveModal>
  );
};
