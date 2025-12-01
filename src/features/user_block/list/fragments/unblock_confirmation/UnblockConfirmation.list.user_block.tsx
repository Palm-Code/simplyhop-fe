"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ListUserBlockContext, ListUserBlockActionEnum } from "../../context";
import { useDeleteUserBlock } from "../../react_query/hooks";
import { UserUnblockConfirmation } from "@/core/components/user_unblock_confirmation";
import { queryClient } from "@/core/utils/react_query";
import { ListUserBlockReactQueryKey } from "../../react_query/keys";

export const UnblockConfirmationListUserBlock = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ListUserBlockContext);

  const { mutateAsync: deleteUserBlock, isPending: isPendingDeleteUserBlock } =
    useDeleteUserBlock();

  const handleClose = () => {
    dispatch({
      type: ListUserBlockActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ListUserBlockActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ListUserBlockActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: false,
      },
    });
    const res = await deleteUserBlock();
    if (!res) return;
    queryClient.invalidateQueries({
      queryKey: ListUserBlockReactQueryKey.GetUserBlockList(),
      exact: false,
    });
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
