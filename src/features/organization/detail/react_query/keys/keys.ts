import {
  GetDashboardSuperAdminPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

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
  GetDashboardSuperAdminPerOrganizationId: (
    payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface
  ) => {
    return [
      "DetailOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganizationId",
      [payload] as const,
    ];
  },
  PutOrganizationProfile: () => {
    return ["DetailOrganizationReactQueryKey.PutOrganizationProfile"];
  },
  PatchOrganizationDeactivate: () => {
    return ["DetailOrganizationReactQueryKey.PatchOrganizationDeactivate"];
  },
};
