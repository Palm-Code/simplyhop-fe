import {
  DetailDriverActionEnum,
  DetailDriverActions,
  DetailDriverRide,
  DetailDriverEdit,
  DetailDriverUser,
  DetailDriverVehicle,
  DetailDriverDeleteAccountConfirmation,
} from "./Detail.driver.types";

// User
export const DetailDriverUserReducers = (
  state: DetailDriverUser,
  action: DetailDriverActions
) => {
  switch (action.type) {
    case DetailDriverActionEnum.SetUserData:
      return action.payload;
    case DetailDriverActionEnum.SetUserDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailDriverActionEnum.SetUserLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Ride
export const DetailDriverRideReducers = (
  state: DetailDriverRide,
  action: DetailDriverActions
) => {
  switch (action.type) {
    case DetailDriverActionEnum.SetRideData:
      return action.payload;
    case DetailDriverActionEnum.SetRideDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailDriverActionEnum.SetRideLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Vehicle
export const DetailDriverVehicleReducers = (
  state: DetailDriverVehicle,
  action: DetailDriverActions
) => {
  switch (action.type) {
    case DetailDriverActionEnum.SetVehicleData:
      return action.payload;
    case DetailDriverActionEnum.SetVehicleDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailDriverActionEnum.SetVehicleLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Edit
export const DetailDriverEditReducers = (
  state: DetailDriverEdit,
  action: DetailDriverActions
) => {
  switch (action.type) {
    case DetailDriverActionEnum.SetEditData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteAccountConfirmation
export const DetailDriverDeleteAccountConfirmationReducers = (
  state: DetailDriverDeleteAccountConfirmation,
  action: DetailDriverActions
) => {
  switch (action.type) {
    case DetailDriverActionEnum.SetDeleteAccountConfirmationData:
      return action.payload;

    default:
      return state;
  }
};
