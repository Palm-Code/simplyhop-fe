import {
  GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/dashboard";

export const ListOrganizationReactQueryKey = {
  GetDashboardSuperAdminPerOrganization: (
    payload?: GetDashboardSuperAdminPerOrganizationPayloadRequestInterface
  ) => {
    return [
      "ListOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganization",
      [payload] as const,
    ];
  },
  GetDashboardSuperAdminPerOrganizationId: (
    payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface
  ) => {
    return [
      "ListOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganization",
      [payload] as const,
    ];
  },
};
