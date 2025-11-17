import { RestGooglePostRouteDirectionsPayloadRequestInterface } from "@/core/models/rest/google/route";

export const FindTripReactQueryKey = {
  RestGooglePostRouteDirections: (
    payload?: RestGooglePostRouteDirectionsPayloadRequestInterface
  ) => {
    return [
      "FindTripReactQueryKey.RestGooglePostRouteDirections",
      [payload] as const,
    ];
  },
};
