import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  GetAuthSocialCallbackErrorResponseInterface,
  GetAuthSocialCallbackPayloadRequestInterface,
  GetAuthSocialCallbackSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchGetAuthSocialCallback } from "@/core/services/rest/simplyhop/auth";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";

export const useGetSocialCallback = () => {
  const searchParams = useSearchParams();
  const { dispatch: dispatchUser } = React.useContext(UserContext);
  const code = searchParams.get("code");
  const query = useQuery<
    GetAuthSocialCallbackSuccessResponseInterface,
    GetAuthSocialCallbackErrorResponseInterface
  >({
    queryKey: LoginAuthReactQueryKey.GetSocialCallback(),
    queryFn: () => {
      const payload: GetAuthSocialCallbackPayloadRequestInterface = {
        path: {
          provider: "google",
        },
        params: {
          code: String(code ?? ""),
        },
      };
      return fetchGetAuthSocialCallback(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const cookies = new Cookies();
      cookies.set("token", data.data.token, { path: "/" });
      const user = query.data.data.user;
      dispatchUser({
        type: UserActionEnum.SetProfileData,
        payload: {
          id: user.id,
          first_name: user.first_name ?? "",
          last_name: user.last_name ?? "",
          avatar: user.avatar,
          email: user.email,
          phonenumber: user.mobile ?? "",
          city: user.city ?? "",
          about_me: user.profile?.bio ?? "",
          is_driver: user.is_driver === 1 ? true : false,
          gender: user.gender ?? null,
          is_able_to_ride: user.can_share_ride,
          is_super_admin: user.is_super_admin,
          role: user.role,
        },
      });
      // router.push(AppCollectionURL.public.home());
    }
  }, [query.data, query.isFetching]);
  return query;
};
