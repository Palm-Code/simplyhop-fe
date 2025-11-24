import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostRidesArchiveErrorResponseInterface,
  PostRidesArchivePayloadRequestInterface,
  PostRidesArchiveSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPostRidesArchive } from "@/core/services/rest/simplyhop/rides";
import { ListTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ListTripContext } from "../../context";

export const usePostRidesArchive = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("ride_id");
  const { state } = React.useContext(ListTripContext);

  const payload: PostRidesArchivePayloadRequestInterface = {
    path: {
      id: !id ? 0 : Number(String(id)),
    },
    body: {
      joined_booking_ids: state.complete_ride_confirmation.confirmed_booking
        .filter((item) => item.type === "joined")
        .map((item) => item.id),
    },
  };

  const mutation = useMutation<
    PostRidesArchiveSuccessResponseInterface,
    PostRidesArchiveErrorResponseInterface
  >({
    mutationKey: ListTripReactQueryKey.PostRidesArchive(),
    mutationFn: () => {
      return fetchPostRidesArchive(payload);
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
