import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PutRidesThirdErrorResponseInterface,
  PutRidesThirdPayloadRequestInterface,
  PutRidesThirdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPutRidesThird } from "@/core/services/rest/simplyhop/rides";
import { PlanRideTripContext } from "../../context";
import { PlanRideTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";

export const usePutRidesThird = () => {
  const { state } = React.useContext(PlanRideTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PutRidesThirdSuccessResponseInterface,
    PutRidesThirdErrorResponseInterface,
    { id: number; url: string }
  >({
    mutationKey: PlanRideTripReactQueryKey.PutRidesThird(),
    mutationFn: (data: { id: number; url: string }) => {
      const payload: PutRidesThirdPayloadRequestInterface = {
        path: {
          id: data.id,
        },
        body: {
          url: data.url,
          maxtwo_backseat: state.detail.form.plan.back_seat.checked,
          base_price: state.detail.form.other.price.value,
        },
      };
      return fetchPutRidesThird(payload);
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
