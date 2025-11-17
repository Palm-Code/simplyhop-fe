import * as React from "react";
import {
  useGetDashboardSuperAdmin,
  useGetDashboardSuperAdminPerOrganizationId,
  useGetRidesSearch,
} from "../react_query/hooks";

export const DetailOrganizationContainer = () => {
  useGetDashboardSuperAdmin();
  useGetDashboardSuperAdminPerOrganizationId();
  useGetRidesSearch();
  return (
    <div>
      <div></div>
    </div>
  );
};
