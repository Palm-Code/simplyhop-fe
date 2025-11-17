import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";
import {
  DeleteVehicleIdErrorResponseInterface,
  DeleteVehicleIdPayloadRequestInterface,
  DeleteVehicleIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { fetchDeleteVehicleId } from "@/core/services/rest/simplyhop/vehicle";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const useDeleteVehicleId = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { id } = useParams();

  const mutation = useMutation<
    DeleteVehicleIdSuccessResponseInterface,
    DeleteVehicleIdErrorResponseInterface
  >({
    mutationKey: VehicleUpdateSupportReactQueryKey.DeleteVehicleId(),
    mutationFn: () => {
      const payload: DeleteVehicleIdPayloadRequestInterface = {
        path: {
          vehicle_id: String(id),
        },
      };

      return fetchDeleteVehicleId(payload);
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
