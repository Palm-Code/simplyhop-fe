"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { getDictionaries } from "../../i18n";
import { ChatTripContext, ChatTripActionEnum } from "../../context";
import { useDeleteMessageRoomsId } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";

export const DeleteChatConfirmationChatTrip = () => {
  const dictionaries = getDictionaries();

  const { isLg } = useTailwindBreakpoint();
  const { state, dispatch } = React.useContext(ChatTripContext);

  const {
    mutate: deleteMessageRoomsId,
    isPending: isPendingDeleteMessageRoomsId,
  } = useDeleteMessageRoomsId();

  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: false,
      },
    });
    deleteMessageRoomsId();
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
      open={state.delete_chat_confirmation.is_open}
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
            {dictionaries.delete_chat_confirmation.title}
          </p>
          <span
            className={clsx(
              "text-[1rem] text-[#5B5B5B] font-normal text-center"
            )}
          >
            {dictionaries.delete_chat_confirmation.description}
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
              "text-[1rem] text-[#B30606] font-semibold",
              "border border-[#B30606]",
              "box-border",
              "cursor-pointer"
            )}
            onClick={handleClickCancelConfirmRideComplete}
          >
            {dictionaries.delete_chat_confirmation.cta.cancel.children}
          </button>
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[#B30606] disabled:bg-[#F6F6F6]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#FFFFFF] disabled:text-[#A6A6A6] font-semibold",
              "cursor-pointer"
            )}
            disabled={isPendingDeleteMessageRoomsId}
            onClick={handleClickOKConfirmRideComplete}
          >
            {isPendingDeleteMessageRoomsId && (
              <MoonLoader size={20} color={"white"} />
            )}
            {dictionaries.delete_chat_confirmation.cta.ok.children}
          </button>
        </div>
      </div>
    </AdaptiveModal>
  );
};
