import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";
import {
  PostVehicleBrandCreateBodyRequestInterface,
  PostVehicleBrandCreateErrorResponseInterface,
  PostVehicleBrandCreatePayloadRequestInterface,
  PostVehicleBrandCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle_brand";
import { fetchPostVehicleBrandCreate } from "@/core/services/rest/simplyhop/vehicle_brand";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostVehicleBrandCreate = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostVehicleBrandCreateSuccessResponseInterface,
    PostVehicleBrandCreateErrorResponseInterface,
    { title: string }
  >({
    mutationKey: VehicleUpdateSupportReactQueryKey.PostVehicleBrandCreate(),
    mutationFn: (data: { title: string }) => {
      const bodyPayload: PostVehicleBrandCreateBodyRequestInterface = {
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

      const payload: PostVehicleBrandCreatePayloadRequestInterface = {
        body: formData,
      };

      return fetchPostVehicleBrandCreate(payload);
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
