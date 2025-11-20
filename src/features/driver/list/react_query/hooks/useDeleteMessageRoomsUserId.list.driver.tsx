import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  DeleteMessageRoomsIdErrorResponseInterface,
  DeleteMessageRoomsIdPayloadRequestInterface,
  DeleteMessageRoomsIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { ListDriverReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ListDriverContext } from "../../context";
import { fetchDeleteMessageRoomsId } from "@/core/services/rest/simplyhop/message_rooms";

export const useDeleteMessageRoomsUserId = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(ListDriverContext);

  const mutation = useMutation<
    DeleteMessageRoomsIdSuccessResponseInterface,
    DeleteMessageRoomsIdErrorResponseInterface
  >({
    mutationKey: ListDriverReactQueryKey.DeleteMessageRoomsUserId(),
    mutationFn: () => {
      const payload: DeleteMessageRoomsIdPayloadRequestInterface = {
        path: {
          id: String(state.user_profile.user_id ?? -1),
        },
      };
      return fetchDeleteMessageRoomsId(payload);
    },
    onSuccess() {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
              variant: "success",
              message: "Chat löschen erfolgreich",
            },
          ],
        },
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
