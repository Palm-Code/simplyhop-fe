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
      userState.profile?.role === "admin" ||
      !!userState.profile?.is_super_admin,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      if (userState.profile?.is_super_admin) {
        dispatch({
          type: DashboardSupportActionEnum.SetSectionsSuperAdminDriverData,
          payload: query.data.data,
        });
      } else {
        dispatch({
          type: DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverData,
          payload: query.data.data,
        });
      }
    }
  }, [query.data, query.isFetching, userState.profile?.is_super_admin]);

  React.useEffect(() => {
    if (userState.profile?.is_super_admin) {
      dispatch({
        type: DashboardSupportActionEnum.SetSectionsSuperAdminDriverLoadingData,
        payload: {
          ...state.sections.super_admin.driver.loading,
          is_fetching: query.isFetching,
        },
      });
    } else {
      dispatch({
        type: DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverLoadingData,
        payload: {
          ...state.sections.organization_admin.driver.loading,
          is_fetching: query.isFetching,
        },
      });
    }
  }, [query.isFetching, userState.profile?.is_super_admin]);

  return query;
};
