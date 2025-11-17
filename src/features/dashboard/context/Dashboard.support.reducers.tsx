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
          ride: {
            ...state.personal.ride,
            data: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsPersonalVehicleData:
      return {
        ...state,
        personal: {
          ...state.personal,
          vehicle: {
            ...state.personal.vehicle,
            data: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsOrganizationAdminRideData:
      return {
        ...state,
        organization_admin: {
          ...state.organization_admin,
          ride: {
            ...state.organization_admin.ride,
            data: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverData:
      return {
        ...state,
        organization_admin: {
          ...state.organization_admin,
          driver: {
            ...state.organization_admin.driver,
            data: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverPaginationData:
      return {
        ...state,
        organization_admin: {
          ...state.organization_admin,
          driver: {
            ...state.organization_admin.driver,
            pagination: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverLoadingData:
      return {
        ...state,
        organization_admin: {
          ...state.organization_admin,
          driver: {
            ...state.organization_admin.driver,
            loading: action.payload,
          },
        },
      };

    case DashboardSupportActionEnum.SetSectionsSuperAdminOrganizationData:
      return {
        ...state,
        super_admin: {
          ...state.super_admin,
          organization: {
            ...state.super_admin.organization,
            data: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsSuperAdminOrganizationPaginationData:
      return {
        ...state,
        super_admin: {
          ...state.super_admin,
          organization: {
            ...state.super_admin.organization,
            pagination: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsSuperAdminOrganizationLoadingData:
      return {
        ...state,
        super_admin: {
          ...state.super_admin,
          organization: {
            ...state.super_admin.organization,
            loading: action.payload,
          },
        },
      };

    case DashboardSupportActionEnum.SetSectionsSuperAdminDriverData:
      return {
        ...state,
        super_admin: {
          ...state.super_admin,
          driver: {
            ...state.super_admin.driver,
            data: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsSuperAdminDriverPaginationData:
      return {
        ...state,
        super_admin: {
          ...state.super_admin,
          driver: {
            ...state.super_admin.driver,
            pagination: action.payload,
          },
        },
      };
    case DashboardSupportActionEnum.SetSectionsSuperAdminDriverLoadingData:
      return {
        ...state,
        super_admin: {
          ...state.super_admin,
          driver: {
            ...state.super_admin.driver,
            loading: action.payload,
          },
        },
      };

    default:
      return state;
  }
};
