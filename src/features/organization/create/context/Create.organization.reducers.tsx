import {
  CreateOrganizationActionEnum,
  CreateOrganizationActions,
  CreateOrganizationCompanyData,
  CreateOrganizationNotification,
  CreateOrganizationPersonalInformation,
  CreateOrganizationRidePlan,
  CreateOrganizationVehicleInformation,
} from "./Create.organization.types";

// CompanyData
export const CreateOrganizationCompanyDataReducers = (
  state: CreateOrganizationCompanyData,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetCompanyDataData:
      return action.payload;

    default:
      return state;
  }
};

// PersonalInformation
export const CreateOrganizationPersonalInformationReducers = (
  state: CreateOrganizationPersonalInformation,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetPersonalInformationData:
      return action.payload;

    default:
      return state;
  }
};

// RidePlan
export const CreateOrganizationRidePlanReducers = (
  state: CreateOrganizationRidePlan,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetRidePlanData:
      return action.payload;

    default:
      return state;
  }
};

// VehicleInformation
export const CreateOrganizationVehicleInformationReducers = (
  state: CreateOrganizationVehicleInformation,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetVehicleInformationData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const CreateOrganizationNotificationReducers = (
  state: CreateOrganizationNotification,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};
