import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterAuthReactQueryKey } from "../keys";
import {
  PostAuthVerifyOTPErrorResponseInterface,
  PostAuthVerifyOTPPayloadRequestInterface,
  PostAuthVerifyOTPSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthVerifyOTP } from "@/core/services/rest/simplyhop/auth";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";
import { setToken } from "@/app/actions/setToken";

export const usePostAuthVerifyOTP = () => {
  const router = useRouter();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const { dispatch: dispatchUser } = React.useContext(UserContext);

  const mutation = useMutation<
    PostAuthVerifyOTPSuccessResponseInterface,
    PostAuthVerifyOTPErrorResponseInterface
  >({
    mutationKey: RegisterAuthReactQueryKey.PostRequestOTP(),
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
        type: RegisterAuthActionEnum.SetOTPFormData,
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
          is_super_admin: user.is_super_admin,
          role: user.role,
          total_passengers_count: user.total_passengers_count,
          total_trips: user.total_trips,
          average_ride_rating: user.average_ride_rating,
          organization_id: user.organization_id,
        },
      });
      const isSuperAdmin = user.is_super_admin === true;
      const isOrganizationAdmin =
        user.role === "admin" && user.is_super_admin === false;
      const isEmployeeProfileCompleted =
        (user.is_driver && user.can_share_ride) ||
        (!user.is_driver && user.is_profile_complete);

      if (isSuperAdmin) {
        router.push(AppCollectionURL.private.support_dashboard());
        return;
      } else if (isOrganizationAdmin) {
        router.push(AppCollectionURL.private.support_dashboard());
        return;
      } else if (isEmployeeProfileCompleted) {
        router.push(AppCollectionURL.private.trip());
        return;
      } else {
        router.push(AppCollectionURL.private.profile_registration());
        return;
      }
    },

    onError(error) {
      dispatch({
        type: RegisterAuthActionEnum.SetOTPFormData,
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
