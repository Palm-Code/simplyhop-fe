import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSupportReactQueryKey } from "../keys";

import {
  DashboardSupportActionEnum,
  DashboardSupportContext,
} from "../../context";

import { fetchGetDashboardOrganizationSummary } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardOrganizationSummaryErrorResponseInterface,
  GetDashboardOrganizationSummarySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";

export const useGetDashboardOrganizationSummary = () => {
  const { state: userState } = React.useContext(UserContext);
  const { dispatch } = React.useContext(DashboardSupportContext);

  const query = useQuery<
    GetDashboardOrganizationSummarySuccessResponseInterface,
    GetDashboardOrganizationSummaryErrorResponseInterface
  >({
    queryKey: DashboardSupportReactQueryKey.GetDashboardOrganizationSummary(),
    queryFn: () => {
      return fetchGetDashboardOrganizationSummary();
    },
    enabled:
      userState.profile?.role === "admin" &&
      userState.profile?.is_super_admin === false,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: DashboardSupportActionEnum.SetSummaryOrganizationAdminData,
        payload: data.data,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
