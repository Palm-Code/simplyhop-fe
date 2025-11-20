"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DetailDriverContext, DetailDriverActionEnum } from "../../context";
import { usePatchUserDeactivate } from "../../react_query/hooks";
import { UserBlockConfirmation } from "@/core/components/user_block_confirmation";

export const DeleteAccountConfirmationDetailDriver = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(DetailDriverContext);

  const {
    mutate: patchUserDeactivate,
    isPending: isPendingPatchUserDeactivate,
  } = usePatchUserDeactivate();

  const handleClose = () => {
    dispatch({
      type: DetailDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: DetailDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: DetailDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
    patchUserDeactivate();
  };

  return (
    <UserBlockConfirmation
      isOpen={state.delete_account_confirmation.is_open}
      onClose={handleClose}
      title={dictionaries.delete_account_confirmation.title}
      description={dictionaries.delete_account_confirmation.description}
      cancelButton={{
        text: dictionaries.delete_account_confirmation.cta.cancel.children,
        onClick: handleClickCancelConfirmRideComplete,
      }}
      confirmButton={{
        text: dictionaries.delete_account_confirmation.cta.ok.children,
        onClick: handleClickOKConfirmRideComplete,
        isLoading: isPendingPatchUserDeactivate,
        disabled: isPendingPatchUserDeactivate,
      }}
    />
  );
};
