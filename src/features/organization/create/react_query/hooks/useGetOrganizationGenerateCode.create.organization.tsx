import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateOrganizationReactQueryKey } from "../keys";
import {
  GetOrganizationGenerateCodeErrorResponseInterface,
  GetOrganizationGenerateCodeSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { CreateOrganizationContext } from "../../context";
import { fetchGetOrganizationGenerateCode } from "@/core/services/rest/simplyhop/organization";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const useGetOrganizationGenerateCode = () => {
  const { state } = React.useContext(CreateOrganizationContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    GetOrganizationGenerateCodeSuccessResponseInterface,
    GetOrganizationGenerateCodeErrorResponseInterface
  >({
    mutationKey: CreateOrganizationReactQueryKey.GetOrganizationGenerateCode(),
    mutationFn: () => {
      return fetchGetOrganizationGenerateCode();
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
