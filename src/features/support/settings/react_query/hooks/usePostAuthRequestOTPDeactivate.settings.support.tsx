import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsSupportReactQueryKey } from "../keys";
import {
  PostAuthRequestOTPDeactivateErrorResponseInterface,
  PostAuthRequestOTPDeactivatePayloadRequestInterface,
  PostAuthRequestOTPDeactivateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { fetchPostAuthRequestOTPDeactivate } from "@/core/services/rest/simplyhop/auth";

export const usePostAuthRequestOTPDeactivate = () => {
  const { state, dispatch } = React.useContext(SettingsSupportContext);

  const mutation = useMutation<
    PostAuthRequestOTPDeactivateSuccessResponseInterface,
    PostAuthRequestOTPDeactivateErrorResponseInterface
  >({
    mutationKey: SettingsSupportReactQueryKey.PostRequestOTP(),
    mutationFn: () => {
      return fetchPostAuthRequestOTPDeactivate();
    },
    onSuccess() {
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
