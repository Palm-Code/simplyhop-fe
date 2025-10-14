import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostUserBlockErrorResponseInterface,
  PostUserBlockPayloadRequestInterface,
  PostUserBlockSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user";
import { ChatTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ChatTripContext } from "../../context";
import { fetchPostUserBlock } from "@/core/services/rest/simplyhop/user";
import { queryClient } from "@/core/utils/react_query";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

export const usePostUserBlock = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(ChatTripContext);

  const mutation = useMutation<
    PostUserBlockSuccessResponseInterface,
    PostUserBlockErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.PostUserBlock(),
    mutationFn: () => {
      const payload: PostUserBlockPayloadRequestInterface = {
        body: {
          blocked_user_id: state.room.header.user_id ?? -1,
        },
      };
      return fetchPostUserBlock(payload);
    },
    onSuccess() {
      const payload: GetUserProfileIdPayloadRequestInterface = {
        path: {
          id: !state.room.header.user_id
            ? "0"
            : String(state.room.header.user_id),
        },
      };
      queryClient.invalidateQueries({
        queryKey: ChatTripReactQueryKey.GetUserProfileId(payload),
        exact: true,
      });
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
