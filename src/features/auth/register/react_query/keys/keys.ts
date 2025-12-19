import { GetOrganizationListPayloadRequestInterface } from "@/core/models/rest/simplyhop/organization";

export const RegisterAuthReactQueryKey = {
  GetOrganizationList: (
    payload?: GetOrganizationListPayloadRequestInterface
  ) => {
    return [
      "RegisterAuthReactQueryKey.GetOrganizationList",
      [payload] as const,
    ];
  },
  PostRequestOTP: () => {
    return ["RegisterAuthReactQueryKey.PostRequestOTP"];
  },
  PostVerifyOTP: () => {
    return ["RegisterAuthReactQueryKey.PostVerifyOTP"];
  },
};
