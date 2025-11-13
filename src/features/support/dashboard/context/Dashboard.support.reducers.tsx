import {
  DashboardSupportActionEnum,
  DashboardSupportActions,
  DashboardSupportSections,
  DashboardSupportSummary,
} from "./Dashboard.support.types";

// Summary
export const DashboardSupportSummaryReducers = (
  state: DashboardSupportSummary,
  action: DashboardSupportActions
) => {
  switch (action.type) {
    case DashboardSupportActionEnum.SetSummaryData:
      return action.payload;
    case DashboardSupportActionEnum.SetSummaryPersonalData:
      return {
        ...state,
        personal: action.payload,
      };
    case DashboardSupportActionEnum.SetSummaryOrganizationAdminData:
      return {
        ...state,
        organization_admin: action.payload,
      };

    default:
      return state;
  }
};

// Sections
export const DashboardSupportSectionsReducers = (
  state: DashboardSupportSections,
  action: DashboardSupportActions
) => {
  switch (action.type) {
    case DashboardSupportActionEnum.SetSectionsData:
      return action.payload;
    case DashboardSupportActionEnum.SetSectionsPersonalRideData:
      return {
        ...state,
        personal: {
          ...state.personal,
          ride: action.payload,
        },
      };
    case DashboardSupportActionEnum.SetSectionsPersonalVehicleData:
      return {
        ...state,
        personal: {
          ...state.personal,
          vehicle: action.payload,
        },
      };

    default:
      return state;
  }
};
