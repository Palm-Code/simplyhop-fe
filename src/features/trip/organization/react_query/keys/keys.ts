import { GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";

export const OrganizationTripReactQueryKey = {
  GetDashboardSuperAdminPerOrganizationId: (
    payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface
  ) => {
    return [
      "OrganizationTripReactQueryKey.GetDashboardSuperAdminPerOrganizationId",
      [payload] as const,
    ];
  },
};
