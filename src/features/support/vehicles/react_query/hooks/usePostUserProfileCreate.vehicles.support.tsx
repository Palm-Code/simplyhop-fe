import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehiclesSupportReactQueryKey } from "../keys";
import {
  PostUserProfileCreateBodyPayloadRequestInterface,
  PostUserProfileCreateErrorResponseInterface,
  PostUserProfileCreatePayloadRequestInterface,
  PostUserProfileCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { VehiclesSupportContext } from "../../context";
import { fetchPostUserProfileCreate } from "@/core/services/rest/simplyhop/user_profile";
import {
  GlobalActionEnum,
  GlobalContext,
  UserActionEnum,
  UserContext,
} from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostUserProfileCreate = () => {
  const { state: userState, dispatch: dispatchUser } =
    React.useContext(UserContext);
  const { state } = React.useContext(VehiclesSupportContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostUserProfileCreateSuccessResponseInterface,
    PostUserProfileCreateErrorResponseInterface,
    { id: string; name: string }
  >({
    mutationKey: VehiclesSupportReactQueryKey.PostUserProfileCreate(),
    mutationFn: (data: { id: string; name: string }) => {
      const bodyPayload: PostUserProfileCreateBodyPayloadRequestInterface = {
        is_driver: data.id === "yes",
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

    onSuccess() {
      if (!!userState.profile) {
        dispatchUser({
          type: UserActionEnum.SetProfileData,
          payload: {
            ...userState.profile,
            is_driver: state.ride_plan.form.offer_trip.selected?.id === "yes",
          },
        });
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
