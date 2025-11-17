import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingRejectErrorResponseInterface,
  PostBookingRejectPayloadRequestInterface,
  PostBookingRejectSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingReject } from "@/core/services/rest/simplyhop/booking";
import { MyListTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const usePostBookingReject = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const payload: PostBookingRejectPayloadRequestInterface = {
    path: {
      id: !bookingId ? "0" : String(bookingId),
    },
  };

  const mutation = useMutation<
    PostBookingRejectSuccessResponseInterface,
    PostBookingRejectErrorResponseInterface
  >({
    mutationKey: MyListTripReactQueryKey.PostBookingReject(),
    mutationFn: () => {
      return fetchPostBookingReject(payload);
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
