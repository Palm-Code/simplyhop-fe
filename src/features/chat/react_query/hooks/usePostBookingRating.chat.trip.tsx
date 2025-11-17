import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingRatingErrorResponseInterface,
  PostBookingRatingPayloadRequestInterface,
  PostBookingRatingSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingRating } from "@/core/services/rest/simplyhop/booking";
import { ChatTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ChatTripContext } from "../../context";

export const usePostBookingRating = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { state } = React.useContext(ChatTripContext);

  const mutation = useMutation<
    PostBookingRatingSuccessResponseInterface,
    PostBookingRatingErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.PostBookingRating(),
    mutationFn: () => {
      const payload: PostBookingRatingPayloadRequestInterface = {
        path: {
          ride_booking_id: !bookingId ? "0" : String(bookingId),
        },
        body: {
          rating: state.completed_ride.rating ?? 0,
        },
      };
      return fetchPostBookingRating(payload);
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
