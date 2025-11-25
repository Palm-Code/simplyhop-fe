import {
  OrganizationDriverActionEnum,
  OrganizationDriverActions,
  OrganizationDriverProfile,
} from "./Organization.driver.types";

// Profile
export const OrganizationDriverProfileReducers = (
  state: OrganizationDriverProfile,
  action: OrganizationDriverActions
) => {
  switch (action.type) {
    case OrganizationDriverActionEnum.SetProfileData:
      return action.payload;
    case OrganizationDriverActionEnum.SetProfileDataData:
      return {
        ...state,
        data: action.payload,
      };
    case OrganizationDriverActionEnum.SetProfileLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
