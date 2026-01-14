import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountUpdateSupportReactQueryKey } from "../keys";
import {
  PostAuthDeactivateAccountOTPErrorResponseInterface,
  PostAuthDeactivateAccountOTPPayloadRequestInterface,
  PostAuthDeactivateAccountOTPSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { fetchPostAuthDeactivateAccountOTP } from "@/core/services/rest/simplyhop/auth";

export const usePostAuthDeactivateAccountOTP = () => {
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);

  const mutation = useMutation<
    PostAuthDeactivateAccountOTPSuccessResponseInterface,
    PostAuthDeactivateAccountOTPErrorResponseInterface
  >({
    mutationKey: AccountUpdateSupportReactQueryKey.PostRequestOTP(),
    mutationFn: () => {
      const payload: PostAuthDeactivateAccountOTPPayloadRequestInterface = {
        body: {
          otp: state.deactivate_confirmation.form.otp.value,
        },
      };
      return fetchPostAuthDeactivateAccountOTP(payload);
    },
    onSuccess(data) {
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
