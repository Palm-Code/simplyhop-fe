import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PutMessageRoomsMarkAsReadErrorResponseInterface,
  PutMessageRoomsMarkAsReadPayloadRequestInterface,
  PutMessageRoomsMarkAsReadSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { fetchPutMessageRoomsMarkAsRead } from "@/core/services/rest/simplyhop/message_rooms";
import { ChatTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";

export const usePutMessageRoomsMarkAsRead = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PutMessageRoomsMarkAsReadSuccessResponseInterface,
    PutMessageRoomsMarkAsReadErrorResponseInterface,
    { id: string }
  >({
    mutationKey: ChatTripReactQueryKey.PutMessageRoomsMarkAsRead(),
    mutationFn: (data: { id: string }) => {
      const payload: PutMessageRoomsMarkAsReadPayloadRequestInterface = {
        path: {
          roomId: data.id,
        },
      };
      return fetchPutMessageRoomsMarkAsRead(payload);
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
