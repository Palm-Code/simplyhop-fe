// import { GetVehicleBrandListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_brand";

export const CreateOrganizationReactQueryKey = {
  // GetVehicleBrandList: (
  //   payload?: GetVehicleBrandListPayloadRequestInterface
  // ) => {
  //   return [
  //     "CreateOrganizationReactQueryKey.GetVehicleBrandList",
  //     [payload] as const,
  //   ];
  // },

  PostOrganizationCreate: () => {
    return ["CreateOrganizationReactQueryKey.PostUserProfileCreate"];
  },
};
