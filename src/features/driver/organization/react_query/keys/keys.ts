import { GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";

export const OrganizationDriverReactQueryKey = {
  GetDashboardSuperAdminPerOrganizationId: (
    payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface
  ) => {
    return [
      "OrganizationDriverReactQueryKey.GetDashboardSuperAdminPerOrganizationId",
      [payload] as const,
    ];
  },
};
