"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { getDictionaries } from "../../i18n";
import { ListTripActionEnum, ListTripContext } from "../../context";
import { usePostRidesArchive } from "../../react_query/hooks/usePostRidesArchive.list.trip";
import { MoonLoader } from "@/core/components/moon_loader";

export const CompletedRideListTrip = () => {
  const dictionaries = getDictionaries();

  const { isLg } = useTailwindBreakpoint();
  const { state, dispatch } = React.useContext(ListTripContext);

  const { mutate: postRidesArchive, isPending: isPendingRidesArchive } =
    usePostRidesArchive();

  const handleClose = () => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = () => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
      },
    });

    postRidesArchive();
  };

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "bottom_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[400px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden",
        "!px-[0rem] !py-[0rem]"
      )}
      open={state.complete_ride_confirmation.is_open}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full",
          "!px-[2rem] !py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.5rem]",
            "w-full h-full"
          )}
        >
          <p className={clsx("text-[1.5rem] text-[#232323] font-bold")}>
            {dictionaries.complete_ride_confirmation.title}
          </p>
          <span
            className={clsx(
              "text-[1rem] text-[#5B5B5B] font-normal text-center"
            )}
          >
            {dictionaries.complete_ride_confirmation.description}
          </span>
        </div>
        {/* actions */}
        <div
          className={clsx(
            "grid sm:grid-cols-2 lg:grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[white]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#232323] font-semibold",
              "border border-[#464646]",
              "box-border",
              "cursor-pointer"
            )}
            onClick={handleClickCancelConfirmRideComplete}
          >
            {dictionaries.complete_ride_confirmation.cta.cancel.children}
          </button>
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[#33CC33] disabled:bg-[#F6F6F6]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#232323] disabled:text-[#A6A6A6] font-semibold",
              "cursor-pointer"
            )}
            disabled={isPendingRidesArchive}
            onClick={handleClickOKConfirmRideComplete}
          >
            {isPendingRidesArchive && <MoonLoader size={20} color={"white"} />}
            {dictionaries.complete_ride_confirmation.cta.ok.children}
          </button>
        </div>
      </div>
    </AdaptiveModal>
  );
};
