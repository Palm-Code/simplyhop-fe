import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  DeleteUserBlockErrorResponseInterface,
  DeleteUserBlockPayloadRequestInterface,
  DeleteUserBlockSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user";
import { ListUserBlockReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ListUserBlockContext } from "../../context";
import { fetchDeleteUserBlock } from "@/core/services/rest/simplyhop/user";

export const useDeleteUserBlock = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { state } = React.useContext(ListUserBlockContext);

  const mutation = useMutation<
    DeleteUserBlockSuccessResponseInterface,
    DeleteUserBlockErrorResponseInterface
  >({
    mutationKey: ListUserBlockReactQueryKey.DeleteUserBlock(),
    mutationFn: () => {
      const payload: DeleteUserBlockPayloadRequestInterface = {
        path: {
          id: state.unblock_confirmation.id ?? -1,
        },
      };
      return fetchDeleteUserBlock(payload);
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
