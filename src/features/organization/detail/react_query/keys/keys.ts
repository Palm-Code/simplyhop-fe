import { GetDashboardSuperAdminPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

export const DetailOrganizationReactQueryKey = {
  GetRidesSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["DetailOrganizationReactQueryKey.GetRidesMy", [payload] as const];
  },
  GetDashboardSuperAdmin: (
    payload?: GetDashboardSuperAdminPayloadRequestInterface
  ) => {
    return [
      "DetailOrganizationReactQueryKey.GetDashboardSuperAdmin",
      [payload] as const,
    ];
  },
  GetUserProfileId: (payload?: GetUserProfileIdPayloadRequestInterface) => {
    return [
      "DetailOrganizationReactQueryKey.GetUserProfileId",
      [payload] as const,
    ];
  },
};
