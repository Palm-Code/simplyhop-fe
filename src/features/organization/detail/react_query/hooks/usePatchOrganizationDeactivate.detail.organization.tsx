import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PatchOrganizationDeactivateErrorResponseInterface,
  PatchOrganizationDeactivatePayloadRequestInterface,
  PatchOrganizationDeactivateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { DetailOrganizationReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { fetchPatchOrganizationDeactivate } from "@/core/services/rest/simplyhop/organization";
import { useParams } from "next/navigation";

export const usePatchOrganizationDeactivate = () => {
  const { driver_id } = useParams();
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const mutation = useMutation<
    PatchOrganizationDeactivateSuccessResponseInterface,
    PatchOrganizationDeactivateErrorResponseInterface
  >({
    mutationKey: DetailOrganizationReactQueryKey.PatchOrganizationDeactivate(),
    mutationFn: () => {
      const payload: PatchOrganizationDeactivatePayloadRequestInterface = {
        path: {
          id: String(driver_id ?? "0"),
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
