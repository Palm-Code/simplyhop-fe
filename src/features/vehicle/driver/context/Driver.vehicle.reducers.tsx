import {
  DriverVehicleActionEnum,
  DriverVehicleActions,
  DriverVehicleProfile,
} from "./Driver.vehicle.types";

// Profile
export const DriverVehicleProfileReducers = (
  state: DriverVehicleProfile,
  action: DriverVehicleActions
) => {
  switch (action.type) {
    case DriverVehicleActionEnum.SetProfileData:
      return action.payload;
    case DriverVehicleActionEnum.SetProfileDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DriverVehicleActionEnum.SetProfileLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
