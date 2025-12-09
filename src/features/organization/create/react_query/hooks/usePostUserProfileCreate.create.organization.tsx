import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateOrganizationReactQueryKey } from "../keys";
import {
  PostUserProfileCreateBodyPayloadRequestInterface,
  PostUserProfileCreateErrorResponseInterface,
  PostUserProfileCreatePayloadRequestInterface,
  PostUserProfileCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { CreateOrganizationContext } from "../../context";
import { fetchPostUserProfileCreate } from "@/core/services/rest/simplyhop/user_profile";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostUserProfileCreate = () => {
  const { state } = React.useContext(CreateOrganizationContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostUserProfileCreateSuccessResponseInterface,
    PostUserProfileCreateErrorResponseInterface
  >({
    mutationKey: CreateOrganizationReactQueryKey.PostUserProfileCreate(),
    mutationFn: () => {
      const bodyPayload: PostUserProfileCreateBodyPayloadRequestInterface = {
        first_name: state.personal_information.form.first_name.value,
        last_name: state.personal_information.form.last_name.value,
        city: state.personal_information.form.city.value,
        mobile: state.personal_information.form.phonenumber.value, //nyimpen tanpa plus
        ride_offer: true,
        mobile_is_show: true, // true terus karena bakal di show terus
        bio: state.personal_information.form.about_me.value, // -> bio
        information: "",
        is_driver:
          state.ride_plan.form.offer_trip.selected?.id === "yes" ? true : false,
        gender: state.personal_information.form.gender.selected?.id,
      };

      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([, value]) => value !== undefined)
      );

      for (const key of Object.keys(cleanedObj)) {
        formData.append(
          key,
          key === "profile_picture"
            ? (cleanedObj[key] as Blob)
            : String((cleanedObj as { [key: string]: string })[key])
        );
      }
      const payload: PostUserProfileCreatePayloadRequestInterface = {
        body: formData,
      };
      return fetchPostUserProfileCreate(payload);
    },
    onSuccess() {},
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
