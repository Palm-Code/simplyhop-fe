import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountUpdateSupportReactQueryKey } from "../keys";
import {
  DeleteAuthDeactivateAccountErrorResponseInterface,
  DeleteAuthDeactivateAccountPayloadRequestInterface,
  DeleteAuthDeactivateAccountSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchDeleteAuthDeactivateAccount } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { AccountUpdateSupportContext } from "../../context";
import { v4 as uuidv4 } from "uuid";

export const useDeleteDeactivateAccount = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { state: state } = React.useContext(AccountUpdateSupportContext);
  const mutation = useMutation<
    DeleteAuthDeactivateAccountSuccessResponseInterface,
    DeleteAuthDeactivateAccountErrorResponseInterface
  >({
    mutationKey: AccountUpdateSupportReactQueryKey.DeleteDeactivateAccount(),
    mutationFn: () => {
      const payload: DeleteAuthDeactivateAccountPayloadRequestInterface = {
        body: {
          password: state.deactivate_confirmation.form.password.value,
        },
      };
      return fetchDeleteAuthDeactivateAccount(payload);
    },

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
