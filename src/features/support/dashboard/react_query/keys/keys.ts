import { GetRidesMyPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

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
  GetRidesMy: (payload?: GetRidesMyPayloadRequestInterface) => {
    return ["DashboardSupportReactQueryKey.GetRidesMy", [payload] as const];
  },
  GetVehicleMy: () => {
    return ["DashboardSupportReactQueryKey.GetVehicleMy"];
  },
};
