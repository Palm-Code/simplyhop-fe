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
      const data = query.data.data;
      dispatch({
        type: ListDriverActionEnum.SetUserProfileData,
        payload: {
          ...state.user_profile,
          data: data,
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
