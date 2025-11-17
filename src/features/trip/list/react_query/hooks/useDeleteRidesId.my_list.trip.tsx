import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";
import {
  DeleteRidesIdErrorResponseInterface,
  DeleteRidesIdPayloadRequestInterface,
  DeleteRidesIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchDeleteRidesId } from "@/core/services/rest/simplyhop/rides";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const useDeleteRidesId = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("ride_id");

  const payload: DeleteRidesIdPayloadRequestInterface = {
    path: {
      id: String(id),
    },
  };
  const mutation = useMutation<
    DeleteRidesIdSuccessResponseInterface,
    DeleteRidesIdErrorResponseInterface
  >({
    mutationKey: MyListTripReactQueryKey.DeleteRidesId(),
    mutationFn: () => {
      return fetchDeleteRidesId(payload);
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
