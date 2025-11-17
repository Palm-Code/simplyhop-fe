import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingBookErrorResponseInterface,
  PostBookingBookPayloadRequestInterface,
  PostBookingBookSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingBook } from "@/core/services/rest/simplyhop/booking";
import { ResultTripContext } from "../../context";
import { ResultTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";
import { v4 as uuidv4 } from "uuid";

export const usePostBookingBook = () => {
  const { state } = React.useContext(ResultTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const searchParams = useSearchParams();
  const rideId = searchParams.get(RIDE_FILTER.RIDE_ID);
  const adult = searchParams.get(RIDE_FILTER.ADULT_PASSENGER);
  const children = searchParams.get(RIDE_FILTER.CHILDREN_PASSENGER);
  // const carSeat = searchParams.get(RIDE_FILTER.CAR_SEAT);

  let adultData: null | number = null;
  let childrenData: null | number = null;

  // let carSeatData: boolean = false;
  if (adult) {
    adultData = Number(adult);
  }

  if (children) {
    childrenData = Number(children);
  }

  // if (carSeat) {
  //   carSeatData = true;
  // }

  const payload: PostBookingBookPayloadRequestInterface = {
    body: {
      ride_id: Number(String(rideId ?? "0")),
      // need to adjust seat
      seats: (adultData ?? 0) + (childrenData ?? 0),
      ride_time_id: Number(String(rideId ?? "0")),
      offered_price: state.detail.form.price_offer.value,
      message: !state.detail.form.notes.value.length
        ? undefined
        : state.detail.form.notes.value,
    },
  };
  const mutation = useMutation<
    PostBookingBookSuccessResponseInterface,
    PostBookingBookErrorResponseInterface
  >({
    mutationKey: ResultTripReactQueryKey.PostBookingBook(),
    mutationFn: () => {
      return fetchPostBookingBook(payload);
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
