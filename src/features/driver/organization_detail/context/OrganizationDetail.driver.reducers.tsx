import {
  OrganizationDetailDriverActionEnum,
  OrganizationDetailDriverActions,
  OrganizationDetailDriverProfile,
} from "./OrganizationDetail.driver.types";

// Profile
export const OrganizationDetailDriverProfileReducers = (
  state: OrganizationDetailDriverProfile,
  action: OrganizationDetailDriverActions
) => {
  switch (action.type) {
    case OrganizationDetailDriverActionEnum.SetProfileData:
      return action.payload;
    case OrganizationDetailDriverActionEnum.SetProfileDataData:
      return {
        ...state,
        data: action.payload,
      };
    case OrganizationDetailDriverActionEnum.SetProfileLoadingData:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
