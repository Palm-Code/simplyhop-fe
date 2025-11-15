import {
  GetDashboardOrganizationPayloadRequestInterface,
  GetDashboardSuperAdminPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const DashboardSupportReactQueryKey = {
  GetDashboardMy: () => {
    return ["DashboardSupportReactQueryKey.GetDashboardMy"];
  },
  GetDashboardOrganizationSummary: () => {
    return ["DashboardSupportReactQueryKey.GetDashboardOrganizationSummary"];
  },
  GetDashboardSuperAdminSummary: () => {
    return ["DashboardSupportReactQueryKey.GetDashboardSuperAdminSummary"];
  },
  GetRidesSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["DashboardSupportReactQueryKey.GetRidesMy", [payload] as const];
  },
  GetVehicleMy: () => {
    return ["DashboardSupportReactQueryKey.GetVehicleMy"];
  },
  GetDashboardOrganization: (
    payload?: GetDashboardOrganizationPayloadRequestInterface
  ) => {
    return [
      "DashboardSupportReactQueryKey.GetDashboardOrganization",
      [payload] as const,
    ];
  },
  GetDashboardSuperAdmin: (
    payload?: GetDashboardSuperAdminPayloadRequestInterface
  ) => {
    return [
      "DashboardSupportReactQueryKey.GetDashboardSuperAdmin",
      [payload] as const,
    ];
  },
  GetDashboardSuperAdminPerOrganization: (
    payload?: GetDashboardSuperAdminPerOrganizationPayloadRequestInterface
  ) => {
    return [
      "DashboardSupportReactQueryKey.GetDashboardSuperAdminPerOrganization",
      [payload] as const,
    ];
  },
};
