import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterAuthReactQueryKey } from "../keys";
import {
  PostAuthRegisterErrorResponseInterface,
  PostAuthRegisterPayloadRequestInterface,
  PostAuthRegisterSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { RegisterAuthContext } from "../../context";
import { fetchPostAuthRegister } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostAuthRegister = () => {
  const { state } = React.useContext(RegisterAuthContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthRegisterSuccessResponseInterface,
    PostAuthRegisterErrorResponseInterface
  >({
    mutationKey: RegisterAuthReactQueryKey.PostRegister(),
    mutationFn: () => {
      const payload: PostAuthRegisterPayloadRequestInterface = {
        body: {
          email: state.general.email.value,
          password: state.password_setup.password.value,
          password_confirmation: state.password_setup.confirm_password.value,
        },
      };
      return fetchPostAuthRegister(payload);
    },
    // onSuccess(data) {

    // },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};
