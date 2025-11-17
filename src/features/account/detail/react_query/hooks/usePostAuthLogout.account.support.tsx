import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountSupportReactQueryKey } from "../keys";
import {
  PostAuthLogoutErrorResponseInterface,
  PostAuthLogoutSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthLogout } from "@/core/services/rest/simplyhop/auth";
import {
  GlobalActionEnum,
  GlobalContext,
  UserActionEnum,
  UserContext,
} from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";
import { removeToken } from "@/app/actions";

export const usePostAuthLogout = () => {
  const router = useRouter();
  const { dispatch: dispatchUser } = React.useContext(UserContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthLogoutSuccessResponseInterface,
    PostAuthLogoutErrorResponseInterface
  >({
    mutationKey: AccountSupportReactQueryKey.PostLogout(),
    mutationFn: () => {
      return fetchPostAuthLogout();
    },
    async onSuccess() {
      dispatchUser({
        type: UserActionEnum.SetProfileData,
        payload: null,
      });
      const cookies = new Cookies();
      cookies.remove("token", { path: "/" });
      await removeToken();
      router.refresh();
      router.push(AppCollectionURL.public.login());
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
