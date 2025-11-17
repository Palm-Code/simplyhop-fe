import { GetVehicleBrandListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_brand";
import { GetVehicleCategoryListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_category";

export const VehicleUpdateSupportReactQueryKey = {
  GetVehicleBrandList: (
    payload?: GetVehicleBrandListPayloadRequestInterface
  ) => {
    return [
      "VehicleUpdateSupportReactQueryKey.GetVehicleBrandList",
      [payload] as const,
    ];
  },
  GetVehicleCategoryList: (
    payload?: GetVehicleCategoryListPayloadRequestInterface
  ) => {
    return [
      "VehicleUpdateSupportReactQueryKey.GetVehicleCategoryList",
      [payload] as const,
    ];
  },
  GetVehicleId: () => {
    return ["VehicleUpdateSupportReactQueryKey.GetVehicleId"];
  },
  PostVehicleUpdate: () => {
    return ["VehicleUpdateSupportReactQueryKey.PostVehicleUpdate"];
  },
  DeleteVehicleId: () => {
    return ["VehicleUpdateSupportReactQueryKey.DeleteVehicleId"];
  },
  DeleteVehicleMedia: () => {
    return ["VehicleUpdateSupportReactQueryKey.DeleteVehicleMedia"];
  },
  PostVehicleBrandCreate: () => {
    return ["VehicleUpdateSupportReactQueryKey.PostVehicleBrandCreate"];
  },
  PostVehicleCategoryCreate: () => {
    return ["VehicleUpdateSupportReactQueryKey.PostVehicleCategoryCreate"];
  },
};
