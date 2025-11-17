import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingAcceptErrorResponseInterface,
  PostBookingAcceptPayloadRequestInterface,
  PostBookingAcceptSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingAccept } from "@/core/services/rest/simplyhop/booking";
import { ChatTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const usePostBookingAccept = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const mutation = useMutation<
    PostBookingAcceptSuccessResponseInterface,
    PostBookingAcceptErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.PostBookingAccept(),
    mutationFn: () => {
      const payload: PostBookingAcceptPayloadRequestInterface = {
        path: {
          id: !bookingId ? "0" : String(bookingId),
        },
      };
      return fetchPostBookingAccept(payload);
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
