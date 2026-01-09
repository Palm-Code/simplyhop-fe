import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountUpdateSupportReactQueryKey } from "../keys";
import {
  PostAuthRequestOTPDeactivateErrorResponseInterface,
  PostAuthRequestOTPDeactivatePayloadRequestInterface,
  PostAuthRequestOTPDeactivateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { fetchPostAuthRequestOTPDeactivate } from "@/core/services/rest/simplyhop/auth";

export const usePostAuthRequestOTPDeactivate = () => {
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);

  const mutation = useMutation<
    PostAuthRequestOTPDeactivateSuccessResponseInterface,
    PostAuthRequestOTPDeactivateErrorResponseInterface
  >({
    mutationKey: AccountUpdateSupportReactQueryKey.PostRequestOTP(),
    mutationFn: () => {
      return fetchPostAuthRequestOTPDeactivate();
    },
    onSuccess() {
      dispatch({
        type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
        payload: {
          ...state.deactivate_confirmation,
          form: {
            ...state.deactivate_confirmation.form,
            error: null,
          },
        },
      });
    },
    onError(error) {
      dispatch({
        type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
        payload: {
          ...state.deactivate_confirmation,
          form: {
            ...state.deactivate_confirmation.form,
            error: {
              code: error.message,
            },
          },
        },
      });
    },
  });
  return mutation;
};
