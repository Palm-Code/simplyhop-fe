import {
  GetDashboardSuperAdminPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { GetOrganizationIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/organization";
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
  GetOrganizationId: (payload?: GetOrganizationIdPayloadRequestInterface) => {
    return [
      "DetailOrganizationReactQueryKey.GetOrganizationId",
      [payload] as const,
    ];
  },
  PostOrganizationPartialUpdate: () => {
    return ["DetailOrganizationReactQueryKey.PostOrganizationPartialUpdate"];
  },
  PatchOrganizationDeactivate: () => {
    return ["DetailOrganizationReactQueryKey.PatchOrganizationDeactivate"];
  },
};
