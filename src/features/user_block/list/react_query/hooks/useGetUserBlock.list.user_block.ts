import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { ListUserBlockContext, ListUserBlockActionEnum } from "../../context";

import { fetchGetUserBlockList } from "@/core/services/rest/simplyhop/user_block";
import {
  GetUserBlockListErrorResponseInterface,
  GetUserBlockListPayloadRequestInterface,
  GetUserBlockListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_block";
import { UserContext } from "@/core/modules/app/context";
import { ListUserBlockReactQueryKey } from "../keys";

export const useGetUserBlockList = () => {
  const { state, dispatch } = React.useContext(ListUserBlockContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetUserBlockListPayloadRequestInterface = {
    params: {
      include: "user,blockedUser",
      "page[number]": 1,
      "page[size]": 100,
    },
  };
  const query = useQuery<
    GetUserBlockListSuccessResponseInterface,
    GetUserBlockListErrorResponseInterface
  >({
    queryKey: ListUserBlockReactQueryKey.GetUserBlockList(payload),
    queryFn: () => {
      return fetchGetUserBlockList(payload);
    },
    enabled: userState.profile?.is_super_admin === false,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      dispatch({
        type: ListUserBlockActionEnum.SetItemsItemsData,
        payload: query.data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: ListUserBlockActionEnum.SetItemsLoadingData,
      payload: {
        ...state.items.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);

  return query;
};
