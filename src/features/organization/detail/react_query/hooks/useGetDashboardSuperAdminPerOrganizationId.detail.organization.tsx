import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DetailOrganizationContext,
  DetailOrganizationActionEnum,
} from "../../context";

import { fetchGetDashboardSuperAdminPerOrganizationId } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminPerOrganizationIdErrorResponseInterface,
  GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { DetailOrganizationReactQueryKey } from "../keys";
import { useParams } from "next/navigation";

export const useGetDashboardSuperAdminPerOrganizationId = () => {
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const { id } = useParams();
  const payload: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface =
    {
      path: {
        id: String(id ?? "0"),
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
      DetailOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganizationId(
        payload
      ),
    queryFn: () => {
      return fetchGetDashboardSuperAdminPerOrganizationId(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: DetailOrganizationActionEnum.SetUserDataData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DetailOrganizationActionEnum.SetUserLoadingData,
      payload: {
        ...state.user.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
