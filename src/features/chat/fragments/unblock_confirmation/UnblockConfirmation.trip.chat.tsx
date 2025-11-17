"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ChatTripContext, ChatTripActionEnum } from "../../context";
import { useDeleteUserBlock } from "../../react_query/hooks";
import { UserUnblockConfirmation } from "@/core/components/user_unblock_confirmation";

export const UnblockConfirmationChatTrip = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ChatTripContext);

  const { mutate: deleteUserBlock, isPending: isPendingDeleteUserBlock } =
    useDeleteUserBlock();

  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ChatTripActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ChatTripActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: false,
      },
    });
    deleteUserBlock();
  };

  return (
    <UserUnblockConfirmation
      isOpen={state.unblock_confirmation.is_open}
      onClose={handleClose}
      title={dictionaries.unblock_confirmation.title}
      description={dictionaries.unblock_confirmation.description}
      cancelButton={{
        text: dictionaries.unblock_confirmation.cta.cancel.children,
        onClick: handleClickCancelConfirmRideComplete,
      }}
      confirmButton={{
        text: dictionaries.unblock_confirmation.cta.ok.children,
        onClick: handleClickOKConfirmRideComplete,
        isLoading: isPendingDeleteUserBlock,
        disabled: isPendingDeleteUserBlock,
      }}
    />
  );
};
