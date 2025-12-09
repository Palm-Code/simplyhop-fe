import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { CreateOrganizationReactQueryKey } from "../keys";

import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";
import { fetchGetVehicleBrandList } from "@/core/services/rest/simplyhop/vehicle_brand";
import {
  GetVehicleBrandListErrorResponseInterface,
  GetVehicleBrandListPayloadRequestInterface,
  GetVehicleBrandListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle_brand";

export const useGetVehicleBrandList = () => {
  const { state, dispatch } = React.useContext(CreateOrganizationContext);

  const payload: GetVehicleBrandListPayloadRequestInterface = {
    params: {
      search: !state.vehicle_information.general.form.car_brand.query
        ? undefined
        : state.vehicle_information.general.form.car_brand.query,
      "page[number]": 1,
      "page[size]": 30,
    },
  };

  const query = useQuery<
    GetVehicleBrandListSuccessResponseInterface,
    GetVehicleBrandListErrorResponseInterface
  >({
    queryKey: CreateOrganizationReactQueryKey.GetVehicleBrandList(payload),
    queryFn: () => {
      return fetchGetVehicleBrandList(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CreateOrganizationActionEnum.SetVehicleInformationData,
        payload: {
          ...state.vehicle_information,
          general: {
            ...state.vehicle_information.general,
            form: {
              ...state.vehicle_information.general.form,
              car_brand: {
                ...state.vehicle_information.general.form.car_brand,
                items: data.data.map((item) => {
                  return {
                    id: String(item.id),
                    name: item.title,
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
