import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DriverVehicleContext,
  DriverVehicleActionEnum,
} from "../../context";

import { fetchGetDashboardSuperAdminPerOrganizationId } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminPerOrganizationIdErrorResponseInterface,
  GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface,
  GetDashboardSuperAdminPerOrganizationIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { DriverVehicleReactQueryKey } from "../keys";
import { useParams } from "next/navigation";

export const useGetDashboardSuperAdminPerOrganizationId = () => {
  const { state, dispatch } = React.useContext(DriverVehicleContext);
  const { organization_id } = useParams();
  const payload: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface =
    {
      path: {
        id: String(organization_id ?? "0"),
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
      DriverVehicleReactQueryKey.GetDashboardSuperAdminPerOrganizationId(
        payload
      ),
    queryFn: () => {
      return fetchGetDashboardSuperAdminPerOrganizationId(payload);
    },
    enabled: !!organization_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: DriverVehicleActionEnum.SetProfileDataData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DriverVehicleActionEnum.SetProfileLoadingData,
      payload: {
        ...state.profile.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
