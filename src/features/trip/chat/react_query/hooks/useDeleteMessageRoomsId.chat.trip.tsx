import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  DeleteMessageRoomsIdErrorResponseInterface,
  DeleteMessageRoomsIdPayloadRequestInterface,
  DeleteMessageRoomsIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { ChatTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ChatTripContext } from "../../context";
import { fetchDeleteMessageRoomsId } from "@/core/services/rest/simplyhop/message_rooms";

export const useDeleteMessageRoomsId = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(ChatTripContext);

  const mutation = useMutation<
    DeleteMessageRoomsIdSuccessResponseInterface,
    DeleteMessageRoomsIdErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.DeleteMessageRoomsId(),
    mutationFn: () => {
      const payload: DeleteMessageRoomsIdPayloadRequestInterface = {
        path: {
          id: String(state.room.id ?? -1),
        },
      };
      return fetchDeleteMessageRoomsId(payload);
    },
    onSuccess() {
      // TODO: need integration
      // const payload: GetUserProfileIdPayloadRequestInterface = {
      //   path: {
      //     id: !state.room.header.user_id
      //       ? "0"
      //       : String(state.room.header.user_id),
      //   },
      // };
      // queryClient.invalidateQueries({
      //   queryKey: ChatTripReactQueryKey.GetUserProfileId(payload),
      //   exact: true,
      // });
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
