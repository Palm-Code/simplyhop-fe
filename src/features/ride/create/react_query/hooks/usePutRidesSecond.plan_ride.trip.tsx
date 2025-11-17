import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PutRidesSecondErrorResponseInterface,
  PutRidesSecondPayloadRequestInterface,
  PutRidesSecondSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPutRidesSecond } from "@/core/services/rest/simplyhop/rides";
import { PlanRideTripContext } from "../../context";
import { PlanRideTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";

export const usePutRidesSecond = () => {
  const { state } = React.useContext(PlanRideTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PutRidesSecondSuccessResponseInterface,
    PutRidesSecondErrorResponseInterface,
    { id: number }
  >({
    mutationKey: PlanRideTripReactQueryKey.PutRidesSecond(),
    mutationFn: (data: { id: number }) => {
      const payload: PutRidesSecondPayloadRequestInterface = {
        path: {
          id: data.id,
        },
        body: {
          recurring_ride: state.detail.form.plan.recurring.selected?.id ?? "no",
          waiting_time: state.detail.form.plan.umweg.value,
          available_seats: !state.detail.form.plan.seat.value
            ? 0
            : Number(state.detail.form.plan.seat.value),
          additional_info: state.detail.form.other.notes.value,
          available_child_seats: !state.detail.form.plan.available_child_seat
            .value
            ? 0
            : Number(state.detail.form.plan.available_child_seat.value),
        },
      };
      return fetchPutRidesSecond(payload);
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
