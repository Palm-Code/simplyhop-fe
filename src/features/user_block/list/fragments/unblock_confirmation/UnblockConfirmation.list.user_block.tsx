"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ListUserBlockContext, ListUserBlockActionEnum } from "../../context";
import { useDeleteUserBlock } from "../../react_query/hooks";
import { UserUnblockConfirmation } from "@/core/components/user_unblock_confirmation";
import { queryClient } from "@/core/utils/react_query";
import { ListUserBlockReactQueryKey } from "../../react_query/keys";
import { GetUserBlockListPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_block";
import { UserContext } from "@/core/modules/app/context";

export const UnblockConfirmationListUserBlock = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);

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
    const payload: GetUserBlockListPayloadRequestInterface = {
      params: {
        "filter[user_id]": String(userState.profile?.id ?? -1),
        include: "user,blockedUser",
        "page[number]": 1,
        "page[size]": 30,
      },
    };
    queryClient.invalidateQueries({
      queryKey: ListUserBlockReactQueryKey.GetUserBlockList(payload),
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
