import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DetailOrganizationContext,
  DetailOrganizationActionEnum,
} from "../../context";

import { fetchGetDashboardSuperAdmin } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminErrorResponseInterface,
  GetDashboardSuperAdminPayloadRequestInterface,
  GetDashboardSuperAdminSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";
import { DetailOrganizationReactQueryKey } from "../keys";
import { useParams } from "next/navigation";

export const useGetDashboardSuperAdmin = () => {
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const { state: userState } = React.useContext(UserContext);
  const { organization_id } = useParams();
  const payload: GetDashboardSuperAdminPayloadRequestInterface = {
    params: {
      include: "user",
      "page[number]": 1,
      "page[size]": 10,
      "filter[organization_id]": !!organization_id
        ? String(organization_id ?? "0")
        : undefined,
    },
  };
  const query = useQuery<
    GetDashboardSuperAdminSuccessResponseInterface,
    GetDashboardSuperAdminErrorResponseInterface
  >({
    queryKey: DetailOrganizationReactQueryKey.GetDashboardSuperAdmin(payload),
    queryFn: () => {
      return fetchGetDashboardSuperAdmin(payload);
    },
    enabled: !!userState.profile?.is_super_admin,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: DetailOrganizationActionEnum.SetDriverDataData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DetailOrganizationActionEnum.SetDriverLoadingData,
      payload: {
        ...state.driver.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
