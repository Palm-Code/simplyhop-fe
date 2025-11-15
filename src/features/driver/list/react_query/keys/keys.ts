import {
  GetDashboardOrganizationPayloadRequestInterface,
  GetDashboardSuperAdminPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/dashboard";

export const ListDriverReactQueryKey = {
  GetDashboardOrganization: (
    payload?: GetDashboardOrganizationPayloadRequestInterface
  ) => {
    return [
      "ListDriverReactQueryKey.GetDashboardOrganization",
      [payload] as const,
    ];
  },
  GetDashboardSuperAdmin: (
    payload?: GetDashboardSuperAdminPayloadRequestInterface
  ) => {
    return [
      "ListDriverReactQueryKey.GetDashboardSuperAdmin",
      [payload] as const,
    ];
  },
};
