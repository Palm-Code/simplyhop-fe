import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { AccountSupportReactQueryKey } from "../keys";

import { AccountSupportActionEnum, AccountSupportContext } from "../../context";

import {
  GetUserProfileDataErrorResponseInterface,
  GetUserProfileDataSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";

export const useGetUserProfileData = () => {
  const { state, dispatch } = React.useContext(AccountSupportContext);

  const query = useQuery<
    GetUserProfileDataSuccessResponseInterface,
    GetUserProfileDataErrorResponseInterface
  >({
    queryKey: AccountSupportReactQueryKey.GetUserProfileData(),
    queryFn: () => {
      return fetchGetUserProfileData();
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: AccountSupportActionEnum.SetInformationData,
        payload: {
          ...state.information,
          email: data.data?.email ?? "-",
          city: data.data.city ?? "-",
          first_name: data.data?.first_name ?? "-",
          last_name: data.data?.last_name ?? "-",
          phonenumber: data.data?.mobile ?? "-",
          about_me: data.data?.profile?.bio ?? "-",
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
