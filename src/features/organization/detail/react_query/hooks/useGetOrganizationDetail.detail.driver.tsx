import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DetailOrganizationReactQueryKey } from "../keys";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";

import { fetchGetUserProfileId } from "@/core/services/rest/simplyhop/user_profile";
import {
  GetUserProfileIdErrorResponseInterface,
  GetUserProfileIdPayloadRequestInterface,
  GetUserProfileIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { useParams } from "next/navigation";

export const useGetUserProfileId = () => {
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const { id } = useParams();
  const payload: GetUserProfileIdPayloadRequestInterface = {
    path: {
      id: String(id ?? "0"),
    },
  };
  const query = useQuery<
    GetUserProfileIdSuccessResponseInterface,
    GetUserProfileIdErrorResponseInterface
  >({
    queryKey: DetailOrganizationReactQueryKey.GetUserProfileId(payload),
    queryFn: () => {
      return fetchGetUserProfileId(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: DetailOrganizationActionEnum.SetUserDataData,
        payload: data.data,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DetailOrganizationActionEnum.SetUserLoadingData,
      payload: {
        ...state.user.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);
  return query;
};
