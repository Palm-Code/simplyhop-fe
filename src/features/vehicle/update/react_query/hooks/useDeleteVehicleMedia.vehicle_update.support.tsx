import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";
import {
  DeleteVehicleMediaErrorResponseInterface,
  DeleteVehicleMediaPayloadRequestInterface,
  DeleteVehicleMediaSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { fetchDeleteVehicleMedia } from "@/core/services/rest/simplyhop/vehicle";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const useDeleteVehicleMedia = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { id } = useParams();

  const mutation = useMutation<
    DeleteVehicleMediaSuccessResponseInterface,
    DeleteVehicleMediaErrorResponseInterface,
    { id: string }
  >({
    mutationKey: VehicleUpdateSupportReactQueryKey.DeleteVehicleMedia(),
    mutationFn: (data: { id: string }) => {
      const payload: DeleteVehicleMediaPayloadRequestInterface = {
        path: {
          vehicle_id: String(id),
          media_id: String(data.id),
        },
      };

      return fetchDeleteVehicleMedia(payload);
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
