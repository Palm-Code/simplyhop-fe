import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DashboardSupportContext,
  DashboardSupportActionEnum,
} from "../../context";

import { fetchGetDashboardSuperAdmin } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminErrorResponseInterface,
  GetDashboardSuperAdminPayloadRequestInterface,
  GetDashboardSuperAdminSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";
import { DashboardSupportReactQueryKey } from "../keys";

export const useGetDashboardSuperAdmin = () => {
  const { state, dispatch } = React.useContext(DashboardSupportContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetDashboardSuperAdminPayloadRequestInterface = {
    params: {
      include: "user",
      "page[number]": 1,
      "page[size]": 10,
    },
  };
  const query = useQuery<
    GetDashboardSuperAdminSuccessResponseInterface,
    GetDashboardSuperAdminErrorResponseInterface
  >({
    queryKey: DashboardSupportReactQueryKey.GetDashboardSuperAdmin(payload),
    queryFn: () => {
      return fetchGetDashboardSuperAdmin(payload);
    },
    enabled: !!userState.profile?.is_super_admin,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: DashboardSupportActionEnum.SetSectionsSuperAdminDriverData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DashboardSupportActionEnum.SetSectionsSuperAdminDriverLoadingData,
      payload: {
        ...state.sections.super_admin.driver.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
