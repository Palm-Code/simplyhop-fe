"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import {
  DetailOrganizationContext,
  DetailOrganizationActionEnum,
} from "../../context";
import { usePatchOrganizationDeactivate } from "../../react_query/hooks";
import { UserBlockConfirmation } from "@/core/components/user_block_confirmation";

export const DeleteAccountConfirmationDetailOrganization = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(DetailOrganizationContext);

  const {
    mutate: patchOrganizationDeactivate,
    isPending: isPendingPatchOrganizationDeactivate,
  } = usePatchOrganizationDeactivate();

  const handleClose = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
    patchOrganizationDeactivate();
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
        isLoading: isPendingPatchOrganizationDeactivate,
        disabled: isPendingPatchOrganizationDeactivate,
      }}
    />
  );
};
