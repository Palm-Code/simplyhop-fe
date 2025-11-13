import {
  DashboardSupportActionEnum,
  DashboardSupportActions,
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
