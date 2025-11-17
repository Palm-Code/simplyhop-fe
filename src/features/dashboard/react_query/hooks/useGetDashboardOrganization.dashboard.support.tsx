import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DashboardSupportContext,
  DashboardSupportActionEnum,
} from "../../context";

import { fetchGetDashboardOrganization } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardOrganizationErrorResponseInterface,
  GetDashboardOrganizationPayloadRequestInterface,
  GetDashboardOrganizationSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";
import { DashboardSupportReactQueryKey } from "../keys";

export const useGetDashboardOrganization = () => {
  const { state, dispatch } = React.useContext(DashboardSupportContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetDashboardOrganizationPayloadRequestInterface = {
    params: {
      include: "user",
      "page[number]": 1,
      "page[size]": 10,
    },
  };
  const query = useQuery<
    GetDashboardOrganizationSuccessResponseInterface,
    GetDashboardOrganizationErrorResponseInterface
  >({
    queryKey: DashboardSupportReactQueryKey.GetDashboardOrganization(payload),
    queryFn: () => {
      return fetchGetDashboardOrganization(payload);
    },
    enabled:
      userState.profile?.role === "admin" || !userState.profile?.is_super_admin,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverLoadingData,
      payload: {
        ...state.sections.organization_admin.driver.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
