import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PatchOrganizationDeactivateErrorResponseInterface,
  PatchOrganizationDeactivatePayloadRequestInterface,
  PatchOrganizationDeactivateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { ListOrganizationReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { fetchPatchOrganizationDeactivate } from "@/core/services/rest/simplyhop/organization";
import { ListOrganizationContext } from "../../context";

export const usePatchOrganizationDeactivate = () => {
  const { state } = React.useContext(ListOrganizationContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const mutation = useMutation<
    PatchOrganizationDeactivateSuccessResponseInterface,
    PatchOrganizationDeactivateErrorResponseInterface
  >({
    mutationKey: ListOrganizationReactQueryKey.PatchOrganizationDeactivate(),
    mutationFn: () => {
      const payload: PatchOrganizationDeactivatePayloadRequestInterface = {
        path: {
          id: String(state.user_profile.user_id ?? -1),
        },
      };
      return fetchPatchOrganizationDeactivate(payload);
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
