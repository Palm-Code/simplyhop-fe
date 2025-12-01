import { GetUserBlockListPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_block";

export const ListUserBlockReactQueryKey = {
  GetUserBlockList: (payload?: GetUserBlockListPayloadRequestInterface) => {
    return ["ListUserBlockReactQueryKey.GetUserBlockList", [payload] as const];
  },
  DeleteUserBlock: () => {
    return ["ListUserBlockReactQueryKey.DeleteUserBlock"];
  },
};
