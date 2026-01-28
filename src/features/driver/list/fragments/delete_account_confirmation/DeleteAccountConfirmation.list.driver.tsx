"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { ListDriverContext, ListDriverActionEnum } from "../../context";
import { usePatchUserDeactivate } from "../../react_query/hooks";
import { UserBlockConfirmation } from "@/core/components/user_block_confirmation";
import { queryClient } from "@/core/utils/react_query";
import { UserContext } from "@/core/modules/app/context";
import { useParams, useSearchParams } from "next/navigation";
import { GetDashboardSuperAdminPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";
import { ListDriverReactQueryKey } from "../../react_query/keys";

export const DeleteAccountConfirmationListDriver = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ListDriverContext);
  const { state: userState } = React.useContext(UserContext);
  const { organization_id } = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const {
    mutateAsync: patchUserDeactivate,
    isPending: isPendingPatchUserDeactivate,
  } = usePatchUserDeactivate();

  const handleClose = () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: false,
      },
    });
    const res = await patchUserDeactivate();
    if (!res) return;
    dispatch({
      type: ListDriverActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        user_id: null,
        data: null,
        is_open: false,
      },
    });

    const payload: GetDashboardSuperAdminPayloadRequestInterface = {
      params: {
        include: "user",
        append: "upcoming_rides",
        search: !search ? undefined : String(search),
        "page[number]": state.table.pagination.current,
        "page[size]": 10,
        "filter[organization_id]": !!organization_id
          ? String(organization_id ?? "0")
          : undefined,
      },
    };
    dispatch({
      type: ListDriverActionEnum.SetTablePaginationData,
      payload: {
        ...state.table.pagination,
        current: 1,
      },
    });
    queryClient.invalidateQueries({
      queryKey: ListDriverReactQueryKey.GetDashboardSuperAdmin(payload),
      refetchType: "all",
      type: "all",
    });
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
