import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostMessagesChatErrorResponseInterface,
  PostMessagesChatPayloadRequestInterface,
  PostMessagesChatSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/messages";
import { fetchPostMessagesChat } from "@/core/services/rest/simplyhop/messages";
import { ChatTripReactQueryKey } from "../keys";
import { ChatTripContext } from "../../context";
import { v4 as uuidv4 } from "uuid";

export const usePostMessagesChat = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { state } = React.useContext(ChatTripContext);
  const mutation = useMutation<
    PostMessagesChatSuccessResponseInterface,
    PostMessagesChatErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.PostMessagesChat(),
    mutationFn: () => {
      const payload: PostMessagesChatPayloadRequestInterface = {
        body: {
          message: state.room.chat.input.value,
          message_room_id: state.room.id ?? 0,
        },
      };
      return fetchPostMessagesChat(payload);
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
