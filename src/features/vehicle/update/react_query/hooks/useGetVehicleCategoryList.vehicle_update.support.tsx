import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";

import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import {
  GetVehicleCategoryListErrorResponseInterface,
  GetVehicleCategoryListPayloadRequestInterface,
  GetVehicleCategoryListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle_category";
import { fetchGetVehicleCategoryList } from "@/core/services/rest/simplyhop/vehicle_category";

export const useGetVehicleCategoryList = () => {
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const payload: GetVehicleCategoryListPayloadRequestInterface = {
    params: {
      search: !state.vehicle_information.general.form.car_category.query
        ? undefined
        : state.vehicle_information.general.form.car_category.query,
      "page[number]": 1,
      "page[size]": 30,
    },
  };

  const query = useQuery<
    GetVehicleCategoryListSuccessResponseInterface,
    GetVehicleCategoryListErrorResponseInterface
  >({
    queryKey: VehicleUpdateSupportReactQueryKey.GetVehicleCategoryList(payload),
    queryFn: () => {
      return fetchGetVehicleCategoryList(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: VehicleUpdateSupportActionEnum.SetVehicleInformationCarCategoryItems,
        payload: data.data.map((item) => {
          return {
            id: String(item.id),
            name: item.title,
          };
        }),
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
