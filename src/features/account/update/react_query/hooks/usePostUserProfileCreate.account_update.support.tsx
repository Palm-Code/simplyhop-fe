import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountUpdateSupportReactQueryKey } from "../keys";
import {
  PostUserProfileCreateBodyPayloadRequestInterface,
  PostUserProfileCreateErrorResponseInterface,
  PostUserProfileCreatePayloadRequestInterface,
  PostUserProfileCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { AccountUpdateSupportContext } from "../../context";
import { fetchPostUserProfileCreate } from "@/core/services/rest/simplyhop/user_profile";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostUserProfileCreate = () => {
  const { state } = React.useContext(AccountUpdateSupportContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostUserProfileCreateSuccessResponseInterface,
    PostUserProfileCreateErrorResponseInterface
  >({
    mutationKey: AccountUpdateSupportReactQueryKey.PostUserProfileCreate(),
    mutationFn: () => {
      const bodyPayload: PostUserProfileCreateBodyPayloadRequestInterface = {
        first_name: state.form.first_name.value,
        last_name: state.form.last_name.value,
        city: state.form.city.value, // ada
        mobile: state.form.phonenumber.value, //nyimpen tanpa plus
        ride_offer: true,
        mobile_is_show: true, // true terus karena bakal di show terus
        bio: state.form.about_me.value, // -> bio
        information: "",
        gender: state.form.gender.selected?.id,
        profile_picture: !state.form.pictures.files.length
          ? undefined
          : typeof state.form.pictures.files === "string"
          ? undefined
          : state.form.pictures.files[0],
      };
      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([, value]) => value !== undefined)
      );

      formData.append("file", state.form.pictures.files[0]);
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
