import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  PostAuthVerifyOTPErrorResponseInterface,
  PostAuthVerifyOTPPayloadRequestInterface,
  PostAuthVerifyOTPSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { LoginAuthActionEnum, LoginAuthContext } from "../../context";
import Cookies from "universal-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthVerifyOTP } from "@/core/services/rest/simplyhop/auth";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";
import { RIDE_FILTER } from "@/core/enums";
import { setToken } from "@/app/actions/setToken";

export const usePostAuthVerifyOTP = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rideId = searchParams.get(RIDE_FILTER.RIDE_ID);
  const { state, dispatch } = React.useContext(LoginAuthContext);
  const { dispatch: dispatchUser } = React.useContext(UserContext);

  const mutation = useMutation<
    PostAuthVerifyOTPSuccessResponseInterface,
    PostAuthVerifyOTPErrorResponseInterface
  >({
    mutationKey: LoginAuthReactQueryKey.PostRequestOTP(),
    mutationFn: () => {
      const payload: PostAuthVerifyOTPPayloadRequestInterface = {
        body: {
          email: state.form.email.value,
          otp: state.otp_form.otp.value,
        },
      };
      return fetchPostAuthVerifyOTP(payload);
    },
    onSuccess(data) {
      dispatch({
        type: LoginAuthActionEnum.SetOTPFormData,
        payload: {
          ...state.otp_form,
          error: null,
        },
      });
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
      dispatch({
        type: LoginAuthActionEnum.SetOTPFormData,
        payload: {
          ...state.otp_form,
          error: {
            code: error.message,
          },
        },
      });
    },
  });
  return mutation;
};
