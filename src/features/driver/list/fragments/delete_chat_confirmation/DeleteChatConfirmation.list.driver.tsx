"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ListDriverContext, ListDriverActionEnum } from "../../context";
import { useDeleteMessageRoomsUserId } from "../../react_query/hooks";
import { UserBlockConfirmation } from "@/core/components/user_block_confirmation";
import clsx from "clsx";

export const DeleteChatConfirmationListDriver = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ListDriverContext);

  const {
    mutate: deleteMessageRoomsUserId,
    isPending: isPendingDeleteMessageRoomsUserId,
  } = useDeleteMessageRoomsUserId();

  const handleClose = () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: false,
      },
    });
    deleteMessageRoomsUserId();
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
        isLoading: isPendingDeleteMessageRoomsUserId,
        disabled: isPendingDeleteMessageRoomsUserId,
      }}
      modalClassName={clsx("!z-[9999]")}
    />
  );
};
