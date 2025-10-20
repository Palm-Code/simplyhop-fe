import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  PostAuthRequestOTPErrorResponseInterface,
  PostAuthRequestOTPPayloadRequestInterface,
  PostAuthRequestOTPSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { LoginAuthActionEnum, LoginAuthContext } from "../../context";
import { fetchPostAuthRequestOTP } from "@/core/services/rest/simplyhop/auth";

export const usePostAuthRequestOTP = () => {
  const { state, dispatch } = React.useContext(LoginAuthContext);

  const mutation = useMutation<
    PostAuthRequestOTPSuccessResponseInterface,
    PostAuthRequestOTPErrorResponseInterface
  >({
    mutationKey: LoginAuthReactQueryKey.PostRequestOTP(),
    mutationFn: () => {
      const payload: PostAuthRequestOTPPayloadRequestInterface = {
        body: {
          email: state.form.email.value,
        },
      };
      return fetchPostAuthRequestOTP(payload);
    },
    onSuccess() {
      dispatch({
        type: LoginAuthActionEnum.SetStepData,
        payload: {
          ...state.step,
          name: "otp",
        },
      });
    },
    onError(error) {
      dispatch({
        type: LoginAuthActionEnum.SetFormData,
        payload: {
          ...state.form,
          error: {
            code: error.message,
          },
        },
      });
    },
  });
  return mutation;
};
