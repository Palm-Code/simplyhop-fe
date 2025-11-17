import {
  GetDashboardMySuccessDataResponseInterface,
  GetDashboardOrganizationSuccessDataResponseInterface,
  GetDashboardOrganizationSummarySuccessDataResponseInterface,
  GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface,
  GetDashboardSuperAdminSuccessDataResponseInterface,
  GetDashboardSuperAdminSummarySuccessDataResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { DashboardRideCardProps } from "../../../core/components/dashboard_ride_card";
import { DashboardVehicleCardProps } from "../../../core/components/dashboard_vehicle_card";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface DashboardSupportInitialStateType {
  summary: DashboardSupportSummary;
  sections: DashboardSupportSections;
}

// State Collection Types consist of:
export interface DashboardSupportSummary {
  personal: GetDashboardMySuccessDataResponseInterface | null;
  organization_admin: GetDashboardOrganizationSummarySuccessDataResponseInterface | null;
  super_admin: GetDashboardSuperAdminSummarySuccessDataResponseInterface | null;
}

export interface DashboardSupportSections {
  personal: {
    ride: {
      data: DashboardRideCardProps[] | null;
    };
    vehicle: {
      data: DashboardVehicleCardProps[] | null;
    };
  };
  organization_admin: {
    ride: {
      data: DashboardRideCardProps[] | null;
    };
    driver: {
      data: GetDashboardOrganizationSuccessDataResponseInterface[] | null;
      pagination: {
        limit: number;
        current_page: number;
      };
      loading: {
        is_fetching: boolean;
      };
    };
  };
  super_admin: {
    organization: {
      data:
        | GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface[]
        | null;
      pagination: {
        limit: number;
        current_page: number;
      };
      loading: {
        is_fetching: boolean;
      };
    };
    driver: {
      data: GetDashboardSuperAdminSuccessDataResponseInterface[] | null;
      pagination: {
        limit: number;
        current_page: number;
      };
      loading: {
        is_fetching: boolean;
      };
    };
  };
}

export enum DashboardSupportActionEnum {
  // Summary
  SetSummaryData = "SetSummaryData",
  SetSummaryPersonalData = "SetSummaryPersonalData",
  SetSummaryOrganizationAdminData = "SetSummaryOrganizationAdminData",
  SetSummarySuperAdminData = "SetSummarySuperAdminData",

  // Sections
  SetSectionsData = "SetSectionsData",
  SetSectionsPersonalRideData = "SetSectionsPersonalRideData",
  SetSectionsPersonalVehicleData = "SetSectionsPersonalVehicleData",
  SetSectionsOrganizationAdminRideData = "SetSectionsOrganizationAdminRideData",
  SetSectionsOrganizationAdminDriverData = "SetSectionsOrganizationAdminDriverData",
  SetSectionsOrganizationAdminDriverPaginationData = "SetSectionsOrganizationAdminDriverPaginationData",
  SetSectionsOrganizationAdminDriverLoadingData = "SetSectionsOrganizationAdminDriverLoadingData",
  SetSectionsSuperAdminOrganizationData = "SetSectionsSuperAdminOrganizationData",
  SetSectionsSuperAdminOrganizationPaginationData = "SetSectionsSuperAdminOrganizationPaginationData",
  SetSectionsSuperAdminOrganizationLoadingData = "SetSectionsSuperAdminOrganizationLoadingData",
  SetSectionsSuperAdminDriverData = "SetSectionsSuperAdminDriverData",
  SetSectionsSuperAdminDriverPaginationData = "SetSectionsSuperAdminDriverPaginationData",
  SetSectionsSuperAdminDriverLoadingData = "SetSectionsSuperAdminDriverLoadingData",
}

// Action Collection Types
export type DashboardSupportActions =
  | DashboardSupportSummaryActions
  | DashboardSupportSectionsActions;

// Action Collection Types consist of:
// Summary
type DashboardSupportSummaryPayload = {
  [DashboardSupportActionEnum.SetSummaryData]: DashboardSupportSummary;
  [DashboardSupportActionEnum.SetSummaryPersonalData]: DashboardSupportSummary["personal"];
  [DashboardSupportActionEnum.SetSummaryOrganizationAdminData]: DashboardSupportSummary["organization_admin"];
  [DashboardSupportActionEnum.SetSummarySuperAdminData]: DashboardSupportSummary["super_admin"];
};

export type DashboardSupportSummaryActions =
  ActionMap<DashboardSupportSummaryPayload>[keyof ActionMap<DashboardSupportSummaryPayload>];

// Sections
type DashboardSupportSectionsPayload = {
  [DashboardSupportActionEnum.SetSectionsData]: DashboardSupportSections;
  [DashboardSupportActionEnum.SetSectionsPersonalRideData]: DashboardSupportSections["personal"]["ride"]["data"];
  [DashboardSupportActionEnum.SetSectionsPersonalVehicleData]: DashboardSupportSections["personal"]["vehicle"]["data"];
  [DashboardSupportActionEnum.SetSectionsOrganizationAdminRideData]: DashboardSupportSections["organization_admin"]["ride"]["data"];
  [DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverData]: DashboardSupportSections["organization_admin"]["driver"]["data"];
  [DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverPaginationData]: DashboardSupportSections["organization_admin"]["driver"]["pagination"];
  [DashboardSupportActionEnum.SetSectionsOrganizationAdminDriverLoadingData]: DashboardSupportSections["organization_admin"]["driver"]["loading"];
  [DashboardSupportActionEnum.SetSectionsSuperAdminOrganizationData]: DashboardSupportSections["super_admin"]["organization"]["data"];
  [DashboardSupportActionEnum.SetSectionsSuperAdminOrganizationPaginationData]: DashboardSupportSections["super_admin"]["organization"]["pagination"];
  [DashboardSupportActionEnum.SetSectionsSuperAdminOrganizationLoadingData]: DashboardSupportSections["super_admin"]["organization"]["loading"];
  [DashboardSupportActionEnum.SetSectionsSuperAdminDriverData]: DashboardSupportSections["super_admin"]["driver"]["data"];
  [DashboardSupportActionEnum.SetSectionsSuperAdminDriverPaginationData]: DashboardSupportSections["super_admin"]["driver"]["pagination"];
  [DashboardSupportActionEnum.SetSectionsSuperAdminDriverLoadingData]: DashboardSupportSections["super_admin"]["driver"]["loading"];
};

export type DashboardSupportSectionsActions =
  ActionMap<DashboardSupportSectionsPayload>[keyof ActionMap<DashboardSupportSectionsPayload>];
