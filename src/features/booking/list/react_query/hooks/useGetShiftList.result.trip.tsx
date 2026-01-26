import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import { fetchGetShiftList } from "@/core/services/rest/simplyhop/shift";
import {
  GetShiftListErrorResponseInterface,
  GetShiftListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/shift";
import { ResultTripActionEnum, ResultTripContext } from "../../context";

export const useGetShifts = () => {
  const { state, dispatch } = React.useContext(ResultTripContext);

  const query = useQuery<
    GetShiftListSuccessResponseInterface,
    GetShiftListErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.GetShiftList(),
    queryFn: () => {
      return fetchGetShiftList();
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ResultTripActionEnum.SetAdvancedFilterData,
        payload: {
          ...state.advanced_filter,
          shift: {
            ...state.advanced_filter.shift,
            items: data.data.map((item) => {
              return {
                id: String(item.id),
                name: item.name,
              };
            }),
          },
        },
      });
      dispatch({
        type: ResultTripActionEnum.SetVehicleFiltersData,
        payload: {
          ...state.vehicle_filters,
          shift: {
            ...state.vehicle_filters.shift,
            items: data.data.map((item) => {
              return {
                id: String(item.id),
                name: item.name,
              };
            }),
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
