import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PatchUserProfileErrorResponseInterface,
  PatchUserProfilePayloadRequestInterface,
  PatchUserProfileSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user";
import { DetailDriverReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { DetailDriverContext } from "../../context";
import { fetchPatchUserProfile } from "@/core/services/rest/simplyhop/user";
import { useParams } from "next/navigation";

export const usePatchUserProfile = () => {
  const { driver_id } = useParams();
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(DetailDriverContext);

  const mutation = useMutation<
    PatchUserProfileSuccessResponseInterface,
    PatchUserProfileErrorResponseInterface
  >({
    mutationKey: DetailDriverReactQueryKey.PatchUserProfile(),
    mutationFn: () => {
      const payload: PatchUserProfilePayloadRequestInterface = {
        path: {
          id: String(driver_id ?? "0"),
        },
        body: {
          first_name: state.edit.form.first_name.value,
          last_name: state.edit.form.last_name.value,
          city: state.edit.form.city.value,
          mobile: state.edit.form.phonenumber.value,
          bio: state.edit.form.about_me.value,
          gender: state.edit.form.gender.selected?.name,
        },
      };
      return fetchPatchUserProfile(payload);
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
              message:
                "Profil erfolgreich aktualisiert! Deine Änderungen wurden gespeichert.",
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
