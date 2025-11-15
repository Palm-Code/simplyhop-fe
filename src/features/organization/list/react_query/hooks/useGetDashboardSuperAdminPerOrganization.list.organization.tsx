import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  ListOrganizationContext,
  ListOrganizationActionEnum,
} from "../../context";

import { fetchGetDashboardSuperAdminPerOrganization } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminPerOrganizationErrorResponseInterface,
  GetDashboardSuperAdminPerOrganizationPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";
import { ListOrganizationReactQueryKey } from "../keys";

export const useGetDashboardSuperAdminPerOrganization = () => {
  const { state, dispatch } = React.useContext(ListOrganizationContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetDashboardSuperAdminPerOrganizationPayloadRequestInterface =
    {
      params: {
        include: "organization",
        "page[number]": 1,
        "page[size]": 10,
      },
    };
  const query = useQuery<
    GetDashboardSuperAdminPerOrganizationSuccessResponseInterface,
    GetDashboardSuperAdminPerOrganizationErrorResponseInterface
  >({
    queryKey:
      ListOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganization(
        payload
      ),
    queryFn: () => {
      return fetchGetDashboardSuperAdminPerOrganization(payload);
    },
    enabled: !!userState.profile?.is_super_admin,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: ListOrganizationActionEnum.SetTableItemsData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: ListOrganizationActionEnum.SetTableLoadingData,
      payload: {
        ...state.table.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
