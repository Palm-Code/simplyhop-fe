import {
  OrganizationTripActionEnum,
  OrganizationTripActions,
  OrganizationTripProfile,
} from "./Organization.trip.types";

// Profile
export const OrganizationTripProfileReducers = (
  state: OrganizationTripProfile,
  action: OrganizationTripActions
) => {
  switch (action.type) {
    case OrganizationTripActionEnum.SetProfileData:
      return action.payload;
    case OrganizationTripActionEnum.SetProfileDataData:
      return {
        ...state,
        data: action.payload,
      };
    case OrganizationTripActionEnum.SetProfileLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
