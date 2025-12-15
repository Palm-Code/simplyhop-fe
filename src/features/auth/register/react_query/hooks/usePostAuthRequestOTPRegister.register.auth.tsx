import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterAuthReactQueryKey } from "../keys";
import {
  PostAuthRequestOTPRegistrationErrorResponseInterface,
  PostAuthRequestOTPRegistrationPayloadRequestInterface,
  PostAuthRequestOTPRegistrationSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { fetchPostAuthRequestOTPRegistration } from "@/core/services/rest/simplyhop/auth";

export const usePostAuthRequestOTPRegistration = () => {
  const { state, dispatch } = React.useContext(RegisterAuthContext);

  const mutation = useMutation<
    PostAuthRequestOTPRegistrationSuccessResponseInterface,
    PostAuthRequestOTPRegistrationErrorResponseInterface
  >({
    mutationKey: RegisterAuthReactQueryKey.PostRequestOTP(),
    mutationFn: () => {
      const payload: PostAuthRequestOTPRegistrationPayloadRequestInterface = {
        body: {
          email: state.form.email.value,
          organization_code: !state.form.organization?.organization_code
            ? undefined
            : state.form.company_code.value,
        },
      };
      return fetchPostAuthRequestOTPRegistration(payload);
    },
    onSuccess() {
      dispatch({
        type: RegisterAuthActionEnum.SetStepData,
        payload: {
          ...state.step,
          name: "otp",
        },
      });
      dispatch({
        type: RegisterAuthActionEnum.SetFormData,
        payload: {
          ...state.form,
          error: null,
        },
      });
      dispatch({
        type: RegisterAuthActionEnum.SetOTPFormData,
        payload: {
          ...state.otp_form,
          error: null,
        },
      });
    },
    onError(error) {
      if (state.step.name === "form") {
        dispatch({
          type: RegisterAuthActionEnum.SetFormData,
          payload: {
            ...state.form,
            error: {
              code: error.message,
            },
          },
        });
      } else {
        dispatch({
          type: RegisterAuthActionEnum.SetOTPFormData,
          payload: {
            ...state.otp_form,
            error: {
              code: error.message,
            },
          },
        });
      }
    },
  });
  return mutation;
};
