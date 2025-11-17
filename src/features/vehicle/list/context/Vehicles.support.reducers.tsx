import {
  VehiclesSupportActionEnum,
  VehiclesSupportActions,
  VehiclesSupportList,
  VehiclesSupportRidePlan,
} from "./Vehicles.support.types";

// List
export const VehiclesSupportListReducers = (
  state: VehiclesSupportList,
  action: VehiclesSupportActions
) => {
  switch (action.type) {
    case VehiclesSupportActionEnum.SetListData:
      return action.payload;

    default:
      return state;
  }
};

// RidePlan
export const VehiclesSupportRidePlanReducers = (
  state: VehiclesSupportRidePlan,
  action: VehiclesSupportActions
) => {
  switch (action.type) {
    case VehiclesSupportActionEnum.SetRidePlanData:
      return action.payload;

    default:
      return state;
  }
};
