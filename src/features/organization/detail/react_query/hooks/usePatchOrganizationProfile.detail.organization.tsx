import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PutOrganizationProfileErrorResponseInterface,
  PutOrganizationProfilePayloadRequestInterface,
  PutOrganizationProfileSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { DetailOrganizationReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { DetailOrganizationContext } from "../../context";
import { fetchPutOrganizationProfile } from "@/core/services/rest/simplyhop/organization";
import { useParams } from "next/navigation";

export const usePutOrganizationProfile = () => {
  const { driver_id } = useParams();
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(DetailOrganizationContext);

  const mutation = useMutation<
    PutOrganizationProfileSuccessResponseInterface,
    PutOrganizationProfileErrorResponseInterface
  >({
    mutationKey: DetailOrganizationReactQueryKey.PutOrganizationProfile(),
    mutationFn: () => {
      const payload: PutOrganizationProfilePayloadRequestInterface = {
        path: {
          id: String(driver_id ?? "0"),
        },
        body: {
          email: state.edit.form.email.value,
          name: state.edit.form.name.value,
          phone: state.edit.form.phonenumber.value,
          responsible_person_first_name:
            state.edit.form.responsible_person.first_name.value,
          responsible_person_last_name:
            state.edit.form.responsible_person.last_name.value,
        },
      };
      return fetchPutOrganizationProfile(payload);
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
