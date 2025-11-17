import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  ListOrganizationActionEnum,
  ListOrganizationContext,
} from "../../context";

import { fetchGetDashboardSuperAdminPerOrganizationId } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminPerOrganizationIdErrorResponseInterface,
  GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { ListOrganizationReactQueryKey } from "../keys";

export const useGetDashboardSuperAdminPerOrganizationId = () => {
  const { state, dispatch } = React.useContext(ListOrganizationContext);

  const payload: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface =
    {
      path: {
        id: String(state.user_profile.user_id ?? "0"),
      },
      params: {
        include: "organization",
      },
    };
  const query = useQuery<
    GetDashboardSuperAdminPerOrganizationIdSuccessResponseInterface,
    GetDashboardSuperAdminPerOrganizationIdErrorResponseInterface
  >({
    queryKey:
      ListOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganizationId(
        payload
      ),
    queryFn: () => {
      return fetchGetDashboardSuperAdminPerOrganizationId(payload);
    },
    enabled: !!state.user_profile.user_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: ListOrganizationActionEnum.SetUserProfileData,
        payload: {
          ...state.user_profile,
          data: query.data.data,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
