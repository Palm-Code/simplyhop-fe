import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

export const DriverTripReactQueryKey = {
  GetUserProfileId: (payload?: GetUserProfileIdPayloadRequestInterface) => {
    return ["DriverTripReactQueryKey.GetUserProfileId", [payload] as const];
  },
};
