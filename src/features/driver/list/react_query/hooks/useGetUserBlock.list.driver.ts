import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { ListDriverContext, ListDriverActionEnum } from "../../context";

import { fetchGetUserBlockList } from "@/core/services/rest/simplyhop/user_block";
import {
  GetUserBlockListErrorResponseInterface,
  GetUserBlockListPayloadRequestInterface,
  GetUserBlockListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_block";
import { UserContext } from "@/core/modules/app/context";
import { ListDriverReactQueryKey } from "../keys";

export const useGetUserBlockList = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetUserBlockListPayloadRequestInterface = {
    params: {
      "filter[user_id]": String(userState.profile?.id ?? -1),
      include: "user,blockedUser",
      "page[number]": 1,
      "page[size]": 100,
    },
  };
  const query = useQuery<
    GetUserBlockListSuccessResponseInterface,
    GetUserBlockListErrorResponseInterface
  >({
    queryKey: ListDriverReactQueryKey.GetUserBlockList(payload),
    queryFn: () => {
      return fetchGetUserBlockList(payload);
    },
    enabled: !!userState.profile?.id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: ListDriverActionEnum.SetBlockedUserItemsData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: ListDriverActionEnum.SetBlockedUserLoadingData,
      payload: {
        ...state.blocked_user.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
