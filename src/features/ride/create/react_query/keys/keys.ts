import { RestGooglePostRouteDirectionsPayloadRequestInterface } from "@/core/models/rest/google/route";

export const PlanRideTripReactQueryKey = {
  GetVehicleMy: () => {
    return ["PlanRideTripReactQueryKey.GetVehicleMy"];
  },
  GetShiftList: () => {
    return ["PlanRideTripReactQueryKey.GetShiftList"];
  },
  GetDistanceMatrix: () => {
    return ["PlanRideTripReactQueryKey.GetDistanceMatrix"];
  },
  PostRouteDirections: (
    payload?: RestGooglePostRouteDirectionsPayloadRequestInterface
  ) => {
    return [
      "PlanRideTripReactQueryKey.PostRouteDirections",
      [payload] as const,
    ];
  },
  PostRidesFirst: () => {
    return ["PlanRideTripReactQueryKey.PostRidesFirst"];
  },
  PutRidesSecond: () => {
    return ["PlanRideTripReactQueryKey.PutRidesSecond"];
  },
  PutRidesThird: () => {
    return ["PlanRideTripReactQueryKey.PutRidesThird"];
  },
};
