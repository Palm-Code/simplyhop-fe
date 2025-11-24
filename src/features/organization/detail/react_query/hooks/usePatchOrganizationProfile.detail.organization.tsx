import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PatchOrganizationProfileErrorResponseInterface,
  PatchOrganizationProfilePayloadRequestInterface,
  PatchOrganizationProfileSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { DetailOrganizationReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { DetailOrganizationContext } from "../../context";
import { fetchPatchOrganizationProfile } from "@/core/services/rest/simplyhop/organization";
import { useParams } from "next/navigation";

export const usePatchOrganizationProfile = () => {
  const { driver_id } = useParams();
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(DetailOrganizationContext);

  const mutation = useMutation<
    PatchOrganizationProfileSuccessResponseInterface,
    PatchOrganizationProfileErrorResponseInterface
  >({
    mutationKey: DetailOrganizationReactQueryKey.PatchOrganizationProfile(),
    mutationFn: () => {
      const payload: PatchOrganizationProfilePayloadRequestInterface = {
        path: {
          id: String(driver_id ?? "0"),
        },
        body: {
          email: state.edit.form.email.value,
          name: state.edit.form.name.value,
          phone: state.edit.form.phonenumber.value,
          responsible_person_name:
            state.edit.form.responsible_person_name.value,
        },
      };
      return fetchPatchOrganizationProfile(payload);
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
