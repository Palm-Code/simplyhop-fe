import { GetVehicleBrandListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_brand";
import { GetVehicleCategoryListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_category";

export const VehicleCreateSupportReactQueryKey = {
  GetVehicleBrandList: (
    payload?: GetVehicleBrandListPayloadRequestInterface
  ) => {
    return [
      "VehicleCreateSupportReactQueryKey.GetVehicleBrandList",
      [payload] as const,
    ];
  },
  GetVehicleCategoryList: (
    payload?: GetVehicleCategoryListPayloadRequestInterface
  ) => {
    return [
      "VehicleCreateSupportReactQueryKey.GetVehicleCategoryList",
      [payload] as const,
    ];
  },
  PostVehicleCreateMy: () => {
    return ["VehicleCreateSupportReactQueryKey.PostVehicleCreateMy"];
  },
  PostVehicleBrandCreate: () => {
    return ["VehicleCreateSupportReactQueryKey.PostVehicleBrandCreate"];
  },
  PostVehicleCategoryCreate: () => {
    return ["VehicleCreateSupportReactQueryKey.PostVehicleCategoryCreate"];
  },
};
