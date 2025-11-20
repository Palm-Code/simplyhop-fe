import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";
import { GetVehicleListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";

export const DetailDriverReactQueryKey = {
  GetRidesSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["DetailDriverReactQueryKey.GetRidesMy", [payload] as const];
  },
  GetVehicleList: (payload?: GetVehicleListPayloadRequestInterface) => {
    return ["DetailDriverReactQueryKey.GetVehicleList", [payload] as const];
  },
  GetUserProfileId: (payload?: GetUserProfileIdPayloadRequestInterface) => {
    return ["DetailDriverReactQueryKey.GetUserProfileId", [payload] as const];
  },
  PatchUserProfile: () => {
    return ["DetailDriverReactQueryKey.PatchUserProfile"];
  },
  PatchUserDeactivate: () => {
    return ["ListDriverReactQueryKey.PatchUserDeactivate"];
  },
};
