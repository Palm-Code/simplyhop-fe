import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { PlanRideTripReactQueryKey } from "../keys";
import { PlanRideTripContext } from "../../context";

import { fetchRestGoogleGetDistanceMatrix } from "@/core/services/rest/google";
import {
  RestGoogleGetDistanceMatrixPayloadRequestInterface,
  RestGoogleGetDistanceMatrixSuccessResponseInterface,
} from "@/core/models/rest/google/route";

export const useRestGoogleGetDistanceMatrix = () => {
  const { state } = React.useContext(PlanRideTripContext);

  const payload: RestGoogleGetDistanceMatrixPayloadRequestInterface = {
    params: {
      originLat: state.filters.origin.selected.lat_lng?.lat ?? 0,
      originLng: state.filters.origin.selected.lat_lng?.lng ?? 0,
      destLat: state.filters.destination.selected.lat_lng?.lat ?? 0,
      destLng: state.filters.destination.selected.lat_lng?.lng ?? 0,
    },
  };
  const mutation =
    useMutation<RestGoogleGetDistanceMatrixSuccessResponseInterface>({
      mutationKey: PlanRideTripReactQueryKey.GetDistanceMatrix(),
      mutationFn: () => {
        return fetchRestGoogleGetDistanceMatrix(payload);
      },
    });

  return mutation;
};
