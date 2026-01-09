import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsSupportReactQueryKey } from "../keys";
import {
  PostAuthDeactivateAccountOTPErrorResponseInterface,
  PostAuthDeactivateAccountOTPPayloadRequestInterface,
  PostAuthDeactivateAccountOTPSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { fetchPostAuthDeactivateAccountOTP } from "@/core/services/rest/simplyhop/auth";

export const usePostAuthDeactivateAccountOTP = () => {
  const { state, dispatch } = React.useContext(SettingsSupportContext);

  const mutation = useMutation<
    PostAuthDeactivateAccountOTPSuccessResponseInterface,
    PostAuthDeactivateAccountOTPErrorResponseInterface
  >({
    mutationKey: SettingsSupportReactQueryKey.PostRequestOTP(),
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
        type: SettingsSupportActionEnum.SetDeactivateConfirmationData,
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
        type: SettingsSupportActionEnum.SetDeactivateConfirmationData,
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
