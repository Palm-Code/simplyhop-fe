import { GetUserBlockListPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_block";

export const UserBlockListReactQueryKey = {
  GetUserBlockList: (payload?: GetUserBlockListPayloadRequestInterface) => {
    return [
      "RegistrationProfileReactQueryKey.GetUserBlockList",
      [payload] as const,
    ];
  },
};
