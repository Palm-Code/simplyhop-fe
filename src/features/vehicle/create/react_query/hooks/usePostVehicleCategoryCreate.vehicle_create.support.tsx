import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehicleCreateSupportReactQueryKey } from "../keys";
import {
  PostVehicleCategoryCreateBodyRequestInterface,
  PostVehicleCategoryCreateErrorResponseInterface,
  PostVehicleCategoryCreatePayloadRequestInterface,
  PostVehicleCategoryCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle_category";
import { fetchPostVehicleCategoryCreate } from "@/core/services/rest/simplyhop/vehicle_category";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostVehicleCategoryCreate = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostVehicleCategoryCreateSuccessResponseInterface,
    PostVehicleCategoryCreateErrorResponseInterface,
    { title: string }
  >({
    mutationKey: VehicleCreateSupportReactQueryKey.PostVehicleCategoryCreate(),
    mutationFn: (data: { title: string }) => {
      const bodyPayload: PostVehicleCategoryCreateBodyRequestInterface = {
        title: data.title,
      };
      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([, value]) => value !== undefined)
      );

      for (const key of Object.keys(cleanedObj)) {
        formData.append(
          key,
          String((cleanedObj as { [key: string]: string })[key])
        );
      }

      const payload: PostVehicleCategoryCreatePayloadRequestInterface = {
        body: formData,
      };

      return fetchPostVehicleCategoryCreate(payload);
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
