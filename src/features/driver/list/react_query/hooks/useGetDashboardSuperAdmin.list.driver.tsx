"use client";
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
import { useParams } from "next/navigation";

export const useGetDashboardSuperAdmin = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);
  const { state: userState } = React.useContext(UserContext);
  const { organization_id } = useParams();
  const payload: GetDashboardSuperAdminPayloadRequestInterface = {
    params: {
      include: "user",
      append: "upcoming_rides",
      "page[number]": state.table.pagination.current,
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
    queryKey: ListDriverReactQueryKey.GetDashboardSuperAdmin(payload),
    queryFn: () => {
      return fetchGetDashboardSuperAdmin(payload);
    },
    enabled: !!userState.profile?.is_super_admin,
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
