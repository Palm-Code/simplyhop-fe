import {
  DriverTripActionEnum,
  DriverTripActions,
  DriverTripUser,
} from "./Driver.trip.types";

// User
export const DriverTripUserReducers = (
  state: DriverTripUser,
  action: DriverTripActions
) => {
  switch (action.type) {
    case DriverTripActionEnum.SetUserData:
      return action.payload;
    case DriverTripActionEnum.SetUserDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DriverTripActionEnum.SetUserLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
