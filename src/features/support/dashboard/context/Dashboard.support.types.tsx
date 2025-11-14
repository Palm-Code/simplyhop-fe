import {
  GetDashboardMySuccessDataResponseInterface,
  GetDashboardOrganizationSummarySuccessDataResponseInterface,
  GetDashboardSuperAdminSummarySuccessDataResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { RideCardDashboardProps } from "../components/ride_card";
import { VehicleCardDashboardProps } from "../components/vehicle_card";

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
      data: RideCardDashboardProps[];
    } | null;
    vehicle: {
      data: VehicleCardDashboardProps[];
    } | null;
  };
  // organization_admin:{
  //   ride:
  // }
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
  [DashboardSupportActionEnum.SetSectionsPersonalRideData]: DashboardSupportSections["personal"]["ride"];
  [DashboardSupportActionEnum.SetSectionsPersonalVehicleData]: DashboardSupportSections["personal"]["vehicle"];
};

export type DashboardSupportSectionsActions =
  ActionMap<DashboardSupportSectionsPayload>[keyof ActionMap<DashboardSupportSectionsPayload>];
