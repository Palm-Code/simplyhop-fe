import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DriverTripReactQueryKey } from "../keys";
import { DriverTripActionEnum, DriverTripContext } from "../../context";

import { fetchGetUserProfileId } from "@/core/services/rest/simplyhop/user_profile";
import {
  GetUserProfileIdErrorResponseInterface,
  GetUserProfileIdPayloadRequestInterface,
  GetUserProfileIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { useParams } from "next/navigation";

export const useGetUserProfileId = () => {
  const { state, dispatch } = React.useContext(DriverTripContext);
  const { driver_id } = useParams();
  const payload: GetUserProfileIdPayloadRequestInterface = {
    path: {
      id: String(driver_id ?? "0"),
    },
  };
  const query = useQuery<
    GetUserProfileIdSuccessResponseInterface,
    GetUserProfileIdErrorResponseInterface
  >({
    queryKey: DriverTripReactQueryKey.GetUserProfileId(payload),
    queryFn: () => {
      return fetchGetUserProfileId(payload);
    },
    enabled: !!driver_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: DriverTripActionEnum.SetUserDataData,
        payload: data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DriverTripActionEnum.SetUserLoadingData,
      payload: {
        ...state.user.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);
  return query;
};
