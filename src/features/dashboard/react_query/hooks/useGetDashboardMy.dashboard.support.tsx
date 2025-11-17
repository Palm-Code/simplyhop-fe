import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSupportReactQueryKey } from "../keys";

import {
  DashboardSupportActionEnum,
  DashboardSupportContext,
} from "../../context";

import { fetchGetDashboardMy } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardMyErrorResponseInterface,
  GetDashboardMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { UserContext } from "@/core/modules/app/context";

export const useGetDashboardMy = () => {
  const { state: userState } = React.useContext(UserContext);
  const { dispatch } = React.useContext(DashboardSupportContext);

  const query = useQuery<
    GetDashboardMySuccessResponseInterface,
    GetDashboardMyErrorResponseInterface
  >({
    queryKey: DashboardSupportReactQueryKey.GetDashboardMy(),
    queryFn: () => {
      return fetchGetDashboardMy();
    },
    enabled: userState.profile?.role === "employee",
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: DashboardSupportActionEnum.SetSummaryPersonalData,
        payload: data.data,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
