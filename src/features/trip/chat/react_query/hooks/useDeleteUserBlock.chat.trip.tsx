import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  DeleteUserBlockErrorResponseInterface,
  DeleteUserBlockPayloadRequestInterface,
  DeleteUserBlockSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user";
import { ChatTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ChatTripContext } from "../../context";
import { fetchDeleteUserBlock } from "@/core/services/rest/simplyhop/user";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";
import { queryClient } from "@/core/utils/react_query";

export const useDeleteUserBlock = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(ChatTripContext);

  const mutation = useMutation<
    DeleteUserBlockSuccessResponseInterface,
    DeleteUserBlockErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.DeleteUserBlock(),
    mutationFn: () => {
      const payload: DeleteUserBlockPayloadRequestInterface = {
        body: {
          blocked_user_id: state.room.header.user_id ?? -1,
        },
      };
      return fetchDeleteUserBlock(payload);
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
