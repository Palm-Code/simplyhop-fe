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
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { fetchDeleteMessageRoomsId } from "@/core/services/rest/simplyhop/message_rooms";
import { queryClient } from "@/core/utils/react_query";

export const useDeleteMessageRoomsId = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state, dispatch } = React.useContext(ChatTripContext);

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
      dispatch({
        type: ChatTripActionEnum.SetListMessagePaginationCurrent,
        payload: 1,
      });

      dispatch({
        type: ChatTripActionEnum.SetListMessageItems,
        payload: [],
      });

      queryClient.invalidateQueries({
        queryKey: ["ChatTripReactQueryKey.GetMessageRoomsList"],
        exact: false,
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
