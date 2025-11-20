import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PatchUserDeactivateErrorResponseInterface,
  PatchUserDeactivatePayloadRequestInterface,
  PatchUserDeactivateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user";
import { DetailDriverReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { DetailDriverContext } from "../../context";
import { fetchPatchUserDeactivate } from "@/core/services/rest/simplyhop/user";
import { useParams } from "next/navigation";

export const usePatchUserDeactivate = () => {
  const { driver_id } = useParams();
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(DetailDriverContext);

  const mutation = useMutation<
    PatchUserDeactivateSuccessResponseInterface,
    PatchUserDeactivateErrorResponseInterface
  >({
    mutationKey: DetailDriverReactQueryKey.PatchUserDeactivate(),
    mutationFn: () => {
      const payload: PatchUserDeactivatePayloadRequestInterface = {
        path: {
          id: String(driver_id ?? "0"),
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
