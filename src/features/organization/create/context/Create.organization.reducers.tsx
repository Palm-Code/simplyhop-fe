import {
  CreateOrganizationActionEnum,
  CreateOrganizationActions,
  CreateOrganizationCompanyData,
  CreateOrganizationCompanyOffice,
  CreateOrganizationNotification,
  CreateOrganizationPinPoint,
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

// CompanyOffice
export const CreateOrganizationCompanyOfficeReducers = (
  state: CreateOrganizationCompanyOffice,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetCompanyOfficeData:
      return action.payload;

    default:
      return state;
  }
};

// PinPoint
export const CreateOrganizationPinPointReducers = (
  state: CreateOrganizationPinPoint,
  action: CreateOrganizationActions
) => {
  switch (action.type) {
    case CreateOrganizationActionEnum.SetPinPointData:
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
