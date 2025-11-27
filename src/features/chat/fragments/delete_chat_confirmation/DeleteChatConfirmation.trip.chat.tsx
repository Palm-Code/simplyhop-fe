"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ChatTripContext, ChatTripActionEnum } from "../../context";
import { useDeleteMessageRoomsId } from "../../react_query/hooks";
import { UserBlockConfirmation } from "@/core/components/user_block_confirmation";

export const DeleteChatConfirmationChatTrip = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ChatTripContext);

  const {
    mutateAsync: deleteMessageRoomsId,
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
    const res = await deleteMessageRoomsId();
    if (!res) return;
    dispatch({
      type: ChatTripActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        is_open: false,
      },
    });
  };

  return (
    <UserBlockConfirmation
      isOpen={state.delete_chat_confirmation.is_open}
      onClose={handleClose}
      title={dictionaries.delete_chat_confirmation.title}
      description={dictionaries.delete_chat_confirmation.description}
      cancelButton={{
        text: dictionaries.delete_chat_confirmation.cta.cancel.children,
        onClick: handleClickCancelConfirmRideComplete,
      }}
      confirmButton={{
        text: dictionaries.delete_chat_confirmation.cta.ok.children,
        onClick: handleClickOKConfirmRideComplete,
        isLoading: isPendingDeleteMessageRoomsId,
        disabled: isPendingDeleteMessageRoomsId,
      }}
    />
  );
};
