import {
  VehicleCreateSupportActionEnum,
  VehicleCreateSupportActions,
  VehicleCreateSupportNotification,
  VehicleCreateSupportVehicleInformation,
} from "./VehicleCreate.support.types";

// VehicleInformation
export const VehicleCreateSupportVehicleInformationReducers = (
  state: VehicleCreateSupportVehicleInformation,
  action: VehicleCreateSupportActions
) => {
  switch (action.type) {
    case VehicleCreateSupportActionEnum.SetVehicleInformationData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const VehicleCreateSupportNotificationReducers = (
  state: VehicleCreateSupportNotification,
  action: VehicleCreateSupportActions
) => {
  switch (action.type) {
    case VehicleCreateSupportActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};
