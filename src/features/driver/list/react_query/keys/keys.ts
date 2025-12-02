import {
  GetDashboardOrganizationPayloadRequestInterface,
  GetDashboardSuperAdminPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { GetUserBlockListPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_block";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

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
  GetUserProfileId: (payload?: GetUserProfileIdPayloadRequestInterface) => {
    return ["ListDriverReactQueryKey.GetUserProfileId", [payload] as const];
  },
  DeleteMessageRoomsUserId: () => {
    return ["ListDriverReactQueryKey.DeleteMessageRoomsUserId"];
  },
  PatchUserDeactivate: () => {
    return ["ListDriverReactQueryKey.PatchUserDeactivate"];
  },
  PatchUserActivate: () => {
    return ["ListDriverReactQueryKey.PatchUserActivate"];
  },
  GetUserBlockList: (payload?: GetUserBlockListPayloadRequestInterface) => {
    return ["ListDriverReactQueryKey.GetUserBlockList", [payload] as const];
  },
};
