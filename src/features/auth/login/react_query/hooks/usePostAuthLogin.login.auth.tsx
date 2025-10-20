import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  PostAuthLoginErrorResponseInterface,
  PostAuthLoginPayloadRequestInterface,
  PostAuthLoginSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { LoginAuthContext } from "../../context";
import Cookies from "universal-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthLogin } from "@/core/services/rest/simplyhop/auth";
import {
  GlobalActionEnum,
  GlobalContext,
  UserActionEnum,
  UserContext,
} from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";
import { RIDE_FILTER } from "@/core/enums";
import { setToken } from "@/app/actions/setToken";

export const usePostAuthLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rideId = searchParams.get(RIDE_FILTER.RIDE_ID);
  const { state } = React.useContext(LoginAuthContext);
  const { dispatch: dispatchUser } = React.useContext(UserContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthLoginSuccessResponseInterface,
    PostAuthLoginErrorResponseInterface
  >({
    mutationKey: LoginAuthReactQueryKey.PostLogin(),
    mutationFn: () => {
      const payload: PostAuthLoginPayloadRequestInterface = {
        body: {
          email: state.form.email.value,
          password: "",
        },
      };
      return fetchPostAuthLogin(payload);
    },
    onSuccess(data) {
      const cookies = new Cookies();
      cookies.set("token", data.data.token, { path: "/" });
      setToken(data.data.token);
      const user = data.data.user;
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
        },
      });
      if (!rideId) {
        router.push(AppCollectionURL.public.home());
      } else {
        router.push(
          AppCollectionURL.public.tripResult(searchParams.toString())
        );
      }
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};
