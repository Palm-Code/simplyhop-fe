import { GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";

export const OrganizationDetailDriverReactQueryKey = {
  GetDashboardSuperAdminPerOrganizationId: (
    payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface
  ) => {
    return [
      "OrganizationDetailDriverReactQueryKey.GetDashboardSuperAdminPerOrganizationId",
      [payload] as const,
    ];
  },
};
