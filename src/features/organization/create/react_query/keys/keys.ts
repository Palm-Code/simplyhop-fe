import { GetVehicleBrandListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_brand";
import { GetVehicleCategoryListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_category";

export const CreateOrganizationReactQueryKey = {
  GetVehicleBrandList: (
    payload?: GetVehicleBrandListPayloadRequestInterface
  ) => {
    return [
      "CreateOrganizationReactQueryKey.GetVehicleBrandList",
      [payload] as const,
    ];
  },
  GetVehicleCategoryList: (
    payload?: GetVehicleCategoryListPayloadRequestInterface
  ) => {
    return [
      "CreateOrganizationReactQueryKey.GetVehicleCategoryList",
      [payload] as const,
    ];
  },
  PostUserProfileCreate: () => {
    return ["CreateOrganizationReactQueryKey.PostUserProfileCreate"];
  },
  PostVehicleCreateMy: () => {
    return ["CreateOrganizationReactQueryKey.PostVehicleCreateMy"];
  },
  PostVehicleBrandCreate: () => {
    return ["CreateOrganizationReactQueryKey.PostVehicleBrandCreate"];
  },
  PostVehicleCategoryCreate: () => {
    return ["CreateOrganizationReactQueryKey.PostVehicleCategoryCreate"];
  },
};
