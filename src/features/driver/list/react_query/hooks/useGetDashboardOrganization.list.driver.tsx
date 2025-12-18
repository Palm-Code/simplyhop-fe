import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { ListDriverContext, ListDriverActionEnum } from "../../context";

import { fetchGetDashboardOrganization } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardOrganizationErrorResponseInterface,
  GetDashboardOrganizationPayloadRequestInterface,
  GetDashboardOrganizationSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";
import { ListDriverReactQueryKey } from "../keys";

export const useGetDashboardOrganization = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetDashboardOrganizationPayloadRequestInterface = {
    params: {
      include: "user",
      append: "upcoming_rides",
      "page[number]": state.table.pagination.current,
      "page[size]": 10,
    },
  };
  const query = useQuery<
    GetDashboardOrganizationSuccessResponseInterface,
    GetDashboardOrganizationErrorResponseInterface
  >({
    queryKey: ListDriverReactQueryKey.GetDashboardOrganization(payload),
    queryFn: () => {
      return fetchGetDashboardOrganization(payload);
    },
    enabled: userState.profile?.is_super_admin === false,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const newData = query.data.data;
      dispatch({
        type: ListDriverActionEnum.SetTableItemsData,
        payload:
          state.table.pagination.current === 1
            ? [...newData]
            : !newData.length
            ? state.table.items
            : [...state.table.items, ...newData],
      });
      dispatch({
        type: ListDriverActionEnum.SetTablePaginationData,
        payload: {
          ...state.table.pagination,
          last: query.data.meta.last_page,
        },
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
