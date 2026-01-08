import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DriverVehicleReactQueryKey } from "../keys";

import { fetchGetUserProfileId } from "@/core/services/rest/simplyhop/user_profile";
import {
  GetUserProfileIdErrorResponseInterface,
  GetUserProfileIdPayloadRequestInterface,
  GetUserProfileIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { useParams } from "next/navigation";
import {
  DetailDriverActionEnum,
  DetailDriverContext,
} from "@/features/driver/detail/context";

export const useGetUserProfileId = () => {
  const { state, dispatch } = React.useContext(DetailDriverContext);
  const { driver_id } = useParams();
  const payload: GetUserProfileIdPayloadRequestInterface = {
    path: {
      id: String(driver_id ?? "0"),
    },
    params: {
      include: "organization",
    },
  };
  const query = useQuery<
    GetUserProfileIdSuccessResponseInterface,
    GetUserProfileIdErrorResponseInterface
  >({
    queryKey: DriverVehicleReactQueryKey.GetUserProfileId(payload),
    queryFn: () => {
      return fetchGetUserProfileId(payload);
    },
    enabled: !!driver_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: DetailDriverActionEnum.SetUserDataData,
        payload: data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DetailDriverActionEnum.SetUserLoadingData,
      payload: {
        ...state.user.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);
  return query;
};
