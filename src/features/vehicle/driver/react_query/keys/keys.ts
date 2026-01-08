import { GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

export const DriverVehicleReactQueryKey = {
  GetDashboardSuperAdminPerOrganizationId: (
    payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface
  ) => {
    return [
      "DriverVehicleReactQueryKey.GetDashboardSuperAdminPerOrganizationId",
      [payload] as const,
    ];
  },
  GetUserProfileId: (payload?: GetUserProfileIdPayloadRequestInterface) => {
    return ["DriverVehicleReactQueryKey.GetUserProfileId", [payload] as const];
  },
};
