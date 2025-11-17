import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ListDriverReactQueryKey } from "../keys";
import { ListDriverActionEnum, ListDriverContext } from "../../context";

import { fetchGetUserProfileId } from "@/core/services/rest/simplyhop/user_profile";
import {
  GetUserProfileIdErrorResponseInterface,
  GetUserProfileIdPayloadRequestInterface,
  GetUserProfileIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { formatDisplayName } from "@/core/utils/name/functions";

export const useGetUserProfileId = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);

  const payload: GetUserProfileIdPayloadRequestInterface = {
    path: {
      id: state.user_profile.user_id ?? "-1",
    },
  };
  const query = useQuery<
    GetUserProfileIdSuccessResponseInterface,
    GetUserProfileIdErrorResponseInterface
  >({
    queryKey: ListDriverReactQueryKey.GetUserProfileId(payload),
    queryFn: () => {
      return fetchGetUserProfileId(payload);
    },
    enabled: !!state.user_profile.user_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ListDriverActionEnum.SetUserProfileData,
        payload: {
          ...state.user_profile,
          data: {
            ...state.user_profile.data,
            avatar: {
              src: data.data.avatar,
              alt: "driver",
            },
            name: formatDisplayName({
              first_name: data.data.first_name,
              email: data.data.email,
            }),
            type: data.data.is_driver ? "driver" : "passenger",
            phone: data.data.mobile ?? "-",
            statistic: {
              trip: data.data.total_trips,
              ratings: data.data.average_ride_rating,
              passengers: data.data.total_passengers_count,
            },
            email: data.data.email,
            place: data.data.city,
            gender: data.data.gender,
            i_blocked: data.data.i_blocked,
            blocked_me: data.data.blocked_me,
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
