import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PatchUserDeactivateErrorResponseInterface,
  PatchUserDeactivatePayloadRequestInterface,
  PatchUserDeactivateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user";
import { ListDriverReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ListDriverContext } from "../../context";
import { fetchPatchUserDeactivate } from "@/core/services/rest/simplyhop/user";

export const usePatchUserDeactivate = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(ListDriverContext);

  const mutation = useMutation<
    PatchUserDeactivateSuccessResponseInterface,
    PatchUserDeactivateErrorResponseInterface
  >({
    mutationKey: ListDriverReactQueryKey.PatchUserDeactivate(),
    mutationFn: () => {
      const payload: PatchUserDeactivatePayloadRequestInterface = {
        path: {
          id: String(state.user_profile.user_id ?? -1),
        },
      };
      return fetchPatchUserDeactivate(payload);
    },
    onSuccess() {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
              variant: "success",
              message: "Konto löschen erfolgreich",
            },
          ],
        },
      });
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
