"use client";
import * as React from "react";
import clsx from "clsx";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { usePostBookingReject } from "../../react_query/hooks";

export const CancelBookNotificationMyListTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(MyListTripContext);
  const { isLg } = useTailwindBreakpoint();

  const {
    mutateAsync: postBookingReject,
    isPending: isPendingPostBookingReject,
  } = usePostBookingReject();

  const isOpen = state.cancel_book_notification.is_open;
  const handleClose = () => {
    dispatch({
      type: MyListTripActionEnum.SetCancelBookNotificationData,
      payload: {
        ...state.cancel_book_notification,
        is_open: false,
      },
    });
  };

  const handleClickDelete = async () => {
    const res = await postBookingReject();
    if (!res) return;
    dispatch({
      type: MyListTripActionEnum.SetCancelBookNotificationData,
      payload: {
        ...state.cancel_book_notification,
        is_open: false,
      },
    });
    dispatch({
      type: MyListTripActionEnum.SetSuccessDeleteRideNotificationData,
      payload: {
        ...state.success_cancel_book_notification,
        is_open: true,
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

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
            "w-full"
          )}
        >
          <h1
            className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
          >
            {dictionaries.cancel_book_notification.title}
          </h1>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1rem] text-[#5B5B5B] font-normal text-center"
            )}
          >
            {dictionaries.cancel_book_notification.message}
          </p>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
            "w-full"
          )}
        >
          <button
            aria-label={dictionaries.cancel_book_notification.cta.back.children}
            name={dictionaries.cancel_book_notification.cta.back.children}
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
              "w-full h-full",
              "text-[1rem] text-[#33CC33] font-medium",
              "cursor-pointer"
            )}
            onClick={handleClose}
          >
            {dictionaries.cancel_book_notification.cta.back.children}
          </button>
          <Button
            aria-label={
              dictionaries.cancel_book_notification.cta.confirm.children
            }
            name={dictionaries.cancel_book_notification.cta.confirm.children}
            className={clsx(
              "py-[1rem]",
              "!bg-[#C50707]",
              "border border-[#C50707]"
            )}
            disabled={isPendingPostBookingReject}
            isLoading={isPendingPostBookingReject}
            onClick={handleClickDelete}
          >
            {dictionaries.cancel_book_notification.cta.confirm.children}
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  );
};
