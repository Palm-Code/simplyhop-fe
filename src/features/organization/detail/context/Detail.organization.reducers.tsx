import {
  DetailOrganizationActionEnum,
  DetailOrganizationActions,
  DetailOrganizationRide,
  DetailOrganizationUser,
  DetailOrganizationDriver,
} from "./Detail.organization.types";

// User
export const DetailOrganizationUserReducers = (
  state: DetailOrganizationUser,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetUserData:
      return action.payload;
    case DetailOrganizationActionEnum.SetUserDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailOrganizationActionEnum.SetUserLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Ride
export const DetailOrganizationRideReducers = (
  state: DetailOrganizationRide,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetRideData:
      return action.payload;
    case DetailOrganizationActionEnum.SetRideDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailOrganizationActionEnum.SetRideLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Driver
export const DetailOrganizationDriverReducers = (
  state: DetailOrganizationDriver,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetDriverData:
      return action.payload;
    case DetailOrganizationActionEnum.SetDriverDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailOrganizationActionEnum.SetDriverLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
