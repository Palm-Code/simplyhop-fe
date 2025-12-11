import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";
import Cookies from "universal-cookie";

import {
  GetUserProfileDataErrorResponseInterface,
  GetUserProfileDataSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";

export const useGetUserProfileData = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const query = useQuery<
    GetUserProfileDataSuccessResponseInterface,
    GetUserProfileDataErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetUserProfileData(),
    queryFn: () => {
      return fetchGetUserProfileData({
        headers: {
          token: token ?? "",
        },
        params: {
          include: "organization.addresses",
        },
      });
    },
    enabled: !!token,
  });

  return query;
};
