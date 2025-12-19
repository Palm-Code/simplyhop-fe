import {
  DetailOrganizationActionEnum,
  DetailOrganizationActions,
  DetailOrganizationRide,
  DetailOrganizationProfile,
  DetailOrganizationDriver,
  DetailOrganizationEdit,
  DetailOrganizationDeleteAccountConfirmation,
  DetailOrganizationCompanyData,
  DetailOrganizationCompanyOffice,
  DetailOrganizationPinPoint,
  DetailOrganizationPinPointDeleteConfirmation,
  DetailOrganizationNotification,
} from "./Detail.organization.types";

// Profile
export const DetailOrganizationProfileReducers = (
  state: DetailOrganizationProfile,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetProfileData:
      return action.payload;
    case DetailOrganizationActionEnum.SetProfileDataData:
      return {
        ...state,
        data: action.payload,
      };
    case DetailOrganizationActionEnum.SetProfileLoadingData:
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

// DeleteAccountConfirmation
export const DetailOrganizationDeleteAccountConfirmationReducers = (
  state: DetailOrganizationDeleteAccountConfirmation,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetDeleteAccountConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// Edit
export const DetailOrganizationEditReducers = (
  state: DetailOrganizationEdit,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetEditData:
      return action.payload;

    default:
      return state;
  }
};

// CompanyData
export const DetailOrganizationCompanyDataReducers = (
  state: DetailOrganizationCompanyData,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetCompanyDataData:
      return action.payload;

    default:
      return state;
  }
};

// CompanyOffice
export const DetailOrganizationCompanyOfficeReducers = (
  state: DetailOrganizationCompanyOffice,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetCompanyOfficeData:
      return action.payload;

    default:
      return state;
  }
};

// PinPoint
export const DetailOrganizationPinPointReducers = (
  state: DetailOrganizationPinPoint,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetPinPointData:
      return action.payload;

    default:
      return state;
  }
};

// PinPointDeleteConfirmation
export const DetailOrganizationPinPointDeleteConfirmationReducers = (
  state: DetailOrganizationPinPointDeleteConfirmation,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetPinPointDeleteConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const DetailOrganizationNotificationReducers = (
  state: DetailOrganizationNotification,
  action: DetailOrganizationActions
) => {
  switch (action.type) {
    case DetailOrganizationActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};
