import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { ListDriverContext, ListDriverActionEnum } from "../../context";

import { fetchGetDashboardSuperAdmin } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardSuperAdminErrorResponseInterface,
  GetDashboardSuperAdminPayloadRequestInterface,
  GetDashboardSuperAdminSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";
import { ListDriverReactQueryKey } from "../keys";

export const useGetDashboardSuperAdmin = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetDashboardSuperAdminPayloadRequestInterface = {
    params: {
      include: "user",
      append: "upcoming_rides",
      "page[number]": 1,
      "page[size]": 10,
    },
  };
  const query = useQuery<
    GetDashboardSuperAdminSuccessResponseInterface,
    GetDashboardSuperAdminErrorResponseInterface
  >({
    queryKey: ListDriverReactQueryKey.GetDashboardSuperAdmin(payload),
    queryFn: () => {
      return fetchGetDashboardSuperAdmin(payload);
    },
    enabled: !!userState.profile?.is_super_admin,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: ListDriverActionEnum.SetTableItemsData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: ListDriverActionEnum.SetTableLoadingData,
      payload: {
        ...state.table.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
