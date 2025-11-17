"use client";
import * as React from "react";
import clsx from "clsx";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { CopyLinkItem } from "@/core/components/copy_link_item";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";

export const NotificationPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.notification.is_open;
  const handleClose = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
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
              className={clsx("w-[5rem] h-[5rem]", "text-[#33CC33]")}
            />
          </div>
        </div>

        <h1
          className={clsx(
            "text-[2rem] lg:text-[1.5rem] text-[black] font-bold text-center"
          )}
        >
          {dictionaries.notification.title}
        </h1>

        <div
          className={clsx(
            "grid grid-flow-row grid-cols-1 lg:grid-cols-none lg:grid-flow-col items-center content-center justify-center justify-items-center gap-[1rem]"
          )}
        >
          <span className={clsx("text-[#98989E] text-[0.875rem] font-normal")}>
            {dictionaries.notification.share.label}
          </span>
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]"
            )}
          >
            {dictionaries.notification.share.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href
                  .replaceAll(
                    "{{link}}",
                    encodeURIComponent(state.notification.share.link)
                  )
                  .replaceAll(
                    "{{message}}",
                    encodeURIComponent(state.notification.share.message)
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
            ))}
          </div>
        </div>

        <CopyLinkItem
          link={{
            displayLink: isLg
              ? state.notification.share.link
              : `${state.notification.share.link.slice(0, 15)}...`,
            fullLink: state.notification.share.link,
          }}
          cta={{ ...dictionaries.notification.share.cta }}
        />

        <Link
          aria-label={dictionaries.notification.cta.back.children}
          className={clsx("w-full")}
          href={dictionaries.notification.cta.back.href}
        >
          <Button
            aria-label={dictionaries.notification.cta.back.children}
            name={dictionaries.notification.cta.back.children}
            variant="tertiary"
          >
            {dictionaries.notification.cta.back.children}
          </Button>
        </Link>
      </div>
    </AdaptiveModal>
  );
};
