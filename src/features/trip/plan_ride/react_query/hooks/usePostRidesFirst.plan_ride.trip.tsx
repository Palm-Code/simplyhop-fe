import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostRidesFirstErrorResponseInterface,
  PostRidesFirstPayloadRequestInterface,
  PostRidesFirstSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPostRidesFirst } from "@/core/services/rest/simplyhop/rides";
import { PlanRideTripContext } from "../../context";
import { PlanRideTripReactQueryKey } from "../keys";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const usePostRidesFirst = () => {
  const { state } = React.useContext(PlanRideTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostRidesFirstSuccessResponseInterface,
    PostRidesFirstErrorResponseInterface
  >({
    mutationKey: PlanRideTripReactQueryKey.PostRidesFirst(),
    mutationFn: () => {
      const payload: PostRidesFirstPayloadRequestInterface = {
        body: {
          vehicle_id: Number(state.filters.auto.selected?.id ?? "0"),
          start_lat: state.filters.origin.selected.lat_lng?.lat ?? 0,
          start_long: state.filters.origin.selected.lat_lng?.lng ?? 0,
          start_name: state.filters.origin.selected.item?.name ?? "",
          destination_lat: state.filters.destination.selected.lat_lng?.lat ?? 0,
          destination_long:
            state.filters.destination.selected.lat_lng?.lng ?? 0,
          destination_name: state.filters.destination.selected.item?.name ?? "",
          eta: state.detail.distance_matrix?.duration.value ?? 0,
          departure_time: `${dayjs(
            Array.isArray(state.filters.date.selected) 
              ? state.filters.date.selected[0] 
              : state.filters.date.selected
          ).format("YYYY-MM-DD")} ${state.filters.time.value}:00`,
        },
      };
      return fetchPostRidesFirst(payload);
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
