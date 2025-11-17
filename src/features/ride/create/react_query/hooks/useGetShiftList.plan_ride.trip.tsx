import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { PlanRideTripReactQueryKey } from "../keys";

import { PlanRideTripContext, PlanRideTripActionEnum } from "../../context";

import { fetchGetShiftList } from "@/core/services/rest/simplyhop/shift";
import {
  GetShiftListErrorResponseInterface,
  GetShiftListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/shift";

export const useGetShiftList = () => {
  const { state, dispatch } = React.useContext(PlanRideTripContext);

  const query = useQuery<
    GetShiftListSuccessResponseInterface,
    GetShiftListErrorResponseInterface
  >({
    queryKey: PlanRideTripReactQueryKey.GetShiftList(),
    queryFn: () => {
      return fetchGetShiftList();
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: PlanRideTripActionEnum.SetDetailData,
        payload: {
          ...state.detail,
          form: {
            ...state.detail.form,
            plan: {
              ...state.detail.form.plan,
              shift: {
                ...state.detail.form.plan.shift,
                items: data.data.map((item) => {
                  return {
                    id: String(item.id),
                    name: item.name,
                  };
                }),
              },
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
