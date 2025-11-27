"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ChatTripContext, ChatTripActionEnum } from "../../context";
import { usePostUserBlock } from "../../react_query/hooks";
import { UserBlockConfirmation } from "@/core/components/user_block_confirmation";

export const BlockConfirmationChatTrip = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ChatTripContext);

  const { mutateAsync: postUserBlock, isPending: isPendingUserBlock } =
    usePostUserBlock();

  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetBlockConfirmationData,
      payload: {
        ...state.block_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ChatTripActionEnum.SetBlockConfirmationData,
      payload: {
        ...state.block_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ChatTripActionEnum.SetBlockConfirmationData,
      payload: {
        ...state.block_confirmation,
        is_open: false,
      },
    });
    const res = await postUserBlock();
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
      isOpen={state.block_confirmation.is_open}
      onClose={handleClose}
      title={dictionaries.block_confirmation.title}
      description={dictionaries.block_confirmation.description}
      cancelButton={{
        text: dictionaries.block_confirmation.cta.cancel.children,
        onClick: handleClickCancelConfirmRideComplete,
      }}
      confirmButton={{
        text: dictionaries.block_confirmation.cta.ok.children,
        onClick: handleClickOKConfirmRideComplete,
        isLoading: isPendingUserBlock,
        disabled: isPendingUserBlock,
      }}
    />
  );
};
